// features/shop/store/filters/shop-filters.effects.ts

import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Product } from '../../../../../model/product';
import { ShopFiltersActions } from './shop-filters.actions';

export const shopFilterUpdate = createEffect((
    actions$ = inject(Actions),
    http = inject(HttpClient)
  ) => {
    return actions$.pipe(
      ofType(ShopFiltersActions.update),
      mergeMap((action) => {
          const params = new URLSearchParams();
          if (action.filters.text) {
            params.append('q', action.filters.text)
          } else {
            params.delete('q')
          }
          if (action.filters.wood) {
            params.append('type', 'wood')
          }
          if (action.filters.paper) {
            params.append('type', 'paper')
          }
          if (action.filters.plastic) {
            params.append('type', 'plastic')
          }
          // console.log(params.toString())

          return http.get<Product[]>(`http://localhost:3000/products?${params.toString()}`)
          .pipe(
            map((items) =>
              ShopFiltersActions.updateSuccess({
                items,
                filters: action.filters
              })
            ),
            catchError(() =>
              of(ShopFiltersActions.updateFail())
            )
          )
      }

      )
    );
  },
  { functional: true}
);
