import { MongooseModel } from '@app/interfaces/mongoose.interface';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { Comment } from '../comments/comments.model';
import { User } from '../users/user.model';

@Injectable()
export class LikeService {

  constructor(
    @InjectModel(Comment) private readonly commentsModel: MongooseModel<Comment>,
    @InjectModel(User) private readonly usersModel: MongooseModel<User>,
  ){}
  
  /**
   * 点赞评论
   * @param userId 用户id
   * @param commentId 评论id
   */
  async likeComment(userId: string, commentId: Types.ObjectId) {
    let comment = await this.commentsModel.findOne({ _id: commentId });
    const user = await this.usersModel.findOne({ _id: userId });
    const isNewLike = user.likes.findIndex(like => like.comment_id && like.comment_id.equals(comment._id)) < 0;
    if (isNewLike) {
      user.likes.push({
        comment_id: commentId
      });
      comment.likes_count ++;
      await this.usersModel.create(user);
      comment = await this.commentsModel.create(comment);
    }
    return { comment };
  }
}
