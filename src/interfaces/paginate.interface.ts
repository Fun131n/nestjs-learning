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
  const data = await getRepository(entityClass)
    .createQueryBuilder()
    .take(query.limit)
    .skip(query.limit * query.skip)
    .getManyAndCount();
  return {
    arr: data[0],
    total: data[1],
    limit: Math.floor(query.limit),
    page: query.skip / query.limit,
  };
}
