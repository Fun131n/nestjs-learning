import { PickType } from "@nestjs/swagger";
import { Reply } from "../replys.model";

export class CreateReplyDto extends PickType(Reply, [
  'content'
] as const) {}