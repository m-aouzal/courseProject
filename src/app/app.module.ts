import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {TooltipModule} from "ngx-bootstrap/tooltip"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { DropDownDirectiveDirective } from './shared/drop-down.directive.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



import { AuthInterceptorService } from './login/auth-interceptor.service';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropDownDirectiveDirective,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    LoginModule,
    SharedModule,
    ShoppingListModule,
    RecipesModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [AppRoutingModule,{provide : HTTP_INTERCEPTORS,useClass :AuthInterceptorService,multi : true  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
