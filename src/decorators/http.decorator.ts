/**
 * Http decorator.
 * @file 响应解析装饰器
 */

import { HttpStatus, SetMetadata } from '@nestjs/common';
import { TMessage } from 'src/interfaces/http.interface';
import * as META from '../common/constants/meta.constant';
import * as TEXT from '../common/constants/text.constant';

// 构造器参数
interface IBuildDecoratorOption {
  errorCode?: HttpStatus;
  successCode?: HttpStatus;
  errorMessage?: TMessage;
  successMessage?: TMessage;
  isPagination?: boolean;
}

// handle 参数
interface IHandleOption {
  error?: HttpStatus;
  success?: HttpStatus;
  message: TMessage;
  isPagination?: boolean;
}

type THandleOption = TMessage | IHandleOption;

// 构造请求装饰器
const buildHttpDecorator = (
  options: IBuildDecoratorOption,
): MethodDecorator => {
  const {
    errorMessage,
    successMessage,
    errorCode,
    successCode,
    isPagination,
  } = options;
  return (_, __, descriptor: PropertyDescriptor) => {
    if (errorCode) {
      SetMetadata(META.HTTP_ERROR_CODE, errorCode)(descriptor.value);
    }
    if (successCode) {
      SetMetadata(META.HTTP_SUCCESS_CODE, successCode)(descriptor.value);
    }
    if (errorMessage) {
      SetMetadata(META.HTTP_ERROR_MESSAGE, errorMessage)(descriptor.value);
    }
    if (successMessage) {
      SetMetadata(META.HTTP_SUCCESS_MESSAGE, successMessage)(descriptor.value);
    }
    if (isPagination) {
      SetMetadata(META.HTTP_RES_TRANSFORM_PAGINATE, true)(descriptor.value);
    }
    return descriptor;
  };
};

/**
 * 异常响应装饰器
 * @param message
 * @param statusCode
 * @example @HttpProcessor.error('error message', 500)
 */
export const error = (
  message: TMessage,
  statusCode?: HttpStatus,
): MethodDecorator => {
  return buildHttpDecorator({ errorMessage: message, errorCode: statusCode });
};

/**
 * 成功响应装饰器
 * @param message
 * @param statusCode
 * @example @HttpProcessor.success('success message', 200)
 */
export const success = (
  message: TMessage,
  statusCode?: HttpStatus,
): MethodDecorator => {
  return buildHttpDecorator({
    successMessage: message,
    successCode: statusCode,
  });
};

/**
 * 分页装饰器
 * @exports paginate
 * @example @HttpProcessor.paginate()
 */
export const paginate = (): MethodDecorator => {
  return buildHttpDecorator({ isPagination: true });
};

/**
 * 统配构造器
 * @example @HttpProcessor.handle('获取某项数据')
 * @example @HttpProcessor.handle({ message: '操作', error: error, success: 200 })
 */
export function handle(args: THandleOption): MethodDecorator;
export function handle(...args) {
  const option = args[0];
  const isOption = (value: THandleOption): value is IHandleOption =>
    value instanceof Object;
  const message: TMessage = isOption(option) ? option.message : option;
  const errorMessage: TMessage = message + TEXT.HTTP_ERROR_SUFFIX;
  const successMessage: TMessage = message + TEXT.HTTP_SUCCESS_SUFFIX;
  const errorCode: HttpStatus = isOption(option) ? option.error : null;
  const successCode: HttpStatus = isOption(option) ? option.success : null;
  const isPagination: boolean = isOption(option) ? option.isPagination : null;
  return buildHttpDecorator({
    errorCode,
    successCode,
    errorMessage,
    successMessage,
    isPagination,
  });
}

export const HttpProcessor = { error, success, handle, paginate };
