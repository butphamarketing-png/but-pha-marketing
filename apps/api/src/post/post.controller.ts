import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostService } from "./post.service";

@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  list() {
    return this.postService.list();
  }

  @Get(":id")
  detail(@Param("id") id: string) {
    return this.postService.detail(id);
  }

  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdatePostDto) {
    return this.postService.update(id, dto);
  }
}
