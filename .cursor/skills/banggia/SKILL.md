---
name: banggia
description: >-
  Design and implement deep, premium /banggia pricing page, nav, and section
  backgrounds for Bứt Phá Marketing. Use when the user mentions /banggia, bảng
  giá, menu so deep, site nav depth, SiteNavMenu, SIMPLE_NAV_LINKS, or pricing
  atmosphere backgrounds.
disable-model-invocation: true
---

# `/banggia` — menu so deep + atmosphere

## What this skill does

Guide menu, pricing-nav, and **deep atmosphere backgrounds** so `/banggia` and
related homepage sections feel layered and premium — not flat black.

## Canonical paths

| Concern | Path |
|---------|------|
| Pricing page | `app/banggia/page.tsx`, `components/pricing/*` |
| Nav data | `lib/site-navigation.ts` (`SIMPLE_NAV_LINKS`, `SERVICE_NAV_GROUPS`) |
| Nav UI | `components/shared/SiteNavMenu.tsx` |
| Attribution | `lib/banggia-*.ts` |
| Banggia BG asset | `public/about/banggia-bg-deep.png` (+ `banggia-bg-concept.png`) |
| Tư vấn BG asset | `public/about/tu-van-bg-deep.png` (+ `tu-van-bg-concept.png`) |
| Regen script | `scripts/gen-banggia-tuvan-bgs.mjs` |
| Homepage tư vấn | `app/HomePageClient.tsx` section `#tu-van` |

## Background rules (deep purple)

1. Prefer a **themed photo/concept image** + **violet/amber CSS overlay** — never flat `#06080f` alone.
2. `/banggia` uses `BANGGIA_BG` via `BanggiaAtmosphere` in `BanggiaPageClient.tsx`.
3. Homepage **Đặt lịch hẹn tư vấn** uses `TU_VAN_BG` (`/about/tu-van-bg-deep.png`).
4. Themes:
   - **Bảng giá:** rate-card / ledger / soft price-tag atmosphere, amber top-left + violet wash.
   - **Tư vấn:** calendar grid + clock arcs → appointment light, calm center for the form.
5. After regenerating assets, bump cache query (`?v=…`) on constants.
6. Keep text readable: overlays may darken bottom; leave mid/upper glow for hierarchy.

```bash
node scripts/gen-banggia-tuvan-bgs.mjs
```

## Menu rules (so deep)

1. **Bảng Giá** is a top-level simple link → `/banggia` (label: `Bảng Giá`), placed **directly under Trang Chủ**.
2. In stack/horizontal lead (before service groups), order is:
   - Trang Chủ (`/`)
   - Bảng Giá (`/banggia`) — emphasized (violet pill / CTA style)
   - Giới Thiệu (`/gioi-thieu`)
3. Trail after services:
   - Tin Tức (`/blog`)
   - Liên Hệ (`/lien-he`)
4. Keep service mega/dropdowns for Website · Facebook · Maps · SEO · Automation · AI — do not bury bảng giá inside a service group.
5. Depth = hierarchy + motion + tone, not more links. Prefer:
   - Clear primary vs secondary
   - Soft open/close for groups
   - Active state that matches page tone (light / dark / panel)
6. Avoid clutter: no duplicate “bảng giá” under every service unless the user asks.

## When editing `/banggia`

- Page is public — no lead gate before viewing prices.
- Keep attribution capture (`captureBanggiaAttribution`).
- CTAs elsewhere may link to `/banggia` without duplicating price tables.
- Keep `BanggiaAtmosphere` on the page shell.

## Checklist

- [ ] `SIMPLE_NAV_LINKS` has Bảng Giá **right after** Trang Chủ
- [ ] `SiteNavMenu` lead includes `/banggia` with emphasize (violet CTA)
- [ ] Mobile stack + desktop horizontal both show the item under Trang Chủ
- [ ] Active highlight works when `activeHref === "/banggia"`
- [ ] `/banggia` uses `banggia-bg-deep.png` + purple overlay (not flat black)
- [ ] Homepage `#tu-van` uses `tu-van-bg-deep.png` + purple overlay
- [ ] No broken links; page `/banggia` still loads
