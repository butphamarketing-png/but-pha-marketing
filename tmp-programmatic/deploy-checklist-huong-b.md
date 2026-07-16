# Deploy checklist — Day-1 → E15 (Hướng B)

## Code đã sửa (cần deploy)

- `app/website`, `banggia`, `facebook`, `google-maps`
- `app/blog`, `app/blog/chu-de`
- `lib/blog-cta.ts`, `lib/money-kw-targets.ts`
- Components: BanggiaPageClient, WebsiteProof, BlogPillarHub, ServiceConversionFooter, WebsiteIndustryGrid, CaseStudyDetail, ProgrammaticLandingPage

## DB đã patch (không cần deploy code)

- Pillars + Website ~655 + Facebook 435 + Maps ~1000+

## Việc deploy

1. Commit các file code trên (không commit `.env`, tmp ảnh storyboard nếu không cần)
2. Push → Vercel production
3. Sau deploy: hard-refresh `/website`, `/banggia`, `/facebook`, `/google-maps`
4. Kiểm tra: `/banggia` xem giá không gate SĐT; CTA blog → Money Page

## Sau deploy — đo (E10)

File: `tmp-programmatic/e09-priority-urls-and-measure.md`  
Ghi baseline rank + GSC clicks `/website` + `/banggia`.

## Không làm tiếp trừ khi có số đo

- Không batch link thêm
- Không seed bài mới
- Không mở Engine mới
