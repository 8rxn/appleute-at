import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtGuard)
  @Post(':cartId')
  async placeOrder(
    @Req() req,
    @Param('cartId') cartId: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(cartId, createOrderDto);
  }

  @UseGuards(JwtGuard)
  @Get('')
  async getOrdders(@Req() req) {
    const userId = req.user.id;
    return this.orderService.getOrders(userId);
  }
}
