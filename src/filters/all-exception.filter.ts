/**
 * Exception Filter
 * @file 全局异常拦截器
 */

import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from 'winston';
import {
  TExceptionMessage,
  TExceptionOption,
  THttpErrorResponse,
} from '@app/interfaces/http.interface';
import { isDevMode } from '@app/app.environment';
import * as TEXT from '@app/common/constants/text.constant';
import { ExtLoggerService } from '@app/processors/helper/logger.service';
/**
 * @class AllExceptionsFilter
 * @classdesc 拦截全局抛出的所有异常，同时任何异常都将规范化输出 THTTPErrorResponse
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: ExtLoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorOption: TExceptionOption = exception instanceof HttpException ? exception.getResponse() as TExceptionOption : exception;
    const isString = (value): value is TExceptionMessage => value instanceof String;
    const errMessage = isString(errorOption) ? errorOption : errorOption.message;
    const errInfo =isString(errorOption) ? null : errorOption.error;
    const body = request.body ? JSON.stringify(request.body) : '{}';
    const data: THttpErrorResponse = {
      statusCode: status,
      message: errMessage,
      error: errInfo,
      debug: isDevMode ? exception.stack : null,
    };
    if (status === HttpStatus.NOT_FOUND) {
      if (data.error == 'Not Found') {
        // 区分是由于资源不存在的404还是接口地址错误的404
        // 疑问：是否有必要区分
        data.message = TEXT.NOTFOUND_ERROR_DEFAULT;
        data.error = `接口 ${request.method} -> ${request.url} 无效`;
      }
    }
    // 处理一些代码层面错误，返回500
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        data.message = TEXT.INTERNAL_ERROR_DEFAULT;
    }
    const errorLog =
      '\n收到请求：' +
      request.method +
      ' -> ' +
      request.url +
      '\n请求体：' +
      JSON.stringify(body) +
      '\n响应状态：' +
      status +
      '\n响应内容：' +
      JSON.stringify(data);
    this.logger.error(errorLog);
    const { debug, ...responseData } = data;
    return response.status(status).json(responseData);
  }
}
