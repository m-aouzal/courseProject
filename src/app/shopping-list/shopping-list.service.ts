import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredients: Ingredient[] = [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)];
  ingredientAdded : Subject<Ingredient[]> = new Subject<Ingredient[]>();
  ingredientEdited : Subject<Ingredient>;

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient : Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients);
  }

  addIngredients(ingredients : Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients);
  }

  getIngredient(index : number): Ingredient{
    return this.ingredients[index];
  }

  updateIngredient(ingredient : Ingredient) {
    let index = this.ingredients.findIndex((ingredient) => {
      return ingredient.name === ingredient.name;
    });
    this.ingredients[index] = ingredient;
    this.ingredientAdded.next(this.ingredients);
  }


}
