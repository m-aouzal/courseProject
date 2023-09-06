import { CanActivateFn, Router } from '@angular/router';
import { UsersloginService } from '../login/users.login.service';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take,map } from 'rxjs';
import {Store} from '@ngrx/store';

export const AuthGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersloginService)
  const router = inject(Router)
  return inject(Store).select('login').pipe(map((loginState) => {
    return loginState.user;
  }),map((user) => {
    if(!!user){
      console.log("user is authenticated")
      return true;
    }
    else {
      return router.createUrlTree(['/login']);
    }
  }));
  // return  usersService.userSubject.pipe(take(1),map((user) => {
  //   if(!!user){
  //     return true;
  //   }
  //   else {
  //     return router.createUrlTree(['/login']);
  //   }
  // }));
};

