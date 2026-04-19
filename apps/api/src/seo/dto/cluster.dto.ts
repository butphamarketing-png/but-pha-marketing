import { IsString, MinLength } from "class-validator";

export class ClusterDto {
  @IsString()
  @MinLength(3)
  topic!: string;
}
