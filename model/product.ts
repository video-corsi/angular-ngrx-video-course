// model/product.ts

export type Product = {
  id: number;
  name: string;
  cost: number;
  image: string;
  type: string; // 'wood' | 'plastic' | 'paper';
}
