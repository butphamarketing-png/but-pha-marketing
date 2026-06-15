---
name: cms
description: >-
  Develop and fix the Bứt Phá Marketing ERP at /cms (SPA, API, bundle build).
  Use when the user mentions /cms, CMS, ERP, khach-hang hub, phiếu thu/chi,
  billing periods, invoices, reports, or CMS bundle patches — and NOT for
  marketing site, SEO articles, or public Next.js pages outside /cms.
disable-model-invocation: true
---

# CMS (`/cms`) Development Scope

## In scope

| Layer | Path | Notes |
|-------|------|-------|
| ERP SPA source | `Asset-Tracker-extracted/.../artifacts/erp/src/` | gitignored locally; changes ship via `public/cms/` bundle |
| Deployed bundle | `public/cms/` | committed to git |
| CMS API | `lib/cms-internal/`, `lib/cms-*.ts` | Express routes under `/cms/api/*` |
| CMS DB schema | `scripts/cms-schema.sql` | `npm run setup:cms-db` |
| Build & patches | `scripts/build-cms.mjs`, `scripts/patch-cms-*.mjs` | prefer **source fixes** over minified patches |
| Tax UI (Next) | `app/cms/tax/**` | separate from SPA; menu links redirect out of SPA |

## Out of scope

- Marketing website, blog/SEO (`app/`, `content/`, `scripts/seed-seo-*`)
- `customer_records` JSON admin outside `/cms` unless syncing **into** ERP
- Full MISA clone, payroll, inventory
- Merging marketing + ERP into one DB (document only; do not refactor without explicit ask)

## Architecture (quick)

```
/cms          → Vite SPA (wouter), basename /cms
/cms/api/*    → ERP Express (lib/cms-internal)
/cms/khach-hang → CRM hub (marketing /api/customers)
/cms/tax/*    → Next.js tax module (not SPA)
```

**Customer data rule:** editable CRM = `/cms/khach-hang`. ERP `/customers` redirects there. Customer 360° reads ERP `/customers/:id/overview`.

## Build workflow

```bash
SKIP_CMS_INSTALL=true npm run build:cms
```

1. Vite build from ERP source → `public/cms/`
2. Patch scripts run (soft-fail if anchors missing)
3. Verify bundle: no `SelectItem value=""`, report routes present

## CMS coding rules

1. **Radix Select:** never `value=""` — use `_none` via `@/lib/form-utils`
2. **Asset search:** use `optLower()` from `@/lib/search-utils`
3. **New pages:** add `.tsx` in source + `App.tsx` routes + `layout.tsx` menu — do not rely only on bundle patches
4. **API calls:** `erpApiFetch("/path")` → `/cms/api/path`
5. **Tax links:** SPA href `/tax/*` + redirect component → `window.location.replace("/cms/tax/...")`
6. **Error Boundary** wraps router in `App.tsx`

## Remaining CMS backlog (when asked to "finish CMS")

Most P0/P1 items are in ERP source. Still optional:

1. Merge marketing + ERP into one DB (explicit architecture task)
2. Code-split large SPA bundle
3. Smoke tests after `build:cms`

Priority for fixes: source first, avoid bundle patches (build no longer runs patch scripts).

## Key APIs

| Endpoint | Purpose |
|----------|---------|
| `GET /billing-periods` | Kỳ thu list |
| `POST /billing-periods/:id/renew` | Gia hạn kỳ |
| `GET /customers/:id/overview` | Customer 360° |
| `GET /dashboard/billing-pipeline` | Dashboard widget |
| `GET /reports/billing-periods` | Báo cáo kỳ thu |
| `GET /revenue-recognition` | Ghi nhận DT |

## Additional resources

- Architecture & audit notes: [reference.md](reference.md)
