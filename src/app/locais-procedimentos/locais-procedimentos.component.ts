import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface LocalProcedimento {
  id: number;
  nome: string;
  rua: string;
  cep: string;
  codigo: string;
}

@Component({
  selector: 'app-locais-procedimentos',
  templateUrl: './locais-procedimentos.component.html',
  styleUrls: ['./locais-procedimentos.component.css']
})
export class LocaisProcedimentosComponent implements OnInit {

  locaisProcedimentos: LocalProcedimento[] = [];
  fetched: boolean = false;
  showAddLocalForm = false;
  localForm!: FormGroup;
  currentLocalId?: number;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllLocaisProcedimentos();
    this.localForm = this.fb.group({
      nome: ['', Validators.required],
      rua: ['', Validators.required],
      cep: ['', Validators.required],
      codigo: ['', Validators.required]
    });
  }

  getAllLocaisProcedimentos() {
    this.http.get<LocalProcedimento[]>('http://localhost:8000/api/locais-procedimentos')
      .subscribe(
        response => {
          this.locaisProcedimentos = response;
          this.fetched = true;
          console.log('All Locais de Procedimentos:', this.locaisProcedimentos);
        },
        error => {
          console.error('Error fetching locais de procedimentos:', error);
          this.fetched = false;
        }
      );
  }

  toggleAddLocalForm(): void {
    this.showAddLocalForm = !this.showAddLocalForm;
  }

  onAddLocal(): void {
    if (this.localForm.valid) {
      if (this.currentLocalId) {
        this.updateLocal();
      } else {
        this.addLocal();
      }
    }
  }

  addLocal(): void {
    this.http.post<LocalProcedimento>('http://localhost:8000/api/locais-procedimentos-create', this.localForm.value)
      .subscribe(
        response => {
          console.log('Local de Procedimento Adicionado!', response);
          this.locaisProcedimentos.push(response);
          this.localForm.reset();
          this.showAddLocalForm = false;  // Fechar o formulário após a submissão
        },
        error => {
          console.error('Error adding local de procedimento:', error);
        }
      );
  }

  updateLocal(): void {
    this.http.put<LocalProcedimento>(`http://localhost:8000/api/locais-procedimentos-update/${this.currentLocalId}`, this.localForm.value)
      .subscribe(
        response => {
          console.log('Local de Procedimento Atualizado!', response);
          const index = this.locaisProcedimentos.findIndex(local => local.id === this.currentLocalId);
          if (index !== -1) {
            this.locaisProcedimentos[index] = response;
          }
          this.localForm.reset();
          this.currentLocalId = undefined;
          this.showAddLocalForm = false;
        },
        error => {
          console.error('Error updating local de procedimento:', error);
        }
      );
  }

  editLocal(local: LocalProcedimento): void {
    this.currentLocalId = local.id;
    this.localForm.setValue({
      nome: local.nome,
      rua: local.rua,
      cep: local.cep,
      codigo: local.codigo
    });
    this.showAddLocalForm = true;
  }

  deleteLocal(id: number): void {
    this.http.delete(`http://localhost:8000/api/locais-procedimentos-delete/${id}`)
      .subscribe(
        response => {
          console.log('Local de Procedimento Deletado!', response);
          this.locaisProcedimentos = this.locaisProcedimentos.filter(local => local.id !== id);
        },
        error => {
          console.error('Error deleting local de procedimento:', error);
        }
      );
  }
}
