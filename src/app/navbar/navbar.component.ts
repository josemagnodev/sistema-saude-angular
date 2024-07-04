import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}

  shouldDisplayNavbar(): boolean {
    const currentUrl = this.router.url;
    return !['/', '/login','/register'].includes(currentUrl); // Retorna true se a rota não for "/" ou "/login"
  }
}
