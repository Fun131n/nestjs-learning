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
  TMessage,
  EHttpStatus,
  IHttpResultPaginate,
} from '../interfaces/http.interface';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as TEXT from '../common/constants/text.constant';
import * as META from '../common/constants/meta.constant';
import { Logger } from 'winston';

/**
 * @class TransformInterceptor
 * @classdesc 当控制器所需的Promise service成功响应时，将在此转换为标注你的数据结构
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, THttpSuccessResponse<T>> {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: Logger,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<THttpSuccessResponse<T>> {
    const call$ = next.handle();
    const target = context.getHandler();
    const request = context.switchToHttp().getRequest();
    const content = request.method + ' -> ' + request.url;
    const body = request.body ? JSON.stringify(request.body) : '{}';
    const message =
      this.reflector.get<TMessage>(META.HTTP_SUCCESS_MESSAGE, target) ||
      TEXT.HTTP_DEFAULT_SUCCESS_TEXT;
    const isPagination = this.reflector.get<boolean>(
      META.HTTP_RES_TRANSFORM_PAGINATE,
      target,
    );
    const now = Date.now();
    return call$.pipe(
      map((data: any) => {
        const result = isPagination ? transformDataToPaginate<T>(data) : data || null;
        const transformResult = {
          statusCode: EHttpStatus.Success,
          message,
          result,
        };
        this.logger.info(
          `\n收到请求：${content} \n请求参数：${body} \n响应内容：${JSON.stringify(
            transformResult,
          )} \n耗时：${Date.now() - now}ms`,
        );
        return transformResult;
      }),
    );
  }
}

// 分页数据转标准数据
export function transformDataToPaginate<T>(
  data: any,
): IHttpResultPaginate<T[]> {
  return {
    data: data.arr,
    pagination: {
      total: data.total,
      page: data.page,
      // total_page: data.pages,
      limit: data.limit,
    },
  };
}
