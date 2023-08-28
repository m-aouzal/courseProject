import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { SharedModule } from './app/shared/shared.module';
import { LoginModule } from './app/login/login.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AuthInterceptorService } from './app/login/auth-interceptor.service';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app/app-routing.module';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, TooltipModule.forRoot(), BsDropdownModule.forRoot(), LoginModule, SharedModule, 
        // ShoppingListModule,
        // RecipesModule,
        AppRoutingModule),
        AppRoutingModule,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
    ]
})
  .catch(err => console.error(err));
