import { Module } from '@nestjs/common';
import { ReplysService } from './replys.service';
import { ReplysController } from './replys.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Reply } from './replys.model';
import { UsersModule } from '../users/users.module';
import { Comment } from '../comments/comments.model';

@Module({
  imports: [UsersModule, TypegooseModule.forFeature([Comment]), TypegooseModule.forFeature([Reply])],
  providers: [ReplysService],
  controllers: [ReplysController]
})
export class ReplysModule {}
