// shopping-list.actions.ts
import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

export const addIngredient = createAction(
  '[shoppingList] addIngredient',
  props<{ ingredient: Ingredient }>()
);
