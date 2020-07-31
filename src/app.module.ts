/**
 * APP module
 * @file 主模块
 */

import { Module } from '@nestjs/common';
import { CatsModule } from './modules/cats/cats.module'; 
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { WinstonConfig } from './common/config/winston.config';
import { PG_DATABASE } from './app.config';

@Module({
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  // ],
  imports: [
    // CatsModule, 
    AuthModule, 
    UsersModule,
    TypeOrmModule.forRoot(PG_DATABASE),
    WinstonModule.forRoot(new WinstonConfig()),
  ]
})

export class AppModule {}
