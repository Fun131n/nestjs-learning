/**
 * Error Interceptor
 * @file 错误拦截器
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, throwError } from 'rxjs';
import * as TEXT from '../common/constants/text.constant';
import * as META from '../common/constants/meta.constant';
import { TMessage } from 'src/interfaces/http.interface';
import { catchError } from 'rxjs/operators';
import { CustomError } from 'src/common/error/custom.error';

/**
 * @class Error Interceptor
 * @classdesc 当控制器所需的Promise service发生错误时，错误在此捕获
 */
@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const call$ = next.handle();
    const target = context.getHandler();
    const statusCode = this.reflector.get<HttpStatus>(
      META.HTTP_ERROR_CODE,
      target,
    );
    const message =
      this.reflector.get<TMessage>(META.HTTP_ERROR_MESSAGE, target) ||
      TEXT.HTTP_DEFAULT_ERROR_TEXT;
    return call$.pipe(
      catchError((error) =>
        throwError(new CustomError({ message, error }, statusCode)),
      ),
    );
  }
}
