// src/app/models/paciente.model.ts

export interface Paciente {
    id: number;
    nome: string;
    cpf: string;
    cns?: string; // Optional fields can be marked with '?'
    is_responsavel_familiar?: boolean;
    cpf_responsavel_familiar?: string;
    cns_responsavel_familiar?: string;
    // Add other fields as per your API response structure
  }
  