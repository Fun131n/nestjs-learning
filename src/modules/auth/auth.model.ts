/**
 * 用户数据模型
 */

import { getProviderByTypegooseClass } from "@app/transformers/model.transformer";
import { prop } from "@typegoose/typegoose";
import { IsDefined } from "class-validator";

export class Auth {

  @IsDefined()
  @prop({ default: '' })
  nickname: string

  @IsDefined()
  @prop({ default: '' })
  account: string;
  
  @IsDefined()
  @prop()
  password?: string;

}

export class Login {
  @IsDefined()
  password: string;
}

export const AuthProvider = getProviderByTypegooseClass(Auth);
