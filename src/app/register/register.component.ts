import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = { name: '', email: '', password: '', code:0};
  errorMessage: string | null = null;
  private apiUrl = 'http://localhost:8000/api/register';

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    this.http.post(this.apiUrl, this.user).subscribe(
      response => {
        console.log('User registered successfully', response);
        this.errorMessage = null;
      },
      error => {
        console.error('Registration error', error);
        this.errorMessage = 'Registration failed. Please check your details and try again.';
      }
    );
  }
}
