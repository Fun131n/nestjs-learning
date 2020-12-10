import { BaseModel } from "@app/models/base.model";
import { ApiProperty } from "@nestjs/swagger";
import { Plugins, prop, Ref } from "@typegoose/typegoose";
import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import { User } from "../users/user.model";

@Plugins(mongoosePaginate)
export class Reply extends BaseModel {
  
  @prop()
  @IsNotEmpty()
  @ApiProperty({
    description: '评论ID'
  })
  comment_id: Types.ObjectId;

  @prop({
    default: null
  })
  @ApiProperty({
    description: '回复对象的ID'
  })
  reply_to_id?: null | Types.ObjectId;

  @prop({ ref: User})
  @ApiProperty({
    description: '回复对象'
  })
  reply_to_user?: Ref<User>

  @prop()
  @IsNotEmpty()
  @ApiProperty({
    description: '回复内容'
  })
  content: string;

  @prop({ ref: User})
  @IsNotEmpty()
  @ApiProperty({
    description: '评论作者'
  })
  author: Ref<User>
}