// shopping-list.actions.ts
import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const addIngredient = createAction(
  '[shoppingList] addIngredient',
  props<{ ingredient: Ingredient }>()
);
export const addIngredients = createAction(
  '[shoppingList] addIngredients',
  props<{ ingredients: Ingredient[] }>()
);
export const updateIngredient = createAction(
  '[shoppingList] updateIngredient',
  props<{ index:number,ingredient: Ingredient }>()
);
export const deleteIngredient = createAction(
  '[shoppingList] deleteIngredient',
  props<{ index:number }>()
);
export const startEdit = createAction(
  '[shoppingList] startEdit',
  props<{ index:number }>()
);
export const stopEdit = createAction(
  '[shoppingList] stopEdit'
);