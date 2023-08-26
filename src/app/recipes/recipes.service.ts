import { Injectable} from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { RecipeDataService } from './recipe-data.service';
import { AdItem } from '../ads/AdItem';
import { AdRecipeImageNameComponent } from '../ads/ad-banner/ad-Recipe-Image-Name/ad-Recipe-Image-Name.component';



@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  

  constructor() { }

  recipeAdded : Subject<Recipe[]> = new Subject<Recipe[]>();
  recipeAdsItems :AdItem[] = [];

  
  private recipes: Recipe[] = [];

  getRecipesAds(recipes : Recipe[]) {
    console.log("get recipes ads")
    for(let recipe of recipes){
      this.recipeAdsItems.push(new AdItem(AdRecipeImageNameComponent,recipe));
    }
    return this.recipeAdsItems;
  }

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
