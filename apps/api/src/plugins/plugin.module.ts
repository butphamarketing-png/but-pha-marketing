import { Module } from "@nestjs/common";
import { PluginService } from "./plugin.service";
import { PluginController } from "./plugin.controller";
import { PrismaModule } from "../common/prisma/prisma.module";
import { RedisModule } from "../common/redis/redis.module";
import { WorkspaceModule } from "../common/workspace/workspace.module";

@Module({
  imports: [PrismaModule, RedisModule, WorkspaceModule],
  controllers: [PluginController],
  providers: [PluginService],
  exports: [PluginService],
})
export class PluginModule {}
