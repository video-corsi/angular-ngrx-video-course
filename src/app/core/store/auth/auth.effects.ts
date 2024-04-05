// core/store/auth/auth.effects.ts

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Actions, createEffect, ofType, rootEffectsInit } from '@ngrx/effects';
import { RouterActions } from '../router/router.actions';
import { AuthActions } from './auth.actions';

export const syncWithLocalStorage = createEffect((
    actions$ = inject(Actions),
  ) => {
    return actions$.pipe(
      ofType(rootEffectsInit),
      map(() => {
        const token = localStorage.getItem('token')
        const displayName = localStorage.getItem('displayName')
        return AuthActions.syncWithLocalStorage({ token, displayName });
      })
    );
  },
  { functional: true }
);

export const login = createEffect((
    actions$ = inject(Actions),
    http = inject(HttpClient)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) => {
        const params = new HttpParams()
          .set('username', action.username)
          .set('password', action.password)
        return http.get<{ token: string}>('http://localhost:3000/login', { params })
          .pipe(
            tap((res) => {
              localStorage.setItem('token', res.token)
            }),
            map((res) =>
              AuthActions.loginSuccess({ token: res.token })
            ),
            catchError(() =>
              of(AuthActions.loginFail())
            )
          )
      })
    );
  },
  { functional: true}
);


export const getProfile = createEffect((
    actions$ = inject(Actions),
    http = inject(HttpClient)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.loginSuccess),
      mergeMap((action) =>
        http.get<{ displayName: string}>('http://localhost:3000/profile', {
          headers: {
            Authorization: `Bearer ${action.token}`
          }
        })
          .pipe(
            tap((res) => {
              localStorage.setItem('displayName', res.displayName)
            }),
            map((res) =>
              AuthActions.getProfileSuccess({ displayName: res.displayName })
            ),
            catchError(() =>
              of(AuthActions.getProfileFail())
            )
          )
      )
    );
  },
  { functional: true}
);


export const loginSuccess = createEffect((
    actions$ = inject(Actions),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.loginSuccess),
      /*tap(() => {
        router.navigateByUrl('cms')
      })*/
      map(() => RouterActions.go({ path: 'cms'}) )
    );
  },
  { functional: true/*, dispatch: false*/}
);

export const logout = createEffect((
    actions$ = inject(Actions),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('displayName')
        // router.navigateByUrl('shop')
      }),
      map(() => RouterActions.go({ path: 'shop'}) )
    );
  },
  { functional: true/*, dispatch: false*/}
);
