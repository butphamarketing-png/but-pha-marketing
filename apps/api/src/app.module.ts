import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { AIModule } from "./ai/ai.module";
import { PrismaModule } from "./common/prisma/prisma.module";
import { RedisModule } from "./common/redis/redis.module";
import { WorkspaceModule } from "./common/workspace/workspace.module";
import { PostModule } from "./post/post.module";
import { ProjectModule } from "./project/project.module";
import { RankModule } from "./rank/rank.module";
import { SeoModule } from "./seo/seo.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
    }),
    CacheModule.register({ isGlobal: true }),
    PrismaModule,
    RedisModule,
    WorkspaceModule,
    AuthModule,
    UserModule,
    ProjectModule,
    PostModule,
    AIModule,
    SeoModule,
    RankModule,
  ],
})
export class AppModule {}
