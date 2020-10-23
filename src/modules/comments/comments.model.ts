import { BaseModel } from "@app/models/base.model";
import { ApiProperty, PickType } from "@nestjs/swagger";
import { plugin, prop, Ref } from "@typegoose/typegoose";
import { ArrayMaxSize, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Types } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import { Reply } from "../replys/replys.model";
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

  @prop({ ref: User})
  @IsNotEmpty()
  @ApiProperty({
    description: '评论作者'
  })
  author: Ref<User>

  @prop({ default: [], ref: Reply})
  replies?: Ref<Reply>[]
}
