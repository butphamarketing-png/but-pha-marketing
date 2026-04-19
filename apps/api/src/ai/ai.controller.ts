import { Body, Controller, Post } from "@nestjs/common";
import { GenerateArticleDto } from "./dto/generate-article.dto";
import { AIService } from "./ai.service";

@Controller("ai")
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post("generate")
  generate(@Body() dto: GenerateArticleDto) {
    return this.aiService.generate(dto);
  }
}
