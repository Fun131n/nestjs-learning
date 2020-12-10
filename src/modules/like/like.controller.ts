import { QueryDecorator } from '@app/decorators/query.decorator';
import { JwtGuard } from '@app/guards/jwt.guard';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller()
export class LikeController {

  constructor(private readonly likeService: LikeService){}

  @Post('comments/:commentId/like')
  @UseGuards(JwtGuard)
  likeComment(@QueryDecorator() { params, request }) {
    return this.likeService.likeComment(request.user._id, params.commentId);
  }
}
