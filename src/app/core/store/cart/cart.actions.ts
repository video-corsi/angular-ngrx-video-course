// core/store/cart/cart.actions.ts
import { createActionGroup, props } from '@ngrx/store';
import { CartItem } from '../../../../model/cart-item';
import { Product } from '../../../../model/product';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    // NEW
    'load': props<{ items: CartItem[] }>(),
    'Add': props<{ item: Product }>(),
    'Remove': props<{ id: number }>(),
    'Increase Quantity': props<{ id: number }>(),
    'Decrease Quantity': props<{ id: number }>(),
  }
});
