# SEO Weekly Apply Runner Report

- Generated at: 2026-07-12T06:37:40.657Z
- Total steps: 24
- Passed: 24
- Failed: 0

## PASS - Schema coverage audit
- Command: `npm run audit:schema-coverage`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 audit:schema-coverage
> node scripts/audit-schema-coverage.mjs

=== Schema Coverage Audit ===
Total checks: 8
Passed: 8
Failed: 0
✓ SEO Website pillar (app/seo-website/page.tsx)
✓ Marketing Automation pillar (app/marketing-automation/page.tsx)
✓ AI Marketing pillar (app/ai-marketing/page.tsx)
✓ Knowledge center (app/kien-thuc/page.tsx + components/landing/SubLandingPage.tsx)
✓ Programmatic industry page (app/website/nganh/[industry]/page.tsx + components/landing/ProgrammaticLandingPage.tsx)
✓ Programmatic local SEO page (app/seo-website/dia-phuong/[location]/page.tsx + components/landing/ProgrammaticLandingPage.tsx)
✓ Topic hub page (app/blog/chu-de/[topic]/page.tsx)
✓ Industry hub page (app/blog/nganh/[industry]/page.tsx)
```

## PASS - Priority proof audit
- Command: `npm run audit:priority-proof`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 audit:priority-proof
> node scripts/audit-priority-proof.mjs

◇ injected env (13) from .env.local // tip: ◈ encrypted .env [www.dotenvx.com]
◇ injected env (1) from .env // tip: ◈ secrets for agents [www.dotenvx.com]
=== Priority proof audit ===
Total: 20
Need proof push (<70): 0
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\priority-proof-audit.md
```

## PASS - Priority intent-coverage audit
- Command: `npm run audit:priority-intent-coverage`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 audit:priority-intent-coverage
> node scripts/audit-priority-intent-coverage.mjs

◇ injected env (13) from .env.local // tip: ◈ encrypted .env [www.dotenvx.com]
◇ injected env (1) from .env // tip: ⌁ auth for agents [www.vestauth.com]
=== Priority intent coverage audit ===
Total: 20
Fail: 0
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\priority-intent-coverage-audit.md
```

## PASS - Priority content freshness audit
- Command: `npm run audit:priority-content-freshness`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 audit:priority-content-freshness
> node scripts/audit-priority-content-freshness.mjs

◇ injected env (13) from .env.local // tip: ◈ encrypted .env [www.dotenvx.com]
◇ injected env (1) from .env // tip: ◈ secrets for agents [www.dotenvx.com]
=== Priority content freshness audit ===
Total: 20
Stale: 0
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\priority-content-freshness-audit.md
```

## PASS - Build proof fix checklist
- Command: `npm run build:proof-fix-checklist`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 build:proof-fix-checklist
> node scripts/build-proof-fix-checklist.mjs

=== Proof fix checklist generated ===
Weak URLs: 0
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\priority-proof-fix-checklist.md
```

## PASS - Priority internal-links audit
- Command: `npm run audit:priority-internal-links`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 audit:priority-internal-links
> node scripts/audit-priority-internal-links.mjs

◇ injected env (13) from .env.local // tip: ⌘ override existing { override: true }
◇ injected env (1) from .env // tip: ◈ secrets for agents [www.dotenvx.com]
=== Priority internal-links audit ===
Total: 20
Fail: 0
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\priority-internal-links-audit.md
```

## PASS - Build internal-link fix checklist
- Command: `npm run build:internal-link-fix-checklist`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 build:internal-link-fix-checklist
> node scripts/build-internal-link-fix-checklist.mjs

=== Internal-link fix checklist generated ===
Failed URLs: 0
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\priority-internal-links-fix-checklist.md
```

## PASS - Programmatic promotion audit
- Command: `npm run promote:programmatic-index`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 promote:programmatic-index
> node scripts/promote-programmatic-index.mjs --config scripts/programmatic-landings.config.json --outDir tmp-programmatic

=== Programmatic promotion audit ===
Config: C:\Users\Admin\Downloads\ButPhaMarketing (1)\scripts\programmatic-landings.config.json
Total rows: 35
Promotable now: 0
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\programmatic-promotion-report.json
Promote paths: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\programmatic-promote-paths.txt
```

## PASS - Apply programmatic promotions
- Command: `npm run promote:programmatic-index:apply`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 promote:programmatic-index:apply
> node scripts/apply-programmatic-promotions.mjs --config scripts/programmatic-landings.config.json --outDir tmp-programmatic --report tmp-programmatic/programmatic-promotion-report.json --apply

=== Apply programmatic promotions ===
Config: C:\Users\Admin\Downloads\ButPhaMarketing (1)\scripts\programmatic-landings.config.json
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\programmatic-promotion-report.json
Promotable in report: 0
Applied count: 0
Changelog: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\programmatic-promotions-changelog.md
```

## PASS - Fix checklist silo links
- Command: `npm run seed:fix-checklist-silo`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 seed:fix-checklist-silo
> node scripts/seed-fix-checklist-silo-links.mjs

◇ injected env (13) from .env.local // tip: ⌘ suppress logs { quiet: true }
◇ injected env (1) from .env // tip: ⌘ multiple files { path: ['.env.local', '.env'] }
◇ injected env (0) from .env.local // tip: ⌘ custom filepath { path: '/custom/path/.env' }
  · checklist-website-nha-khoa-2026: already OK
  · checklist-website-tham-my-vien-2026: already OK
  · checklist-website-phong-kham-2026: already OK
  · checklist-website-logistics-2026: already OK
  · checklist-website-my-pham-2026: already OK
  · checklist-website-co-khi-2026: already OK
  · checklist-website-pccc-2026: already OK
  · template-website-nha-khoa-2026: already OK
  · case-study-thiet-ke-website-van-toc-express-logistics: already OK
  · case-study-thiet-ke-website-glow-dew-cosmetics: already OK
  · thiet-ke-website-noi-that: already OK
  · thiet-ke-website-go-noi-that: already OK
  · thiet-ke-website-noi-that-van-phong: already OK
  · thiet-ke-website-vat-lieu-xay-dung: already OK
Revalidated blog cache { revalidated: true, slug: 'all' }

Done: 14/14
```

## PASS - Silo coverage audit
- Command: `npm run audit:silo-coverage`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 audit:silo-coverage
> node scripts/audit-silo-coverage.mjs

◇ injected env (13) from .env.local // tip: ⌘ multiple files { path: ['.env.local', '.env'] }
=== Silo coverage audit ===
Pass: 14/14
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\silo-coverage-audit.md
```

## PASS - Commit promotion snapshot
- Command: `npm run promote:programmatic-index:commit`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 promote:programmatic-index:commit
> node scripts/promote-programmatic-index.mjs --config scripts/programmatic-landings.config.json --outDir tmp-programmatic --commit

=== Programmatic promotion audit ===
Config: C:\Users\Admin\Downloads\ButPhaMarketing (1)\scripts\programmatic-landings.config.json
Total rows: 35
Promotable now: 0
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\programmatic-promotion-report.json
Promote paths: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\programmatic-promote-paths.txt
Snapshot updated: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\programmatic-index-snapshot.json
```

## PASS - Programmatic demotion guard
- Command: `npm run guard:programmatic-demotion`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 guard:programmatic-demotion
> node scripts/guard-programmatic-demotion.mjs --config scripts/programmatic-landings.config.json --outDir tmp-programmatic

=== Programmatic demotion guard ===
Config: C:\Users\Admin\Downloads\ButPhaMarketing (1)\scripts\programmatic-landings.config.json
Override-index URLs: 23
Alerts: 0
JSON: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\programmatic-demotion-alerts.json
Markdown: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\programmatic-demotion-alerts.md
```

## PASS - Generate programmatic module
- Command: `npm run seed:programmatic-landings:write-module`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 seed:programmatic-landings:write-module
> node scripts/seed-programmatic-landings.mjs --config scripts/programmatic-landings.config.json --outDir tmp-programmatic --write-module

=== Programmatic landing seed prepared ===
Config: C:\Users\Admin\Downloads\ButPhaMarketing (1)\scripts\programmatic-landings.config.json
Output: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic
Total rows: 35
Indexable: 35
Noindex: 0
Generated module: C:\Users\Admin\Downloads\ButPhaMarketing (1)\lib\programmatic-seo.generated.ts
```

## PASS - Build backlink brand plan
- Command: `npm run build:backlink-brand-signals`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 build:backlink-brand-signals
> node scripts/build-backlink-brand-signals.mjs

=== Backlink & brand signals plan generated ===
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\backlink-brand-signals-plan.md
```

## PASS - Build head-term syndication
- Command: `npm run build:head-term-syndication`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 build:head-term-syndication
> node scripts/build-head-term-syndication.mjs

=== Head-term syndication snippets ===
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\head-term-syndication-snippets.md
```

## PASS - Build vertical syndication
- Command: `npm run build:vertical-syndication`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 build:vertical-syndication
> node scripts/build-vertical-syndication-snippets.mjs

=== Vertical syndication snippets ===
Verticals: 7
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\vertical-syndication-snippets.md
```

## PASS - Mockup HD gap report
- Command: `npm run build:mockup-hd-gap`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 build:mockup-hd-gap
> node scripts/build-mockup-hd-gap-report.mjs

=== Mockup HD gap report ===
Needs HD: 0/13
HD ready: 13/13
JSON: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\mockup-hd-gap-report.json
MD: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\mockup-hd-gap-report.md
```

## PASS - GSC indexing checklist
- Command: `npm run build:gsc-indexing-checklist`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 build:gsc-indexing-checklist
> node scripts/build-gsc-indexing-checklist.mjs

=== GSC indexing checklist ===
URLs: 30 (23 landings)
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\gsc-indexing-checklist.md
```

## PASS - SEO ops runbook
- Command: `npm run build:seo-ops-runbook`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 build:seo-ops-runbook
> node scripts/build-seo-ops-runbook.mjs

=== SEO ops runbook ===
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\seo-ops-runbook.md
```

## PASS - Build SEO health scorecard
- Command: `npm run build:seo-health-scorecard`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 build:seo-health-scorecard
> node scripts/build-seo-health-scorecard.mjs

=== SEO health scorecard generated ===
Score: 100 (A)
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\seo-health-scorecard.md
```

## PASS - Build SEO execution board
- Command: `npm run build:seo-execution-board`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 build:seo-execution-board
> node scripts/build-seo-execution-board.mjs

=== SEO execution board generated ===
Tasks: 1
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\seo-execution-board.md
```

## PASS - Build SEO ops KPI
- Command: `npm run build:seo-ops-kpi`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 build:seo-ops-kpi
> node scripts/build-seo-ops-kpi.mjs

=== SEO ops KPI generated ===
Health: 100 (A)
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\seo-ops-kpi.md
```

## PASS - Build SEO autopilot summary
- Command: `npm run build:seo-autopilot-summary`
- Exit code: 0
- Stdout snippet:
```text
> but-pha-marketing@0.1.0 build:seo-autopilot-summary
> node scripts/build-seo-autopilot-summary.mjs

=== SEO autopilot summary generated ===
Status: GREEN
Report: C:\Users\Admin\Downloads\ButPhaMarketing (1)\tmp-programmatic\seo-autopilot-summary.md
```
