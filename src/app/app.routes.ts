import { Routes } from '@angular/router';

export const routes: Routes = [
  //Definiere die Route 'login' für die Login-Komponente
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then((m) => m.RegisterComponent),
  }
];
