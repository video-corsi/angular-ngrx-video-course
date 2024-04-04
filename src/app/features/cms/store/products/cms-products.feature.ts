// features/cms/store/products/cms-products.feature.ts

import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../../../../../model/product';
import { CmsProductsActions } from './cms-products.actions';

export interface CMSProductsState {
  hasError: boolean;
  pending: boolean;
  list: Product[];
}

export const initialState: CMSProductsState = {
  hasError: false,
  pending: false,
  list: [],
};
export const cmsProductsFeature = createFeature({
  name: 'CMS products',
  reducer: createReducer(
    initialState,

    on(CmsProductsActions.load, (state) => ({ ...state, hasError: false, pending: true })),
    on(CmsProductsActions.loadSuccess, (state, action) => ({
      ...state, list: [...action.items], hasError: false, pending: false
    })),
    on(CmsProductsActions.loadFail, (state) => ({ ...state, hasError: true, pending: false })),

    on(CmsProductsActions.deleteProduct, (state) => ({ ...state, hasError: false, pending: true})),
    on(CmsProductsActions.deleteProductSuccess, (state, action) => ({
      list: state.list.filter(item => item.id !== action.id),
      hasError: false,
      pending: false
    })),
    on(CmsProductsActions.deleteProductFail, (state) => ({
      ...state,
      hasError: true,
      pending: false
    })),

    // NEW
    on(CmsProductsActions.addProduct, (state) => ({
      ...state,
      hasError: false,
      pending: true
    })),
    on(CmsProductsActions.addProductSuccess, (state, action) => ({
      list: [...state.list, action.item],
      hasError: false,
      pending: false
    })),
    on(CmsProductsActions.addProductFail, (state) => ({
      ...state,
      hasError: true,
      pending: false
    })),

  ),
});

export const {
  selectHasError,
  selectPending,
  selectList,
} = cmsProductsFeature;
