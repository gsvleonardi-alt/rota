import { STATUS_LABEL } from "../lib/format";
import type { JobStatus } from "../types";

const STYLES: Record<JobStatus, string> = {
  pendente: "bg-amber-100 text-amber-800",
  a_caminho: "bg-sky-100 text-sky-800",
  em_andamento: "bg-route-50 text-route-700",
  concluido: "bg-slate-200 text-slate-700",
};

export function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${STYLES[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
