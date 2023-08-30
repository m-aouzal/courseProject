import {createReducer,on } from '@ngrx/store';
import { Ingredient } from "src/app/shared/ingredient.model"
import { addIngredient } from './shopping-list.actions';

// Define the initial state for the shopping list feature so that u can use an empty array of ingredients
export interface InitialStateType {
    ingredients: Ingredient[];
}

const initialState: InitialStateType = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ]
};

 

export const shoppingListReducer = createReducer(
    initialState, 
    on(addIngredient, (state, action) => {
        
        // Return the new state after processing the action
        return {
            ...state,
            ingredients: [...state.ingredients, action.ingredient],
        };
    })
);

    