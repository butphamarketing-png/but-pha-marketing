-- Phiên truy cập website (phát hiện lead lạ / IP nghi ngờ)
-- Chạy trong Supabase Dashboard → SQL Editor nếu bảng chưa có.

create table if not exists public.visitor_sessions (
  id uuid primary key default gen_random_uuid(),
  ip text not null unique,
  user_agent text not null default '',
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  hits integer not null default 1,
  hits_last_1h integer not null default 1,
  paths jsonb not null default '[]'::jsonb,
  city text,
  region text,
  country text,
  country_code text,
  risk_score integer not null default 0,
  risk_level text not null default 'normal',
  risk_flags jsonb not null default '[]'::jsonb,
  linked_lead_phone text,
  linked_lead_name text,
  last_alerted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists visitor_sessions_last_seen_idx
  on public.visitor_sessions (last_seen_at desc);

create index if not exists visitor_sessions_risk_idx
  on public.visitor_sessions (risk_level, last_seen_at desc);

alter table public.visitor_sessions enable row level security;
