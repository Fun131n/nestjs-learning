/**
 * Custom error.
 * @file 自定义错误定制器
 */

import { HttpException, HttpStatus } from '@nestjs/common';
import { TExceptionOption } from '../../interfaces/http.interface';

/**
 * @class CustomError
 * @classdesc 默认 500 -> 服务端出错
 * 返回内部错误，让响应继续执行
 * @example new CustomError({ message: '错误信息' }, 400)
 * @example new CustomError({ message: '错误信息', error: new Error(xxx) })
 */
export class CustomError extends HttpException {
  constructor(options: TExceptionOption, statusCode?: HttpStatus) {
    super(options, statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
