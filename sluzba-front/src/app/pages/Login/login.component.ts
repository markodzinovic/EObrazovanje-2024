import { Component } from '@angular/core';
import { AuthService } from '../../services';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    console.log(username);
    console.log(password);
    this.authService.login({ username, password }).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Navigate to the dashboard or another page on successful login
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }
}
