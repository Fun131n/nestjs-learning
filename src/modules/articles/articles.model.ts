import { BaseModel } from "@app/models/base.model";
import { prop, plugin } from "@typegoose/typegoose";
import { isNotEmpty, IsNotEmpty } from "class-validator";
import { EPublishState } from "@app/common/enum/state.enum";
import mongoosePaginate from 'mongoose-paginate-v2'
import { ApiProperty } from "@nestjs/swagger";

@plugin(mongoosePaginate)
export class Article extends BaseModel {
  
  @prop()
  @IsNotEmpty({
    message: '标题不能为空',
  })
  @ApiProperty({
    description: '标题'
  })
  title: string;

  @prop()
  @IsNotEmpty({
    message: '描述不能为空',
  })
  @ApiProperty({
    description: '描述'
  })
  content: string;

  @prop()
  @IsNotEmpty()
  @ApiProperty({
    description: '房间密码'
  })
  password?: string;

  @prop()
  @IsNotEmpty({
    message: '创建者的论点不能为空',
  })
  @ApiProperty({
    description: '创建者论点'
  })
  author_viewpoint: string;

  @prop()
  @ApiProperty({
    description: '创建者ID'
  })
  author_id: string;
  
  @prop({
    default: [],
    items: String
  })
  @ApiProperty({
    description: '创建者论据'
  })
  author_arguments?: String[];

  @prop()
  @ApiProperty({
    description: '参与者论点'
  })
  debater_viewpoint?: string;

  @prop()
  @ApiProperty({
    description: '参与者ID'
  })
  debater_id?: string;
  
  @prop({
    default: [],
    items: String
  })
  @ApiProperty({
    description: '参与者论据'
  })
  debater_arguments?: String[];

  @prop({ default: EPublishState.Pending})
  @ApiProperty({
    description: '发布状态'
  })
  state?: EPublishState;

  @prop({ default: 0 })
  @ApiProperty({
    description: '被查看次数'
  })
  views_count?: number;

  @prop({ default: 0 })
  @ApiProperty({
    description: '评论数'
  })
  comments_count?: number;

  @prop({ default: 0 })
  @ApiProperty({
    description: '被收藏数'
  })
  favorites_count?: number;
}