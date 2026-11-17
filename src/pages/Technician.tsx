import { TECHNICIANS } from "../data/mock";
import { JobCard } from "../components/JobCard";
import { useAuth } from "../context/AuthContext";
import { useJobs } from "../context/JobsContext";

export function TechnicianPage() {
  const { user } = useAuth();
  const { jobs, updateStatus } = useJobs();
  const technicianId = user?.technicianId ?? "t1";
  const technician = TECHNICIANS.find((tech) => tech.id === technicianId);
  const myJobs = jobs
    .filter((job) => job.technicianId === technicianId)
    .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
  const pending = myJobs.filter((job) => job.status !== "concluido");

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Meu dia</h1>
        <p className="text-sm text-slate-500">
          {technician?.name} · {technician?.specialty} · {pending.length} serviços em aberto
        </p>
      </div>

      <div className="space-y-4">
        {myJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            technician={technician}
            onStatusChange={(status) => updateStatus(job.id, status)}
          />
        ))}
      </div>
    </div>
  );
}
