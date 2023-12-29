import {
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
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtGuard)
  @Post(':productId')
  async addToCart(@Req() req, @Param('productId') productIds: number[]) {
    const userId = req.user.id;
    return this.cartService.addToCart(userId, productIds);
  }

  @UseGuards(JwtGuard)
  @Get('')
  async getCart(@Req() req) {
    const userId = req.user.id;
    return this.cartService.getCart(userId);
  }

  @UseGuards(JwtGuard)
  @Delete(':productId')
  async removeFromCart(@Req() req, @Param('productId') productId: number) {
    const userId = req.user.id;
    return this.cartService.removeFromCart(userId, productId);
  }

  @UseGuards(JwtGuard)
  @Delete('')
  async clearCart(@Req() req) {
    const userId = req.user.id;
    return this.cartService.clearCart(userId);
  }
}
