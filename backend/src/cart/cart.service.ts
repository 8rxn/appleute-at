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
    if (!cart) {
      throw new Error('Cart Not Found');
    }

    const products = await this.productRepo.find({
      where: productIds.map((pId) => ({ id: pId })),
    });
    if (!products) {
      throw new Error('Product Not Found');
    }

    this.cartRepo.update(cart.id, {
      products: [...(await cart.products), ...products],
    });

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

    const productIndex = (await cart.products).findIndex(
      (product) => product.id === productId,
    );
    if (productIndex === -1) {
      throw new Error('Product Not Found in Cart');
    }

    (await cart.products).splice(productIndex, 1);

    await this.cartRepo.save(cart);

    return cart;
  }

  async clearCart(userId: number) {
    let cart = await this.cartRepo.findOne({
      where: { id: userId },
    });

    return (await cart.products).splice(0, (await cart.products).length);
  }

  async getCart(userId: number) {
    return this.cartRepo.findOne({
      where: { id: userId },
      relations: ['products'],
    });
  }
}
