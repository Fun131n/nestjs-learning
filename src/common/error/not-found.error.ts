import { BadRequestException, NotFoundException } from "@nestjs/common";
import * as TEXT from '../constants/text.constant';

/**
 * @class ValidationError
 * @classdesc 404 -> 未找到资源
 * @example new NotFoundError('未找到资源')
 * 1.接口地址非法
 * 2.未找到资源
 */
export class NotFoundError extends NotFoundException {
  constructor(error?: any) {
    super({message: TEXT.NOTFOUND_ERROR_DEFAULT, error: error});
  }
}