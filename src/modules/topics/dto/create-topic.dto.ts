import { PickType } from "@nestjs/swagger";
import { Topic } from "../topic.model";

export class CreateTopicDto extends PickType(Topic, [
  'title',
  'content'
] as const) {}