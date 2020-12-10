import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Comment } from '../comments/comments.model';
import { User } from '../users/user.model';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  imports: [TypegooseModule.forFeature([Comment]), TypegooseModule.forFeature([User])],
  providers: [LikeService],
  controllers: [LikeController]
})
export class LikeModule {}
