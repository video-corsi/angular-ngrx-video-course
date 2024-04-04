// features/shop/store/filters/shop-filters.actions.ts

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../../../../model/product';
import { ShopFilters } from '../../../../../model/shop-filters';

export const ShopFiltersActions = createActionGroup({
  source: 'Shop Filters',
  events: {
    'update': props<{ filters: Partial<ShopFilters>}>(),
    'update success': props<{ items: Product[], filters: Partial<ShopFilters>}>(),
    'update fail': emptyProps(),
  }
});
