import type { JobStatus } from "../types";

export const STATUS_LABEL: Record<JobStatus, string> = {
  pendente: "Pendente",
  a_caminho: "A caminho",
  em_andamento: "Em andamento",
  concluido: "Concluído",
};

export function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function whatsappLink(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/55${digits}?text=${encodeURIComponent(message)}`;
}

export function clientUpdateMessage(clientName: string, status: JobStatus) {
  const phrases: Record<JobStatus, string> = {
    pendente: `${clientName}, seu serviço foi agendado. Em breve um técnico da Rota confirma o horário.`,
    a_caminho: `${clientName}, o técnico já está a caminho. Qualquer imprevisto avisamos por aqui.`,
    em_andamento: `${clientName}, o atendimento foi iniciado. Qualquer dúvida estamos neste WhatsApp.`,
    concluido: `${clientName}, serviço concluído. Obrigado pela confiança. Se precisar, é só chamar.`,
  };
  return phrases[status];
}
