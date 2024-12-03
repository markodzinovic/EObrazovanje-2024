import { Routes } from '@angular/router';
import { LoginComponent, StudentComponent, TeachersComponent } from './pages';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'students', component: StudentComponent },
];
