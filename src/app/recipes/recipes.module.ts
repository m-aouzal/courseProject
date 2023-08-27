import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipeItemComponent } from './recipes-list/recipe-item/recipe-item.component';
import { AdBannerComponent } from '../ads/ad-banner/ad-banner.component';
import { AdDirective } from '../ads/Ads.directive';
import { AdRecipeImageNameComponent } from '../ads/ad-banner/ad-Recipe-Image-Name/ad-Recipe-Image-Name.component';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipeItemComponent,
    AdDirective,
    AdBannerComponent,
    AdRecipeImageNameComponent,
  ],
  imports: [CommonModule, 
    ReactiveFormsModule,
     RouterModule,
     RecipesRoutingModule,
     TooltipModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()],
    exports: [
   
  ],
})
export class RecipesModule {}
