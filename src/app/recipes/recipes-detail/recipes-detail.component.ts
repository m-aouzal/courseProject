import { Component, Input } from '@angular/core';
import {Recipe} from '../recipe.model'
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent {
  @Input("recipe") recipe : Recipe = new Recipe(null,null,null,null);
  
  constructor(private shlService :ShoppingListService) { }

  toShoppingList(){
    this.shlService.addIngredients(this.recipe.ingredients);
  }
}
