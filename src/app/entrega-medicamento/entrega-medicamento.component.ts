import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-entrega-medicamento',
  templateUrl: './entrega-medicamento.component.html',
  styleUrls: ['./entrega-medicamento.component.css']
})
export class EntregaMedicamentoComponent implements OnInit {
  entregaForm!: FormGroup;
  medicamentoForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  showMedicamentos: boolean = false;
  entregaId!: number;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.entregaForm = this.fb.group({
      paciente_cpf: ['', [Validators.required, Validators.maxLength(14)]],
      farmacia_code: ['', [Validators.required, Validators.maxLength(12)]]
    });

    this.initMedicamentoForm();
  }

  initMedicamentoForm() {
    this.medicamentoForm = this.fb.group({
      medicamentos: this.fb.array([this.createMedicamento()])
    });
  }

  createMedicamento(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required]
    });
  }

  medicamentos(): FormArray {
    return this.medicamentoForm.get('medicamentos') as FormArray;
  }

  addMedicamento() {
    this.medicamentos().push(this.createMedicamento());
  }

  removeMedicamento(index: number) {
    this.medicamentos().removeAt(index);
  }

  onSubmit() {
    if (this.entregaForm.valid) {
      this.http.post('http://localhost:8000/api/entrega-medicacao', this.entregaForm.value).subscribe({
        next: (response: any) => {
          //this.successMessage = 'Medicação entregue com sucesso!';
          this.errorMessage = '';
          this.showMedicamentos = true;
          this.entregaId = response.id;  // Assumindo que o backend retorna o ID da entrega criada
        },
        error: (error) => {
          this.errorMessage = 'Erro ao entregar medicação. Tente novamente.';
          this.successMessage = '';
        }
      });
    }
  }

  onSubmitMedicamento() {
    if (this.medicamentoForm.valid) {
      const medicamentosData = this.medicamentoForm.value.medicamentos.map((med: { nome: any; }) => ({
        entrega_id: this.entregaId,  // Inclui o ID da entrega na solicitação
        nome: med.nome
      }));
      this.http.post('/api/medicamentos', medicamentosData).subscribe({
        next: () => {
          this.successMessage = 'Medicamentos adicionados com sucesso!';
          this.errorMessage = '';
          this.medicamentoForm.reset();
          this.addMedicamento();  // Adiciona um campo para um novo medicamento após o reset
        },
        error: () => {
          this.errorMessage = 'Erro ao adicionar medicamentos. Tente novamente.';
          this.successMessage = '';
        }
      });
    }
  }
}
