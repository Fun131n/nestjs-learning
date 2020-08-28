/**
 * 鉴权数据模型
 */

import { IsNotEmpty } from "class-validator";

export class Login {
  @IsNotEmpty({message: '缺少参数username'})
  username: string;

  @IsNotEmpty({message: '缺少参数password'})
  password: string;
}