import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersModule } from '../users/users.module';
import { CommentsController } from './comments.controller';
import { Comment } from './comments.model';
import { CommentsService } from './comments.service';

@Module({
  imports: [UsersModule,TypegooseModule.forFeature([Comment])],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
