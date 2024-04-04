// app.routes.ts
import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { counterFeature } from './features/counter/store/counter.feature';
import { shopFiltersFeature } from './features/shop/store/filters/shop-filters.feature';
import { productsFeature } from './features/shop/store/products/products.feature';
import { shopUIFeature } from './features/shop/store/ui/shop-ui.feature';

export const routes: Routes = [
  // NEW
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop.component'),
    providers: [
      provideState({ name: productsFeature.name, reducer: productsFeature.reducer }),
      provideState({ name: shopFiltersFeature.name, reducer: shopFiltersFeature.reducer }),
      provideState({ name: shopUIFeature.name, reducer: shopUIFeature.reducer }),
    ]
  },
  { path: 'cart', loadComponent: () => import('./features/cart/cart.component')},
  {
    path: 'counter',
    loadComponent: () => import('./features/counter/counter.component'),
    providers: [
      provideState({ name: counterFeature.name, reducer: counterFeature.reducer }),
    ]
  },
  { path: '', redirectTo: 'shop', pathMatch: 'full' }
];
