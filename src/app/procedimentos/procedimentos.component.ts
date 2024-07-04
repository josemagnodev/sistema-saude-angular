import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Procedimento } from './procedimento'; // Ensure the correct path

@Component({
  selector: 'app-procedimentos',
  templateUrl: './procedimentos.component.html',
  styleUrls: ['./procedimentos.component.css']
})
export class ProcedimentosComponent implements OnInit {
  procedimentos: Procedimento[] = [];
  fetched: boolean = false;
  showAddProcedureForm = false;
  showUpdateProcedureForm = false;
  procedureForm!: FormGroup;
  currentProcedureId: number | null = null;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.getAllProcedimentos();
    this.procedureForm = this.fb.group({
      nome: ['', Validators.required],
      tipo_procedimento: ['', Validators.required],
      codigo: ['', Validators.required]
    });
  }

  getAllProcedimentos() {
    this.http.get<Procedimento[]>('http://localhost:8000/api/procedimentos')
      .subscribe(
        response => {
          this.procedimentos = response;
          this.fetched = true;
          console.log('All Procedimentos:', this.procedimentos);
        },
        error => {
          console.error('Error fetching procedimentos:', error);
          this.fetched = false;
        }
      );
  }

  toggleAddProcedureForm(): void {
    this.showAddProcedureForm = !this.showAddProcedureForm;
    this.showUpdateProcedureForm = false;
    this.procedureForm.reset();
  }

  onAddProcedure(): void {
    if (this.procedureForm.valid) {
      this.http.post<Procedimento>('http://localhost:8000/api/procedimentos-create', this.procedureForm.value)
        .subscribe(
          response => {
            console.log('Procedimento Adicionado!', response);
            this.procedimentos.push(response);
            this.procedureForm.reset();
            this.showAddProcedureForm = false;
          },
          error  => {
            if(error.status==403){
              this.router.navigate(['/unauthorized']);
            }
            console.error('Error adding procedimento:', error);
          }
        );
    }
  }

  openUpdateProcedureForm(procedimento: Procedimento): void {
    this.currentProcedureId = procedimento.id;
    this.procedureForm.setValue({
      nome: procedimento.nome,
      tipo_procedimento: procedimento.tipo_procedimento,
      codigo: procedimento.codigo
    });
    this.showUpdateProcedureForm = true;
    this.showAddProcedureForm = false;
  }

  onUpdateProcedure(): void {
    if (this.procedureForm.valid && this.currentProcedureId !== null) {
      this.http.put<Procedimento>(`http://localhost:8000/api/procedimentos-update/${this.currentProcedureId}`, this.procedureForm.value)
        .subscribe(
          response => {
            console.log('Procedimento atualizado!', response);
            const index = this.procedimentos.findIndex(p => p.id === this.currentProcedureId);
            if (index !== -1) {
              this.procedimentos[index] = response;
            }
            this.procedureForm.reset();
            this.showUpdateProcedureForm = false;
            this.currentProcedureId = null;
          },
          error => {
            if(error.status==403){
              this.router.navigate(['/unauthorized']);
            }
            console.error('Error updating procedimento:', error);
          }
        );
    }
  }

  deleteProcedure(id: number): void {
    this.http.delete(`http://localhost:8000/api/procedimentos-delete/${id}`)
      .subscribe(
        response => {
          console.log('Procedimento deletado!', response);
          this.procedimentos = this.procedimentos.filter(p => p.id !== id);
        },
        error => {
          if(error.status==403){
            this.router.navigate(['/unauthorized']);
          }
          console.error('Error deleting procedimento:', error);
        }
      );
  }

  getTipoProcedimentoLabel(tipo_procedimento: number): string {
    switch (tipo_procedimento) {
      case 1:
        return 'Exame';
      case 2:
        return 'Consulta';
      case 3:
        return 'Procedimento';
      default:
        return 'Tipo Desconhecido';
    }
  }
  showRequerimentos(procedimentoId: number): void {
    this.router.navigate(['/requerimentos', procedimentoId]);
  }
}
