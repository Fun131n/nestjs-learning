import { ConflictException } from "@nestjs/common";
import * as TEXT from '../constants/text.constant';

/**
 * @class ConflictError
 * @classdesc 409 -> 资源已存在
 * @example new ConflictError('用户名已存在')
 */
export class ConflictError extends ConflictException {
  constructor(error?: any) {
    super({message: TEXT.CONFLICT_ERROR_DEFAULT, error: error});
  }
}