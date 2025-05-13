import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { RefreshTokenGuard } from '../common/guards/refresh-token.guard';
import { AccessTokenGuard } from '../common/guards/access-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  login(
    @Query('username') username: string,
    @Query('password') password: string,
  ) {
    const tokens = this.authService.login(username, password);
    if (tokens) return tokens;
    return { error: 'invalid credentials' };
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  profile(@Req() req: Request) {
    return { user: req['user'] };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refresh(@Query('refreshToken') refreshToken: string) {
    const newToken = this.authService.refreshToken(refreshToken);
    if (newToken) return newToken;
    return { error: 'invalid or expired refresh token' };
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Query('refreshToken') refreshToken: string) {
    this.authService.logout(refreshToken);
    return { message: 'Logged out' };
  }
}
