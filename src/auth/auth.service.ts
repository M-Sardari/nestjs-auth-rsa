import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
  private privateKey: Buffer;
  private publicKey: Buffer;

  constructor(private redis: RedisService) {
    this.privateKey = fs.readFileSync('src/auth/keys/private.pem');
    this.publicKey = fs.readFileSync('src/auth/keys/public.pem');
  }

  async login(username: string, password: string) {
    if (username === 'admin' && password === '123456') {
      const payload = { username };

      const accessToken = jwt.sign(payload, this.privateKey, {
        algorithm: 'RS256',
        expiresIn: '60s',
      });

      const refreshToken = jwt.sign(payload, this.privateKey, {
        algorithm: 'RS256',
        expiresIn: '7d',
      });

      await this.redis.set(refreshToken, 'valid', 7 * 24 * 3600);

      return { accessToken, refreshToken };
    }
    return null;
  }

  async refreshToken(refreshToken: string) {
    const exists = await this.redis.get(refreshToken);
    if (!exists) {
      return null;
    }

    try {
      const payload = jwt.verify(refreshToken, this.publicKey);
      const newAccessToken = jwt.sign(
        { username: payload['username'] },
        this.privateKey,
        {
          algorithm: 'RS256',
          expiresIn: '60s',
        },
      );

      return { accessToken: newAccessToken };
    } catch {
      return null;
    }
  }

  async logout(refreshToken: string) {
    await this.redis.del(refreshToken);
  }
}
