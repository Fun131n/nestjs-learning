import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '@app/modules/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@app/common/jwt/constants';
import { JwtStrategy } from '@app/guards/strategy/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7200s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  // exports: [AuthService],
})
export class AuthModule {}
