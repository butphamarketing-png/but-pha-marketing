import { Module } from "@nestjs/common";
import { ContentOpportunityProService } from "./content-opportunity-pro.service";
import { ContentOpportunityProController } from "./content-opportunity-pro.controller";
import { SerpProService } from "./serp.service";
import { AiProService } from "./ai.service";
import { PrismaModule } from "../common/prisma/prisma.module";
import { RedisModule } from "../common/redis/redis.module";
import { WorkspaceModule } from "../common/workspace/workspace.module";
import { PluginModule } from "../plugins/plugin.module";

@Module({
  imports: [PrismaModule, RedisModule, WorkspaceModule, PluginModule],
  controllers: [ContentOpportunityProController],
  providers: [ContentOpportunityProService, SerpProService, AiProService],
})
export class ContentOpportunityProModule {}
