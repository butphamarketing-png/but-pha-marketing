import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { RankService } from "./rank.service";

@Injectable()
export class RankScheduler implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RankScheduler.name);
  private interval: NodeJS.Timeout | null = null;

  constructor(private readonly rankService: RankService) {}

  onModuleInit() {
    const enabled = process.env.RANK_SCHEDULER_ENABLED === "true";
    if (!enabled) {
      return;
    }

    const intervalMs = Number(process.env.RANK_SCHEDULER_INTERVAL_MS || 24 * 60 * 60 * 1000);
    this.logger.log(`Rank scheduler enabled with interval ${intervalMs}ms`);

    this.interval = setInterval(() => {
      void this.rankService.runScheduledChecks();
    }, intervalMs);
  }

  onModuleDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
