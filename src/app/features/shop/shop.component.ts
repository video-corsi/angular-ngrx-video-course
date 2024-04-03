// features/shop.ts
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../../model/product';
import { CartActions } from '../../core/store/cart/cart.actions';
import { ProductsActions } from './store/products/products.actions';
import { selectList } from './store/products/products.feature';

@Component({
  selector: 'app-shop',
  standalone: true,
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      @for (product of products(); track product.id) {
        <div class="card bg-slate-900 shadow-xl">
          <figure>
            <img [src]="product.image" [alt]="product.name" /></figure>
          <div class="card-body">
            <h2 class="card-title">{{product.name}}</h2>
            <div class="card-actions justify-end">
              <button
                class="btn btn-outline btn-primary"
                (click)="addProductToCart(product)"
              >Add to Cart</button>
            </div>
          </div>
        </div>
      } 
    </div>
  `,
})
export default class ShopComponent implements OnInit {
  store = inject(Store)
  products = this.store.selectSignal(selectList)

  ngOnInit() {
    this.store.dispatch(ProductsActions.load())
  }

  // NEW
  addProductToCart(product: Product) {
    this.store.dispatch(CartActions.add({item:  product}))
  }
}
