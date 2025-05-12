import { Injectable } from '@nestjs/common';
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
      passReqToCallback: true,
    });
  }

  async validate(payload: any) {
    return payload;
  }
}

// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class RefreshTokenStrategy extends PassportStrategy(
//   Strategy,
//   'jwt-refresh',
// ) {
//   constructor(private configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // یا از کوکی
//       secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
//       passReqToCallback: true,
//     });
//   }

//   async validate(req: any, payload: any) {
//     // می‌تونی اینجا چک اضافه هم کنی (مثلاً user active بودن یا tokenVersion)
//     return payload;
//   }
// }
