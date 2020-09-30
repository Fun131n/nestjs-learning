import { Controller, Get, Query, Post, Body, Put, Request, UseGuards, Delete, Param } from "@nestjs/common";
import { Article } from "./articles.model";
import { PaginateResult } from "mongoose";
import { ArticlesService } from "./articles.service";
import { HttpProcessor } from "@app/decorators/http.decorator";
import { CreateArticleDto } from "./dto/create-article.dto";
import { JwtGuard } from "@app/guards/jwt.guard";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { QueryDecorator } from "@app/decorators/query.decorator";

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {

  constructor(
    private readonly articlesService: ArticlesService
  ){}

  @Get()
  @HttpProcessor.paginate()
  async getAll(@QueryDecorator() { query, options }): Promise<PaginateResult<Article>>{
    return await this.articlesService.getAll(query, options);
  }

  @Get(':articleId')
  async getOne(@Param('articleId') articleId) {
    return await this.articlesService.getOne(articleId);
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async create(@Request() req, @Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.create(req.user._id, createArticleDto);
  }

  @Put(':articleId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async update(@Request() req, @Body() updateArticleDto: UpdateArticleDto) {
    return await this.articlesService.update(req.user._id, updateArticleDto);
  }

  @Delete(':articleId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async delete(@Request() req, @Param('articleId') articleId) {
    return await this.articlesService.delete(req.user._id, articleId);
  }

  @Post(':articleId/favourite') 
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async favourite(@Request() req, @Param('articleId') articleId) {
    return await this.articlesService.favourite(req.user._id, articleId);
  }

  @Delete(':articleId/favourite') 
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async unFavourite(@Request() req, @Param('articleId') articleId) {
    return await this.articlesService.unFavourite(req.user._id, articleId);
  }
}