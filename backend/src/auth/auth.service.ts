import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithUserName(username);
    if (user && bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const { password, ...userDB } = await this.userService.findOneWithUserName(
      user.email,
    );
    const payload = {
      username: userDB.email,
      sub: {
        name: userDB.name,
        id: userDB.id,
      },
    };

    return {
      ...userDB,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
