import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { CurrentWorkspaceService } from "../common/workspace/workspace.service";

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceService: CurrentWorkspaceService,
  ) {}

  async listCurrentUserProjects() {
    const { userId } = await this.workspaceService.getContext();

    return this.prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });
  }
}
