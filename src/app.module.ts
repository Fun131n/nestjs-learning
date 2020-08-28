/**
 * APP module
 * @file 主模块
 */

import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonConfig } from './common/config/winston.config';

import { AuthModule } from './modules/auth/auth.module';
// import { DatabaseModule } from './processors/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { TypegooseModule } from "nestjs-typegoose";

@Module({

  imports: [
    WinstonModule.forRoot(new WinstonConfig()),
    // DatabaseModule,
    TypegooseModule.forRoot("mongodb://localhost:27017/nest", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UsersModule
  ],
})
export class AppModule {}
