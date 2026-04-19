import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

type WorkspaceContext = {
  userId: string;
  projectId: string;
};

@Injectable()
export class CurrentWorkspaceService {
  constructor(private readonly prisma: PrismaService) {}

  async getContext(): Promise<WorkspaceContext> {
    const user = await this.prisma.user.upsert({
      where: { email: "demo@butpha.local" },
      update: {},
      create: {
        email: "demo@butpha.local",
        name: "Demo Workspace",
      },
    });

    const project = await this.prisma.project.upsert({
      where: {
        userId_name: {
          userId: user.id,
          name: "Phase 1 Demo Project",
        },
      },
      update: {},
      create: {
        userId: user.id,
        name: "Phase 1 Demo Project",
        description: "Default project used until real authentication is added.",
      },
    });

    return {
      userId: user.id,
      projectId: project.id,
    };
  }
}
