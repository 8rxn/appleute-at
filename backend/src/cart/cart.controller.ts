import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddToCartDto, DeleteFromCartDto } from './dto/cart.dto';
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtGuard)
  @Post('')
  async addToCart(@Req() req, @Body() addToCartDto: AddToCartDto) {
    const userId = req.user.id;
    return this.cartService.addToCart(userId, addToCartDto.productIds);
  }

  @UseGuards(JwtGuard)
  @Get('')
  async getCart(@Req() req) {
    const userId = req.user.id;
    return this.cartService.getCart(userId);
  }

  @UseGuards(JwtGuard)
  @Delete('')
  async removeFromCart(
    @Req() req,
    @Body() deleteFromCartDto: DeleteFromCartDto,
  ) {
    const userId = req.user.id;
    return this.cartService.removeFromCart(userId, deleteFromCartDto.productId);
  }

  @UseGuards(JwtGuard)
  @Delete('')
  async clearCart(@Req() req) {
    const userId = req.user.id;
    return this.cartService.clearCart(userId);
  }
}
