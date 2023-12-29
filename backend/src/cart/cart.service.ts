import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async addToCart(userId: number, productIds: number[]) {
    let cart = await this.cartRepo.findOne({
      where: { user: { id: userId } },
    });
    if (!productIds) {
      console.log(productIds);
      throw new Error('prodcut ids cant find');
      return 'error';
    }
    if (!cart) {
      throw new Error('Cart Not Found');
    }
    console.log('product Ids', productIds);

    let products = [];
    for (const id of productIds) {
      let product = await this.productRepo.findOne({ where: { id: id } });
      products.push(product);
    }

    if (!products) {
      throw new Error('Product Not Found');
    }

    for (const prod of products) {
      this.cartRepo
        .createQueryBuilder()
        .relation(Cart, 'products')
        .of(cart)
        .add({ id: prod.id });
    }

    await this.cartRepo.save(cart);

    return cart;
  }

  async removeFromCart(userId: number, productId: number) {
    let cart = await this.cartRepo.findOne({
      where: { user: { id: userId } },
      relations: ['products'],
    });
    if (!cart) {
      throw new Error('Cart Not Found');
    }


    const productIndex = cart.products.findIndex((p) => p.id == productId);
    console.log(productIndex)
    if (productIndex === -1) {
      throw new Error('Product not found in cart');
    }

    cart.products.splice(productIndex, 1);

    await this.cartRepo.save(cart);

    return cart;
  }

  async clearCart(userId: number) {
    let cart = await this.cartRepo.findOne({
      where: { id: userId },
    });

    for (const product of cart.products) {
      await this.cartRepo
        .createQueryBuilder()
        .relation(Cart, 'products')
        .of(cart)
        .remove(product);
    }
  }

  async getCart(userId: number) {
    return this.cartRepo.findOne({
      where: { id: userId },
      relations: ['products'],
    });
  }
}
