/**
 * APP module
 * @file 主模块
 */

import { Module } from '@nestjs/common';

import { WinstonModule } from 'nest-winston';
import { WinstonConfig } from './common/config/winston.config';

import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './processors/database/database.module';
@Module({

  imports: [
    WinstonModule.forRoot(new WinstonConfig()),
    
    DatabaseModule,
    
    AuthModule
  ],
})
export class AppModule {}
