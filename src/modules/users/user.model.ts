import { prop, plugin } from '@typegoose/typegoose';
import { BaseModel } from 'models/base.model'
import mongoosePaginate from 'mongoose-paginate'
import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsInt, IsDataURI } from 'class-validator';

@plugin(mongoosePaginate)
export class User extends BaseModel {

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(10)
  @prop()
  nickname: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @prop({ select: false })
  password: string;

  @IsDataURI()
  @prop()
  avatar?: string;

  @IsEmail()
  @prop()
  email: string;

  @IsInt()
  @prop({ default: 0 })
  following: number;

  @IsInt()
  @prop({ default: 0 })
  followers: number;

  @IsInt()
  @prop({ default: 0 })
  contents: number;
}


export function setUserDefault() {
  return {
    following: 0,
    followers: 0,
    contents: 0,
  }
}