import { Product } from './product.entity';

export interface OrderDetails {
  product: Product;
  amount: number;
}
