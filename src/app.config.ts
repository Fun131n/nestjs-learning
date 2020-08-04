/**
 * APP Config
 * @file 应用运行配置
 */

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const PG_DATABASE = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'nest',
  autoLoadEntities: true,
  synchronize: true,
} as TypeOrmModuleOptions;
