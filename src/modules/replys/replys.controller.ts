import { HttpProcessor } from '@app/decorators/http.decorator';
import { QueryDecorator } from '@app/decorators/query.decorator';
import { JwtGuard } from '@app/guards/jwt.guard';
import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { CreateReplyDto } from './dto/create-reply.dto';
import { Reply } from './replys.model';
import { ReplysService } from './replys.service';

@ApiTags('replys')
@Controller('comments')
export class ReplysController {

  constructor(private readonly replyService: ReplysService){}

  @Get(':commentId/replys')
  @HttpProcessor.paginate()
  getAllReply(@QueryDecorator() { params, query, options }): Promise<PaginateResult<Reply>>{
    return this.replyService.getAll(params, query, options);
  }

  @Post(':commentId/replys')
  @UseGuards(JwtGuard)
  createReply(@QueryDecorator() { params, request }, @Body() createReplyDto: CreateReplyDto) {
    return this.replyService.createReply(request.user._id, params.commentId, params.replyId, createReplyDto);
  }

  @Post(':commentId/replys/:replyId')
  @UseGuards(JwtGuard)
  replyToReply(@QueryDecorator() { params, request }, @Body() createReplyDto: CreateReplyDto) {
    return this.replyService.createReply(request.user._id, params.commentId, params.replyId, createReplyDto);
  }
}
