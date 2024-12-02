import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Provide HttpClient

import { routes } from './app.routes';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Register routes
    provideHttpClient(), // Provide HttpClient
    NgbModalModule, // Provide NgbModalModule
    CommonModule, // Provide CommonModule
  ],
};
