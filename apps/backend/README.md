# Backend Scaffold

## Stack

- FastAPI style API
- Pydantic schemas
- Service layer for content and SEO logic

## Required env

- `DATABASE_URL`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `OPENAI_REASONING_EFFORT`
- `SERPAPI_API_KEY`

## Local flow

1. Copy `.env.example` to `.env`
2. Start PostgreSQL
3. Start Redis
4. Run Alembic migrations
5. Start the worker
6. Start the FastAPI app
7. Start the frontend app

## Demo account

- Email: `admin@example.com`
- Password: `admin123`

## Notes

- OpenAI powers article generation when the API key is set. Default model is `gpt-5.4`.
- SERPAPI powers live rank tracking and SERP analysis when the key is set.
- Without SERPAPI key, the app uses demo SERP data so the UI still works.
- Publish and index jobs are recorded in the `jobs` table and pushed to Redis so the worker can process them asynchronously.
- For full-stack local dev, use `docker compose up` from the repo root.
