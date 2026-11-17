import { TECHNICIANS } from "../data/mock";
import type { Job } from "../types";

type Props = {
  jobs: Job[];
};

/**
 * Mapa ilustrativo do MVP.
 * As posições são percentuais simples, suficientes para demonstrar
 * “onde cada técnico está” sem depender de chave de API.
 */
export function MapPlaceholder({ jobs }: Props) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[#d7e4d8] shadow-card">
      <div className="absolute inset-0 opacity-40">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#9bb39c" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative min-h-[320px] p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-800/70">
          Mapa do dia · São Paulo (demo)
        </p>

        {TECHNICIANS.map((tech, index) => {
          const left = 18 + index * 28;
          const top = 28 + (index % 2) * 34;
          return (
            <div
              key={tech.id}
              className="absolute"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              <div
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold shadow-md ${
                  tech.online ? "bg-ink-900 text-white" : "bg-white text-slate-500"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    tech.online ? "bg-route-400" : "bg-slate-300"
                  }`}
                />
                {tech.name.split(" ")[0]}
              </div>
            </div>
          );
        })}

        {jobs.slice(0, 3).map((job, index) => (
          <div
            key={job.id}
            className="absolute rounded-lg bg-white/90 px-2 py-1 text-[11px] text-ink-800 shadow"
            style={{ left: `${22 + index * 24}%`, top: `${62 + (index % 2) * 10}%` }}
          >
            {job.neighborhood}
          </div>
        ))}
      </div>
    </section>
  );
}
