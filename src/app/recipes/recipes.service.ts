import { Injectable} from '@angular/core';
import { Recipe } from './recipe.model';



@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor() { }

  
  private recipes: Recipe[] = [
    new Recipe(1,'A Test Recipe', 'This is first simply a test', 'https://thumbs.dreamstime.com/z/kouskous-109551605.jpg?w=992',[{name:'Meat',amount:1},{name:'French Fries',amount:20}]),
    new Recipe(2,'A Test Recipe', 'This is second simply a test', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',[{name:'coke',amount:1},{name:'shipFries',amount:20}])
  ];

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipeById(id:number):Recipe {
    return this.recipes.find(recipe=>recipe.id==id);
  }

  updateRecipe(id:number, recipe:Recipe){
    this.recipes[id] = recipe;
  }

  createRecipe(recipe:  Recipe):void {
    this.recipes.push(recipe);
  }
  
 



  
}
