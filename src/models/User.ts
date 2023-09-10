export enum UserRole {
  Adm = "adm",
  Alderman = "vereador",
  TV = "tv",
  Vereador = "vereador",
  Messario = "mesaria",
}

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  funcao: string;
  partido: string;
  rg: string;
  cpf: string;
  titulo_eleitor: string;
  zona_titulo: string;
  telefone: string;
  escolaridade: string;
  data_expedicao_rg: string;
  data_nascimento: string;
  tipo?: string;
  password_confirmation?: string;
  old_password?: string;
  created_at?: string;
  updated_at?: string;
  avatar_url?: string;
}
export interface UserLogin {
  email: string;
  password: string;
}

export const InitialRegisterAlderman: User = {
  name: "",
  email: "",
  password: "",
  funcao: "",
  partido: "",
  rg: "",
  cpf: "",
  titulo_eleitor: "",
  zona_titulo: "",
  telefone: "",
  escolaridade: "",
  data_expedicao_rg: "",
  data_nascimento: "",
  tipo: "",
};

export type AldermanFunctions =
  | ""
  | "Vereador"
  | "Presidente"
  | "Administrador"
  | "Mesário"
  | "Prefeito";

// SELECTIONS VALUES

export const roleOptions = [
  { value: "", label: "Selecionar" },
  { value: "Vereador", label: "Vereador" },
  { value: "Presidente", label: "Presidente" },
  { value: "Administrador", label: "Administrador" },
  { value: "Mesário", label: "Mesário" },
  { value: "Prefeito", label: "Prefeito" },
];

export const typeOptions = [
  { value: "", label: "Selecionar" },
  { value: "vereador", label: "Vereador" },
  { value: "mesaria", label: "Mesaria" },
  { value: "tv", label: "TV" },
];

export const educationOptions = [
  { value: "", label: "Selecionar" },
  {
    value: "Ensino Fundamental Incompleto",
    label: "Ensino Fundamental Incompleto",
  },
  {
    value: "Ensino Fundamental Completo",
    label: "Ensino Fundamental Completo",
  },
  { value: "Ensino Médio Incompleto", label: "Ensino Médio Incompleto" },
  { value: "Ensino Médio Completo", label: "Ensino Médio Completo" },
  {
    value: "Ensino Superior Incompleto",
    label: "Ensino Superior Incompleto",
  },
  { value: "Ensino Superior Completo", label: "Ensino Superior Completo" },
];
