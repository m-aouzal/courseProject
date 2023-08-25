import { CanActivateFn, Router } from '@angular/router';
import { UsersloginService } from '../login/users.login.service';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';






export const AuthGuard: CanActivateFn = (route, state) => {
  const usersService = new UsersloginService(inject(HttpClient));
  const router = inject(Router)
  const token = localStorage.getItem('authToken');
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};


