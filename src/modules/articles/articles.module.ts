import { Module } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { ArticlesController } from "./articles.controller";
import { TypegooseModule } from "nestjs-typegoose";
import { Article } from "./articles.model";
import { User } from "../users/user.model";

@Module({
  imports: [
    TypegooseModule.forFeature([Article]),
    TypegooseModule.forFeature([User])
  ],
  providers: [ArticlesService],
  exports: [ArticlesService],
  controllers: [ArticlesController]
})

export class ArticlesModule {}