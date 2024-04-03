import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CartItem } from '../../../model/cart-item';
import { CartActions } from '../../core/store/cart/cart.actions';
import {
  selectIsCartEmpty,
  selectList,
  selectTotalCartCost,
  selectTotalCartItems
} from '../../core/store/cart/cart.feature';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `

    @if (!isEmpty()) {
      <h1>Cart ({{totalCartItems()}} products)</h1>
    }

    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <tbody>
          @for (item of cartItems(); track item.product.id) {
            <tr>
              <th>
                <img [src]="item.product.image" [alt]="item.product.name" width="100">
              </th>
              <td>{{item.product.name}}</td>
              <td>
                € {{item.product.cost}} x {{item.qty}}
                <button class="btn" (click)="decreaseQty(item.product.id)">-</button>
                <button class="btn" (click)="increaseQty(item.product.id)">+</button>
              </td>
              <td class="text-right">
                € {{item.product.cost * item.qty}}
                <button class="btn" (click)="deleteItem(item)">Delete</button>
              </td>
            </tr>
          } @empty {
            <div class="alert alert-info">Your Cart is Empty</div>
          }
        </tbody>
      </table>
    </div>
    
    @if (!isEmpty()) {
      <div class="text-xl flex justify-end">
        total:  € {{totalCost()}}
      </div>  
    }
    
  `,
})
export default class CartComponent {
  store = inject(Store);
  cartItems = this.store.selectSignal(selectList)
  isEmpty = this.store.selectSignal(selectIsCartEmpty)
  totalCartItems = this.store.selectSignal(selectTotalCartItems)
  totalCost = this.store.selectSignal(selectTotalCartCost)

  deleteItem(item: CartItem) {
    this.store.dispatch(CartActions.remove({ id: item.product.id}))
  }

  decreaseQty(cartItemId: number) {
    this.store.dispatch(CartActions.decreaseQuantity({ id: cartItemId}))
  }
  increaseQty(cartItemId: number) {
    this.store.dispatch(CartActions.increaseQuantity({ id: cartItemId}))
  }
}
