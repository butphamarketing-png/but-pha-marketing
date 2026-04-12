# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Artifact: Bứt Phá Marketing (but-pha-marketing)

Vietnamese marketing agency SPA — React Vite, previewPath `/`, port 26244.

### Features
- Loading animation (progress bar + spinning ring with logo)
- Home hub with 6 platform buttons (Facebook, TikTok, Instagram, Zalo, Google Maps, Website)
- Each platform page: slideshow, intro accordion, tabbed pricing, comparison table, before/after slider, fanpage audit, stats, process steps, FAQ, contact form
- Shared components: SocialProofToast (every 3 min), MusicPlayer (Web Audio API oscillator), QuickContactButtons (3 fixed left buttons), DecisionTreeQuiz, AudioGuide (SpeechSynthesis vi-VN), BeforeAfterSlider, FanpageAudit, ComparisonTable, ConsultModal, LoginModal
- Auth: localStorage-based via AuthContext (login/logout)
- Member Dashboard: project progress bars, quick stats, docs library, notifications
- Admin Panel: login (password: admin123), dashboard analytics, section visibility toggles, platform color pickers, site settings
- AdminContext: platform colors, section visibility stored in localStorage

### Key Files
- `src/App.tsx` — router + providers
- `src/pages/Home.tsx` — main hub
- `src/pages/Facebook.tsx`, `Tiktok.tsx`, `Instagram.tsx`, `Zalo.tsx`, `GoogleMaps.tsx`, `Website.tsx` — 6 sub-pages
- `src/pages/Dashboard.tsx` — member dashboard
- `src/pages/Admin.tsx` — admin panel
- `src/components/shared/PlatformPage.tsx` — reusable platform page template
- `src/lib/AuthContext.tsx`, `AdminContext.tsx` — state management

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
