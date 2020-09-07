import { BaseModel } from "@app/models/base.model";
import { prop, plugin } from "@typegoose/typegoose";
import { IsNotEmpty, IsInt } from "class-validator";
import { EPublishState } from "@app/common/enum/state.enum";
import mongoosePaginate from 'mongoose-paginate'

@plugin(mongoosePaginate)
export class Topic extends BaseModel {

  @IsNotEmpty()
  @prop()
  title: string;

  @prop()
  @IsNotEmpty()
  content: string;

  @prop({ default: EPublishState.Pending})
  state: EPublishState;

  // 查看次数
  @prop({ default: 0 })
  views: string;

  // 评论数
  @prop({ default: 0 })
  comments: string;

}