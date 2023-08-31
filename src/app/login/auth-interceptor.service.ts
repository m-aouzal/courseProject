import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersloginService } from './users.login.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/appStore.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private userLoginService: UsersloginService,
    private store: Store<AppState>
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('login').pipe(
      map((loginState) => {
        return loginState.user;
      }),
      exhaustMap((user) => {
        if (!user) return next.handle(req);
        const modifiedReq = req.clone({
          params: req.params.set('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
