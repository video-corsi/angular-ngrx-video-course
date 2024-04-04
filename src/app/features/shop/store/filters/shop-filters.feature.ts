// features/shop/store/filters/shop-filters.feature.ts
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { ShopFilters } from '../../../../../model/shop-filters';
import { selectList } from '../products/products.feature';
import { ShopFiltersActions } from './shop-filters.actions';

// NEW
export const initialState: ShopFilters = {
  text: '',
  cost: 10,
  wood: true,
  plastic: true,
  paper: true,
}

export const shopFiltersFeature = createFeature({
  name: 'shopFilters',
  reducer: createReducer(
    initialState,
    on(ShopFiltersActions.updateSuccess, (state, action) => ({
      ...state,
      ...action.filters
    })),
  ),
  extraSelectors: ({ selectShopFiltersState }) => ({
    selectFilteredList: createSelector(
      selectList,
      selectShopFiltersState,
      // UPDATE
      (list, filters) => list
        .filter(p => p.cost <= filters.cost)
    )
  })
});

export const {
  // NEW
  selectFilteredList,
  selectShopFiltersState
} = shopFiltersFeature;
