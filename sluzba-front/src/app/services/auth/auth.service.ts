import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environment/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'authToken';
  private isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private httpService: HttpClient) {
    // Check if the token exists on initialization
    const token = this.getToken();
    this.isAuthenticatedSubject.next(!!token);
  }

  login(credentials: {
    username: string;
    password: string;
  }): Observable<string> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpService
      .post(`${this.apiUrl}/login`, credentials, {
        headers,
        responseType: 'text', // Tell Angular to expect a plain text response
      })
      .pipe(
        tap((token: string) => {
          this.storeToken(token); // Save the token locally
          this.isAuthenticatedSubject.next(true);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Login error', error);
          return throwError(() => error);
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
