import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@app/guards/strategy/local.strategy';
import { AuthController } from '@app/modules/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@app/common/jwt/constants';
import { JwtStrategy } from '@app/guards/strategy/jwt.strategy';
import { AuthProvider } from './auth.model';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7200s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthProvider, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
