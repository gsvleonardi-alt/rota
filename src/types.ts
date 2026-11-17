export type Role = "gestor" | "tecnico";

export type JobStatus =
  | "pendente"
  | "a_caminho"
  | "em_andamento"
  | "concluido";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  technicianId?: string;
};

export type Technician = {
  id: string;
  name: string;
  specialty: string;
  phone: string;
  /** Coordenadas fictícias para o mapa do MVP (São Paulo). */
  lat: number;
  lng: number;
  online: boolean;
};

export type Job = {
  id: string;
  title: string;
  clientName: string;
  clientPhone: string;
  address: string;
  neighborhood: string;
  city: string;
  scheduledAt: string;
  status: JobStatus;
  technicianId: string | null;
  notes: string;
  lat: number;
  lng: number;
  history: { at: string; text: string }[];
};
