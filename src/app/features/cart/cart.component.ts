import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CartActions } from '../../core/store/cart/cart.actions';
import {
  selectList,
  selectTotalCartCost,
  selectTotalCartItems
} from '../../core/store/cart/cart.feature';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Cart ({{totalCartItems()}} products)</h1>

    @for (item of cartItems(); track item.id) {
      <li>
        {{item.name}} - € {{item.cost}}
        <button (click)="deleteItem(item)">Delete</button>
      </li>
    } @empty {
      <div>Your Cart is Empty</div>
    }

    <hr>

    total:  € {{totalCost()}}
  `,
})
export default class CartComponent {
  store = inject(Store);
  cartItems = this.store.selectSignal(selectList)
  totalCartItems = this.store.selectSignal(selectTotalCartItems)
  totalCost = this.store.selectSignal(selectTotalCartCost)

  deleteItem(item: any) {
    this.store.dispatch(CartActions.remove({ id: item.id}))
  }
}
