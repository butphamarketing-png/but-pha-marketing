import { Module } from "@nestjs/common";
import { RankController } from "./rank.controller";
import { RankScheduler } from "./rank.scheduler";
import { RankSourceService } from "./rank-source.service";
import { RankService } from "./rank.service";

@Module({
  controllers: [RankController],
  providers: [RankService, RankSourceService, RankScheduler],
  exports: [RankService],
})
export class RankModule {}
