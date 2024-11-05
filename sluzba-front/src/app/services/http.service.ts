// src/app/services/http.service.ts
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface IHttpService {
  get<TResponse>(
    url: string,
    config?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<TResponse>;
  post<TResponse>(
    url: string,
    body: any,
    config?: { headers?: HttpHeaders }
  ): Observable<TResponse>;
  put<TResponse>(
    url: string,
    body: any,
    config?: { headers?: HttpHeaders }
  ): Observable<TResponse>;
  delete(url: string, config?: { headers?: HttpHeaders }): Observable<void>;
}

@Injectable({
  providedIn: 'root', // This makes the service available throughout the application
})
export class HttpService implements IHttpService {
  constructor(private http: HttpClient) {}

  get<TResponse>(
    url: string,
    config?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<TResponse> {
    return this.http
      .get<TResponse>(url, config)
      .pipe(map(this.onSuccess), catchError(this.onError));
  }

  post<TResponse>(
    url: string,
    body: any,
    config?: { headers?: HttpHeaders }
  ): Observable<TResponse> {
    return this.http
      .post<TResponse>(url, body, config)
      .pipe(map(this.onSuccess), catchError(this.onError));
  }

  put<TResponse>(
    url: string,
    body: any,
    config?: { headers?: HttpHeaders }
  ): Observable<TResponse> {
    return this.http
      .put<TResponse>(url, body, config)
      .pipe(map(this.onSuccess), catchError(this.onError));
  }

  delete(url: string, config?: { headers?: HttpHeaders }): Observable<void> {
    return this.http
      .delete<void>(url, config)
      .pipe(map(this.onSuccess), catchError(this.onError));
  }

  private onSuccess<T>(response: T): T {
    return response; // Angular's HttpClient automatically handles response transformation
  }

  private onError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      const errors: { [key: number]: string } = {
        400: 'Request is not good',
        403: 'You do not have permission for that',
        404: 'Not found',
        408: 'Timeout',
        500: 'Server error',
      };
      errorMessage = errors[error.status] || 'An unknown error occurred';
    }
    return throwError(errorMessage); // Use RxJS throwError to return an observable error
  }
}
