import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';

export const blockLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if(localStorage.getItem('authToken')){
    router.navigate(['/recipes']);
    return false;
  }
  else{
    return true;
  }
};
