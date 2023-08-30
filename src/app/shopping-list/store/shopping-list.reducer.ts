import {createReducer,on } from '@ngrx/store';
import { Ingredient } from "src/app/shared/ingredient.model"
import { addIngredient } from './shopping-list.actions';
import { addIngredients } from 'src/app/shopping-list/store/shopping-list.actions';
import { updateIngredient } from 'src/app/shopping-list/store/shopping-list.actions';
import { deleteIngredient } from 'src/app/shopping-list/store/shopping-list.actions';
import { startEdit } from 'src/app/shopping-list/store/shopping-list.actions';
import { stopEdit } from 'src/app/shopping-list/store/shopping-list.actions';

// Define the initial state for the shopping list feature so that u can use an empty array of ingredients
export interface AppState {
    shoppingList: State;
    };

export interface State {
    ingredients: Ingredient[];
    ingIndex:number;
    ingToEdit : Ingredient;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ],
    ingIndex : -1,
    ingToEdit : null
};

 

export const shoppingListReducer = createReducer(
    initialState, 
    on(addIngredient, (state, action) => {
        
        // Return the new state after processing the action
        return {
            ...state,
            ingredients: [...state.ingredients, action.ingredient],
        };
    }),
    on(addIngredients, (state, action) => {
        return {
            ...state,
            ingredients: [...state.ingredients, ...action.ingredients],
        };
    }),
    on(updateIngredient, (state, action) => {
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[action.index] = action.ingredient;
        return {
            ...state,
            ingredients: updatedIngredients,
        }}
    ),
    on(deleteIngredient, (state, action) => {
        const updatedIngredients = [...state.ingredients];
        updatedIngredients.splice(action.index, 1);
        return {
            ...state,
            ingredients: updatedIngredients,
        }}
    ),
    on(startEdit, (state, action) => {
        return {
            ...state,
            ingIndex: action.index,
            ingToEdit: state.ingredients[action.index]
        }}
    ),
    on(stopEdit, (state, action) => {
        return {
            ...state,
            ingIndex: -1,
            ingToEdit: null
        }
    })

);

    