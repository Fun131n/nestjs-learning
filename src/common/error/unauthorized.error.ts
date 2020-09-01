import { UnauthorizedException, HttpStatus } from "@nestjs/common";
import * as TEXT from '../constants/text.constant';

/**
 * @class UnauthorizedError
 * @classdesc 默认 401 -> 权限认证失败
 * @example new UnauthorizedError('错误信息')
 */
export class UnauthorizedError extends UnauthorizedException {
  constructor(error?: any) {
    super({message: TEXT.UNAUTHORIZED_ERROR_DEFAULT, error});
  }
}