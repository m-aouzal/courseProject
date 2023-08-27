import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  id: number = 0;
  recipe: Recipe = new Recipe('', '', '', []);

  constructor(private shlService: ShoppingListService,
     private recipeService: RecipesService,
      private route: ActivatedRoute,
      private router : Router) {}

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
    this.shlService.addIngredients(this.recipe.ingredients);
  }
  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}
