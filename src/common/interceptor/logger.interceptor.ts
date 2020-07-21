import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { Logger } from 'winston'
import { Injectable, NestInterceptor, CallHandler, ExecutionContext, BadRequestException } from '@nestjs/common'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: Logger) { }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const call$ = next.handle()
        const request = context.switchToHttp().getRequest();
        const content = request.method + ' -> ' + request.url
        const body = request.body ? JSON.stringify(request.body) : '{}'
        this.logger.info(`收到请求：${content} body: ${body}`)
        const now = Date.now()
        return call$.pipe(tap((value) => this.logger.info(`响应请求：${content} 响应内容：${JSON.stringify(value)} 耗时：${Date.now() - now}ms`)))
    }
}
