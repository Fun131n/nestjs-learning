import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { HttpBadRequestError } from "@app/common/error/bad-request.error";

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(error, user, errorInfo, context) {
    const request = context.switchToHttp().getRequest().body;
    let errorMsg; 
    if (!request.password) {
      errorMsg = '请输入正确的密码'
    }
    if (!request.username) {
      errorMsg = '请输入正确的账号'
    }
    if (user && !error && !errorInfo) {
      return user;
    } else {
      throw error || new HttpBadRequestError(errorMsg);
    }
  } 
}