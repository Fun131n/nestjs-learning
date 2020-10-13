/**
 * APP module
 * @file 主模块
 */

import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonConfig } from './common/config/winston.config';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypegooseModule } from "nestjs-typegoose";
import { HelperModule } from './processors/helper/helper.module';
import { CacheModule } from './processors/cache/cache.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ReplysModule } from './modules/replys/replys.module';

@Module({

  imports: [
    // WinstonModule.forRoot(new WinstonConfig()),
    HelperModule,
    CacheModule,
    TypegooseModule.forRoot("mongodb://localhost:27017/nest", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    UsersModule,
    ArticlesModule,
    CommentsModule,
    ReplysModule
  ]
})
export class AppModule {}
