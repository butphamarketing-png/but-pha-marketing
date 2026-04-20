import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { PostRankQueryDto } from "./dto/post-rank-query.dto";
import { RankTrackDto } from "./dto/rank-track.dto";
import { RankService } from "./rank.service";
import { PluginGuard } from "../common/guards/plugin.guard";
import { RequirePlugin } from "../common/decorators/require-plugin.decorator";

@Controller("seo")
@UseGuards(PluginGuard)
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get("rank-tracking")
  @RequirePlugin("rank_tracker")
  getRankingHistory(@Query() query: PostRankQueryDto) {
    return this.rankService.getRankingHistory(query.postId);
  }

  @Post("rank-track")
  @RequirePlugin("rank_tracker")
  trackKeyword(@Body() dto: RankTrackDto) {
    return this.rankService.trackKeyword(dto);
  }

  @Get("decay-check")
  @RequirePlugin("rank_tracker")
  checkDecay(@Query() query: PostRankQueryDto) {
    return this.rankService.checkDecay(query.postId);
  }
}
