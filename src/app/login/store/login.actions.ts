// auth.actions.ts
import { createAction, props } from '@ngrx/store';

export const loginSucess = createAction(
  '[Auth] Login Success',
  props<{ email: string; userId: string; token: string; expiresIn: Date }>()
);

export const loginFail = createAction(
  '[Auth] Login Fail',
  props<{ errorMessage: string }>()
);

export const logout = createAction('[Auth] Logout');

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{ email: string; password: string }>()
);

export const autoLogin = createAction('[Auth] Auto Login');
export const autoLogout = createAction('[Auth] Auto Logout');

export const signupStart = createAction(
  '[Auth] Signup Start',
  props<{ email: string; password: string }>()
);

export const clearError = createAction('[Auth] Clear Error');




