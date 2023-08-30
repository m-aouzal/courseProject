import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import * as fromAppStore from '../../store/appStore.reducer';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions'


@Component({
    selector: 'app-recipes-detail',
    templateUrl: './recipes-detail.component.html',
    styleUrls: ['./recipes-detail.component.css'],
    standalone: true,
    imports: [BsDropdownModule, RouterLink, NgFor]
})
export class RecipesDetailComponent implements OnInit {
  id: number = 0;
  recipe: Recipe = new Recipe('', '', '', []);

  constructor(private shlService: ShoppingListService,
     private recipeService: RecipesService,
      private route: ActivatedRoute,
      private router : Router,
      private store:Store<fromAppStore.AppState>) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      
      this.id = +params['id']; // Convert id to a number using + operator
      if (!isNaN(this.id) && this.recipeService.getRecipeById(this.id)){
        this.recipe = this.recipeService.getRecipeById(this.id);
      }
      else {
        this.router.navigate(['/page-not-found']);
      }
    
    });
  }

  toShoppingList() {
    //this.shlService.addIngredients(this.recipe.ingredients);
    this.store.dispatch(shoppingListActions.addIngredients({ingredients:this.recipe.ingredients}));
  }
  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}
