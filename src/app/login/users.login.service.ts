import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { User } from './user.model';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/appStore.reducer';
import * as loginActions from './store/login.actions';

import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UsersloginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  private tokenExpirationTime: any;

  logout() {
    this.store.dispatch(loginActions.logout());
    //this.store.dispatch(loginActions.loginFail({ errorMessage: null }));
    localStorage.removeItem('userData');
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
    this.tokenExpirationTime = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
