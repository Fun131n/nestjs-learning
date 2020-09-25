import { BaseModel } from "@app/models/base.model";
import { prop, plugin } from "@typegoose/typegoose";
import { IsNotEmpty, IsInt } from "class-validator";
import { EPublishState } from "@app/common/enum/state.enum";
import mongoosePaginate from 'mongoose-paginate'
import { ApiProperty } from "@nestjs/swagger";
import { Base } from "@typegoose/typegoose/lib/defaultClasses";

@plugin(mongoosePaginate)
export class Article extends BaseModel {
  
  @prop()
  @IsNotEmpty()
  @ApiProperty({
    description: '文章标题'
  })
  title: string;

  @prop()
  @IsNotEmpty()
  @ApiProperty({
    description: '文章内容'
  })
  content: string;

  @prop()
  @ApiProperty({
    description: '文章作者ID'
  })
  author_id: string;

  @prop({ default: EPublishState.Pending})
  @ApiProperty({
    description: '文章发布状态'
  })
  state?: EPublishState;

  @prop({ default: 0 })
  @ApiProperty({
    description: '文章被查看次数'
  })
  views_count?: number;

  @prop({ default: 0 })
  @ApiProperty({
    description: '文章评论数'
  })
  comments_count?: number;

  @prop({ default: 0 })
  @ApiProperty({
    description: '文章被收藏数'
  })
  favorites_count?: number;
}