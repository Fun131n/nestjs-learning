/**
 * HTTP interface
 * @file HTTP 响应接口模型
 */

// 响应状态
export enum EHttpStatus {
  Success = 200,
  Error = 0,
}

export type TMessage = string;
export type TExceptionOption =
  | TMessage
  | {
      message: TMessage;
      error?: any;
    };

// HTTP状态返回基础接口
export interface IHttpResponseBase {
  statusCode: EHttpStatus;
  message: TMessage;
}

// HTTP基础接口返回分页接口
export interface IHttpResultPaginate<T> {
  data: T;
  pagination: {
    total: number;
    page: number;
    limit: number;
    // total_page: number,
  };
}

// HTTP 返回
export type THttpResponse<T> = THttpErrorResponse | THttpSuccessResponse<T>;

// HTTP Success
export type THttpSuccessResponse<T> = IHttpResponseBase & {
  result: T | IHttpResultPaginate<T>;
};

// HTTP Error
export type THttpErrorResponse = IHttpResponseBase & {
  error: any;
  debug?: string;
};
