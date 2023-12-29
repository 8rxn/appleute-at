import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { CartService } from './cart.service';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart,Product])],
  controllers: [CartController],
  providers: [CartService, ProductService],
})
export class CartModule {}
