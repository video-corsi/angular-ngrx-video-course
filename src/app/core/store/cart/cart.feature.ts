// core/store/cart/cart.feature.ts
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { CartItem } from '../../../../model/cart-item';
import { CartActions } from './cart.actions';

export interface CartState {
  // NEW
  list: CartItem[];
}

export const initialState: CartState =  {
  list: []
}
export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    // NEW
    on(CartActions.load, (state, action) => {
      return ({
        ...state,
        list: action.items
      })
    }),
    on(CartActions.add, (state, action) => {
      const productAlreadyInCart = state.list.find(item => item.product.id === action.item.id);

      if (productAlreadyInCart) {
        // increase qty
        return ({
          ...state, list: state.list.map(item => {
            return item.product.id === action.item.id ? {...item, qty: item.qty + 1} : item;
          })
        })
      } else {
        // add in cart
        const cartItem: CartItem = { product: action.item, qty: 1};
        return ({
          ...state, list: [...state.list, cartItem]
        })
      }
    }),
    on(CartActions.remove, (state, action) => ({
      ...state,
      list: state.list.filter(item => item.product.id !== action.id)
    })),
    // NEW
    on(CartActions.increaseQuantity, (state, action) => {
        return ({
          ...state, list: state.list.map(item => {
            return item.product.id === action.id ? {...item, qty: item.qty + 1} : item;
          })
        })
    }),
    on(CartActions.decreaseQuantity, (state, action) => {
      const productAlreadyInCart = state.list.find(item => item.product.id === action.id);
      if (productAlreadyInCart && productAlreadyInCart.qty > 1) {
        // decrease
        return ({
          ...state, list: state.list.map(item => {
            return item.product.id === action.id ? {...item, qty: item.qty - 1} : item;
          })
        })
      }
      // delete
      return {
        ...state,
        list: state.list.filter(item => item.product.id !== action.id)
      }
    }),
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
    // UPDATE
    selectTotalCartCost: createSelector(
      selectList,
      (list) => list.reduce((total, item) => total + (item.product.cost * item.qty), 0)
    )
  })
});

export const {
  selectList,
  selectIsCartEmpty,
  selectTotalCartItems,
  selectTotalCartCost
} = cartFeature;
