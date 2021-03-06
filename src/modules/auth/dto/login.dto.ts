/**
 * 鉴权数据模型
 */

import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNotEmpty({message: '缺少参数email'})
  email: string;

  @IsNotEmpty({message: '缺少参数password'})
  password: string;
}