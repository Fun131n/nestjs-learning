/**
 * Error Interceptor
 * @file 错误拦截器
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, throwError } from 'rxjs';
import * as TEXT from '../common/constants/text.constant';
import { catchError } from 'rxjs/operators';
import { CustomError } from '@app/common/error/custom.error';

/**
 * @class Error Interceptor
 * @classdesc 当控制器所需的Promise service发生错误时，错误在此捕获
 */
@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const call$ = next.handle();
    let statusCode;
    return call$.pipe(catchError((error) => {
      //如果为标准http错误，返回标准http错误码，内部错误返回500
      if (error instanceof HttpException) {
        statusCode = error.getStatus();
        error = error.getResponse();
      }else {
        error.message = TEXT.INTERNAL_ERROR_DEFAULT;
      }
      return throwError(new CustomError(error, statusCode))
      })
    );
  }
}
