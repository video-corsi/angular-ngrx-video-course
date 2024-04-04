// features/shop/store/products/products.effects.ts

import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { Actions, createEffect, ofType, rootEffectsInit } from '@ngrx/effects';
import { CartActions } from './cart.actions';
import { selectList } from './cart.feature';

export const loadCartFromLocalStorage = createEffect((
    actions$ = inject(Actions),
  ) => {
    return actions$.pipe(
      ofType(rootEffectsInit),
      map(() => {
        const cartFromLocalStorage = localStorage.getItem('cartList')
        if (cartFromLocalStorage) {
          return CartActions.load({ items: JSON.parse(cartFromLocalStorage)})
        } else {
          return CartActions.load({ items: []})
        }
      })
    );
  },
  { functional: true}
);

export const saveCartLocalStorage = createEffect((
    store = inject(Store),
    actions$ = inject(Actions),
  ) => {
    return actions$.pipe(
      // NEW
      ofType(CartActions.add, CartActions.remove, CartActions.increaseQuantity, CartActions.decreaseQuantity),
      tap(() => {
        const cartList = store.selectSignal(selectList)
        localStorage.setItem('cartList', JSON.stringify(cartList()))
      })
    );
  },
  { functional: true, dispatch: false}
);
