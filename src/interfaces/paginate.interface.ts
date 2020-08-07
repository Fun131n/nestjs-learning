/**
 * 分页数据接口
 */
import { getRepository, ObjectType } from 'typeorm';

export interface PaginateResult<T> {
  arr: Array<T>;
  total: number;
  limit: number;
  page?: number;
}

export interface PaginateOptions {
  limit: number;
  skip: number;
}

export async function paginate<Entity>(
  entityClass: ObjectType<Entity>,
  query: PaginateOptions,
): Promise<PaginateResult<Entity>> {
  const limit = query.limit || 20;
  const skip = query.skip || 0;
  const data = await getRepository(entityClass)
    .createQueryBuilder()
    .take(limit)
    .skip(limit * skip)
    .getManyAndCount();
  return {
    arr: data[0],
    total: data[1],
    limit: Math.floor(limit),
    page: skip / limit,
  };
}
