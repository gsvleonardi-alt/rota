import { clientUpdateMessage, formatDateTime, formatTime, whatsappLink } from "../lib/format";
import type { Job, JobStatus, Technician } from "../types";
import { StatusBadge } from "./StatusBadge";

const NEXT_STATUS: Partial<Record<JobStatus, JobStatus>> = {
  pendente: "a_caminho",
  a_caminho: "em_andamento",
  em_andamento: "concluido",
};

type Props = {
  job: Job;
  technician?: Technician;
  compact?: boolean;
  onStatusChange?: (status: JobStatus) => void;
};

export function JobCard({ job, technician, compact, onStatusChange }: Props) {
  const next = NEXT_STATUS[job.status];
  const message = clientUpdateMessage(job.clientName, job.status);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {job.id} · {formatTime(job.scheduledAt)}
          </p>
          <h3 className="mt-1 text-base font-semibold text-ink-900">{job.title}</h3>
          <p className="text-sm text-slate-600">{job.clientName}</p>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <p className="mt-3 text-sm text-slate-600">
        {job.address} · {job.neighborhood}
      </p>

      {!compact && (
        <p className="mt-2 text-sm text-slate-500">{job.notes}</p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        {technician ? (
          <span className="rounded-full bg-sand px-3 py-1 text-ink-800">
            {technician.name}
          </span>
        ) : (
          <span className="text-slate-400">Sem técnico</span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-ink-800 hover:bg-sand"
          href={whatsappLink(job.clientPhone, message)}
          target="_blank"
          rel="noreferrer"
        >
          Avisar no WhatsApp
        </a>
        {onStatusChange && next && (
          <button
            type="button"
            className="rounded-xl bg-ink-900 px-3 py-2 text-sm font-medium text-white hover:bg-ink-800"
            onClick={() => onStatusChange(next)}
          >
            {next === "a_caminho" && "Sair para o local"}
            {next === "em_andamento" && "Iniciar atendimento"}
            {next === "concluido" && "Concluir serviço"}
          </button>
        )}
      </div>

      {!compact && job.history.length > 0 && (
        <ol className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-xs text-slate-500">
          {job.history.slice(-3).map((item) => (
            <li key={item.at + item.text}>
              <span className="font-medium text-slate-600">{formatDateTime(item.at)}</span>
              {" — "}
              {item.text}
            </li>
          ))}
        </ol>
      )}
    </article>
  );
}
