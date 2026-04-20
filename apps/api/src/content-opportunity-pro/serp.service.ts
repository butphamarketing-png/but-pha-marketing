import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class SerpProService {
  private readonly logger = new Logger(SerpProService.name);
  private readonly SERP_API_KEY = process.env.SERP_API_KEY;

  async getOrganicResults(keyword: string, location: string = "Vietnam") {
    if (!this.SERP_API_KEY) {
      this.logger.warn("SERP_API_KEY not configured, using mock results");
      return this.getMockResults(keyword);
    }

    try {
      const response = await axios.get("https://serpapi.com/search", {
        params: {
          q: keyword,
          location: location,
          hl: "vi",
          gl: "vn",
          api_key: this.SERP_API_KEY,
        },
      });

      return response.data.organic_results.map((r: any) => ({
        title: r.title,
        snippet: r.snippet,
        url: r.link,
        position: r.position,
      }));
    } catch (err) {
      this.logger.error(`SerpAPI failed: ${err.message}`);
      return this.getMockResults(keyword);
    }
  }

  private getMockResults(keyword: string) {
    return [
      { title: `Top 10 cách SEO ${keyword} hiệu quả nhất 2026`, snippet: `Hướng dẫn chi tiết từng bước để đạt thứ hạng cao cho từ khóa ${keyword}...`, url: "https://competitor1.com", position: 1 },
      { title: `Dịch vụ ${keyword} uy tín tại Việt Nam`, snippet: `Chúng tôi cung cấp giải pháp ${keyword} tổng thể giúp doanh nghiệp bứt phá doanh thu...`, url: "https://competitor2.com", position: 2 },
      { title: `Tại sao bạn cần làm ${keyword}?`, snippet: `Khám phá những lợi ích không ngờ khi tối ưu ${keyword} cho website của bạn...`, url: "https://competitor3.com", position: 3 },
    ];
  }
}
