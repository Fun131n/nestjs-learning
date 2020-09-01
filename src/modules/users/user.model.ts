import { prop, plugin } from '@typegoose/typegoose';
import { BaseModel } from 'models/base.model'
import mongoosePaginate from 'mongoose-paginate'

@plugin(mongoosePaginate)
export class User extends BaseModel {

  @prop()
  username: string;

  @prop()
  nickname: string;

  @prop({ select: false })
  password: string;
}
