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
  TExceptionOption,
  TMessage,
  THttpErrorResponse,
  EHttpStatus,
} from 'src/interfaces/http.interface';
import { isDevMode } from 'src/app.environment';

/**
 * @class AllExceptionsFilter
 * @classdesc 拦截全局抛出的所有异常，同时任何异常都将规范化输出 THTTPErrorResponse
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorOption: TExceptionOption = exception.getResponse() as TExceptionOption;
    const isString = (value): value is TMessage => value instanceof String;
    const errMessage = isString(errorOption)
      ? errorOption
      : errorOption.message;
    const errorInfo = isString(errorOption) ? null : errorOption.error;
    const parentErrorInfo = errorInfo ? String(errorInfo) : null;
    const isChildrenError = errorInfo && errorInfo.status && errorInfo.message;
    const resultError =
      (isChildrenError && errorInfo.message) || parentErrorInfo;
    const resultStatus = isChildrenError ? errorInfo.status : status;
    const body = request.body ? JSON.stringify(request.body) : '{}';
    const data: THttpErrorResponse = {
      statusCode: status,
      message: errMessage,
      error: resultError,
      debug: isDevMode ? exception.stack : null,
    };
    if (status === HttpStatus.NOT_FOUND) {
      data.error = `资源不存在`;
      data.message = `接口 ${request.method} -> ${request.url} 无效`;
    }
    const errorLog =
      '\n收到请求：' +
      request.method +
      '->' +
      request.url +
      '\n请求参数：' +
      JSON.stringify(body) +
      '\n响应内容：' +
      JSON.stringify(data);
    this.logger.error(errorLog);
    const { debug, ...responseData } = data;
    return response.status(resultStatus).jsonp(responseData);
  }
}
