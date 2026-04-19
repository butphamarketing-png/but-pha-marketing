import { Module } from "@nestjs/common";
import { SeoModule } from "../seo/seo.module";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
  imports: [SeoModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
