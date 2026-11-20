import { TECHNICIANS } from "../data/mock";
import { JobCard } from "../components/JobCard";
import { MapPlaceholder } from "../components/MapPlaceholder";
import { useJobs } from "../context/JobsContext";

export function DashboardPage() {
  const { jobs, assignTechnician, dispatchByRegionAndTime } = useJobs();
  const openJobs = jobs.filter((job) => job.status !== "concluido");
  const doneToday = jobs.filter((job) => job.status === "concluido").length;
  const online = TECHNICIANS.filter((tech) => tech.online).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Painel do gestor</h1>
        <p className="text-sm text-slate-500">
          Distribua o dia, acompanhe o status e fale com o cliente.
        </p>
      </div>

      <section className="grid gap-3 sm:grid-cols-3">
        <Stat label="Serviços abertos" value={String(openJobs.length)} />
        <Stat label="Concluídos hoje" value={String(doneToday)} />
        <Stat label="Técnicos online" value={`${online}/${TECHNICIANS.length}`} />
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <MapPlaceholder jobs={jobs} />

        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
          <h2 className="text-sm font-semibold text-ink-900">Equipe</h2>
          <ul className="mt-3 space-y-3">
            {TECHNICIANS.map((tech) => (
              <li key={tech.id} className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-ink-900">{tech.name}</p>
                  <p className="text-xs text-slate-500">{tech.specialty}</p>
                </div>
                <span
                  className={`text-xs font-semibold ${
                    tech.online ? "text-route-600" : "text-slate-400"
                  }`}
                >
                  {tech.online ? "Online" : "Offline"}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-ink-900">Serviços do dia</h2>
            <p className="text-xs text-slate-500">
              Sugestão heurística: janela agendada, região e carga atual; não calcula trânsito ou rota GPS.
            </p>
          </div>
          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-ink-800 hover:bg-sand"
            onClick={dispatchByRegionAndTime}
          >
            Sugerir despacho
          </button>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {jobs.map((job) => {
            const technician = TECHNICIANS.find((tech) => tech.id === job.technicianId);
            return (
              <div key={job.id} className="space-y-2">
                <JobCard job={job} technician={technician} compact />
                <label className="block text-xs text-slate-500">
                  Redistribuir
                  <select
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                    value={job.technicianId ?? ""}
                    onChange={(event) => assignTechnician(job.id, event.target.value)}
                  >
                    {TECHNICIANS.map((tech) => (
                      <option key={tech.id} value={tech.id}>
                        {tech.name} · {tech.specialty}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-ink-900">{value}</p>
    </div>
  );
}
