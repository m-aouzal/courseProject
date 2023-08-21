import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscriber, Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  sub: Subscription;
  constructor(private shoppingListservice: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListservice.getIngredients();
    this.sub = this.shoppingListservice.ingredientAdded.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onEditIngredient(index: number) {
    this.shoppingListservice.ingredientEdited.next(index);
  }

}
