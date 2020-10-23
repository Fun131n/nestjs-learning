import { MongooseModel } from '@app/interfaces/mongoose.interface';
import { Injectable } from '@nestjs/common';
import { PaginateResult } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { Comment } from '../comments/comments.model';
import { UsersService } from '../users/users.service';
import { CreateReplyDto } from './dto/create-reply.dto';
import { Reply } from './replys.model';

@Injectable()
export class ReplysService {
  constructor(
    @InjectModel(Reply) private readonly replyModel: MongooseModel<Reply>,
    @InjectModel(Comment) private readonly commentModel: MongooseModel<Comment>,
    private readonly usersService: UsersService,
  ){}

  async getAll(params, query, options): Promise<PaginateResult<Reply>> {
    const commentId = params.commentId;
    query = {
      comment_id: { $eq: commentId}
    }
    return this.replyModel.paginate(query, options);
  }

  async createReply(authorId, commentId, replyToId, createReplyDto: CreateReplyDto) {
    const user = await this.usersService.findOneById(authorId);
    replyToId ? null : replyToId;
    const reply = await this.replyModel.create({
      ...createReplyDto,
      comment_id: commentId,
      reply_to_id: replyToId,
      author: authorId
    });
    const comment = await this.commentModel.findOne({ _id: commentId });
    comment.replies.unshift(reply._id);
    if (comment.replies.length > 3) {
      comment.replies.pop();
    }
    this.commentModel.create(comment);
  }
}
