import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.rawHeaders[
            request.rawHeaders.indexOf('Cookie') + 1
          ].split('jwt=')[1];
        },
      ]),
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload) {
    return { user: payload.sub, username: payload.username };
  }
}
