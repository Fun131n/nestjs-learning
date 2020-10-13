import { MongooseModel } from '@app/interfaces/mongoose.interface';
import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { Author } from '../comments/comments.model';
import { UsersService } from '../users/users.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { Reply } from './replys.model';

@Injectable()
export class ReplysService {
  constructor(
    @InjectModel(Reply) private readonly replyModel: MongooseModel<Reply>,
    private readonly usersService: UsersService,
  ){}

  async getAll(params, query, options): Promise<PaginateResult<Reply>> {
    const commentId = params.commentId;
    query = {
      comment_id: { $eq: commentId}
    }
    return this.replyModel.paginate(query, options);
  }

  async createReply(authorId, commentId, replyId, createReplyDto: CreateReplyDto) {
    const user = await this.usersService.findOneById(authorId);
    const author: Author = {
      _id: user._id,
      nickname: user.nickname,
      avatar: user.avatar,
      followers_count: user.followers_count,
      following_count: user.following_count
    };
    replyId ? null : replyId;
    this.replyModel.create({
      ...createReplyDto,
      comment_id: commentId,
      reply_to_id: replyId,
      author
    });
  }
}
