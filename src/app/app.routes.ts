import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MeetUs } from './pages/meet-us/meet-us';
import { ContactUs } from './pages/contactus/contactus';

export const routes: Routes = [
  { 
    path: '', 
    component: Home 
  },
  { 
    path: 'meetus', 
    component: MeetUs
  },
  { 
    path: 'contacto', 
    component: ContactUs 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];