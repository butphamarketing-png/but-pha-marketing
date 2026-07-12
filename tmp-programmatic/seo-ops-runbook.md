# SEO Ops Runbook — ButPhaMarketing

- Generated at: 2026-07-12T06:37:36.975Z
- Health score: **100 (A)**
- Autopilot: **GREEN**

## On-page (automated — done)
- P0 intent/proof/silo · P1 templates/case studies/hubs · P2 local redirects + thin content
- **P4 scale blog:** proof **0%** · silo **0** · meta **0 fail** trên 11.086 bài
- P4 gap (all-published): scanned **11086** · pillar thiếu **0**
- 35/35 programmatic landings **index** · silo inject **14 slugs**
- Weekly: `npm run run:seo-weekly` · apply: `npm run run:seo-weekly:apply`

## IndexNow (semi-auto)
1. **Core 30 URL** — `npm run ping:indexnow`
2. **Blog hot ~6k** — `npm run export:indexnow-blog-hot` → `npm run ping:indexnow:blog-hot`
3. Báo cáo: `tmp-programmatic/indexnow-ping-report.md`

## Tuần này (manual + semi-auto)
1. **GSC indexing** — `tmp-programmatic/gsc-copy-paste.md` (30 URL) + `gsc-hot-blog-batch.md` (50 URL)
2. **Bing WMT verify** — `tmp-programmatic/bing-wmt-checklist.md`
3. **Outreach tuần 1** — `tmp-programmatic/outreach-week-1-playbook.md`
4. **Guest post pitch** — `tmp-programmatic/guest-post-pitch-pack.md`
5. **Directory VN** — `tmp-programmatic/directory-citation-pack-vn.md` (5 citation tuần 1)
6. **LinkedIn + Zalo group** — `linkedin-outreach-pack.md` · `zalo-group-post-pack.md`
7. **Backlink log** — `npm run build:backlink-weekly-tracker -- --log="..."`

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
| `npm run build:guest-post-pitch-pack` | Email pitch guest post |
| `npm run build:directory-citation-pack` | Directory citation VN + NAP |
| `npm run build:linkedin-outreach-pack` | LinkedIn connect + post |
| `npm run build:zalo-group-post-pack` | Zalo group post 7 vertical |
| `npm run build:backlink-weekly-tracker` | Log placement backlink |
| `npm run build:vertical-syndication` | Snippet outreach 7 ngành |
| `npm run audit:blog-p4-gap` | Gap proof/silo/pillar blog (hot hoặc `--all`) |
| `npm run seed:blog-p4-proof-silo` | Batch inject proof+silo (`--all-hot` / `--all`) |
| `npm run export:indexnow-blog-hot` | Export URL blog hot cho IndexNow |
| `npm run ping:indexnow:blog-hot` | Ping IndexNow ~6k bài hot |
| `npm run ping:indexnow` | Ping IndexNow 30 URL GSC core |
| `npm run sync:industry-landings` | Sync catalog → programmatic |

## Artifacts
- `seo-health-scorecard.md` · `seo-autopilot-summary.md`
- `mockup-hd-gap-report.md` · `backlink-weekly-tracker.md`
- `programmatic-promotions-changelog.md`