import { MongooseModel } from '@app/interfaces/mongoose.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Comment } from './comments.model';

@Injectable()
export class CommentsService {

  constructor(@InjectModel(Comment) private readonly commentsModel: MongooseModel<Comment>){}

  createComment(authorId, createCommentDto) {
    this.commentsModel.create(createCommentDto);
  }
}
