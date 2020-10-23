import { prop, plugin } from '@typegoose/typegoose';
import { BaseModel } from 'models/base.model'
import mongoosePaginate from 'mongoose-paginate-v2'
import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsInt, IsDataURI } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../articles/articles.model';

@plugin(mongoosePaginate)
export class User extends BaseModel {

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(10)
  @prop()
  @ApiProperty({
    description: '用户昵称'
  })
  nickname: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @prop({ select: false })
  @ApiProperty({
    description: '用户密码'
  })
  password: string;

  @IsDataURI()
  @prop()
  @ApiProperty({
    description: '用户头像'
  })
  avatar?: string;

  @IsEmail()
  @prop()
  @ApiProperty({
    description: '用户邮箱'
  })
  email: string;

  @IsInt()
  @prop({ default: 0 })
  @ApiProperty({
    description: '用户关注数'
  })
  following_count?: number;

  @IsInt()
  @prop({ default: 0 })
  @ApiProperty({
    description: '用户被关注数'
  })
  followers_count?: number;

  @IsInt()
  @prop({ default: 0 })
  @ApiProperty({
    description: '用户话题数'
  })
  contents_count?: number;

  @ApiProperty({
    description: '用户收藏的话题'
  })
  @prop({
    default: [],
    items: Article
  })
  favorites?: Article[];
}
