import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MeetUs } from './pages/meet-us/meet-us';

export const routes: Routes = [
  { 
    path: '', 
    component: Home 
  },
  { 
    path: 'meetus', 
    component: MeetUs
  },{ 
    path: '**', 
    redirectTo: '' 
  }
];