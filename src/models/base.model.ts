import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

/**
 * 数据模型默认添加以下时间戳
 * createdAt: Date
 * updatedAt: Date
 */
export class BaseModel extends TimeStamps {}