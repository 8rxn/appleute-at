import { IsNumber, IsString } from 'class-validator';
import { Product } from 'src/entities/product.entity';

export class CreateOrderDto {
  orderDetails: Product[];

  @IsString()
  orderDate: String;
  
}
