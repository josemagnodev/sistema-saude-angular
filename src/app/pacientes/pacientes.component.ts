import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
interface Paciente {
  id: number;
  name: string;
  cpf: string;
  cns: string;
  nis: string;
  psf_code: number;
}

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {
  cpfBuscar: string = '';
  pacientes: Paciente[] = [];
  fetched: boolean = false;
  showAddPatientForm = false;
  showUpdatePatientForm = false;
  patientForm!: FormGroup;
  currentPatientId: number | null = null;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.getAllPacientes();
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      cns: ['', Validators.required],
      nis: ['', Validators.required],
      psf_code: [Number, Validators.required]
    });
  }

  getAllPacientes() {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization':'Bearer 9|38n5SfDE1BVhBVv8ZMJfY7r8K0qprnCAcFAYCyIh7f9d26a7'
    //   })
    // };
    this.http.get<Paciente[]>('http://localhost:8000/api/pacientes')
      .subscribe(
        response => {
          this.pacientes = response;
          this.fetched = true;
          console.log('All Pacientes:', this.pacientes);
        },
        error => {
          console.error('Error fetching pacientes:', error);
          this.fetched = false;
          alert('Não foi possivel carregar os pacientes, contate o administrador!!');
        }
      );
  }

  buscarPacientePorCPF() {
    if (!this.cpfBuscar) {
      return;
    }
    console.log(this.cpfBuscar);
    this.http.get<Paciente[]>(`http://localhost:8000/api/paciente-cpf/${this.cpfBuscar}`)
      .subscribe(
        response => {
          this.pacientes = response;
          this.fetched = true;
          console.log('Paciente found:', this.pacientes);
        },
        error => {
          console.error('Error fetching pacientes by CPF:', error);
          this.fetched = false;
        }
      );
  }

  toggleAddPatientForm(): void {
    this.showAddPatientForm = !this.showAddPatientForm;
    this.showUpdatePatientForm = false;
    this.patientForm.reset();
  }

  onAddPatient(): void {
    if (this.patientForm.valid) {
      this.http.post<Paciente>('http://localhost:8000/api/pacientes-create', this.patientForm.value)
        .subscribe(
          response => {
            console.log('Paciente Adicionado!', response);
            this.pacientes.push(response);
            this.patientForm.reset();
            this.showAddPatientForm = false;
          },
          error => {
            if(error.status==403){
              this.router.navigate(['/unauthorized']);
            }
            console.error('Error adding paciente:', error);
          }
        );
    }
  }

  openUpdatePatientForm(paciente: Paciente): void {
    this.currentPatientId = paciente.id;
    this.patientForm.setValue({
      nome: paciente.name,
      cpf: paciente.cpf,
      cns: paciente.cns, // Adicionando cns
      nis: paciente.nis, // Adicionando nis
      psf_code: paciente.psf_code // Adicionando psf_code
    });
    this.showUpdatePatientForm = true;
    this.showAddPatientForm = false;
  }

  onUpdatePatient(): void {
    if (this.patientForm.valid && this.currentPatientId !== null) {
      this.http.put<Paciente>(`http://localhost:8000/api/pacientes-update/${this.currentPatientId}`, this.patientForm.value)
        .subscribe(
          response => {
            console.log('Paciente atualizado!', response);
            const index = this.pacientes.findIndex(p => p.id === this.currentPatientId);
            if (index !== -1) {
              this.pacientes[index] = response;
            }
            this.patientForm.reset();
            this.showUpdatePatientForm = false;
            this.currentPatientId = null;
          },
          error => {
            console.error('Error updating paciente:', error);
          }
        );
    }
  }

  deletePatient(id: number): void {
    this.http.delete(`http://localhost:8000/api/pacientes-delete/${id}`)
      .subscribe(
        response => {
          console.log('Paciente deletado!', response);
          this.pacientes = this.pacientes.filter(p => p.id !== id);
        },
        error => {
          console.error('Error deleting paciente:', error);
        }
      );
  }
}
