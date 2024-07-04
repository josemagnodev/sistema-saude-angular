import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './testelogin.component.html',
  styleUrls: ['./testelogin.component.css']
})
export class TesteloginComponent {

  constructor(private http: HttpClient) {}

  testLogin() {
    const loginData = {
      email: 'john.doe@example.com',
      password: 'password123' // Use o password correto para o usuário
    };
    //meu token
    // '9|38n5SfDE1BVhBVv8ZMJfY7r8K0qprnCAcFAYCyIh7f9d26a7'
    // Definindo o cabeçalho Content-Type como application/json
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post('http://localhost:8000/api/login', loginData, httpOptions)
      .subscribe(
        response => {
          console.log('Login successful:', response);
          // Tratar a resposta do login aqui
        },
        error => {
          console.error('Login error:', error);
          // Tratar o erro de login aqui
        }
      );
  }
  callEndpoint(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':'Bearer 9|38n5SfDE1BVhBVv8ZMJfY7r8K0qprnCAcFAYCyIh7f9d26a7'
      })
    };
    this.http.get('http://localhost:8000/api/teste', httpOptions)
    .subscribe(
      response => {
        console.log('Response', response);
        // Tratar a resposta do login aqui
      },
      error => {
        console.error('Response:', error);
        // Tratar o erro de login aqui
      }
    );
  }

callEndpointwithout(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  this.http.get('http://localhost:8000/api/teste1', httpOptions)
  .subscribe(
    response => {
      console.log('Response', response);
      // Tratar a resposta do login aqui
    },
    error => {
      console.error('Response:', error);
      // Tratar o erro de login aqui
    }
  );
}
  register() {
    const registerData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123' // Use a senha desejada para o registro
    };

    // Definindo o cabeçalho Content-Type como application/json
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post('http://localhost:8000/api/register', registerData, httpOptions)
      .subscribe(
        response => {
          console.log('Registro bem-sucedido:', response);
          // Tratar a resposta do registro aqui
        },
        error => {
          console.error('Erro de registro:', error);
          // Tratar o erro de registro aqui
        }
      );
  }
}
