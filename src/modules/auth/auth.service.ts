import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth, Login } from './auth.model';
import { InjectModel } from '@app/transformers/model.transformer';
import { MongooseModel } from '@app/interfaces/mongoose.interface';
import { encodeBcrypt, decodeBcrypt } from '@app/transformers/decode.transformer';
import { HttpBadRequestError } from '@app/common/error/bad-request.error';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth) 
    private readonly authModel: MongooseModel<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(login: Login) {
    const user = await this.validateUser(login.username, login.password);
    if (!user) {
      throw new HttpBadRequestError('账号密码错误');
    }
    const payload = { nickname: user.nickname };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(auth: Auth): Promise<Auth> {
    auth.password = encodeBcrypt(auth.password)
    const action = this.authModel.create(auth);
    return action.then(data => {
      data = data.toObject();
      Reflect.deleteProperty(data, 'password');
      return data;
    });
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.authModel.findOne({username}).exec()
    if (user && await decodeBcrypt(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
  }

  async validateJwtData(payload) {
    // 返回字段 排除password
    return await this.authModel.findOne(payload.nickname, { password: 0 })
  }
}
