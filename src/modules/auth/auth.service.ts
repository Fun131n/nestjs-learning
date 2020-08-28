import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Login } from './auth.model';
import { encodeBcrypt, decodeBcrypt } from '@app/transformers/decode.transformer';
import { ValidationError } from '@app/common/error/validation.error';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(login: Login) {
    const user = await this.validateUser(login.username, login.password);
    if (!user) {
      throw new ValidationError('账号或密码错误');
    }
    const payload = { nickname: user.nickname };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username)
    if (user && await decodeBcrypt(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
  }
}
