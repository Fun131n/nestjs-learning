import { MongooseModel } from '@app/interfaces/mongoose.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UsersService } from '../users/users.service';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PaginateResult } from "mongoose";
import { User } from '../users/user.model';

@Injectable()
export class CommentsService {

  constructor(
    @InjectModel(Comment) private readonly commentsModel: MongooseModel<Comment>,
    private readonly usersService: UsersService,
  ){}

  async getAllComment(params, query, options): Promise<PaginateResult<Comment>> {
    const articleId = params.articleId;
    query = {
      article_id: { $eq: articleId}
    }
    let comments = await this.commentsModel.paginate(query, { 
      ...options, 
      populate: [{ path: 'replies', populate: ['reply_to_user', 'author'] }, { path: 'author' }]
    })
    comments.docs.forEach(item => {
      return item.is_like = true;
    })
    console.log('Log: CommentsService -> comments', comments);
    return comments;
  }

  async createComment(authorId, articleId, createCommentDto: CreateCommentDto) {
    // 根据authorId查出评论的作者
    const user = await this.usersService.findOneById(authorId);
    return this.commentsModel.create({
      ...createCommentDto,
      article_id: articleId,
      author: authorId
    });
  }
}
