// app.config.ts
// NEW
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { cartFeature } from './core/store/cart/cart.feature';
import * as productsEffects from './features/shop/store/products/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // NEW
    provideHttpClient(),
    provideStore(),
    provideState({ name: 'home', reducer: () => [1, 2, 3] }),
    provideState({ name: 'cart', reducer: cartFeature.reducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects([productsEffects])
]
};
