import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PluginService } from "../../plugins/plugin.service";
import { PLUGIN_KEY } from "../decorators/require-plugin.decorator";
import { CurrentWorkspaceService } from "../workspace/workspace.service";

@Injectable()
export class PluginGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly pluginService: PluginService,
    private readonly workspaceService: CurrentWorkspaceService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const pluginKey = this.reflector.get<string>(PLUGIN_KEY, context.getHandler());
    if (!pluginKey) return true;

    const { projectId } = await this.workspaceService.getContext();
    const isEnabled = await this.pluginService.isPluginEnabled(projectId, pluginKey);

    if (!isEnabled) {
      throw new ForbiddenException(`Plugin '${pluginKey}' is required for this action and is not enabled.`);
    }

    return true;
  }
}
