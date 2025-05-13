import { Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';

@Injectable()
export class TokenStoreService {
  constructor(@Inject('CACHE_MANAGER') private cacheManager: Cache) {}

  async setRefreshToken(userId: string, token: string, ttlSeconds: number) {
    await this.cacheManager.set(`refreshToken:${userId}`, token, ttlSeconds);
  }

  async getRefreshToken(userId: string) {
    return await this.cacheManager.get(`refreshToken:${userId}`);
  }

  async removeRefreshToken(userId: string) {
    await this.cacheManager.del(`refreshToken:${userId}`);
  }
}
