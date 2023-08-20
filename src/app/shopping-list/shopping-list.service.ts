import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredients: Ingredient[] = [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)];
  ingredientAdded : Subject<Ingredient[]> = new Subject<Ingredient[]>();

  getIngredients(){
    return this.ingredients.slice();
  }

  addNewIngredient(ingredient : Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients);
  }

  addIngredients(ingredients : Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients);
  }

}
