import { Global, Module } from "@nestjs/common";
import { CurrentWorkspaceService } from "./workspace.service";

@Global()
@Module({
  providers: [CurrentWorkspaceService],
  exports: [CurrentWorkspaceService],
})
export class WorkspaceModule {}
