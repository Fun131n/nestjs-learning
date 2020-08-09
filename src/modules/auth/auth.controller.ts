import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Auth } from './auth.model';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  // @UseGuards(AuthGuard('local'))
  @Post('signUp')
  async create(@Body() auth: Auth) {
    return this.authService.create(auth);
  }
  
  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
