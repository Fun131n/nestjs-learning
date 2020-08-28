import { BadRequestException } from "@nestjs/common";
import * as TEXT from '../constants/text.constant';

/**
 * @class ValidationError
 * @classdesc 400 -> 请求参数校验失败
 * 目前没有将更详细的错误分开，如缺少参数，参数不符合条件。
 * @example new ValidationError('具体的参数错误信息')
 */
export class ValidationError extends BadRequestException {
  constructor(error?: any) {
    super({message: TEXT.VALIDATION_ERROR_DEFAULT, error: error});
  }
}