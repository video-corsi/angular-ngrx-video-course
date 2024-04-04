// features/cms/store/products/cms-products.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../../../../model/product';

export const CmsProductsActions = createActionGroup({
  source: 'CMS Products',
  events: {
    'Open Modal': props<{ item: Product | null }>(),
    'Close Modal': emptyProps(),
    'Load': emptyProps(),
    'Load Success': props<{ items: Product[] }>(),
    'Load Fail': emptyProps(),
    'Add Product': props<{ item: Omit<Product, 'id'> }>(),
    'Add Product Success':  props<{ item: Product }>(),
    'Add Product Fail': emptyProps(),
    'Delete Product': props<{ id: number }>(),
    'Delete Product Success': props<{ id: number }>(),
    'Delete Product Fail': emptyProps(),
  }
});
