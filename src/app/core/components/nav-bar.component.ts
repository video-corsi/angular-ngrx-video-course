// core/components/nav-bar.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsCartEmpty, selectList, selectTotalCartCost, selectTotalCartItems } from '../store/cart/cart.feature';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  template: `
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl" routerLink="home">NGRX Demo</a>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span class="badge badge-sm indicator-item">
                <!--NEW-->
                {{totalCartItems()}}
              </span>
            </div>
          </div>
          <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div class="card-body">
              <!--NEW-->
              <span class="font-bold text-lg">{{totalCartItems()}} Items</span>
              <span class="text-info">Total: {{totalCost()}}</span>
              <!--NEW-->
              @if (!isEmpty()) {
                <div class="card-actions">
                  <button class="btn btn-primary btn-block" routerLink="cart">
                    View cart
                  </button>
                </div>  
              }
            </div>
          </div>
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li routerLink="shop"><a>Shop</a></li>
            <li routerLink="counter"><a>Counter</a></li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class NavBarComponent {
  store = inject(Store)
  //cartList = this.store.selectSignal(selectList)
  // NEW
  totalCartItems = this.store.selectSignal(selectTotalCartItems)
  totalCost = this.store.selectSignal(selectTotalCartCost)
  isEmpty = this.store.selectSignal(selectIsCartEmpty)
}
