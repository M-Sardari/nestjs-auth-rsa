import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { TokenStoreService } from './tokens/token-store.service';

@Injectable()
export class AuthService {
  private privateKey: Buffer;
  private publicKey: Buffer;

  constructor(private tokenStore: TokenStoreService) {
    this.privateKey = fs.readFileSync('src/auth/keys/private.pem');
    this.publicKey = fs.readFileSync('src/auth/keys/public.pem');
  }

  login(username: string, password: string) {
    if (username === 'admin' && password === '123456') {
      const payload = { username };

      const accessToken = jwt.sign(payload, this.privateKey, {
        algorithm: 'RS256',
        expiresIn: '1m',
      });

      const refreshToken = jwt.sign(payload, this.privateKey, {
        algorithm: 'RS256',
        expiresIn: '3m',
      });

      this.tokenStore.addToken(refreshToken);

      return { accessToken, refreshToken };
    }
    return null;
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, this.publicKey);
    } catch {
      return null;
    }
  }

  refreshToken(oldRefreshToken: string) {
    if (!this.tokenStore.hasToken(oldRefreshToken)) {
      return null;
    }

    try {
      const payload = jwt.verify(oldRefreshToken, this.publicKey);
      const newAccessToken = jwt.sign(
        { username: payload['username'] },
        this.privateKey,
        {
          algorithm: 'RS256',
          expiresIn: '1m',
        },
      );

      return { accessToken: newAccessToken };
    } catch {
      return null;
    }
  }

  logout(refreshToken: string) {
    this.tokenStore.removeToken(refreshToken);
  }
}
