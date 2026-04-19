import { IsString } from "class-validator";

export class PostRankQueryDto {
  @IsString()
  postId!: string;
}
