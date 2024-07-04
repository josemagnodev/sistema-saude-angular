export interface Agendamento {
    id: number;
    requerimento_id: number;
    data_agendamento: string;
    codigo_local: string;
    cpf_supervisor: string;
    paciente_cpf: string;
    status:number;
}