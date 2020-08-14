import { HttpException, HttpStatus } from "@nestjs/common";
import * as TEXT from '../constants/text.constant';

/**
 * @class HttpBadRequestError
 * @classdesc 默认 400 -> 请求参数有误
 * @example new HttpBadRequestError('错误信息')
 */
export class HttpBadRequestError extends HttpException {
  constructor(error?: any) {
    super({message: TEXT.VALIDATION_ERROR_DEFAULT, error}, HttpStatus.BAD_REQUEST);
  }
}