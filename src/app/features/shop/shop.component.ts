// features/shop/shop.ts
import { Component, inject, OnInit, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../../model/product';
import { ShopFilters } from '../../../model/shop-filters';
import { CartActions } from '../../core/store/cart/cart.actions';
import { RouterActions } from '../../core/store/router/router.actions';
import { ShopFiltersComponent } from './components/shop-filters.component';
import { ShopFiltersActions } from './store/filters/shop-filters.actions';
import { selectFilteredList, selectShopFiltersState } from './store/filters/shop-filters.feature';
import { ShopUiActions } from './store/ui/shop-ui.actions';
import { selectIsFilterPanelOpened } from './store/ui/shop-ui.feature';

@Component({
  selector: 'app-shop',
  standalone: true,
  template: ` 
    <!--NEW-->
    <app-shop-filters 
      [filters]="filters()"
      (changeFilters)="updateFilter($event)" 
      [isOpen]="isOpen()"
      (close)="closePanel()"
    />
    
    <div class="flex justify-center m-6">
      <button class="btn" (click)="togglePanel()">FILTERS</button>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      @for (product of products(); track product.id) {
        <div class="card bg-slate-900 shadow-xl">
          <figure>
            <img [src]="product.image" [alt]="product.name"/></figure>
          <div class="card-body">
            <h2 class="card-title">{{ product.name }}</h2>
            <div class="card-actions justify-end">
              <button
                class="btn btn-outline btn-primary"
                (click)="addProductToCart(product)"
              >Add to Cart | € {{product.cost}}
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  imports: [
    ShopFiltersComponent
  ]
})
export default class ShopComponent implements OnInit {
  store = inject(Store)
  products = this.store.selectSignal(selectFilteredList)
  filters: Signal<ShopFilters> = this.store.selectSignal(selectShopFiltersState)
  // NEW
  isOpen = this.store.selectSignal(selectIsFilterPanelOpened)

  ngOnInit() {
    this.store.dispatch(ShopFiltersActions.update({ filters: this.filters() }))
  }

  addProductToCart(product: Product) {
    this.store.dispatch(CartActions.add({item:  product}))
  }

  // NEW
  updateFilter(filters: Partial<ShopFilters>) {
    this.store.dispatch(ShopFiltersActions.update({ filters }))
  }

  togglePanel() {
    this.store.dispatch(ShopUiActions.togglePanel())
  }

  // NEW
  closePanel() {
    this.store.dispatch(ShopUiActions.closePanel())
  }
}
