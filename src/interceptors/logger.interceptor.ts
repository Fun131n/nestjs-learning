import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  BadRequestException,
  BadGatewayException,
} from '@nestjs/common';
import { Logger } from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const call$ = next.handle();
    const request = context.switchToHttp().getRequest();
    const content = request.method + ' -> ' + request.url;
    const body = request.body ? JSON.stringify(request.body) : '{}';
    this.logger.info(`\n收到请求：${content} \n请求参数： ${body}`);
    const now = Date.now();
    // return call$.pipe(tap((value) => this.logger.info(`\n响应请求：${content} \n响应内容：${JSON.stringify(value)} \n耗时：${Date.now() - now}ms`)))
    return call$.pipe(
      tap((value: any) => {
        // console.log('Log: LoggingInterceptor -> constructor -> data', value)
      }),
    );
  }
}
