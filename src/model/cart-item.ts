// model/cart-item.ts

import { Product } from './product';

export type CartItem = {
  product: Product;
  qty: number;
}
