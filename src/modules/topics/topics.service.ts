import { Injectable } from "@nestjs/common";
import { InjectModel } from "nestjs-typegoose";
import { Topic } from "./topic.model";
import { MongooseModel } from "@app/interfaces/mongoose.interface";
import { PaginateResult } from "mongoose";

@Injectable()
export class TopicsService {
  constructor(@InjectModel(Topic) private readonly topicModel: MongooseModel<Topic>) {}

  async getAll(query): Promise<PaginateResult<Topic>> {
    return this.topicModel.paginate(query);
  }

  async create(createTopicDto) {
    return this.topicModel.create(createTopicDto)
  }
}