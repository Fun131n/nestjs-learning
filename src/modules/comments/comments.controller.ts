import { HttpProcessor } from '@app/decorators/http.decorator';
import { QueryDecorator } from '@app/decorators/query.decorator';
import { JwtGuard } from '@app/guards/jwt.guard';
import { Controller, Post, UseGuards, Request, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { Comment } from './comments.model';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('comments')
@Controller('articles')
export class CommentsController {

  constructor(private readonly commentsService: CommentsService){}

  @Get(':articleId/comments')
  @HttpProcessor.paginate()
  getAllComment(@QueryDecorator() { params, query, options }): Promise<PaginateResult<Comment>>{
    return this.commentsService.getAllComment(params, query, options);
  }

  @Post(':articleId/comments')
  @UseGuards(JwtGuard)
  createComment(@QueryDecorator() { params, request }, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(request.user._id, params.articleId, createCommentDto);
  }
}
