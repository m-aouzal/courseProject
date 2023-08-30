import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { InitialStateType } from './shopping-list.reducer';

// Define a feature selector for the shopping list state
export const selectShoppingListState = createFeatureSelector<InitialStateType>('shoppingList');

// Define a selector to get the ingredients from the shopping list state
export const ingredientsSelector = createSelector(
    selectShoppingListState,
    (state: InitialStateType) => state.ingredients
);





