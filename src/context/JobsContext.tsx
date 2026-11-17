import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { INITIAL_JOBS } from "../data/mock";
import type { Job, JobStatus } from "../types";

type JobsContextValue = {
  jobs: Job[];
  updateStatus: (jobId: string, status: JobStatus) => void;
  assignTechnician: (jobId: string, technicianId: string) => void;
};

const JobsContext = createContext<JobsContextValue | null>(null);

const STATUS_LABEL: Record<JobStatus, string> = {
  pendente: "Pendente",
  a_caminho: "A caminho",
  em_andamento: "Em andamento",
  concluido: "Concluído",
};

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);

  const value = useMemo<JobsContextValue>(
    () => ({
      jobs,
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
    }),
    [jobs]
  );

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error("useJobs deve ser usado dentro de JobsContext");
  return ctx;
}
