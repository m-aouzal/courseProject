import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeItemComponent } from './recipes-list/recipe-item/recipe-item.component';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    
  ],
  imports: [CommonModule, 
    ReactiveFormsModule,
     RouterModule,
     RecipesRoutingModule,
     TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
SharedModule],
    exports: [
   
  ],
})
export class RecipesModule {}
