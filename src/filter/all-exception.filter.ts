import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus } from "@nestjs/common";
import { Logger } from "winston";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly logger: Logger) {}

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const content = request.method + ' -> ' + request.url
        const body = request.body ? JSON.stringify(request.body) : '{}'
        const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
        const msg =
          exception instanceof HttpException
            ? exception.message
            : 'Internal server error';
        const exceptionJSON = `statusCode:${status},msg:${exception.toString()}`
        this.logger.info(`\n收到请求：${content} \n请求参数： ${body}` )
        this.logger.error(exceptionJSON);
        response.status(status).json({
            statusCode: status,
            msg: msg
        })
    }
}