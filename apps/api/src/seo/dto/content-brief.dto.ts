import { IsOptional, IsString, MinLength } from "class-validator";

export class ContentBriefDto {
  @IsString()
  @MinLength(3)
  title!: string;

  @IsOptional()
  @IsString()
  postId?: string;
}
