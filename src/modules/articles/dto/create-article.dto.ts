import { PickType } from "@nestjs/swagger"; 
import { Article } from "../articles.model";

export class CreateArticleDto extends PickType(Article, [
  'title',
  'content',
  'author_viewpoint'
] as const) {}