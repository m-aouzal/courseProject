import { Injectable} from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { RecipeDataService } from './recipe-data.service';



@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  

  constructor() { }

  recipeAdded : Subject<Recipe[]> = new Subject<Recipe[]>();

  
  private recipes: Recipe[] = [];

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipeById(index:number):Recipe {
    return this.recipes[index]
  }

  getRecipeIndex(recipe:Recipe):number {
    return this.recipes.indexOf(recipe);
  }

  updateRecipe(id:number, recipe:Recipe){
    this.recipes[id] = recipe;
    this.recipeAdded.next(this.recipes.slice());
  }

  createRecipe(recipe:  Recipe):void {
    this.recipes.push(recipe);
    this.recipeAdded.next(this.recipes.slice());
  }

  deleteRecipe(index:number):void {
    this.recipes.splice(index,1);
    this.recipeAdded.next(this.recipes.slice());
  }
  
 

  SetData(recipes : Recipe[]): void {
    this.recipes = recipes;
    this.recipeAdded.next(recipes);
  }

  



  
}
