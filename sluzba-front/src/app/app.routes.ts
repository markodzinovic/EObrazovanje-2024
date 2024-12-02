import { Routes } from '@angular/router';
import { LoginComponent, TeachersComponent } from './pages';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'teachers', component: TeachersComponent },
];
