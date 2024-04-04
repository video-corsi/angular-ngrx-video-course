// features/shop/store/products/products.feature.ts
import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../../../../../model/product';
import { ShopFiltersActions } from '../filters/shop-filters.actions';
import { ProductsActions } from './products.actions';

export interface ProductsState {
  hasError: boolean;
  pending: boolean;
  list: Product[];
}

export const initialState: ProductsState = {
  hasError: false,
  pending: false,
  list: []
};
export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,
    // NEW
    on(ShopFiltersActions.updateSuccess, (state, action) => ({
      ...state, list: action.items
    })),
    on(ProductsActions.load, (state) => ({
      ...state, pending: true, hasError: false
    })),
    on(ProductsActions.loadSuccess, (state, action) => ({
      ...state, list: [...action.items],
      pending: false,
      hasError: false
    })),
    on(ProductsActions.loadFail, (state) => ({
      ...state,
      hasError: true,
      pending: false
    })),
  ),
});

export const {
  selectHasError,
  selectPending,
  selectList
} = productsFeature;
