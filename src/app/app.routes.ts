import { Routes } from '@angular/router';
import { MeetUs } from './pages/meet-us/meet-us';
// Importa también tu componente principal o de inicio (ej. HomeComponent o AppComponent según tu estructura)

export const routes: Routes = [
  { 
    path: 'meetus', 
    component: MeetUs 
  },
  { 
    path: '', 
    loadComponent: () => import('./app').then(m => m.AppComponent) // o tu componente de inicio
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];