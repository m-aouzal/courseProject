import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as LoginActions from './login.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { pipe, of } from 'rxjs';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private http: HttpClient
  ) {}

  login = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loginStart),
      switchMap((authData) => {
        return (
          this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4kcqCD1icQ70YH5iYBpDMwfKqfIBvWp8',
            {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true,
            }
          ),
          pipe(
            catchError((errorRes) => {
              //
              return of();
            }),
            map((resData) => {
              returnof();
            })
          )
        );
      })
    )
  );
}
