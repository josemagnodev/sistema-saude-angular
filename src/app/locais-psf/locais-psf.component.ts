import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface LocalPsf {
  id: number;
  nome: string;
  codigo: string;
  endereco: string;
  cidade: string;
  estado: string;
  telefone?: string;
}

@Component({
  selector: 'app-locais-psf',
  templateUrl: './locais-psf.component.html',
  styleUrls: ['./locais-psf.component.css']
})
export class LocaisPSFComponent implements OnInit {

  locaisProcedimentos: LocalPsf[] = [];
  fetched: boolean = false;
  showAddLocalForm = false;
  localForm!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllLocaisPSF();
    this.localForm = this.fb.group({
      nome: ['', Validators.required],
      codigo: ['', Validators.required],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      telefone: ['']
    });
  }

  getAllLocaisPSF() {
    this.http.get<LocalPsf[]>('http://localhost:8000/api/local-psf')
      .subscribe(
        response => {
          this.locaisProcedimentos = response;
          this.fetched = true;
          console.log('All Locais de PSF:', this.locaisProcedimentos);
        },
        error => {
          console.error('Error fetching locais PSF:', error);
          this.fetched = false;
        }
      );
  }

  toggleAddLocalForm(): void {
    this.showAddLocalForm = !this.showAddLocalForm;
  }

  onAddLocal(): void {
    if (this.localForm.valid) {
      this.http.post<LocalPsf>('http://localhost:8000/api/local-psf', this.localForm.value)
        .subscribe(
          response => {
            console.log('Local PSF Adicionado!', response);
            this.locaisProcedimentos.push(response);
            this.localForm.reset();
            this.showAddLocalForm = false;  // Fechar o formulário após a submissão
          },
          error => {
            console.error('Error adding local PSF:', error);
          }
        );
    }
  }
}
