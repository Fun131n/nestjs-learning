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
  THttpErrorResponse,
} from '@app/interfaces/http.interface';
import { isDevMode } from '@app/app.environment';
import * as TEXT from '@app/common/constants/text.constant';
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
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorOption: TExceptionOption = exception.getResponse() as TExceptionOption;
    const errMessage = errorOption.message;
    const errInfo = errorOption.error;
    const body = request.body ? JSON.stringify(request.body) : '{}';
    const data: THttpErrorResponse = {
      statusCode: status,
      message: errMessage,
      error: errInfo,
      // debug: isDevMode ? exception.stack : null,
    };
    if (status === HttpStatus.NOT_FOUND) {
      if (data.error == 'Not Found') {
        // 区分是由于资源不存在的404还是接口地址错误的404
        // 疑问：是否有必要区分
        data.message = TEXT.NOTFOUND_ERROR_DEFAULT;
        data.error = `接口 ${request.method} -> ${request.url} 无效`;
      }
    }
    const errorLog =
      '\n收到请求：' +
      request.method +
      ' -> ' +
      request.url +
      '\n请求参数：' +
      JSON.stringify(body) +
      '\n响应内容：' +
      JSON.stringify(data);
    this.logger.error(errorLog);
    const { debug, ...responseData } = data;
    return response.status(status).json(responseData);
  }
}
