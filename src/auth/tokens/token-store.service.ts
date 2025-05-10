import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenStoreService {
  private refreshTokens: string[] = [];

  addToken(token: string) {
    this.refreshTokens.push(token);
  }

  removeToken(token: string) {
    this.refreshTokens = this.refreshTokens.filter((t) => t !== token);
  }

  hasToken(token: string) {
    return this.refreshTokens.includes(token);
  }
}
