import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {TooltipModule} from "ngx-bootstrap/tooltip"
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipeItemComponent } from './recipes/recipes-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropDownDirectiveDirective } from './shared/drop-down.directive.directive';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AdDirective } from './ads/Ads.directive';
import { AdRecipeImageNameComponent } from './ads/ad-banner/ad-Recipe-Image-Name/ad-Recipe-Image-Name.component';


import { AuthInterceptorService } from './login/auth-interceptor.service';
import { AdBannerComponent } from './ads/ad-banner/ad-banner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropDownDirectiveDirective,
    PageNotFoundComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    LoginComponent,
    AlertComponent,
    AdDirective,
    AdBannerComponent,
    AdRecipeImageNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [AppRoutingModule,{provide : HTTP_INTERCEPTORS,useClass :AuthInterceptorService,multi : true  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
