import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectToken } from '../store/auth/auth.feature';
import { selectUrl } from '../store/router/router.selectors';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store)
  const token = store.selectSignal(selectToken)
  const url = store.selectSignal(selectUrl)
  if (url().includes('/cms') && token()) {
    return next(req.clone({
      setHeaders: {
        Authorization: `Bearer ${token()}`
      }
    }))
  }
  return next(req);
};
