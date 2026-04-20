import { Injectable, Logger, BadRequestException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { RedisService } from "../common/redis/redis.service";
import { PLUGIN_REGISTRY, PluginDef } from "./registry";

@Injectable()
export class PluginService {
  private readonly logger = new Logger(PluginService.name);
  private readonly CACHE_TTL = 300; // 5 minutes

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async getAllPlugins() {
    return PLUGIN_REGISTRY;
  }

  async getWorkspacePlugins(projectId: string) {
    const cacheKey = `plugins:${projectId}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const dbPlugins = await this.prisma.workspacePlugin.findMany({
      where: { projectId },
      include: { plugin: true },
    });

    const result = PLUGIN_REGISTRY.map(def => {
      const dbPlugin = dbPlugins.find(p => p.plugin.key === def.key);
      return {
        ...def,
        enabled: def.isCore ? true : (dbPlugin?.enabled ?? false),
      };
    });

    await this.redis.set(cacheKey, JSON.stringify(result), this.CACHE_TTL);
    return result;
  }

  async enablePlugin(projectId: string, pluginKey: string) {
    const pluginDef = PLUGIN_REGISTRY.find(p => p.key === pluginKey);
    if (!pluginDef) throw new BadRequestException("Plugin not found");

    // Check dependencies
    for (const depKey of pluginDef.dependencies) {
      const isEnabled = await this.isPluginEnabled(projectId, depKey);
      if (!isEnabled) {
        throw new BadRequestException(`Missing dependency: ${depKey}. Please enable it first.`);
      }
    }

    const plugin = await this.prisma.plugin.upsert({
      where: { key: pluginKey },
      update: {},
      create: {
        key: pluginKey,
        name: pluginDef.name,
        description: pluginDef.description,
        category: pluginDef.category,
        isCore: pluginDef.isCore ?? false,
      },
    });

    await this.prisma.workspacePlugin.upsert({
      where: { projectId_pluginId: { projectId, pluginId: plugin.id } },
      update: { enabled: true },
      create: { projectId, pluginId: plugin.id, enabled: true },
    });

    await this.logUsage(projectId, pluginKey, "enable");
    await this.redis.del(`plugins:${projectId}`);

    return { success: true };
  }

  async disablePlugin(projectId: string, pluginKey: string) {
    const pluginDef = PLUGIN_REGISTRY.find(p => p.key === pluginKey);
    if (!pluginDef) throw new BadRequestException("Plugin not found");
    if (pluginDef.isCore) throw new ForbiddenException("Cannot disable core plugin");

    const plugin = await this.prisma.plugin.findUnique({ where: { key: pluginKey } });
    if (!plugin) throw new BadRequestException("Plugin not registered in DB");

    await this.prisma.workspacePlugin.update({
      where: { projectId_pluginId: { projectId, pluginId: plugin.id } },
      data: { enabled: false },
    });

    // Disable dependent plugins
    const dependents = PLUGIN_REGISTRY.filter(p => p.dependencies.includes(pluginKey));
    for (const dep of dependents) {
      await this.disablePlugin(projectId, dep.key);
    }

    await this.logUsage(projectId, pluginKey, "disable");
    await this.redis.del(`plugins:${projectId}`);

    return { success: true };
  }

  async isPluginEnabled(projectId: string, pluginKey: string): Promise<boolean> {
    const def = PLUGIN_REGISTRY.find(p => p.key === pluginKey);
    if (def?.isCore) return true;

    const plugins = await this.getWorkspacePlugins(projectId);
    const plugin = plugins.find((p: any) => p.key === pluginKey);
    return plugin?.enabled ?? false;
  }

  private async logUsage(projectId: string, pluginKey: string, action: string, metadata?: any) {
    await this.prisma.pluginUsageLog.create({
      data: {
        projectId,
        pluginKey,
        action,
        metadata: metadata ?? {},
      },
    });
  }
}
