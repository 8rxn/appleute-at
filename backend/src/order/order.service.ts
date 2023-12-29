import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDetails } from 'src/entities/interface';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async createOrder(cartId: number, createOrderDto: CreateOrderDto) {
    console.log('check');
    let cart = await this.cartRepo.findOne({
      where: { id: cartId },
      relations: ['products', 'user'],
    });
    if (!cart) {
      throw new Error('Cart Not Found');
    }

    console.log(cart);
    if (cart.products.length == 0) {
      throw new Error('Cart is empty');
    }
    let order = new Order();
    order.orderDate = new Date().toString();
    order.user = cart.user;
    order.orderDetails = cart.products.map((prod) => ({
      product: prod,
      amount: prod.price,
    }));

    await this.orderRepo.save(this.orderRepo.create(order));

    // await this.cartRepo.update(cartId, { products: [] });

    return order;
  }

  async getOrders(id) {
    return this.orderRepo.find({ where: { user: { id: id } } });
  }
}
