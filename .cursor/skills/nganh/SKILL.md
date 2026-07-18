---
name: nganh
description: >-
  Kiểm tra và làm lại thumbnail trang ngành (/website/nganh, /blog/nganh): mỗi
  bài 1 thumbnail khớp tiêu đề/từ khóa, gắn alt. Use when the user mentions
  /nganh, ngành, nganh-thumbs, industry landing, hoặc remake thumbnail ngành.
disable-model-invocation: true
---

# `/nganh` — thumbnail + alt

## What this skill does

làm lại thumnail
mỗi bài 1 thumnail phù hợp với tiêu đề từ khoá
nhớ gắn alt

## Routes

| Route | Role |
|-------|------|
| `/website/nganh/[industry]` | Money landing ngành |
| `/blog/nganh/[industry]` | Hub blog silo |
| `/website#theo-nganh` | Grid card ngành |

## Image layers (do not confuse)

1. **Card ngành** — `public/tin-tuc/nganh-thumbs/{slug}.png`  
   Một ảnh / ngành. Alt = `primaryKeyword` (`getWebsiteIndustryCardThumbnail`).
2. **Gallery mockup** — pool `public/tin-tuc/{industry}/` (chia sẻ trong ngành).  
   Alt từ `industry-mockup-alts` / niche `*_IMAGE_ALTS`.
3. **Bài viết** — mỗi slug một file `public/tin-tuc/articles/{slug}.webp`  
   Map: `lib/news-article-thumbs.generated.json`  
   Resolve/alt: `resolveBlogImageUrl` + `getBlogThumbnailAlt` trong `lib/news-images.ts`.

Mục tiêu “mỗi bài 1 thumbnail” = lớp **bài viết**, không phải `nganh-thumbs`.

## Canonical files

| Concern | Path |
|---------|------|
| Catalog + primaryKeyword | `lib/website-industry-catalog.ts` |
| Hub blogSlugs | `lib/industry-hub.ts` |
| Card / gallery / hero | `lib/website-industry-images.ts` |
| Per-article resolve + alt | `lib/news-images.ts` |
| Generated map | `lib/news-article-thumbs.generated.json` |
| Batch (all news) | `scripts/gen-news-thumbs-batch.mjs` |
| Batch (ngành only) | `scripts/gen-nganh-thumbs-batch.mjs` |

## Workflow

```
Task Progress:
- [ ] Audit: node scripts/gen-nganh-thumbs-batch.mjs --audit
- [ ] Remake ngành posts: node scripts/gen-nganh-thumbs-batch.mjs
- [ ] (Optional) Force money posts: node scripts/gen-nganh-thumbs-batch.mjs --force
- [ ] Confirm alt via keywords_main / generated map
- [ ] Card ngành: chỉ đổi nganh-thumbs/{slug}.png nếu user hỏi riêng card
```

### Rules

1. Overlay / label ưu tiên `keywords_main`; nếu generic → dùng `title` hoặc `primaryKeyword` catalog.
2. Cập nhật Supabase `image_url` → `/tin-tuc/articles/{slug}.webp` và `keywords_main` (alt).
3. `resolveBlogImageUrl` ưu tiên `/tin-tuc/articles/` trước niche pool shared.
4. Alt surfaces: blog list, detail OG, related, homepage — đều qua `getBlogThumbnailAlt`.
5. Không thay card `nganh-thumbs` khi user chỉ nói “thumbnail bài”.

## Checklist

- [ ] Money + hub posts không còn generic / shared-pool
- [ ] Mỗi slug có file riêng trong `public/tin-tuc/articles/`
- [ ] `keywords_main` khớp tiêu đề/từ khóa → alt đúng
- [ ] Card ngành vẫn dùng `nganh-thumbs` + alt = primaryKeyword
