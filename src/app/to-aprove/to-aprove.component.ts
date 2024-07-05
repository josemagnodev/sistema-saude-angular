import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-to-aprove',
  templateUrl: './to-aprove.component.html',
  styleUrls: ['./to-aprove.component.css']
})
export class ToAproveComponent implements OnInit {
  pendingRequests: any[] = [];
  errorMessage: string | null = null;
  displayedColumns: string[] = ['name', 'actions'];
  selectedRequest: any = null; // Para armazenar o pedido selecionado
  formData: any = {}; // Dados do formulário a serem enviados

  private apiUrl = 'http://localhost:8000/api/aprove-index';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPendingRequests();
  }

  getPendingRequests(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data: any[]) => {
        this.pendingRequests = data;
      },
      error => {
        this.errorMessage = 'Erro ao buscar pedidos pendentes. Tente novamente mais tarde.';
        console.error('Erro:', error);
      }
    );
  }

  approveRequest(request: any): void {
    // Preenche os dados do formulário com os dados do pedido selecionado
    this.selectedRequest = {
      ...request,
      code: '', // Valor inicial para o código, pode ser alterado pelo administrador
      psf_code: '' // Valor inicial para o código PSF, pode ser alterado pelo administrador
    };

    // Atualiza o formulário com os dados do pedido selecionado
    this.formData = {
      ...request,
      code: '',
      psf_code: '',
    };
  }

  submitForm(): void {
    this.formData.code = Number(this.formData.code);
    this.formData.psf_code = Number(this.formData.psf_code);
    // Envie o formulário para o backend
    const url = `http://localhost:8000/api/register`;
    console.log(this.formData);
    this.http.post(url, this.formData).subscribe(
      response => {
        console.log(response);
        this.formData = {};
        this.selectedRequest = null;
        this.getPendingRequests();
      },
      error => {
        console.error('Erro ao enviar formulário:', error);
        // Trate o erro adequadamente, se necessário
      }
    );
  }

  deleteToAprove(id: number): void {
    const url = `http://localhost:8000/api/to-aprove/${id}/delete`;
    this.http.delete(url).subscribe(
      response => {
        console.log(response);
        this.getPendingRequests();
      },
      error => {
        console.error('Erro ao excluir pedido:', error);
        // Trate o erro adequadamente, se necessário
      }
    );
  }
}
