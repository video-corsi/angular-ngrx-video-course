// features/shop/store/products/products.effects.ts

import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Product } from '../../../../../model/product';
import { ProductsActions } from './products.actions';

export const loadProducts = createEffect((
    actions$ = inject(Actions),
    http = inject(HttpClient)
  ) => {
    return actions$.pipe(
      ofType(ProductsActions.load),
      mergeMap(() =>
        http.get<Product[]>('http://localhost:3000/products')
          .pipe(
            map((items) =>
              ProductsActions.loadSuccess({ items })
            ),
            catchError((error) =>
              of(ProductsActions.loadFail())
            )
          )
      )
    );
  },
  { functional: true}
);
