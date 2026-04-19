import { IsOptional, IsString } from "class-validator";

export class RankTrackDto {
  @IsString()
  postId!: string;

  @IsString()
  keyword!: string;

  @IsOptional()
  @IsString()
  location?: string;
}
