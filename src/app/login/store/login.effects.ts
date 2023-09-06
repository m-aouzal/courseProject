import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as LoginActions from './login.actions';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../user.model';
const uniqueId =
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

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
    private http: HttpClient,
    private router: Router
  ) {}
  handleAuthentication = (
    email: string,
    localId: string,
    idToken: string,
    expiresIn: string
  ) => {
    const expiresInMs = +expiresIn * 1000;
    const expirationDate = new Date(new Date().getTime() + expiresInMs);
    let user = new User(email, localId, idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return LoginActions.loginSucess({
      email: email,
      userId: localId,
      token: idToken,
      expiresIn: new Date(new Date().getTime() + +expiresIn * 1000),
    });
  };

  handleError = (errorRes) => {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return of(LoginActions.loginFail({ errorMessage: errorMessage }));
    }

    if (errorRes.error && errorRes.error.error) {
      switch (errorRes.error.error.message) {
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct';
          break;
        case 'USER_DISABLED':
          errorMessage = 'This user has been disabled';
          break;
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage =
            'We have blocked all requests from this device due to unusual activity. Try again later';
          break;
      }
    }
    return of(LoginActions.loginFail({ errorMessage }));
  };

  signup = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.signupStart),
      switchMap((authData) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4kcqCD1icQ70YH5iYBpDMwfKqfIBvWp8',
            {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              return this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                resData.expiresIn
              );
            }),
            catchError((errorRes) => {
              return this.handleError(errorRes);
            })
          );
      })
    )
  );

  login = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loginStart),
      switchMap((authData) => {
        // Log the unique identifier and stack trace to identify what triggered the action

        // Rest of your login effect code
        return this.http.post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4kcqCD1icQ70YH5iYBpDMwfKqfIBvWp8', // Replace with your API key
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          }
        );
      }),
      map((resData) => {
        return this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          resData.expiresIn
        );
      }),
      catchError((errorRes) => {
        return this.handleError(errorRes);
      })
    )
  );

  autoLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.logout),
        tap(() => {
          localStorage.removeItem('userData');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  loginRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.loginSucess),
        tap(() => {
          this.router.navigate(['/']); // Navigate to the desired route on successful login
        })
      ),
    { dispatch: false }
  );
}
