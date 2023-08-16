import { Injectable,EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor() { }

  recipeSelected = new EventEmitter<Recipe>();
  
  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is first simply a test', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',[{name:'Meat',amount:1},{name:'French Fries',amount:20}]),
    new Recipe('A Test Recipe', 'This is second simply a test', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',[{name:'coke',amount:1},{name:'shipFries',amount:20}])
  ];

  getRecipes(){
    return this.recipes.slice();
  }


  
}
