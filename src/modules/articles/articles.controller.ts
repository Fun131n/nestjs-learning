import { Controller, Get, Query, Post, Body, Put, Request, UseGuards, Delete, Param } from "@nestjs/common";
import { Article } from "./articles.model";
import { PaginateResult } from "mongoose";
import { ArticlesService } from "./articles.service";
import { HttpProcessor } from "@app/decorators/http.decorator";
import { CreateArticleDto } from "./dto/create-article.dto";
import { JwtGuard } from "@app/guards/jwt.guard";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {

  constructor(
    private readonly articlesService: ArticlesService
  ){}

  @Get()
  @HttpProcessor.paginate()
  async getAll(@Query() query): Promise<PaginateResult<Article>>{
    return await this.articlesService.getAll(query);
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async create(@Request() req, @Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.create(req.user._id, createArticleDto);
  }

  @Put(':tid')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async update(@Request() req, @Body() updateArticleDto: UpdateArticleDto) {
    return await this.articlesService.update(req.user._id, updateArticleDto);
  }

  @Delete(':tid')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async delete(@Request() req, @Param('tid') tid) {
    return await this.articlesService.delete(req.user._id, tid);
  }

  @Post(':tid/favourite') 
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async favourite(@Request() req, @Param('tid') tid) {
    return await this.articlesService.favourite(req.user._id, tid);
  }

  @Delete(':tid/favourite') 
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async unFavourite(@Request() req, @Param('tid') tid) {
    return await this.articlesService.unFavourite(req.user._id, tid);
  }
}