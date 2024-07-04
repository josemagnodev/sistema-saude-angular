import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.login(loginData);
    }
  }

  login(loginData: { email: string; password: string }): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.loading = true;
    this.http.post('http://localhost:8000/api/login', loginData, httpOptions)
      .subscribe(
        (response: any) => {
          this.loading = false;
          console.log('Login successful:', response);
          const token = response.token; // Supondo que o token esteja na propriedade 'token'
          localStorage.setItem('authToken', token);
          this.router.navigate(['/home']); // Redireciona para uma rota protegida
        },
        error => {
          this.loading = false;
          console.error('Login error:', error);
          // Tratar o erro de login aqui
        }
      );
  }
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
