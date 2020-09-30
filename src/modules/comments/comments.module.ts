import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { CommentsController } from './comments.controller';
import { Comment } from './comments.model';
import { CommentsService } from './comments.service';

@Module({
  imports: [TypegooseModule.forFeature([Comment])],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
