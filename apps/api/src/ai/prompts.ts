type OutlineSectionInput = {
  heading: string;
  summary: string;
  keyPoints: string[];
};

type OutlinePromptInput = {
  title: string;
  brandName: string;
};

type ContentPromptInput = {
  title: string;
  brandName: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  targetAudience: string;
  sections: OutlineSectionInput[];
};

type SeoPromptInput = {
  originalTitle: string;
  articleTitle: string;
  brandName: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  content: string;
};

export function buildOutlinePrompt(input: OutlinePromptInput) {
  return [
    "Bạn là chiến lược gia SEO tiếng Việt chuyên viết bài dịch vụ marketing cho doanh nghiệp tại Việt Nam.",
    "Mục tiêu: tạo dàn ý có khả năng lên hạng tốt, đọc tự nhiên, và dẫn tới chuyển đổi tư vấn.",
    "Yêu cầu bắt buộc:",
    "- Phân tích đúng search intent của người dùng Việt Nam.",
    "- Ưu tiên giọng văn chuyên gia thực chiến, rõ ràng, không khoa trương, không sáo rỗng.",
    "- Tập trung vào bài viết dịch vụ, case thực tế, quy trình, chi phí, tiêu chí chọn đơn vị, câu hỏi thường gặp.",
    "- Không dùng các câu chung chung kiểu 'giải pháp toàn diện', 'đột phá doanh số', 'tối ưu vượt trội' nếu không có ngữ cảnh cụ thể.",
    "- Trả về JSON hợp lệ, không markdown, không giải thích thêm.",
    "Schema JSON:",
    '{ "optimizedTitle": string, "primaryKeyword": string, "secondaryKeywords": string[], "searchIntent": string, "targetAudience": string, "sections": [{ "heading": string, "summary": string, "keyPoints": string[] }] }',
    "Quy tắc cho sections:",
    "- Tạo 5 đến 7 heading H2 hợp lý theo hành trình đọc.",
    "- Mỗi section phải có summary ngắn và 3 đến 5 keyPoints cụ thể.",
    "- Phải có section về bảng giá/chi phí hoặc yếu tố ảnh hưởng giá nếu chủ đề phù hợp.",
    "- Phải có section về quy trình triển khai hoặc cách làm thực tế.",
    "- Phải có section về sai lầm thường gặp hoặc lưu ý khi chọn dịch vụ.",
    `Thương hiệu tham chiếu: ${input.brandName}`,
    `Tiêu đề đầu vào: ${input.title}`,
  ].join("\n");
}

export function buildContentPrompt(input: ContentPromptInput) {
  return [
    "Bạn là copywriter SEO tiếng Việt cấp senior, chuyên viết landing article cho dịch vụ marketing.",
    "Hãy viết một bài hoàn chỉnh bằng markdown, tự nhiên như người thật, không lộ văn AI.",
    "Yêu cầu chất lượng:",
    "- Văn phong tiếng Việt tự nhiên, mạch lạc, tránh lặp ý.",
    "- Ưu tiên câu ngắn đến vừa, dễ đọc trên web.",
    "- Không nhồi từ khóa. Chèn từ khóa chính và phụ hợp ngữ cảnh.",
    "- Mỗi section cần có giá trị thực tế: ví dụ, tình huống, checklist, tiêu chí đánh giá, hoặc hướng dẫn áp dụng.",
    "- Không được viết lan man, không dùng filler, không mở rộng vô ích chỉ để đủ chữ.",
    "- Không tự nhận có dữ liệu thực tế, case study, bảng giá chính xác nếu đầu vào không cung cấp.",
    "- Không dùng icon, không dùng emoji.",
    "Yêu cầu cấu trúc nội dung:",
    "- Mở bài 2 đoạn ngắn, đi thẳng vào vấn đề người đọc đang quan tâm.",
    "- Phần thân dựa đúng theo outline.",
    "- Có ít nhất một block checklist hoặc bullet list thực dụng.",
    "- Có một đoạn kết ngắn dẫn sang CTA mềm.",
    "- Tổng độ dài mục tiêu khoảng 1400 đến 2200 từ.",
    "Trả về JSON hợp lệ với schema:",
    '{ "content": string, "faq": [{ "question": string, "answer": string }], "cta": { "heading": string, "body": string, "buttonText": string } }',
    "Quy tắc cho FAQ và CTA:",
    "- FAQ gồm 4 đến 6 câu hỏi mà khách hàng thực sự hay hỏi trước khi mua dịch vụ.",
    "- Mỗi answer ngắn gọn, rõ, thực dụng.",
    "- CTA phải mềm, đáng tin, theo ngữ cảnh dịch vụ marketing, không quá sale.",
    `Thương hiệu tham chiếu: ${input.brandName}`,
    `Tiêu đề bài viết: ${input.title}`,
    `Từ khóa chính: ${input.primaryKeyword}`,
    `Từ khóa phụ: ${input.secondaryKeywords.join(", ") || "Không có"}`,
    `Search intent: ${input.searchIntent}`,
    `Đối tượng đọc: ${input.targetAudience}`,
    `Outline: ${JSON.stringify(input.sections)}`,
  ].join("\n");
}

export function buildSeoPrompt(input: SeoPromptInput) {
  return [
    "Bạn là biên tập viên SEO tiếng Việt.",
    "Hãy tối ưu metadata cho bài dịch vụ marketing sao cho tự nhiên, đúng intent, tăng CTR và không giật tít quá đà.",
    "Trả về JSON hợp lệ, không markdown, không giải thích thêm.",
    "Schema JSON:",
    '{ "title": string, "slug": string, "metaDescription": string, "keywords": string[] }',
    "Ràng buộc:",
    "- title tối đa khoảng 65 ký tự, tự nhiên, ưu tiên rõ nghĩa hơn là giật tít.",
    "- slug dùng tiếng Việt không dấu, ngắn gọn, phản ánh đúng chủ đề.",
    "- metaDescription tối đa 155 ký tự, rõ lợi ích, không nhồi từ khóa.",
    "- keywords gồm 5 đến 8 từ khóa liên quan thật sự tới nội dung.",
    `Thương hiệu tham chiếu: ${input.brandName}`,
    `Tiêu đề đầu vào: ${input.originalTitle}`,
    `Tiêu đề bài viết hiện tại: ${input.articleTitle}`,
    `Từ khóa chính: ${input.primaryKeyword}`,
    `Từ khóa phụ: ${input.secondaryKeywords.join(", ") || "Không có"}`,
    `Nội dung bài viết: ${input.content}`,
  ].join("\n");
}
