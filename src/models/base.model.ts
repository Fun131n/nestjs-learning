import { modelOptions, prop } from "@typegoose/typegoose";
import dayjs from 'dayjs'
import { Types } from "mongoose";

/**
 * 数据模型默认添加以下时间戳
 * createdAt: Date
 * updatedAt: Date
 */
@modelOptions({
  schemaOptions: {
    timestamps: { 
      createdAt: 'created_at', 
      updatedAt: 'updated_at' 
    },
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        ret.created_at = dayjs(ret.created_at).format('YYYY-MM-DD HH:mm:ss');
        ret.updated_at = dayjs(ret.updated_at).format('YYYY-MM-DD HH:mm:ss');
        return ret;
      }
    }
  }
})
export class BaseModel {
  _id: Types.ObjectId;
}