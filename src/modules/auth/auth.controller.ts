import { Controller, Request, Post, UseGuards, Get, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './auth.model';
import { HttpProcessor } from '@app/decorators/http.decorator';
import { JwtGuard } from '@app/guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  async login(@Body() login: Login) {
    return this.authService.login(login);
  }
}
