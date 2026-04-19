import { Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService implements OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis | null = null;

  getClient() {
    if (this.client) {
      return this.client;
    }

    const redisUrl = process.env.REDIS_URL;
    if (!redisUrl) {
      this.logger.warn("REDIS_URL is not set. Queue-ready Redis connection is disabled.");
      return null;
    }

    this.client = new Redis(redisUrl, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
    });

    this.client.on("error", (error) => {
      this.logger.warn(`Redis connection warning: ${error.message}`);
    });

    void this.client.connect().catch((error) => {
      this.logger.warn(`Redis connection failed: ${error.message}`);
    });

    return this.client;
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
      this.client = null;
    }
  }
}
