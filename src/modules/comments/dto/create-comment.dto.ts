import { PickType } from "@nestjs/swagger";
import { Comment } from "../comments.model";

export class CreateCommentDto extends PickType(Comment, [
  'article_id',
  'content'
] as const) {}