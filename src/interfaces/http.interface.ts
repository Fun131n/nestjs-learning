/**
 * HTTP interface
 * @file HTTP 响应接口模型
 */
export type TExceptionMessage = string
export type TExceptionOption = TExceptionMessage | { message: string; error?: any};

// HTTP基础接口返回分页接口
export interface IHttpResultPaginate<T> {
  items: T;
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

// HTTP 返回
export type THttpResponse<T> = THttpErrorResponse | THttpSuccessResponse<T>;

 
/**
 * HTTP Success
 * 成功则直接返回数据，不另外封装一层结构
 * 分为普通数据和带分页的数据
 */
export type THttpSuccessResponse<T> = T | IHttpResultPaginate<T>;

/**
 * HTTP Error

 * statusCode: 错误码
 * message: 错误信息常量
 * error: 具体错误信息
 * debug: 栈追踪
 */
export type THttpErrorResponse = {
  statusCode: number;
  message: string;
  error: any;
  debug?: string | object;
};
