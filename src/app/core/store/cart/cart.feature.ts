// core/store/cart/cart.feature.ts
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Product } from '../../../../model/product';
import { CartActions } from './cart.actions';

export interface CartState {
  list: Product[];
}

export const initialState: CartState =  {
  list: []
}
export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(CartActions.remove, (state, action) => ({
      ...state,
      list: state.list.filter(item => item.id !== action.id)
    })),
    on(CartActions.add, (state, action) => ({
      ...state, list: [...state.list, action.item]
    })),
  ),
  extraSelectors: ({ selectList }) => ({
    selectIsCartEmpty: createSelector(
      selectList,
      (list) => list.length === 0
    ),
    selectTotalCartItems: createSelector(
      selectList,
      (list) => list.length
    ),
    selectTotalCartCost: createSelector(
      selectList,
      (list) => list.reduce((total, item) => total + item.cost, 0)
    )
  })
});

export const {
  selectList,
  selectIsCartEmpty,
  selectTotalCartItems,
  selectTotalCartCost
} = cartFeature;
