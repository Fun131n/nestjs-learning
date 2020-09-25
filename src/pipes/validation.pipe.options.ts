import { ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from '@app/common/error/validation.error';

/**
 * ValidationOptions
 * 使用nestjs自带的ValidationPipe，传入options
 */
export class ValidationOptions implements ValidationPipeOptions {
  // whitelist，如果设置为true，验证器将去掉没有使用任何验证装饰器的属性的验证（返回的）对象
  whitelist = true
  // forbidNonWhitelisted 如果设置为true，验证器不会去掉非白名单的属性，而是会抛出异常
  // forbidNonWhitelisted = true
  exceptionFactory = (errors) => {
    const errorMessage = errors.map(error => Object.values(error.constraints).join(';')).join(';');
    throw new ValidationError(errorMessage)
  }
}