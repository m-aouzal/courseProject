// shopping-list.actions.ts
import { createAction, props } from '@ngrx/store';
// import { User } from '../user.model';

export const login = createAction(
  '[login] login',
  props<{ email: string; userId: string; token: string; expiresIn: Date }>()
);

export const logout = createAction('[login] logout');

export const loginStart = createAction(
  '[login] loginStart',
  props<{ email: string; password: string }>()
);

