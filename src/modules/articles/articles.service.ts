import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { Article } from "./articles.model";
import { User } from "../users/user.model";
import { MongooseModel } from "@app/interfaces/mongoose.interface";
import { PaginateResult } from "mongoose";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { CreateArticleDto } from "./dto/create-article.dto";
import { DocumentType } from "@typegoose/typegoose";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article) private readonly articleModel: MongooseModel<Article>,
    @InjectModel(User) private readonly userModel: MongooseModel<User>
  ) {}

  async getAll(query, options): Promise<PaginateResult<Article>> {
    return this.articleModel.paginate(query, { ...options, populate: { path: 'author' }});
  }

  async getOne(articleId) {
    return this.articleModel.findOne({ _id: articleId}).populate('author');
  }

  async create(authorId: string, createArticleDto: CreateArticleDto) {
    return this.articleModel.create({ ...createArticleDto, author: authorId });
  }

  async update(authorId: string, updateArticleDto: UpdateArticleDto) {
    return this.articleModel.updateOne({ author_id: authorId}, updateArticleDto)
  }

  async delete(authorId: string, articleId: string) {
    return this.articleModel.deleteOne({
      _id: articleId,
      author_id: authorId,
    })
  }

  /**
   * 收藏文章
   * @param userId 用户id
   * @param articleId 文章id
   */
  async favourite(userId: string, articleId: string) {
    let article = await this.articleModel.findOne({ _id: articleId });
    const user = await this.userModel.findOne({ _id: userId });
    const isNewFavourite = user.favorites.findIndex(favourite => favourite._id.equals(article._id)) < 0;
    if (isNewFavourite) {
      user.favorites.push(article);
      article.favorites_count ++;
      await this.userModel.create(user);
      article = await this.articleModel.create(article);
    }
    return { article };
  }

  /**
   * 取消收藏文章
   * @param userId 用户id
   * @param articleId 文章id
   */
  async unFavourite(userId: string, articleId: string) {
    let article = await this.articleModel.findOne({ _id: articleId });
    const user = await this.userModel.findOne({ _id: userId });
    const favouriteIndex = user.favorites.findIndex(favourite => favourite._id.equals(article._id));
    if (favouriteIndex > -1) {
      user.favorites.splice(favouriteIndex, 1);
      article.favorites_count --;
      await this.userModel.create(user);
      article = await this.articleModel.create(article);
    }

    return { article };
  }
}