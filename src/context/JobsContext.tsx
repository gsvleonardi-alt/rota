import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { INITIAL_JOBS } from "../data/mock";
import type { Job, JobStatus } from "../types";

type JobsContextValue = {
  jobs: Job[];
  storageError: boolean;
  updateStatus: (jobId: string, status: JobStatus) => void;
  assignTechnician: (jobId: string, technicianId: string) => void;
  dispatchByRegionAndTime: () => void;
};

const JobsContext = createContext<JobsContextValue | null>(null);
const STORAGE_KEY = "rota.jobs.v1";

const VALID_STATUSES: JobStatus[] = [
  "pendente",
  "a_caminho",
  "em_andamento",
  "concluido",
];

function isJob(value: unknown): value is Job {
  if (!value || typeof value !== "object") return false;
  const job = value as Record<string, unknown>;
  const hasText = (field: string) => typeof job[field] === "string";
  return (
    hasText("id") &&
    hasText("title") &&
    hasText("clientName") &&
    hasText("clientPhone") &&
    hasText("address") &&
    hasText("neighborhood") &&
    hasText("city") &&
    hasText("scheduledAt") &&
    hasText("notes") &&
    typeof job.status === "string" &&
    VALID_STATUSES.includes(job.status as JobStatus) &&
    (job.technicianId === null || typeof job.technicianId === "string") &&
    typeof job.lat === "number" &&
    typeof job.lng === "number" &&
    Array.isArray(job.history) &&
    job.history.every(
      (entry) =>
        entry &&
        typeof entry.at === "string" &&
        typeof entry.text === "string"
    )
  );
}

function loadJobs(): Job[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_JOBS;
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every(isJob)) {
      return parsed;
    }
  } catch {
    // Storage may be unavailable or contain invalid JSON; retain demo data.
  }
  return INITIAL_JOBS;
}

const STATUS_LABEL: Record<JobStatus, string> = {
  pendente: "Pendente",
  a_caminho: "A caminho",
  em_andamento: "Em andamento",
  concluido: "Concluído",
};

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(loadJobs);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [jobs]);

  const value = useMemo<JobsContextValue>(
    () => ({
      jobs,
      storageError,
      updateStatus: (jobId, status) => {
        setJobs((current) =>
          current.map((job) =>
            job.id === jobId
              ? {
                  ...job,
                  status,
                  history: [
                    ...job.history,
                    {
                      at: new Date().toISOString(),
                      text: `Status atualizado para ${STATUS_LABEL[status]}.`,
                    },
                  ],
                }
              : job
          )
        );
      },
      assignTechnician: (jobId, technicianId) => {
        setJobs((current) =>
          current.map((job) =>
            job.id === jobId
              ? {
                  ...job,
                  technicianId,
                  history: [
                    ...job.history,
                    {
                      at: new Date().toISOString(),
                      text: `Serviço redistribuído para o técnico ${technicianId}.`,
                    },
                  ],
                }
              : job
          )
        );
      },
      dispatchByRegionAndTime: () => {
        const ordered = [...jobs]
          .filter((job) => job.status !== "concluido")
          .sort(
            (a, b) =>
              a.scheduledAt.localeCompare(b.scheduledAt) ||
              a.neighborhood.localeCompare(b.neighborhood) ||
              a.id.localeCompare(b.id)
          );
        const loads = new Map<string, { total: number; regions: Map<string, number> }>();
        for (const job of jobs) {
          if (!job.technicianId || job.status === "concluido") continue;
          const load = loads.get(job.technicianId) ?? { total: 0, regions: new Map() };
          load.total += 1;
          load.regions.set(job.neighborhood, (load.regions.get(job.neighborhood) ?? 0) + 1);
          loads.set(job.technicianId, load);
        }
        const assignments = new Map<string, string>();
        for (const job of ordered) {
          const technicianId = [...loads.entries()]
            .sort((a, b) => {
              const regionDelta =
                (b[1].regions.get(job.neighborhood) ?? 0) -
                (a[1].regions.get(job.neighborhood) ?? 0);
              return regionDelta || a[1].total - b[1].total || a[0].localeCompare(b[0]);
            })[0]?.[0];
          if (!technicianId) continue;
          if (job.technicianId !== technicianId) assignments.set(job.id, technicianId);
          const load = loads.get(technicianId)!;
          load.total += job.technicianId === technicianId ? 0 : 1;
          load.regions.set(
            job.neighborhood,
            (load.regions.get(job.neighborhood) ?? 0) + 1
          );
        }
        if (assignments.size === 0) return;
        setJobs((current) =>
          current.map((job) => {
            const technicianId = assignments.get(job.id);
            return technicianId
              ? {
                  ...job,
                  technicianId,
                  history: [
                    ...job.history,
                    {
                      at: new Date().toISOString(),
                      text: `Despacho heurístico para ${technicianId} por região e janela de horário.`,
                    },
                  ],
                }
              : job;
          })
        );
      },
    }),
    [jobs, storageError]
  );

  return (
    <JobsContext.Provider value={value}>
      {storageError && (
        <div
          role="alert"
          className="fixed bottom-4 left-4 right-4 z-50 rounded-xl bg-red-50 p-3 text-sm text-red-800 shadow-lg sm:left-auto sm:max-w-md"
        >
          Não foi possível salvar as alterações neste navegador. Elas podem ser
          perdidas ao atualizar a página.
        </div>
      )}
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error("useJobs deve ser usado dentro de JobsContext");
  return ctx;
}
