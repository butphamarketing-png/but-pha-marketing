import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class AiProService {
  private readonly logger = new Logger(AiProService.name);

  async expandKeywords(topic: string) {
    this.logger.log(`Expanding keywords for: ${topic}`);
    // Mocking OpenAI call for now
    return [
      { keyword: `dịch vụ ${topic}`, volume: 1200, difficulty: 35, intent: "commercial" },
      { keyword: `${topic} là gì`, volume: 800, difficulty: 25, intent: "informational" },
      { keyword: `bảng giá ${topic} 2026`, volume: 500, difficulty: 45, intent: "transactional" },
      { keyword: `cách tối ưu ${topic} tại nhà`, volume: 300, difficulty: 15, intent: "informational" },
      { keyword: `review các đơn vị ${topic} uy tín`, volume: 450, difficulty: 55, intent: "commercial" },
    ];
  }

  async detectContentGaps(keyword: string, serpResults: any[]) {
    this.logger.log(`Detecting content gaps for: ${keyword}`);
    // Mocking OpenAI call
    return {
      missingTopics: [
        "So sánh chi phí giữa các phương pháp SEO",
        "Case study thực tế từ doanh nghiệp Việt Nam",
        "Checklist tối ưu kỹ thuật chuyên sâu",
      ],
      weaknesses: [
        "Các đối thủ hiện tại thiếu hình ảnh minh họa thực tế",
        "Nội dung của Top 1 đã cũ (từ 2024)",
        "Thiếu video hướng dẫn trực quan",
      ]
    };
  }

  async generateArticleSuggestions(keywords: any[], gaps: any) {
    this.logger.log("Generating article suggestions");
    // Mocking OpenAI call
    return [
      {
        title: `Hướng dẫn ${keywords[0].keyword} toàn tập từ A-Z (Cập nhật 2026)`,
        targetKeyword: keywords[0].keyword,
        score: 92,
        angle: "Chuyên sâu và thực chiến, bổ sung các phần còn thiếu từ đối thủ."
      },
      {
        title: `Tại sao 90% doanh nghiệp thất bại khi làm ${keywords[1].keyword}?`,
        targetKeyword: keywords[1].keyword,
        score: 85,
        angle: "Khai thác tâm lý lo lắng và đưa ra giải pháp khắc phục điểm yếu SERP."
      },
      {
        title: `Bảng giá ${keywords[2].keyword} mới nhất: Nên chọn đơn vị nào?`,
        targetKeyword: keywords[2].keyword,
        score: 78,
        angle: "Tập trung vào intent transactional để chuyển đổi khách hàng."
      }
    ];
  }
}
