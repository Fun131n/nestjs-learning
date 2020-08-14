import { Controller, Request, Post, UseGuards, Get, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth, Login } from './auth.model';
import { HttpProcessor } from '@app/decorators/http.decorator';
import { JwtGuard } from '@app/guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('signUp')
  async signUp(@Body() auth: Auth) {
    return this.authService.signUp(auth);
  }
  
  @Post('signIn')
  @HttpProcessor.handle({ message: '登录', error: HttpStatus.BAD_REQUEST})
  async signIn(@Body() login: Login) {
    return this.authService.signIn(login);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
