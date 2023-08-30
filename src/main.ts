import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AuthInterceptorService } from './app/login/auth-interceptor.service';
import { PreloadAllModules, withPreloading } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, TooltipModule.forRoot(), BsDropdownModule.forRoot()),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true,
    },
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore(),
    provideEffects()
],
}).catch((err) => console.error(err));
