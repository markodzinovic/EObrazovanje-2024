import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Provide HttpClient

import { routes } from './app.routes';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

//added for show serbian currency
import { registerLocaleData } from '@angular/common';
import localeSr from '@angular/common/locales/sr';
registerLocaleData(localeSr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Register routes
    provideHttpClient(), // Provide HttpClient
    NgbModalModule, // Provide NgbModalModule
    CommonModule, // Provide CommonModule
  ],
};
