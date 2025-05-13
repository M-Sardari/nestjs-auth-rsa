import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as fs from 'fs';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('refreshToken'), // یا از کوکی
      secretOrKey: fs.readFileSync('src/auth/keys/public.pem'),
      algorithms: ['RS256'],
      // passReqToCallback: true,
    });
  }

  async validate(payload: any) {
    console.log('RefreshTokenStrategy', payload.type);

    if (payload.type !== 'refresh') throw new UnauthorizedException();
    return payload;
  }
}
