import { PostStatus } from "@prisma/client";
import { IsArray, IsEnum, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePostDto {
  @IsString()
  @MinLength(3)
  title!: string;

  @IsString()
  @MinLength(3)
  slug!: string;

  @IsString()
  @MinLength(30)
  content!: string;

  @IsString()
  @MinLength(20)
  metaDescription!: string;

  @IsArray()
  @IsString({ each: true })
  keywords!: string[];

  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @IsOptional()
  @IsString()
  generationId?: string;
}
