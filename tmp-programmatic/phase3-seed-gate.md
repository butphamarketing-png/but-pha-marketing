# Phase 3 — Seed gate (có mở mass niche lại không?)

- Generated: 2026-07-14T18:24:02.169Z

## Mặc định: **KHÔNG** mass-seed niche mới

Chỉ resume `seed:niche-*` / customer-kw bulk khi **ĐỦ cả 3**:

1. [ ] Money stack indexed ổn: ≥4/5 primary URL ở trạng thái Indexed (GSC URL Inspection)
2. [ ] Không spike «Crawled – currently not indexed» trên batch blog mới (so tuần trước)
3. [ ] ≥1 tín hiệu rank/CTR cải thiện trên KW «báo giá thiết kế website» **hoặc** «thiết kế website» / «… tphcm»

## Vẫn được viết tiếp (không tính mass-seed)
- Rewrite unique / DNA ngành Jaccard cao
- Bài customer-intent lẻ (1–10) có outline riêng
- Case study / PR / citation
- Landing quận mới nếu có unique NAP/FAQ (không clone template)

## Lệnh kiểm tra trước khi seed
```
npm run audit:phase1-jaccard
npm run export:phase2-money-urls
npm run export:phase3-local-urls
npm run build:phase3-money-kw-pack
```

Nếu gate FAIL → ưu tiên GSC index + PR + rewrite, không mở batch mới.
