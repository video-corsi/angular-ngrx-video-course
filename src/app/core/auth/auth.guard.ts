// core/auth/auth.guards.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLogged } from '../store/auth/auth.feature';
import { RouterActions } from '../store/router/router.actions';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store)
  const router = inject(Router)
  const isLogged = store.selectSignal(selectIsLogged)
  if (!isLogged()) {
    //router.navigateByUrl('login')
    store.dispatch(RouterActions.go({ path: 'login'}))
  }
  return isLogged();
};
