import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as fs from 'fs';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: fs.readFileSync('src/auth/keys/public.pem'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    console.log('AccessTokenStrategy', payload.type);

    if (payload.type !== 'access') throw new UnauthorizedException();
    return payload;
  }
}
