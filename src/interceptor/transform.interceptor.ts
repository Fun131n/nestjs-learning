import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { THttpSuccessResponse, THttpErrorResponse, TMessage, EHttpStatus } from "../interfaces/http.interface";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as TEXT from '../common/constants/text.constant'
import * as META from '../common/constants/meta.constant'

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T,THttpSuccessResponse<T>> {

    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<THttpSuccessResponse<T>> {
        const call$ = next.handle();
        const target = context.getHandler();
        const request = context.switchToHttp().getRequest();
        const msg = this.reflector.get<TMessage>(META.HTTP_SUCCESS_MESSAGE, target) || TEXT.HTTP_DEFAULT_SUCCESS_TEXT;
        return call$.pipe(map((data: any) => {
            const result = data;
            return { statusCode: EHttpStatus.Success, msg, result };
        }));
    }
}