import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CreateUserDto } from './dto/userDto';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('profile')
  findOne(@Request() req) {
    const userId = req.user.id;
    return this.userService.findOne(userId);
  }

  // @UseGuards(JwtGuard)
  // @Get('/cart')
  // findCart(@Request() req) {
  //   const userId = req.user.id;
  //   return this.userService.findCart(userId);
  // }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtGuard)
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  // @UseGuards(JwtGuard)
  // @Get('orders')
  // getOrders(@Request() req) {
  //   const userId = req.user.id;
  //   return this.userService.findOrders(userId);
  // }
}
