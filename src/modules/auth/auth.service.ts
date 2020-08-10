import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './auth.model';
import { InjectModel } from '@app/transformers/model.transformer';
import { MongooseModel } from '@app/interfaces/mongoose.interface';
import { encodeBcrypt } from '@app/transformers/decode.transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth) 
    private readonly authModel: MongooseModel<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(account: string, password: string): Promise<any> {
    // const user = await this.userSerivce.findOneWithPassword(account);
    // if (user && await bcrypt.compare(password, user.password)) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    return {}
  }

  // async login(user: any) {
  //   const payload = { nickname: user.nickname };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async create(auth: Auth): Promise<Auth> {
    auth.password = encodeBcrypt(auth.password)
    const action = this.authModel.create(auth);
    return action.then(data => {
      data = data.toObject();
      Reflect.deleteProperty(data, 'password');
      return data;
    });
  }
}
