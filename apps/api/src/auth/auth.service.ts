import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { CurrentWorkspaceService } from "../common/workspace/workspace.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceService: CurrentWorkspaceService,
  ) {}

  async getCurrentUser() {
    const { userId, projectId } = await this.workspaceService.getContext();

    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      include: {
        projects: {
          where: { id: projectId },
        },
      },
    });

    return {
      user,
      project: user.projects[0] ?? null,
    };
  }
}
