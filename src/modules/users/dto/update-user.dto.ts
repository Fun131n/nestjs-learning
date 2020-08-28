import { MinLength, MaxLength } from "class-validator";

export class UpdateUserDto {
  @MinLength(2)
  @MaxLength(10)
  nickname?: string;
}