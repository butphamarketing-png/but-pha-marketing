# SEO Ops Runbook — ButPhaMarketing

- Generated at: 2026-07-11T17:10:31.733Z
- Health score: **100 (A)**
- Autopilot: **GREEN**

## On-page (automated — done)
- P0 intent/proof/silo · P1 templates/case studies/hubs · P2 local redirects + thin content
- 35/35 programmatic landings **index** · silo inject **14 slugs**
- Weekly: `npm run run:seo-weekly` · apply: `npm run run:seo-weekly:apply`

## Tuần này (manual)
1. **GSC indexing** — `tmp-programmatic/gsc-indexing-checklist.md` (30 URL)
2. **Backlink** — copy `vertical-syndication-snippets.md` + log `npm run build:backlink-weekly-tracker -- --log="..."`
3. **Mockup HD** — drop WebP 1920px vào `public/tin-tuc/{ngành}/hd/` → `npm run audit:industry-mockup-dimensions`

## Scripts hữu ích
| Lệnh | Mục đích |
|---|---|
| `npm run seed:fix-checklist-silo` | Sửa silo checklist/template/case study |
| `npm run audit:silo-coverage` | Audit silo 14+ slug P2 |
| `npm run build:mockup-hd-gap` | Báo cáo mockup cần HD |
| `npm run scaffold:mockup-hd-dirs` | Tạo thư mục hd/ |
| `npm run build:gsc-indexing-checklist` | Regen checklist GSC |
| `npm run build:vertical-syndication` | Snippet outreach 7 ngành |
| `npm run sync:industry-landings` | Sync catalog → programmatic |

## Artifacts
- `seo-health-scorecard.md` · `seo-autopilot-summary.md`
- `mockup-hd-gap-report.md` · `backlink-weekly-tracker.md`
- `programmatic-promotions-changelog.md`