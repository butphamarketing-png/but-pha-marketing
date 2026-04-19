"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentWorkspaceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CurrentWorkspaceService = class CurrentWorkspaceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getContext() {
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
};
exports.CurrentWorkspaceService = CurrentWorkspaceService;
exports.CurrentWorkspaceService = CurrentWorkspaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CurrentWorkspaceService);
