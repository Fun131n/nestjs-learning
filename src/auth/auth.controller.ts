import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Roles } from 'src/common/roles/roles.decorator';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    // @Roles('superAdmin')
    getProfile(@Request() req) {
        return req.user;
    }
}