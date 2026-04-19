"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RedisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = __importDefault(require("ioredis"));
let RedisService = RedisService_1 = class RedisService {
    constructor() {
        this.logger = new common_1.Logger(RedisService_1.name);
        this.client = null;
    }
    getClient() {
        if (this.client) {
            return this.client;
        }
        const redisUrl = process.env.REDIS_URL;
        if (!redisUrl) {
            this.logger.warn("REDIS_URL is not set. Queue-ready Redis connection is disabled.");
            return null;
        }
        this.client = new ioredis_1.default(redisUrl, {
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
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = RedisService_1 = __decorate([
    (0, common_1.Injectable)()
], RedisService);
