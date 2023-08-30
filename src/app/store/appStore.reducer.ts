import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromLogin from '../login/store/login.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: fromShoppingList.State;
    login: fromLogin.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    login: fromLogin.loginReducer,
};
