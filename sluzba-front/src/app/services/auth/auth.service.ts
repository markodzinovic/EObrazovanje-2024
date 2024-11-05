import { Injectable } from '@angular/core';
import { HttpService } from '../http.service'; // Import the HttpService
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environment/environment';

interface AuthResponse {
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'authToken';
  private isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private httpService: HttpService) {
    // Check if the token exists on initialization
    const token = this.getToken();
    this.isAuthenticatedSubject.next(!!token);
  }

  login(credentials: {
    username: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.httpService
      .post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        catchError((error) => {
          // Handle error as needed (e.g., show message, log out)
          console.error('Login error:', error);
          throw error; // rethrow the error after logging
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
