-- Bảng lưu đăng ký Web Push (chạy nếu thiếu push_subscriptions)
create extension if not exists "pgcrypto";

create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  user_agent text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists push_subscriptions_created_idx on public.push_subscriptions (created_at desc);

alter table public.push_subscriptions enable row level security;
