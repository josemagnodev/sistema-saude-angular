// Import necessary Angular modules
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import both FormsModule and ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule for making HTTP requests
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes for routing

// Import Angular Material modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
// Import other necessary Angular Material modules as needed

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

// Import your components and services
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { ProcedimentosComponent } from './procedimentos/procedimentos.component';
import { RequerimentosComponent } from './requerimentos/requerimentos.component';
import { LoginComponent } from './login/login.component';
import { AgendamentosComponent } from './agendamentos/agendamentos.component';
import { LocaisProcedimentosComponent } from './locais-procedimentos/locais-procedimentos.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LocaisPSFComponent } from './locais-psf/locais-psf.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminComponent } from './pages/admin/admin.component';
import { TesteloginComponent } from './testelogin/testelogin.component';
import { MenuSecondComponent } from './menu-second/menu-second.component';
import { AgendamentoUpdateComponent } from './agendamento-update/agendamento-update.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { SubmenuFarmaciaComponent } from './submenu-farmacia/submenu-farmacia.component';
import { PsfComponent } from './psf/psf.component';
import { FarmaciaComponent } from './farmacia/farmacia.component';
import { EntregaMedicamentoComponent } from './entrega-medicamento/entrega-medicamento.component';
import { RegisterComponent } from './register/register.component'; // Import the AuthGuard
import { MatSpinner } from '@angular/material/progress-spinner';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

// Define routes
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]}, // problema aqui
  { path: 'unauthorized', component: UnauthorizedComponent, canActivate: [AuthGuard]}, // problema aqui
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'modulo-agendamentos', component: MenuSecondComponent, canActivate: [AuthGuard] }, // Protect this route
  { path: 'modulo-remedios', component: SubmenuFarmaciaComponent, canActivate: [AuthGuard] }, // Protect this route
  //{ path: 'delivery-med', component: EntregaMedicamentoComponent, canActivate: [AuthGuard] },
  { path: 'entrega-medicamento', component: EntregaMedicamentoComponent },
  { path: 'pacientes', component: PacientesComponent, canActivate: [AuthGuard] }, // Protect this route
  { path: 'procedimentos', component: ProcedimentosComponent, canActivate: [AuthGuard] }, // Protect this route
  { path: 'requerimentos', component: RequerimentosComponent, canActivate: [AuthGuard] }, // Protect this route
  { path: 'agendamentos', component: AgendamentosComponent, canActivate: [AuthGuard] }, // Protect this route
  { path: 'locais-psf', component: LocaisPSFComponent, canActivate: [AuthGuard] }, // Protect this route
  { path: 'locais', component: LocaisProcedimentosComponent, canActivate: [AuthGuard] }, // Protect this route
  { path: 'login', component: LoginComponent },
  { path: 'requerimentos/:id', component: RequerimentosComponent, canActivate: [AuthGuard] }, // Protect this route
  { path: 'agendamentos/:idRequerimento', component: AgendamentosComponent, canActivate: [AuthGuard] }, // Protect this route
  { path: 'agendamentos/update/:id', component: AgendamentoUpdateComponent, canActivate: [AuthGuard] }, // Protect this route
  { path: 'psf', component: PsfComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PacientesComponent,
    ProcedimentosComponent,
    RequerimentosComponent,
    LoginComponent,
    AgendamentosComponent,
    LocaisProcedimentosComponent,
    NavbarComponent,
    FooterComponent,
    LocaisPSFComponent,
    SignupComponent,
    AdminComponent,
    TesteloginComponent,
    MenuSecondComponent,
    AgendamentoUpdateComponent,
    LogoutComponent,
    SubmenuFarmaciaComponent,
    PsfComponent,
    FarmaciaComponent,
    EntregaMedicamentoComponent,
    RegisterComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule to handle forms and ngModel
    ReactiveFormsModule, // Add ReactiveFormsModule for reactive forms
    HttpClientModule, // Add HttpClientModule for making HTTP requests
    RouterModule.forRoot(routes), // Add RouterModule with routes configuration

    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,

    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatSpinner
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
