import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {

  ingredients: Ingredient[] = [];

  constructor(private shoppingListservice:ShoppingListService ) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListservice.getIngredients();
    this.shoppingListservice.ingredientAdded.subscribe((ingredients:Ingredient[])=>{
      this.ingredients = ingredients;
    })
  }

  
}
