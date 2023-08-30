import {createReducer,on } from '@ngrx/store';
import { Ingredient } from "src/app/shared/ingredient.model"
import { addIngredient } from './shopping-list.actions';

export interface InitialStateType {
    ingredients: Ingredient[];
}

const initialState: InitialStateType = {
    ingredients: []
};



export const shoppingListReducer = createReducer(
    initialState, 
    on(addIngredient, (state, action) => ({  // Curly braces to define the function body
        ...state, // Spread operator to copy the state
        ingredients: [...state.ingredients, action.ingredient] // Spread operator to copy the ingredients array and add the new ingredient
    })),     
);
    