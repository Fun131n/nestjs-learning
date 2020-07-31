/**
 * Transform interc
 * @file 请求流拦截器
 */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { THttpSuccessResponse, THttpErrorResponse, TMessage, EHttpStatus } from "../interfaces/http.interface";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as TEXT from '../common/constants/text.constant'
import * as META from '../common/constants/meta.constant'
import { Logger } from "winston";

/**
 * @class TransformInterceptor
 * @classdesc 当控制器所需的Promise service成功响应时，将在此转换为标注你的数据结构
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T,THttpSuccessResponse<T>> {

    constructor(private readonly reflector: Reflector,private readonly logger: Logger) {}

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<THttpSuccessResponse<T>> {
        const call$ = next.handle();
        const target = context.getHandler();
        const request = context.switchToHttp().getRequest();
        const content = request.method + ' -> ' + request.url
        const body = request.body ? JSON.stringify(request.body) : '{}'
        const message = this.reflector.get<TMessage>(META.HTTP_SUCCESS_MESSAGE, target) || TEXT.HTTP_DEFAULT_SUCCESS_TEXT;
        const now = Date.now()
        // return call$.pipe(tap((value) => this.logger.info(`\n响应请求：${content} \n响应内容：${JSON.stringify(value)} \n耗时：${Date.now() - now}ms`)))
        return call$.pipe(map((data: any) => {
            // const result = data;
            const result = { statusCode: EHttpStatus.Success, message, result: data };
            this.logger.info(`\n收到请求：${content} \n请求参数：${body} \n响应内容：${JSON.stringify(result)} \n耗时：${Date.now() - now}ms`);
            return result;
            // return { statusCode: EHttpStatus.Success, msg, result };
        }));
    }
}