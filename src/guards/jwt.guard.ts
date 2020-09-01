import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UnauthorizedError } from "@app/common/error/unauthorized.error";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(error, authInfo, errInfo) {
    if (authInfo && !error && !errInfo) {
      return authInfo;
    } else {
      throw error || new UnauthorizedError(errInfo?.message);
    }
  } 
}