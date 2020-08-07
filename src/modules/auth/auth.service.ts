import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userSerivce: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(account: string, password: string): Promise<any> {
    console.log('Log: AuthService -> validateUser');
    const user = await this.userSerivce.findOneWithPassword(account);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: any) {
    const payload = { nickname: user.nickname };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
