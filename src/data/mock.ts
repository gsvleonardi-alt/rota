import type { Job, Technician, User } from "../types";

/** Senha única de demonstração — apenas para o MVP local. */
export const DEMO_PASSWORD = "123456";

export const USERS: User[] = [
  {
    id: "u-gestor",
    name: "Marina Costa",
    email: "gestor@rota.app",
    role: "gestor",
  },
  {
    id: "u-tec-1",
    name: "Carlos Mendes",
    email: "tecnico@rota.app",
    role: "tecnico",
    technicianId: "t1",
  },
];

export const TECHNICIANS: Technician[] = [
  {
    id: "t1",
    name: "Carlos Mendes",
    specialty: "Ar-condicionado",
    phone: "11987654321",
    lat: -23.5614,
    lng: -46.656,
    online: true,
  },
  {
    id: "t2",
    name: "Ana Souza",
    specialty: "Elétrica",
    phone: "11976543210",
    lat: -23.5505,
    lng: -46.6333,
    online: true,
  },
  {
    id: "t3",
    name: "João Ribeiro",
    specialty: "Hidráulica",
    phone: "11965432109",
    lat: -23.5733,
    lng: -46.6417,
    online: false,
  },
];

const today = new Date();
const at = (hours: number, minutes = 0) => {
  const d = new Date(today);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
};

export const INITIAL_JOBS: Job[] = [
  {
    id: "os-1042",
    title: "Manutenção preventiva de split",
    clientName: "Padaria São Jorge",
    clientPhone: "11988887777",
    address: "Rua Augusta, 1200",
    neighborhood: "Consolação",
    city: "São Paulo",
    scheduledAt: at(9, 0),
    status: "em_andamento",
    technicianId: "t1",
    notes: "Unidade da cozinha está pingando. Cliente prefere atendimento pela manhã.",
    lat: -23.5558,
    lng: -46.661,
    history: [
      { at: at(8, 10), text: "Serviço atribuído a Carlos Mendes." },
      { at: at(8, 45), text: "Técnico a caminho." },
      { at: at(9, 5), text: "Atendimento iniciado." },
    ],
  },
  {
    id: "os-1043",
    title: "Instalação de quadro elétrico",
    clientName: "Clínica Vida Leve",
    clientPhone: "11977776666",
    address: "Av. Paulista, 900",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    scheduledAt: at(11, 30),
    status: "a_caminho",
    technicianId: "t2",
    notes: "Levar disjuntores extras. Portaria pede documento.",
    lat: -23.5651,
    lng: -46.651,
    history: [
      { at: at(8, 0), text: "Serviço atribuído a Ana Souza." },
      { at: at(10, 50), text: "Técnica saiu para o endereço." },
    ],
  },
  {
    id: "os-1044",
    title: "Vazamento no banheiro",
    clientName: "Residencial Oliveira",
    clientPhone: "11966665555",
    address: "Rua dos Pinheiros, 412",
    neighborhood: "Pinheiros",
    city: "São Paulo",
    scheduledAt: at(14, 0),
    status: "pendente",
    technicianId: "t3",
    notes: "Cliente informou que já fechou o registro do ramal.",
    lat: -23.5678,
    lng: -46.683,
    history: [{ at: at(7, 40), text: "OS criada pelo gestor." }],
  },
  {
    id: "os-1045",
    title: "Troca de condensadora",
    clientName: "Escritório Norte Sul",
    clientPhone: "11955554444",
    address: "Rua da Consolação, 2100",
    neighborhood: "Consolação",
    city: "São Paulo",
    scheduledAt: at(16, 0),
    status: "pendente",
    technicianId: "t1",
    notes: "Acesso pela garagem. Levar escada.",
    lat: -23.553,
    lng: -46.6625,
    history: [{ at: at(7, 55), text: "Serviço atribuído a Carlos Mendes." }],
  },
  {
    id: "os-1038",
    title: "Revisão de chuveiro e registro",
    clientName: "Apt. 72 — Ed. Harmonia",
    clientPhone: "11944443333",
    address: "Rua Haddock Lobo, 500",
    neighborhood: "Cerqueira César",
    city: "São Paulo",
    scheduledAt: at(8, 0),
    status: "concluido",
    technicianId: "t3",
    notes: "Serviço concluído no período da manhã.",
    lat: -23.561,
    lng: -46.668,
    history: [
      { at: at(7, 20), text: "Técnico a caminho." },
      { at: at(8, 5), text: "Atendimento iniciado." },
      { at: at(8, 50), text: "Serviço concluído. Cliente avisado no WhatsApp." },
    ],
  },
];
