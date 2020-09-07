import { Controller, Get, Query, Post, Body } from "@nestjs/common";
import { Topic } from "./topic.model";
import { PaginateResult } from "mongoose";
import { TopicsService } from "./topics.service";
import { HttpProcessor } from "@app/decorators/http.decorator";
import { CreateTopicDto } from "./dto/create-topic.dto";

@Controller('topics')
export class TopicsController {

  constructor(
    private readonly topicsService: TopicsService
  ){}

  @Get()
  @HttpProcessor.paginate()
  async getAll(@Query() query): Promise<PaginateResult<Topic>>{
    return await this.topicsService.getAll(query);
  }

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto) {
    return await this.topicsService.create(createTopicDto);
  }
}