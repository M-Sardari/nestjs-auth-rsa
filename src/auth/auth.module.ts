import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { TokenStoreService } from './tokens/token-store.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, TokenStoreService],
  exports: [AuthService],
})
export class AuthModule {}
