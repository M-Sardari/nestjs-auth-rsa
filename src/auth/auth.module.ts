import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from '../common/strategies/jwt-access.strategy';
import { RedisService } from '../redis/redis.service';
import { RefreshTokenStrategy } from '../common/strategies/jwt-refresh.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RedisService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
