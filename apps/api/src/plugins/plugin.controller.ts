import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { PluginService } from "./plugin.service";
import { CurrentWorkspaceService } from "../common/workspace/workspace.service";

@Controller("plugins")
export class PluginController {
  constructor(
    private readonly pluginService: PluginService,
    private readonly workspaceService: CurrentWorkspaceService,
  ) {}

  @Get()
  async getAllPlugins() {
    return this.pluginService.getAllPlugins();
  }

  @Get("workspace")
  async getWorkspacePlugins() {
    const { projectId } = await this.workspaceService.getContext();
    return this.pluginService.getWorkspacePlugins(projectId);
  }

  @Post("enable")
  async enablePlugin(@Body("pluginKey") pluginKey: string) {
    const { projectId } = await this.workspaceService.getContext();
    return this.pluginService.enablePlugin(projectId, pluginKey);
  }

  @Post("disable")
  async disablePlugin(@Body("pluginKey") pluginKey: string) {
    const { projectId } = await this.workspaceService.getContext();
    return this.pluginService.disablePlugin(projectId, pluginKey);
  }
}
