export interface Requerimento {
    id: number;
    nome_requerimento: string;
    cpf_paciente: string;
    procedimento_codigo: number;
    cpf_manager: string;
    status: number;
    local_origem_codigo: string;
    nivel_urgencia: number;
  }