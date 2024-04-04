// features/shop/store/ui/shop-ui.feature.ts
import { createFeature, createReducer, on } from '@ngrx/store';
import { ShopUiActions } from './shop-ui.actions';

// NEW
export const initialState = {
  isFilterPanelOpened: false
}

export const shopUIFeature = createFeature({
  name: 'shopUiFilters',
  reducer: createReducer(
    initialState,
    // NEW
    on(ShopUiActions.openPanel, (state) => ({
      ...state,
      isFilterPanelOpened: true
    })),
    on(ShopUiActions.closePanel, (state) => ({
      ...state,
      isFilterPanelOpened: false
    })),
    on(ShopUiActions.togglePanel, (state) => ({
      ...state,
      isFilterPanelOpened: !state.isFilterPanelOpened
    }))
  ),
});

export const {
  selectIsFilterPanelOpened,
} = shopUIFeature;
