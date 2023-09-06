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
    avatar_url?: string
  }
  export interface UserLogin {
    email: string;
    password: string;
  }
  