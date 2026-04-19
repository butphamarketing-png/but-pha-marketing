# Phase 1 MVP Setup

## Architecture

- `app/studio`: Next.js App Router pages for the SaaS dashboard and post editor.
- `components/seo-studio`: Client UI for generation, editing, saving, and regeneration.
- `apps/api`: NestJS API with `auth`, `user`, `project`, `post`, and `ai` modules.
- `prisma/schema.prisma`: PostgreSQL schema for users, projects, posts, and AI generations.

## Environment

Copy `.env.example` values into `.env.local` and set:

- `DATABASE_URL`
- `REDIS_URL`
- `OPENAI_API_KEY`
- `AI_MOCK_MODE`
- `NEXT_PUBLIC_API_BASE_URL`

Optional:

- `API_PORT` defaults to `4000`
- `OPENAI_MODEL` defaults to `gpt-4.1-mini`
- `OPENAI_EMBEDDING_MODEL` defaults to `text-embedding-3-small`
- `SERP_API_KEY` enables live SERP analysis
- `SERPAPI_LOCATION` defaults to `United States`

## Run

1. `npm install`
2. `npm run prisma:generate`
3. `npm run prisma:push`
4. `npm run dev:api`
5. In a second terminal: `npm run dev`

Frontend: `http://localhost:3000/studio`

API: `http://localhost:4000/api`

## MVP Flow

1. Enter a title in the studio editor.
2. Click `AI Generate`.
3. Review the autofilled article, slug, keywords, and meta description.
4. Click `Save Post`.
5. Open saved posts from the left sidebar.
6. Click `Regenerate` on a saved post to create the next version.
