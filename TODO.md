# Next.js Supabase Settings API Bug Fixes

## Plan Overview
Fix critical bugs: API crashes (HTML instead of JSON), unsafe parsing, double stringify, missing env handling.

## Steps (to be checked off)

### 1. ✅ Update lib/supabase.ts
- Make getEnv non-throwing for server role key.
- Log warning if missing.
- Return empty fallback.

### 2. ✅ Update app/api/settings/route.ts  
- Add entry logs (method, key, env prefix).
- Env validation before Supabase client.
- Log Supabase {data, error, count}.
- Ensure always JSON.

### 3. ✅ Update lib/AdminContext.tsx
- Safe fetch: res.text() → try JSON.parse → fallback {ok:false}.
- Fix persist: JSON.stringify({key, value: settingsObj}) directly (no parse/stringify).
- Handle data?.value null/undefined safely.

### 4. [ ] Test locally
- `npm run dev`
- Visit /admin, update setting, check console/DB.

### 5. [ ] Deploy & verify
- Vercel env vars correct.
- Production test.

Current progress: All code fixes complete. Ready for testing.

