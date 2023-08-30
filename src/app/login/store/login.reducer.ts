import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../user.model';



export interface State {
    user : User;
  }
  
  const initialState: State = {
    user:null,
  };
  
  export const loginReducer = createReducer(
    initialState,
  )