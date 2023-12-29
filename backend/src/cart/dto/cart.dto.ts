import { IsArray, IsNumber } from 'class-validator';

export class AddToCartDto {
  @IsArray()
  @IsNumber({}, { each: true })
  productIds: number[];
}

export class DeleteFromCartDto {
  @IsNumber()
  productId: number;
}
