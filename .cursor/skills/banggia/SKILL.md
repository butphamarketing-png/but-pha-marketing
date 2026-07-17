---
name: banggia
description: >-
  Design and implement deep, premium site menus and /banggia pricing navigation
  for Bứt Phá Marketing. Use when the user mentions /banggia, bảng giá, menu
  so deep, site nav depth, SiteNavMenu, or SIMPLE_NAV_LINKS.
disable-model-invocation: true
---

# `/banggia` — menu so deep

## What this skill does

Guide menu and pricing-nav work so the site nav feels **so deep**: layered,
premium, intentional — not a flat link dump.

## Canonical paths

| Concern | Path |
|---------|------|
| Pricing page | `app/banggia/page.tsx`, `components/pricing/*` |
| Nav data | `lib/site-navigation.ts` (`SIMPLE_NAV_LINKS`, `SERVICE_NAV_GROUPS`) |
| Nav UI | `components/shared/SiteNavMenu.tsx` |
| Attribution / gate | `lib/banggia-*.ts`, `app/api/banggia-access` |

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

- Preserve gate + attribution flow (`captureBanggiaAttribution`, access API).
- Public prices only after gate; do not leak full pricing elsewhere.
- CTAs elsewhere may link to `/banggia` without duplicating price tables.

## Checklist

- [ ] `SIMPLE_NAV_LINKS` has Bảng Giá **right after** Trang Chủ
- [ ] `SiteNavMenu` lead includes `/banggia` with emphasize (violet CTA)
- [ ] Mobile stack + desktop horizontal both show the item under Trang Chủ
- [ ] Active highlight works when `activeHref === "/banggia"`
- [ ] No broken links; page `/banggia` still loads
