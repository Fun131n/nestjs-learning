// /**
//  * 分页数据接口
//  */
// import { getRepository, ObjectType } from 'typeorm';
// import * as APP_CONFIG from '@app/app.config';

// /**
//  * 分页返回数据模型
//  */
// export interface PaginateResult<T> {
//   items: Array<T>;
//   total: number;
//   limit: number;
//   page?: number;
// }

// export interface PaginateResult<T> {
//   items: Array<T>;
//   total: number;
//   limit: number;
//   page?: number;
// }

// /**
//  * 分页请求参数模型
//  */
// export interface PaginateOptions {
//   limit: number;
//   skip: number;
// }

// export async function paginate<Entity>(query?: Object, options?: PaginateOptions): Promise<PaginateResult<Entity>> {
//   const limit = Math.floor(options.limit || APP_CONFIG.APP.PAGINATE_LIMIT);
//   const skip = Math.floor(options.skip || 0);
//   const data = await getRepository(entityClass)
//     .findAndCount({
//       take: limit,
//       skip: limit * skip
//     })
//   // const data = await 
//   return {
//     items: data[0],
//     total: data[1],
//     limit: limit,
//     page: skip / limit,
//   };
// }