import { IsNotEmpty, Min, Max, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  account: string;

  @IsNotEmpty()
  @MinLength(6,{message: '密码长度需8-20位'})
  @MaxLength(20)
  password: string;
}
