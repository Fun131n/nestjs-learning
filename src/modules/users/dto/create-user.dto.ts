import { IsNotEmpty, MinLength, MaxLength, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(10)
  nickname: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsEmail()
  email: string;

  avatar?: string;
}