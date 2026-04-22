import { Module } from "@nestjs/common";
import { Ga4Service } from "../common/analytics/ga4.service";
import { SeoController } from "./seo.controller";
import { SeoOpenAIService } from "./seo-openai.service";
import { SeoService } from "./seo.service";

@Module({
  controllers: [SeoController],
  providers: [SeoService, SeoOpenAIService, Ga4Service],
  exports: [SeoService],
})
export class SeoModule {}
