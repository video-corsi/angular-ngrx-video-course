// app.routes.ts
import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { counterFeature } from './core/store/counter/counter.feature';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./features/home/home.component')},
  { path: 'shop', loadComponent: () => import('./features/shop/shop.component')},
  { path: 'cart', loadComponent: () => import('./features/cart/cart.component')},
  {
    path: 'counter',
    loadComponent: () => import('./features/counter/counter.component'),
    providers: [
      provideState({ name: counterFeature.name, reducer: counterFeature.reducer }),
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
