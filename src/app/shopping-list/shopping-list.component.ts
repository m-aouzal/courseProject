import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscriber, Subscription,Observable } from 'rxjs';
import { ComponentsForm } from '../ComponentsForm';
import { AsyncPipe, NgFor } from '@angular/common';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Store } from '@ngrx/store';
import { State } from './store/shopping-list.reducer';
import { ingredientsSelector } from './store/shopping-list.selectors';
import { startEdit } from './store/shopping-list.actions';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
    standalone: true,
    imports: [ShoppingEditComponent, NgFor,AsyncPipe]
})
export class ShoppingListComponent implements OnInit, OnDestroy,ComponentsForm,OnDestroy {

  ingredients: Ingredient[] = [];
  ingredients$ : Observable< Ingredient[]>;
  sub: Subscription;
  formDirtySubscription: Subscription;
  isFormDirty: boolean = false;
  constructor(private shoppingListservice: ShoppingListService,
    private store:Store<{shoppingList :State}>) { }

  ngOnInit(): void {
    
    this.ingredients$ = this.store.select(ingredientsSelector);

    // this.ingredients = this.shoppingListservice.getIngredients();
    // this.sub = this.shoppingListservice.ingredientAdded.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    // })
    this.formDirtySubscription = this.shoppingListservice.formDirty$.subscribe(dirty => {
      this.isFormDirty = dirty;

   });

  }

  ngOnDestroy(): void {
   // this.sub.unsubscribe();
    this.formDirtySubscription.unsubscribe();
  }

  onEditIngredient(index: number) {
   //this.shoppingListservice.ingredientEdited.next(index);
   this.store.dispatch(startEdit({index}));
  }

  verifyChangesAndConfirm(): boolean {
    return !this.isFormDirty || window.confirm('You have unsaved changes. Do you really want to leave?');
  }


}
