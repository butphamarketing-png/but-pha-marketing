import { IsString, IsOptional } from "class-validator";

export class AnalyzeTopicDto {
  @IsString()
  topic: string;

  @IsString()
  @IsOptional()
  location?: string = "Vietnam";
}
