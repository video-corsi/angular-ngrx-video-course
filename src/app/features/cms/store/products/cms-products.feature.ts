// features/cms/store/products/cms-products.feature.ts

import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '../../../../../model/product';
import { CmsProductsActions } from './cms-products.actions';

export interface CMSProductsState {
  hasError: boolean;
  pending: boolean;
  list: Product[];
  isPanelOpened: boolean;
  active: Partial<Product> | null;
}

export const initialState: CMSProductsState = {
  hasError: false,
  pending: false,
  list: [],
  isPanelOpened: false,
  active: null
};
export const cmsProductsFeature = createFeature({
  name: 'CMS products',
  reducer: createReducer(
    initialState,

    // NEW
    on(CmsProductsActions.openModalAdd, (state) => ({ ...state, isPanelOpened: true })),
    on(CmsProductsActions.openModalEdit, (state, action) => ({ ...state, isPanelOpened: true, active: action.item })),
    on(CmsProductsActions.closeModal, (state, action) => ({ ...state, isPanelOpened: false })),

    on(CmsProductsActions.load, (state) => ({ ...state, hasError: false, pending: true })),
    on(CmsProductsActions.loadSuccess, (state, action) => ({
      ...state, list: [...action.items], hasError: false, pending: false
    })),
    on(CmsProductsActions.loadFail, (state) => ({ ...state, hasError: true, pending: false })),

    on(CmsProductsActions.deleteProduct, (state) => ({ ...state, hasError: false, pending: true})),
    on(CmsProductsActions.deleteProductSuccess, (state, action) => ({
      ...state,
      list: state.list.filter(item => item.id !== action.id),
      hasError: false,
      pending: false
    })),
    on(CmsProductsActions.deleteProductFail, (state) => ({
      ...state,
      hasError: true,
      pending: false
    })),

    on(CmsProductsActions.addProduct, (state) => ({
      ...state,
      hasError: false,
      pending: true
    })),
    on(CmsProductsActions.addProductSuccess, (state, action) => ({
      ...state,
      list: [...state.list, action.item],
      hasError: false,
      pending: false,
      isPanelOpened: false
    })),
    on(CmsProductsActions.addProductFail, (state) => ({
      ...state,
      hasError: true,
      pending: false
    })),

    // NEW
    on(CmsProductsActions.editProduct, (state) => ({
      ...state,
      hasError: false,
      pending: true
    })),
    on(CmsProductsActions.editProductSuccess, (state, action) => ({
      ...state,
      list: state.list.map(item => {
        return item.id === action.item.id ? action.item : item
      }),
      hasError: false,
      pending: false,
      isPanelOpened: false
    })),
    on(CmsProductsActions.editProductFail, (state) => ({
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
  // NEW
  selectIsPanelOpened,
  selectActive
} = cmsProductsFeature;
