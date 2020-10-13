import { MongooseModel } from '@app/interfaces/mongoose.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';
import { Author, Comment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {

  constructor(
    @InjectModel(Comment) private readonly commentsModel: MongooseModel<Comment>,
    private readonly usersService: UsersService,
  ){}

  async getAllComment(query, options) {
    return this.commentsModel.paginate(query, options);
  }

  async createComment(authorId, articleId, createCommentDto: CreateCommentDto) {
    // 根据authorId查出评论的作者
    const user = await this.usersService.findOneById(authorId);
    const author: Author = {
      _id: user._id,
      nickname: user.nickname,
      avatar: user.avatar,
      followers_count: user.followers_count,
      following_count: user.following_count
    };
    this.commentsModel.create({
      ...createCommentDto,
      article_id: articleId,
      author
    });
  }
}
