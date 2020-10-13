import { PickType } from "@nestjs/swagger";
import { Comment } from "../comments.model";

export class CreateCommentDto extends PickType(Comment, [
  'content'
] as const) {}