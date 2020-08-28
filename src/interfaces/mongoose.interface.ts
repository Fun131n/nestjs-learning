import { ModelType } from "@typegoose/typegoose/lib/types";
import { PaginateModel, Document } from "mongoose";
/**
 * Mongoose和PaginateModel模型兼容
 */
export type MongooseModel<T> = ModelType<T> & PaginateModel<T & Document>;
