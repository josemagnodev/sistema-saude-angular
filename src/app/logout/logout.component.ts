// logout.component.ts

import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  showConfirmation = false;

  constructor(private http: HttpClient, private router: Router) {}

  confirmLogout(): void {
    this.showConfirmation = true;
  }

  cancelLogout(): void {
    this.showConfirmation = false;
  }

  logout(): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      })
    };

    this.http.post('http://localhost:8000/api/logout', {}, httpOptions)
      .subscribe(
        response => {
          console.log('Logout successful:', response);
          localStorage.removeItem('authToken');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Logout error:', error);
          // Tratar o erro de logout aqui, se necessário
        }
      );

    this.showConfirmation = false; // Fechar o modal após o logout
  }
}
