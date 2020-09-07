import { Module } from "@nestjs/common";
import { TopicsService } from "./topics.service";
import { TopicsController } from "./topics.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { Topic } from "./topic.model";

@Module({
  imports: [TypegooseModule.forFeature([Topic])],
  providers: [TopicsService],
  exports: [TopicsService],
  controllers: [TopicsController]
})

export class TopicsModule {}