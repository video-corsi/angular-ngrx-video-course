// feature/cms/store/products/cms-products.effects.ts

import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Product } from '../../../../../model/product';
import { CmsProductsActions } from './cms-products.actions';
import { selectActive } from './cms-products.feature';

export const loadProducts = createEffect((
    actions$ = inject(Actions),
    http = inject(HttpClient)
  ) => {
    return actions$.pipe(
      ofType(CmsProductsActions.load),
      mergeMap(() =>
        http.get<Product[]>('http://localhost:3000/products')
          .pipe(
            map((items) =>
              CmsProductsActions.loadSuccess({ items })
            ),
            catchError(() =>
              of(CmsProductsActions.loadFail())
            )
          )
      )
    );
  },
  { functional: true}
);

export const deleteProduct = createEffect((
    actions$ = inject(Actions),
    http = inject(HttpClient)
  ) => {
    return actions$.pipe(
      ofType(CmsProductsActions.deleteProduct),
      mergeMap((action) =>
        http.delete(`http://localhost:3000/products/${action.id}`)
          .pipe(
            map((items) =>
              CmsProductsActions.deleteProductSuccess({ id: action.id })
            ),
            catchError(() =>
              of(CmsProductsActions.deleteProductFail())
            )
          )
      )
    );
  },
  { functional: true}
);

export const saveProduct = createEffect((
    actions$ = inject(Actions),
    store = inject(Store)
  ) => {
    return actions$.pipe(
      ofType(CmsProductsActions.save),
      concatLatestFrom(() => store.select(selectActive)),
      map(([action, active]) => {
        if (active?.id) {
          // edit
          const editedProduct = { ...action.item, id: active.id }
          return CmsProductsActions.editProduct({ item: editedProduct })
        }
        //add
        return CmsProductsActions.addProduct({ item: action.item })
      })
    );
  },
  { functional: true }
);

export const addProduct = createEffect((
    actions$ = inject(Actions),
    http = inject(HttpClient)
  ) => {
    return actions$.pipe(
      ofType(CmsProductsActions.addProduct),
      mergeMap((action) =>
        http.post<Product>(`http://localhost:3000/products`, action.item)
          .pipe(
            map((item) =>
              CmsProductsActions.addProductSuccess({ item })
            ),
            catchError(() =>
              of(CmsProductsActions.addProductFail())
            )
          )
      )
    );
  },
  { functional: true}
);

// NEW
export const editProduct = createEffect((
    actions$ = inject(Actions),
    http = inject(HttpClient)
  ) => {
    return actions$.pipe(
      ofType(CmsProductsActions.editProduct),
      mergeMap((action) =>
        http.patch<Product>(`http://localhost:3000/products/${action.item.id}`, action.item)
          .pipe(
            map((item) =>
              CmsProductsActions.editProductSuccess({ item })
            ),
            catchError(() =>
              of(CmsProductsActions.editProductFail())
            )
          )
      )
    );
  },
  { functional: true}
);
