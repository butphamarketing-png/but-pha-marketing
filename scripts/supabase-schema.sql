-- Bứt Phá Marketing — schema cho Supabase project mới
-- Chạy trong: Supabase Dashboard → SQL Editor → New query → Run

create extension if not exists "pgcrypto";

-- Cài đặt site (admin, visitor tracking, customers JSON…)
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Tin tức / blog
create table if not exists public.news (
  id text primary key,
  title text not null,
  content text not null default '',
  category text not null default 'blog',
  published boolean not null default true,
  description text not null default '',
  image_url text not null default '',
  slug text unique,
  hot boolean not null default false,
  meta_description text not null default '',
  keywords_main text not null default '',
  keywords_secondary text not null default '',
  timestamp bigint not null default (extract(epoch from now()) * 1000)::bigint,
  published_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists news_published_idx on public.news (published, timestamp desc);
create index if not exists news_slug_idx on public.news (slug);

-- Push notification subscriptions (Web Push cho khách website)
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

-- Leads / liên hệ
create table if not exists public.leads (
  id bigserial primary key,
  type text not null default 'contact',
  name text,
  phone text not null,
  service text,
  note text,
  platform text,
  url text,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Đơn hàng
create table if not exists public.orders (
  id bigserial primary key,
  name text not null,
  phone text not null,
  pkg text not null,
  tab_label text not null,
  platform text not null,
  duration integer not null default 0,
  total numeric not null default 0,
  pay_method text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);

-- Thư viện media (URL trỏ R2; metadata lưu Supabase)
create table if not exists public.media (
  id bigserial primary key,
  url text not null,
  name text not null default '',
  type text not null default 'image',
  timestamp bigint not null default (extract(epoch from now()) * 1000)::bigint
);

create index if not exists media_timestamp_idx on public.media (timestamp desc);

-- Nội dung override theo platform (facebook, website…)
create table if not exists public.page_content (
  platform text primary key,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Gói dịch vụ (optional)
create table if not exists public.services (
  id bigserial primary key,
  platform text not null default '',
  name text not null default '',
  description text,
  image_url text,
  price text not null default '',
  period text not null default 'month',
  popular boolean not null default false,
  features jsonb not null default '[]'::jsonb,
  all_features jsonb not null default '[]'::jsonb,
  audio_text text not null default '',
  process jsonb not null default '[]'::jsonb,
  feedbacks jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- RLS: API dùng service_role nên tắt RLS hoặc policy cho anon nếu cần
alter table public.site_settings enable row level security;
alter table public.news enable row level security;
alter table public.push_subscriptions enable row level security;
alter table public.leads enable row level security;
alter table public.orders enable row level security;
alter table public.media enable row level security;
alter table public.page_content enable row level security;
alter table public.services enable row level security;

-- Cho phép đọc tin đã publish (public blog)
create policy "Public read published news"
  on public.news for select
  using (published = true);

-- Service role bypass RLS mặc định; các policy trên chỉ áp dụng anon key nếu dùng client-side
