import { IsOptional, IsString, MinLength } from "class-validator";

export class SerpAnalyzeDto {
  @IsString()
  @MinLength(3)
  title!: string;

  @IsOptional()
  @IsString()
  postId?: string;

  @IsOptional()
  @IsString()
  location?: string;
}
