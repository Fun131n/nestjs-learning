/**
 * Mongoose model interface.
 * @file Mongoose和Paginate模型兼容
 */

import { ModelType } from '@typegoose/typegoose/lib/types';
import { PaginateModel, Document } from "mongoose";

 export type MongooseModel<T> = ModelType<T> & PaginateModel<T & Document>