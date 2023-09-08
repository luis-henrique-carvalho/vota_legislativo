export interface Project {
    id: string;
    sessao_id: string;
    vereador_id: string;
    name: string;
    descricao: string;
    status: string | null; // Altere para o tipo correto, se souber o tipo esperado
    created_at: string;
    updated_at: string;
  }
  