import { prop, plugin, Ref } from '@typegoose/typegoose';
import { BaseModel } from 'models/base.model'
import mongoosePaginate from 'mongoose-paginate-v2'
import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsInt, IsDataURI } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../articles/articles.model';
import { Types } from 'mongoose';

class Like {
  article_id?: Types.ObjectId;
  comment_id?: Types.ObjectId;
  reply_id?: Types.ObjectId;
}

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
  @prop({ select: false })
  @ApiProperty({
    description: '用户邮箱'
  })
  email: string;

  @prop({ default: [], ref: User })
  @ApiProperty({
    description: '关注的用户'
  })
  following?: Ref<User>[];

  @prop({ default: [], ref: User })
  @ApiProperty({
    description: '被关注的用户'
  })
  followers?: Ref<User>[];

  @prop({ default: [], ref: Article })
  @ApiProperty({
    description: '用户创建的文章'
  })
  contents?: Ref<Article>[];

  @prop({
    default: [],
    items: Article
  })
  @ApiProperty({
    description: '用户收藏的文章'
  })
  favorites?: Article[];

  @prop({
    default: [],
    items: Like
  })
  @ApiProperty({
    description: '用户点赞的文章/评论/回复'
  })
  likes?: Like[]
}
