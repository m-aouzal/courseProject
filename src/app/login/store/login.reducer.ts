import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as loginActions from './login.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export const loginReducer = createReducer(
  initialState,
  on(loginActions.login, (state, action) => {
    console.log("login");
    return {
    ...state,
    user: new User(
      action.email,
      action.userId,
      action.token,
    action.expiresIn
    )}
  }),
  on(loginActions.logout, (state, action) => ({
    ...state,
    user: null,
  }))
);
