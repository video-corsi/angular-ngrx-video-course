// features/cms/store/products/cms-products.actions.ts
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../../../../model/product';

export const CmsProductsActions = createActionGroup({
  source: 'CMS Products',
  events: {
    'Open Modal Add': emptyProps(),
    'Open Modal Edit': props<{ item: Partial<Product>} >(),
    'Close Modal': emptyProps(),
    'Load': emptyProps(),
    'Load Success': props<{ items: Product[] }>(),
    'Load Fail': emptyProps(),
    'Add Product': props<{ item: Partial<Product> }>(),
    'Add Product Success':  props<{ item: Product }>(),
    'Add Product Fail': emptyProps(),
    'Delete Product': props<{ id: number }>(),
    'Delete Product Success': props<{ id: number }>(),
    'Delete Product Fail': emptyProps(),
    'Edit Product': props<{ item: Partial<Product> }>(),
    'Edit Product Success':  props<{ item: Product }>(),
    'Edit Product Fail': emptyProps(),
  }
});
