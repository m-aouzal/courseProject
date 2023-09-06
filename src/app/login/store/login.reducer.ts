import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as loginActions from './login.actions';

export interface State {
  user: User;
  errorMessage: string;
  loadingSate: boolean;
}

const initialState: State = {
  user: null,
  errorMessage: null,
  loadingSate: false,
};

export const loginReducer = createReducer(
  initialState,

  on(loginActions.loginStart, (state, action) => ({
    ...state,
    errorMessage: null,
    loadingSate: true,
  })),
  on(loginActions.loginFail, (state, action) => ({
    ...state,
    user: null,
    errorMessage: action.errorMessage,
    loadingSate: false,
  })),
  on(loginActions.logout, (state, action) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(loginActions.loginSucess, (state, action) => {
    return {
      ...state,
      errorMessage: null,
      loadingSate: false,
      user: new User(
        action.email,
        action.userId,
        action.token,
        action.expiresIn
      ),
    };
  }),
  on(loginActions.signupStart, (state, action) => ({
    ...state,
    errorMessage: null,
    loadingSate: true,
  })),
  on(loginActions.clearError, (state, action) => ({
    ...state,
    errorMessage: null,
  })),
  
);
