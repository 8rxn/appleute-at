import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dto/userDto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Response() res) {
    const user = await this.authService.login(req.body);
    res.cookie('jwt', user.accessToken, { httpOnly: true });
    return res.send({ user });
  }

  @Post('register/admin')
  async registerAdmin(@Body() user: CreateUserDto) {
    return await this.userService.createAdmin(user);
  }

  @Post('register')
  async registerUser(@Body() user: CreateUserDto) {
    return await this.userService.create(user);
  }

  @Post('logout')
  logout(@Response({ passthrough: true }) response) {
    response.clearCookie('jwt', { path: '/' });
    return response.send({ message: 'Logout successful' });
  }
}
