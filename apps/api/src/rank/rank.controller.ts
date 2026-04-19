import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { PostRankQueryDto } from "./dto/post-rank-query.dto";
import { RankTrackDto } from "./dto/rank-track.dto";
import { RankService } from "./rank.service";

@Controller("seo")
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get("rank-tracking")
  getRankingHistory(@Query() query: PostRankQueryDto) {
    return this.rankService.getRankingHistory(query.postId);
  }

  @Post("rank-track")
  trackKeyword(@Body() dto: RankTrackDto) {
    return this.rankService.trackKeyword(dto);
  }

  @Get("decay-check")
  checkDecay(@Query() query: PostRankQueryDto) {
    return this.rankService.checkDecay(query.postId);
  }
}
