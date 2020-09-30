import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import * as APP_CONFIG from '@app/app.config';
import { ESortType } from "@app/common/enum/state.enum";

/**
 * 查询参数类型
 */
export interface IQueryConfig {
  [key: string]: string | number | boolean| Date | IQueryConfig
}

/**
 * 返回结果类型
 */
export interface IQueryResult {
  query: IQueryConfig, // 用于 paginate 的查询参数
  options: IQueryConfig // 用于 paginate 的查询配置参数
}



export const QueryDecorator = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  
  //入参
  const [page, limit, sort, order] = [
    request.query.page || 1,
    request.query.limit || APP_CONFIG.APP.PAGINATE_LIMIT,
    request.query.sort,
    request.query.order
  ]

  const query: IQueryConfig = {};
  const options: IQueryConfig = {};

  // 拼接参数
  options.page = Math.floor(page);
  options.limit = Math.floor(limit);
  if (sort) {
    options.sort = {
      [sort]: order ? order : ESortType.Asc
    };
  }

  // 返回结果
  const result = {
    query,
    options
  }

  return result
})