import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-teste-reg',
  templateUrl: './teste-reg.component.html',
  styleUrl: './teste-reg.component.css'
})
export class TesteRegComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:8000/api/to-aprove', this.user).subscribe(
      (response: any) => {
        console.log('Registrado com sucesso:', response);
        this.router.navigate(['/login']); // Redirecione para uma página de sucesso ou outra ação desejada
      },
      (error: any) => {
        console.error('Erro ao registrar:', error);
        this.errorMessage = 'Erro ao registrar. Tente novamente mais tarde.';
      }
    );
  }
}
