import { IsOptional, IsString, MinLength } from "class-validator";

export class GenerateArticleDto {
  @IsString()
  @MinLength(3)
  title!: string;

  @IsOptional()
  @IsString()
  postId?: string;
}
