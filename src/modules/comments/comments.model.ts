import { BaseModel } from "@app/models/base.model";
import { ApiProperty, PickType } from "@nestjs/swagger";
import { plugin, prop } from "@typegoose/typegoose";
import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import mongoosePaginate from 'mongoose-paginate'
import { User } from "../users/user.model";

@plugin(mongoosePaginate)
export class Comment extends BaseModel {

  @prop()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '文章id'
  })
  article_id: Types.ObjectId

  @prop()
  @IsNotEmpty()
  @ApiProperty({
    description: '评论内容'
  })
  content: string

  @prop()
  @IsNotEmpty()
  @ApiProperty({
    description: '评论作者'
  })
  author: Author
}

export class Author extends PickType(User, [
  'nickname',
  'avatar',
  'followers_count',
  'following_count'
] as const) {}