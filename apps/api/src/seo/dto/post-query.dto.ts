import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class PostQueryDto {
  @IsString()
  postId!: string;

  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : 5))
  @IsInt()
  @Min(1)
  limit?: number = 5;
}
