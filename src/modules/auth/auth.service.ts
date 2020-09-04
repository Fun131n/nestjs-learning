import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encodeBcrypt, decodeBcrypt } from '@app/transformers/decode.transformer';
import { ValidationError } from '@app/common/error/validation.error';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(LoginDto: LoginDto) {
    const user = await this.validateUser(LoginDto.username, LoginDto.password);
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
