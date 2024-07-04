import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Agendamento } from '../agendamentos/agendamento';

@Component({
  selector: 'app-agendamento-update',
  templateUrl: './agendamento-update.component.html',
  styleUrls: ['./agendamento-update.component.css']
})
export class AgendamentoUpdateComponent implements OnInit {
  agendamentoForm!: FormGroup;
  currentAgendamentoId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.currentAgendamentoId = +id;
        this.getAgendamentoById(this.currentAgendamentoId);
      }
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.agendamentoForm = this.fb.group({
      data_agendamento: ['', Validators.required],
      codigo_local: ['', Validators.required],
      cpf_supervisor: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      paciente_cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]]
    });
  }

  getAgendamentoById(id: number): void {
    this.http.get<Agendamento>(`http://localhost:8000/api/agendamentos-get/${id}`)
      .subscribe(
        response => {
          const dataAgendamento = new Date(response.data_agendamento); // Conversão de data
          this.agendamentoForm.patchValue({
            data_agendamento: dataAgendamento,
            codigo_local: response.codigo_local,
            cpf_supervisor: response.cpf_supervisor,
            paciente_cpf: response.paciente_cpf
          });
        },
        error => {
          console.error('Erro ao buscar agendamento:', error);
        }
      );
  }

  onUpdateAgendamento(): void {
    console.log(this.currentAgendamentoId);
    if (this.agendamentoForm.valid && this.currentAgendamentoId !== null) {
      const formData = this.agendamentoForm.value;
      console.log('Dados do formulário para atualização:', formData, this.currentAgendamentoId);

      this.http.put(`http://localhost:8000/api/agendamentos-update/${this.currentAgendamentoId}`, formData)
        .subscribe(
          response => {
            console.log('Agendamento atualizado com sucesso!', response);
            this.router.navigate(['/agendamentos']);
          },
          error => {
            console.error('Erro ao atualizar agendamento:', error);
          }
        );
    } else {
      console.error('Formulário inválido ou não inicializado.');
    }
  }
}
