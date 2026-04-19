import { Injectable } from "@nestjs/common";
import { PrismaService } from "../common/prisma/prisma.service";
import { CurrentWorkspaceService } from "../common/workspace/workspace.service";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaceService: CurrentWorkspaceService,
  ) {}

  async getCurrent() {
    const { userId } = await this.workspaceService.getContext();

    return this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
  }
}
