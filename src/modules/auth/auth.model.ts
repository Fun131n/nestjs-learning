/**
 * 用户数据模型
 */

import { getProviderByTypegooseClass } from "@app/transformers/model.transformer";
import { prop } from "@typegoose/typegoose";
import { IsNotEmpty } from "class-validator";

export class Auth {

  @IsNotEmpty({message: '请填写昵称'})
  @prop({ default: '' })
  nickname: string

  @IsNotEmpty({message: '请填写账号'})
  @prop({ default: '' })
  username: string;
  
  @IsNotEmpty({message: '请填写密码'})
  @prop()
  password?: string;

}

export class Login {
  @IsNotEmpty({message: '请填写账号'})
  username: string;

  @IsNotEmpty({message: '请填写密码'})
  password: string;
}

export const AuthProvider = getProviderByTypegooseClass(Auth);
