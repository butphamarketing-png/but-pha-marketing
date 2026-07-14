# GSC Post-Deploy Checklist (Phase 1–3)

- Generated: 2026-07-14T18:30:09.845Z
- Total URL Inspection priority: **31**

## 0. QA live trước khi request index
- [ ] 301 /bao-gia → /banggia: https://www.butphamarketing.com/bao-gia
- [ ] 301 /case-study → /du-an: https://www.butphamarketing.com/case-study
- [ ] 301 TPHCM blog → local: https://www.butphamarketing.com/blog/thiet-ke-website-tphcm
- [ ] 301 tp-hcm customer → local: https://www.butphamarketing.com/blog/thiet-ke-website-tp-hcm
- [ ] IndexNow key file: https://www.butphamarketing.com/butpha-indexnow-202607.txt

## Batch 1 — Core money (ngày 1)
- [ ] 1. https://www.butphamarketing.com/
- [ ] 2. https://www.butphamarketing.com/website
- [ ] 3. https://www.butphamarketing.com/banggia
- [ ] 4. https://www.butphamarketing.com/seo-website
- [ ] 5. https://www.butphamarketing.com/lien-he
- [ ] 6. https://www.butphamarketing.com/du-an
- [ ] 7. https://www.butphamarketing.com/google-maps
- [ ] 8. https://www.butphamarketing.com/blog/thiet-ke-website
- [ ] 9. https://www.butphamarketing.com/blog/bao-gia-thiet-ke-website

## Batch 2 — 5 money KW stack (ngày 1–2)
- [ ] 1. https://www.butphamarketing.com/website/nganh/spa
- [ ] 2. https://www.butphamarketing.com/website/nganh/nha-khoa
- [ ] 3. https://www.butphamarketing.com/seo-website/dia-phuong/ho-chi-minh
- [ ] 4. https://www.butphamarketing.com/blog/thiet-ke-website-spa
- [ ] 5. https://www.butphamarketing.com/blog/thiet-ke-website-nha-khoa
- [ ] 6. https://www.butphamarketing.com/du-an/nha-khoa-dang-khoa

## Batch 3 — 12 quận Phase 3 (ngày 2–3)
- [ ] 1. https://www.butphamarketing.com/seo-website/dia-phuong/quan-1
- [ ] 2. https://www.butphamarketing.com/seo-website/dia-phuong/quan-3
- [ ] 3. https://www.butphamarketing.com/seo-website/dia-phuong/quan-7
- [ ] 4. https://www.butphamarketing.com/seo-website/dia-phuong/binh-thanh
- [ ] 5. https://www.butphamarketing.com/seo-website/dia-phuong/thu-duc
- [ ] 6. https://www.butphamarketing.com/seo-website/dia-phuong/go-vap
- [ ] 7. https://www.butphamarketing.com/seo-website/dia-phuong/cau-giay
- [ ] 8. https://www.butphamarketing.com/seo-website/dia-phuong/dong-da
- [ ] 9. https://www.butphamarketing.com/seo-website/dia-phuong/hai-ba-trung
- [ ] 10. https://www.butphamarketing.com/seo-website/dia-phuong/nam-tu-liem
- [ ] 11. https://www.butphamarketing.com/seo-website/dia-phuong/hai-chau
- [ ] 12. https://www.butphamarketing.com/seo-website/dia-phuong/thanh-khe

## Batch 4 — hub tỉnh phụ (ngày 3)
- [ ] 1. https://www.butphamarketing.com/seo-website/dia-phuong/ha-noi
- [ ] 2. https://www.butphamarketing.com/seo-website/dia-phuong/da-nang
- [ ] 3. https://www.butphamarketing.com/seo-website/dia-phuong/can-tho
- [ ] 4. https://www.butphamarketing.com/seo-website/dia-phuong/binh-duong

## IndexNow (sau Bing verify)
```
npm run ping:indexnow:phase2-money
npm run ping:indexnow:phase3-local
npm run ping:indexnow:phase3-money-kw
```

## Ghi chú
- GSC URL Inspection giới hạn ~10–20 request/ngày — chia batch.
- Sau index: ghi `phase3-money-kw-tracker.md` mỗi tuần.
- Seed gate: `phase3-seed-gate.md` — chưa PASS thì không mass-seed.
