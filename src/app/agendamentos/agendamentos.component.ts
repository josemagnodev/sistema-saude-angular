import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Agendamento } from './agendamento';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.css']
})
export class AgendamentosComponent implements OnInit {
  agendamentoForm!: FormGroup;
  requerimentoId: number | null = null;
  agendamentosFrom: Agendamento[] = [];
  fetched: boolean = false;
  showAddForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idRequerimento = params.get('idRequerimento');
      if (idRequerimento) {
        this.requerimentoId = +idRequerimento;
        this.showAddForm = true;
      } else {
        this.showAddForm = false;
      }
      this.initializeForm();
      this.getAllAgendamentos();
    });
  }

  initializeForm(): void {
    this.agendamentoForm = this.fb.group({
      requerimento_id: [this.requerimentoId, Validators.required],
      data_agendamento: ['', Validators.required],
      codigo_local: ['', Validators.required],
      cpf_supervisor: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      paciente_cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      status: 3
    });
  }

  onAddAgendamento(): void {
    if (this.agendamentoForm.valid) {
      const formData = this.agendamentoForm.value;
      formData.requerimento_id = this.requerimentoId!;
      console.log('Dados do formulário:', formData);

      this.http.post('http://localhost:8000/api/agendamentos-create', formData)
        .subscribe(
          response => {
            console.log('Agendamento adicionado com sucesso!', response);
            this.agendamentoForm.reset();
            this.getAllAgendamentos();
            this.router.navigate(['/requerimentos']);
          },
          error => {
            console.error('Erro ao adicionar agendamento:', error);
          }
        );
    }
  }

  navigateToUpdate(id: number): void {
    this.router.navigate([`/agendamentos/update/${id}`]);
  }

  onDeleteAgendamento(id: number): void {
    this.http.delete(`http://localhost:8000/api/agendamentos-delete/${id}`)
      .subscribe(
        response => {
          console.log('Agendamento deletado com sucesso!', response);
          this.getAllAgendamentos();
        },
        error => {
          console.error('Erro ao deletar agendamento:', error);
        }
      );
  }

  getAllAgendamentos(): void {
    this.http.get<Agendamento[]>('http://localhost:8000/api/agendamentos')
      .subscribe(
        response => {
          this.agendamentosFrom = response.map(req => ({
            ...req,
          }));
          console.log('Todos os Agendamentos:', this.agendamentosFrom);
          this.fetched = true;
        },
        error => {
          console.error('Erro ao buscar todos os agendamentos:', error);
        }
      );
  }
}
