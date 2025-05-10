import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

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

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Req() req: Request) {
    return { user: req['user'] };
  }

  @Get('refresh')
  refresh(@Query('refreshToken') refreshToken: string) {
    const newToken = this.authService.refreshToken(refreshToken);
    if (newToken) return newToken;
    return { error: 'invalid or expired refresh token' };
  }

  @Get('logout')
  logout(@Query('refreshToken') refreshToken: string) {
    this.authService.logout(refreshToken);
    return { message: 'Logged out' };
  }
}
