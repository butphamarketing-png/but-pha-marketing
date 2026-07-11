# SEO Ops Runbook — ButPhaMarketing

- Generated at: 2026-07-11T17:30:29.238Z
- Health score: **100 (A)**
- Autopilot: **GREEN**

## On-page (automated — done)
- P0 intent/proof/silo · P1 templates/case studies/hubs · P2 local redirects + thin content
- 35/35 programmatic landings **index** · silo inject **14 slugs**
- Weekly: `npm run run:seo-weekly` · apply: `npm run run:seo-weekly:apply`

## Tuần này (manual + semi-auto)
1. **Smoke test** — `npm run smoke:gsc-urls` (30 URL phải 200)
2. **IndexNow ping** — `npm run ping:indexnow` (sau khi key file deploy)
3. **GSC indexing** — `tmp-programmatic/gsc-indexing-checklist.md` (30 URL)
4. **Backlink** — copy `vertical-syndication-snippets.md` + log `npm run build:backlink-weekly-tracker -- --log="..."`
5. **Mockup HD** — `npm run generate:mockup-hd` (auto) · verify `npm run build:mockup-hd-gap` → **0/13 needs**

## Scripts hữu ích
| Lệnh | Mục đích |
|---|---|
| `npm run seed:fix-checklist-silo` | Sửa silo checklist/template/case study |
| `npm run audit:silo-coverage` | Audit silo 14+ slug P2 |
| `npm run build:mockup-hd-gap` | Báo cáo mockup cần HD |
| `npm run generate:mockup-hd` | Upscale PNG → WebP 1920px (sharp) |
| `npm run scaffold:mockup-hd-dirs` | Tạo thư mục hd/ |
| `npm run build:gsc-indexing-checklist` | Regen checklist GSC |
| `npm run smoke:gsc-urls` | Smoke test 30 URL production |
| `npm run ping:indexnow` | Ping Bing/Yandex IndexNow |
| `npm run build:vertical-syndication` | Snippet outreach 7 ngành |
| `npm run sync:industry-landings` | Sync catalog → programmatic |

## Artifacts
- `seo-health-scorecard.md` · `seo-autopilot-summary.md`
- `mockup-hd-gap-report.md` · `backlink-weekly-tracker.md`
- `programmatic-promotions-changelog.md`