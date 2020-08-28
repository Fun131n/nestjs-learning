/**
 * Transform interc
 * @file 请求流拦截器
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import {
  THttpSuccessResponse,
  IHttpResultPaginate,
} from '../interfaces/http.interface';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as META from '../common/constants/meta.constant';
import { Logger } from 'winston';
import { PaginateResult } from 'mongoose';

/**
 * @class TransformInterceptor
 * @classdesc 当控制器所需的Promise service成功响应时，将在此转换为标注你的数据结构
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, THttpSuccessResponse<T>> {
  constructor(private readonly reflector: Reflector, private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<THttpSuccessResponse<T>> {
    const call$ = next.handle();
    const target = context.getHandler();
    const request = context.switchToHttp().getRequest();
    const content = request.method + ' -> ' + request.url;
    const body = request.body ? JSON.stringify(request.body) : '{}';
    const isPagination = this.reflector.get<boolean>(META.HTTP_RES_TRANSFORM_PAGINATE, target);
    const now = Date.now();
    return call$.pipe(
      map((data: any) => {
        const finalData = isPagination ? transformDataToPaginate<T>(data) : data;
        this.logger.info(`\n收到请求：${content} \n请求参数：${body} \n响应内容：${JSON.stringify(finalData,)} \n耗时：${Date.now() - now}ms`);
        return finalData;
      }),
    );
  }
}

//分页返回数据再封装
export function transformDataToPaginate<T>(data: PaginateResult<T>): IHttpResultPaginate<T[]> {
  return {
    items: data.docs,
    pagination: {
      total: data.total,
      page: data.page,
      limit: data.limit,
    }
  };
}
