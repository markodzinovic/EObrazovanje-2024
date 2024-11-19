import { Component } from '@angular/core';
import { AuthService } from '../../services';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      console.log('Ne radi');
      return;
    }

    const { username, password } = this.loginForm.value;
    console.log(username);
    console.log(password);
    this.authService.login({ username, password }).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed', error.message);
        // Handle error, e.g., show an error message
      },
    });
  }
}
