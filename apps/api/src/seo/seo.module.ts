import { Module } from "@nestjs/common";
import { SeoController } from "./seo.controller";
import { SeoOpenAIService } from "./seo-openai.service";
import { SeoService } from "./seo.service";

@Module({
  controllers: [SeoController],
  providers: [SeoService, SeoOpenAIService],
  exports: [SeoService],
})
export class SeoModule {}
