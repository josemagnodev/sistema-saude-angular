import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// Angular Material modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

// Components
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
//import { TesteloginComponent } from './testelogin/testelogin.component';
import { MenuSecondComponent } from './menu-second/menu-second.component';
import { AgendamentoUpdateComponent } from './agendamento-update/agendamento-update.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';
import { SubmenuFarmaciaComponent } from './submenu-farmacia/submenu-farmacia.component';
import { PsfComponent } from './psf/psf.component';
import { FarmaciaComponent } from './farmacia/farmacia.component';
import { EntregaMedicamentoComponent } from './entrega-medicamento/entrega-medicamento.component';
import { RegisterComponent } from './register/register.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { TesteRegComponent } from './teste-reg/teste-reg.component';
import { ToAproveComponent } from './to-aprove/to-aprove.component';
import { AuthInterceptor } from './auth.interceptor';

// Define routes
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-teste', component: TesteRegComponent },
  { path: 'to-aprove', component: ToAproveComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'modulo-agendamentos', component: MenuSecondComponent, canActivate: [AuthGuard] },
  { path: 'modulo-remedios', component: SubmenuFarmaciaComponent, canActivate: [AuthGuard] },
  { path: 'entrega-medicamento', component: EntregaMedicamentoComponent },
  { path: 'pacientes', component: PacientesComponent, canActivate: [AuthGuard] },
  { path: 'procedimentos', component: ProcedimentosComponent, canActivate: [AuthGuard] },
  { path: 'requerimentos', component: RequerimentosComponent, canActivate: [AuthGuard] },
  { path: 'agendamentos', component: AgendamentosComponent, canActivate: [AuthGuard] },
  { path: 'locais-psf', component: LocaisPSFComponent, canActivate: [AuthGuard] },
  { path: 'locais', component: LocaisProcedimentosComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'requerimentos/:id', component: RequerimentosComponent, canActivate: [AuthGuard] },
  { path: 'agendamentos/:idRequerimento', component: AgendamentosComponent, canActivate: [AuthGuard] },
  { path: 'agendamentos/update/:id', component: AgendamentoUpdateComponent, canActivate: [AuthGuard] },
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
   // TesteloginComponent,
    MenuSecondComponent,
    AgendamentoUpdateComponent,
    LogoutComponent,
    SubmenuFarmaciaComponent,
    PsfComponent,
    FarmaciaComponent,
    EntregaMedicamentoComponent,
    RegisterComponent,
    UnauthorizedComponent,
    TesteRegComponent,
    ToAproveComponent
    // Add any new components here
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatListModule
    // Add any new Angular Material modules here
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard
    // Add any new services/providers here
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
