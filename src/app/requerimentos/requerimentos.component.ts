import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Procedimento } from '../procedimentos/procedimento';
import { Requerimento } from './Requerimento';
import { Router } from '@angular/router';

interface Paciente {
  cpf: string;
  nome: string;
}

@Component({
  selector: 'app-requerimentos',
  templateUrl: './requerimentos.component.html',
  styleUrls: ['./requerimentos.component.css']
})
export class RequerimentosComponent implements OnInit {
  requerimentos: Requerimento[] = []; 
  fetched: boolean = false;
  showAddRequerimentoForm = false;
  requerimentoForm!: FormGroup;
  procedimentosCadastrados: Procedimento[] = [];
  requerimentosFrom: Requerimento[] = [];
  procedimentoId!: number;
  currentRequerimentoId: number | null = null; // Adicionado
  pacientes: { [key: string]: Paciente } = {};
  pacientesToAdd: Paciente[] = [];
  procedimentos: { [key: number]: Procedimento } = {};

  // Mapeamento de status
  statusMap: { [key: string]: number } = {
    'Novo': 1,
    'Aguardando': 2,
    'Agendado': 3,
    'Finalizado': 4
  };

  // Mapeamento de nível de urgência
  nivelUrgenciaMap: { [key: string]: number } = {};

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.procedimentoId = +params.get('id')!;
      if (this.procedimentoId) {
        this.getRequerimentosByProcedimentoId(this.procedimentoId);
      } else {
        this.getAllRequerimentos();
      }
    });
    this.getProcedimentosCadastrados();

    this.nivelUrgenciaMap = {
      'Baixo': 1,
      'Moderado': 2,
      'Alto': 3,
      'Urgente': 4
    };

    this.requerimentoForm = this.fb.group({
      nome_requerimento: ['', Validators.required],
      cpf_paciente: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      procedimento_codigo: ['', Validators.required],
      cpf_manager: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      status: ['', Validators.required],
      local_origem_codigo: ['', Validators.required],
      nivel_urgencia: ['', Validators.required]
    });
  }

  getRequerimentosByProcedimentoId(id: number): void {
    this.http.get<Requerimento[]>(`http://localhost:8000/api/requerimentos/procedimento/${id}`)
      .subscribe(
        response => {
          this.requerimentosFrom = response.map(req => ({
            ...req,
            status: this.statusMap[req.status] || req.status // Convertendo status para número
          }));
          // this.getPacientesDetalhes();
          // this.getProcedimentosDetalhes();
          this.fetched = true;
        },
        error => {
          console.error('Error fetching Requerimentos:', error);
        }
      );
  }

  getAllRequerimentos(): void {
    this.http.get<Requerimento[]>('http://localhost:8000/api/requerimentos-all')
      .subscribe(
        response => {
          this.requerimentosFrom = response.map(req => ({
            ...req,
            status: this.statusMap[req.status] || req.status // Convertendo status para número
          }));
          // this.getPacientesDetalhes();
          // this.getProcedimentosDetalhes();
          this.fetched = true;
        },
        error => {
          console.error('Error fetching All Requerimentos:', error);
        }
      );
  }

  getProcedimentosCadastrados(): void {
    this.http.get<Procedimento[]>('http://localhost:8000/api/procedimentos')
      .subscribe(
        response => {
          this.procedimentosCadastrados = response;
          console.log('Procedimentos Cadastrados:', this.procedimentosCadastrados);
        },
        error => {
          console.error('Error fetching procedimentos:', error);
        }
      );
  }

  getPacientes(): void {
    this.http.get<Paciente>('http://localhost:8000/api/pacientes')
      .subscribe(
        response => {
          this.pacientesToAdd.push(response);
        },
        error => {
          console.error('Error fetching pacientes detalhes:', error);
        }
      );
  }

  // getProcedimentosDetalhes(): void {
  //   const procedimentoList = this.requerimentosFrom.map(req => req.procedimento_codigo);
  //   this.http.post<{ [key: number]: Procedimento }>('http://localhost:8000/api/procedimentos-detalhes', { procedimentoList })
  //     .subscribe(
  //       response => {
  //         this.procedimentos = response;
  //       },
  //       error => {
  //         console.error('Error fetching procedimentos detalhes:', error);
  //       }
  //     );
  // }

  toggleAddRequerimentoForm(): void {
    this.showAddRequerimentoForm = !this.showAddRequerimentoForm;
    if (!this.showAddRequerimentoForm) {
      this.currentRequerimentoId = null; // Reset currentRequerimentoId quando o formulário é fechado
      this.requerimentoForm.reset(); // Reseta o formulário
    }
  }

  onAddRequerimento(): void {
    if (this.requerimentoForm.valid) {
      const formValue = this.requerimentoForm.value;
  
      if (this.currentRequerimentoId) {
        this.updateRequerimento(this.currentRequerimentoId);
      } else {
        this.http.post<Requerimento>('http://localhost:8000/api/requerimentos-create', formValue)
          .subscribe(
            response => {
              console.log('Requerimento Adicionado!', response);
              this.getAllRequerimentos(); // Recarrega a lista de requerimentos
              this.requerimentoForm.reset();
              this.showAddRequerimentoForm = false;
            },
            error => {
              if(error.status==403){
                this.router.navigate(['/unauthorized']);
              }
              console.error('Error adding requerimento:', error);
            }
          );
      }
    }
  }

  agendarRequerimento(id: number): void {
    console.log('Agendar requerimento com ID:', id);
    this.http.post<any>('http://localhost:8000/api/agendamentos', { requerimento_id: id })
      .subscribe(
        response => {
          console.log('Agendamento criado com sucesso!', response);
        },
        error => {
          if(error.status==403){
            this.router.navigate(['/unauthorized']);
          }
          console.error('Erro ao criar agendamento:', error);
        }
      );
  }
  
  redirectToAgendamentos(idRequerimento: number): void {
    this.router.navigate(['/agendamentos', idRequerimento]);
  }

  deleteRequerimento(id: number): void {
    if (confirm('Tem certeza que deseja deletar este requerimento?')) {
      this.http.delete(`http://localhost:8000/api/requerimentos-delete/${id}`)
        .subscribe(
          () => {
            console.log('Requerimento deletado com sucesso!');
            this.requerimentosFrom = this.requerimentosFrom.filter(req => req.id !== id);
          },
          error => {
            if(error.status==403){
              this.router.navigate(['/unauthorized']);
            }
            console.error('Erro ao deletar requerimento:', error);
          }
        );
    }
  }

  editRequerimento(requerimento: Requerimento): void {
    this.showAddRequerimentoForm = true;
    this.currentRequerimentoId = requerimento.id;
    this.requerimentoForm.patchValue(requerimento);
  }

  updateRequerimento(id: number): void {
    if (this.requerimentoForm.valid) {
      const formValue = this.requerimentoForm.value;

      this.http.put<Requerimento>(`http://localhost:8000/api/requerimentos-update/${id}`, formValue)
        .subscribe(
          response => {
            console.log('Requerimento atualizado com sucesso!', response);
            this.getAllRequerimentos(); // Recarrega a lista de requerimentos
            this.requerimentoForm.reset();
            this.showAddRequerimentoForm = false;
            this.currentRequerimentoId = null; // Reset currentRequerimentoId após atualização
          },
          error => {
            if(error.status==403){
              this.router.navigate(['/unauthorized']);
            }
            console.error('Erro ao atualizar requerimento:', error);
          }
        );
    }
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  saveRequerimento(): void {
    if (this.requerimentoForm.valid) {
      const formValue = this.requerimentoForm.value;
  
      if (this.currentRequerimentoId) {
        this.updateRequerimento(this.currentRequerimentoId);
      } else {
        this.http.post<Requerimento>('http://localhost:8000/api/requerimentos-create', formValue)
          .subscribe(
            response => {
              console.log('Requerimento Adicionado!', response);
              this.getAllRequerimentos(); // Recarrega a lista de requerimentos
              this.requerimentoForm.reset();
              this.showAddRequerimentoForm = false;
            },
            error => {
              if(error.status==403){
                this.router.navigate(['/unauthorized']);
              }
              console.error('Error adding requerimento:', error);
            }
          );
      }
    }
  }
}
