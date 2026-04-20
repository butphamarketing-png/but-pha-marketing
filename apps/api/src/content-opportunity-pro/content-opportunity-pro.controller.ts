import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { ContentOpportunityProService } from "./content-opportunity-pro.service";
import { AnalyzeTopicDto } from "./dto/analyze-topic.dto";
import { CurrentWorkspaceService } from "../common/workspace/workspace.service";
import { PluginGuard } from "../common/guards/plugin.guard";
import { RequirePlugin } from "../common/decorators/require-plugin.decorator";

@Controller("content-opportunity-pro")
@UseGuards(PluginGuard)
export class ContentOpportunityProController {
  constructor(
    private readonly opportunityService: ContentOpportunityProService,
    private readonly workspaceService: CurrentWorkspaceService,
  ) {}

  @Post("analyze")
  @RequirePlugin("content_pro")
  async analyze(@Body() dto: AnalyzeTopicDto) {
    const { projectId } = await this.workspaceService.getContext();
    return this.opportunityService.analyze(dto, projectId);
  }
}
