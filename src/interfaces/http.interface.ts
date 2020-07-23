export enum EHttpStatus {
    Success = 200,
    Error = 0,
}

export type TMessage = string;

// HTTP状态返回基础接口
export interface IHttpResponseBase {
    statusCode: EHttpStatus;
    msg: TMessage;
}

// HTTP 返回
export type THttpResponse<T> = THttpErrorResponse | THttpSuccessResponse<T>;

// HTTP Success 
export type THttpSuccessResponse<T> = IHttpResponseBase & {
    result: T
}

// HTTP Error
export type THttpErrorResponse = IHttpResponseBase & {
    error: any;
    debug?: string;
}