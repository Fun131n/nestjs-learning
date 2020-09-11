import { IsNotEmpty, MinLength, MaxLength, IsEmail } from "class-validator";
import { PickType } from "@nestjs/swagger";
import { User } from "../user.model";

export class CreateUserDto extends PickType(User, [
  'nickname',
  'password',
  'email',
] as const) {}