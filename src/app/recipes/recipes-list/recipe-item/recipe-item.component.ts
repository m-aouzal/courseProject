import { Component,Input} from '@angular/core';
import { Recipe } from "../../recipe.model"

import { Router} from '@angular/router';
import { RecipesService } from '../../recipes.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent  {
  @Input() recipe: Recipe = new Recipe();

  isClicked : boolean = false;



  constructor( private router :Router,private recipeService: RecipesService) { }
 

  goToRecipe(recipe:Recipe):void {
    let index = this.recipeService.getRecipeIndex(recipe);
    this.router.navigate(['/recipes',index]);
  }
}
