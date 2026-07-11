# SEO Ops Runbook — ButPhaMarketing

- Generated at: 2026-07-11T17:36:18.275Z
- Health score: **100 (A)**
- Autopilot: **GREEN**

## On-page (automated — done)
- P0 intent/proof/silo · P1 templates/case studies/hubs · P2 local redirects + thin content
- 35/35 programmatic landings **index** · silo inject **14 slugs**
- Weekly: `npm run run:seo-weekly` · apply: `npm run run:seo-weekly:apply`

## Tuần này (manual + semi-auto)
1. **GSC indexing** — `tmp-programmatic/gsc-copy-paste.md` (30 URL copy-paste)
2. **Outreach tuần 1** — `tmp-programmatic/outreach-week-1-playbook.md`
3. **Backlink log** — `npm run build:backlink-weekly-tracker -- --log="..."`
4. **IndexNow** — `npm run ping:indexnow` (đã ping · chạy lại sau deploy mới)
5. **Mockup HD** — `npm run generate:mockup-hd` · verify **0/13 needs**

## Scripts hữu ích
| Lệnh | Mục đích |
|---|---|
| `npm run seed:fix-checklist-silo` | Sửa silo checklist/template/case study |
| `npm run audit:silo-coverage` | Audit silo 14+ slug P2 |
| `npm run build:mockup-hd-gap` | Báo cáo mockup cần HD |
| `npm run generate:mockup-hd` | Upscale PNG → WebP 1920px (sharp) |
| `npm run scaffold:mockup-hd-dirs` | Tạo thư mục hd/ |
| `npm run build:gsc-indexing-checklist` | Regen checklist GSC |
| `npm run build:gsc-copy-paste` | GSC copy-paste 30 URL |
| `npm run build:outreach-week-playbook` | Playbook outreach tuần 1 |
| `npm run build:backlink-weekly-tracker` | Log placement backlink |
| `npm run build:vertical-syndication` | Snippet outreach 7 ngành |
| `npm run sync:industry-landings` | Sync catalog → programmatic |

## Artifacts
- `seo-health-scorecard.md` · `seo-autopilot-summary.md`
- `mockup-hd-gap-report.md` · `backlink-weekly-tracker.md`
- `programmatic-promotions-changelog.md`