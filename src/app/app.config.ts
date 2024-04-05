// app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { authInterceptor } from './core/auth/auth.interceptor';
import { authFeature } from './core/store/auth/auth.feature';
import { cartFeature } from './core/store/cart/cart.feature';
import * as authEffects from './core/store/auth/auth.effects';
import * as cartEffects from './core/store/cart/cart.effects';
import * as productsCMSEffects from './features/cms/store/products/cms-products.effects';
import * as shopFilterEffect from './features/shop/store/filters/shop-filters.effects';
import * as productsEffects from './features/shop/store/products/products.effects';
import * as routerEffects from './core/store/router/router.effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // NEW
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore(),
    provideState({ name: 'home', reducer: () => [1, 2, 3] }),
    provideState({ name: 'auth', reducer: authFeature.reducer }), // NEW
    provideState({ name: 'cart', reducer: cartFeature.reducer }),
    provideState({ name: 'router', reducer: routerReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([
        productsEffects, cartEffects, shopFilterEffect, productsCMSEffects, authEffects, routerEffects
    ]),
    provideRouterStore()
]
};
