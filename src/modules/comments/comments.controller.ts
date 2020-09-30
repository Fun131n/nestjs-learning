import { JwtGuard } from '@app/guards/jwt.guard';
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {

  constructor(private readonly commentsService: CommentsService){}

  @Post()
  @UseGuards(JwtGuard)
  createComment(@Request() req, createCommentDto: CreateCommentDto) {
    this.commentsService.createComment(req.user._id, createCommentDto);
  }
}
