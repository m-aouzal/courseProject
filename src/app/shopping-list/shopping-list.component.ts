import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscriber, Subscription } from 'rxjs';
import { ComponentsForm } from '../ComponentsForm';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy,ComponentsForm,OnDestroy {

  ingredients: Ingredient[] = [];
  sub: Subscription;
  formDirtySubscription: Subscription;
  isFormDirty: boolean = false;
  constructor(private shoppingListservice: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListservice.getIngredients();
    this.sub = this.shoppingListservice.ingredientAdded.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
    this.formDirtySubscription = this.shoppingListservice.formDirty$.subscribe(dirty => {
      this.isFormDirty = dirty;

    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.formDirtySubscription.unsubscribe();
  }

  onEditIngredient(index: number) {
    this.shoppingListservice.ingredientEdited.next(index);
  }

  verifyChangesAndConfirm(): boolean {
    return !this.isFormDirty || window.confirm('You have unsaved changes. Do you really want to leave?');
  }


}
