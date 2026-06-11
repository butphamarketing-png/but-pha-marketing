-- Bứt Phá ERP (/cms) — schema trong namespace erp (tránh trùng public.services của marketing site)
-- Chạy: npm run setup:cms-db

create schema if not exists erp;

create table if not exists erp.customers (
  id serial primary key,
  name text not null,
  phone text,
  email text,
  address text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.users (
  id serial primary key,
  email text not null unique,
  password text not null,
  full_name text not null,
  role text not null default 'Sale',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.services (
  id serial primary key,
  name text not null,
  type text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.suppliers (
  id serial primary key,
  name text not null,
  phone text,
  email text,
  address text,
  type text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.contracts (
  id serial primary key,
  code text not null unique,
  customer_id integer not null,
  service_id integer,
  total_value numeric(18, 2) not null default 0,
  paid_amount numeric(18, 2) not null default 0,
  status text not null default 'active',
  start_date date not null,
  end_date date,
  due_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.receipts (
  id serial primary key,
  code text not null unique,
  customer_id integer not null,
  contract_id integer,
  service_id integer,
  amount numeric(18, 2) not null,
  payment_method text not null default 'cash',
  receipt_date date not null,
  created_by text not null default 'Admin',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.expenses (
  id serial primary key,
  code text not null unique,
  supplier_id integer,
  service_id integer,
  category text not null,
  amount numeric(18, 2) not null,
  expense_date date not null,
  created_by text not null default 'Admin',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.audit_logs (
  id serial primary key,
  entity_type text not null,
  entity_id integer not null,
  action text not null,
  performed_by text not null default 'Admin',
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz not null default now()
);

create table if not exists erp.debts (
  id serial primary key,
  customer_id integer not null references erp.customers(id) on delete cascade,
  contract_id integer references erp.contracts(id) on delete set null,
  total_amount numeric(18, 2) not null,
  paid_amount numeric(18, 2) not null default 0,
  due_date date not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.domains (
  id serial primary key,
  customer_id integer not null references erp.customers(id) on delete cascade,
  domain_name text not null,
  provider text not null,
  register_date date not null,
  expire_date date not null,
  buy_price numeric(18, 2),
  sell_price numeric(18, 2),
  status text not null default 'active',
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.hostings (
  id serial primary key,
  customer_id integer not null references erp.customers(id) on delete cascade,
  hosting_name text not null,
  provider text not null,
  package text not null,
  capacity text,
  register_date date not null,
  expire_date date not null,
  buy_price numeric(18, 2),
  sell_price numeric(18, 2),
  status text not null default 'active',
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.websites (
  id serial primary key,
  customer_id integer not null references erp.customers(id) on delete cascade,
  website_name text not null,
  domain_id integer references erp.domains(id) on delete set null,
  hosting_id integer references erp.hostings(id) on delete set null,
  cms text not null,
  technology text,
  start_date date,
  deadline date,
  delivery_date date,
  contract_value numeric(18, 2),
  admin_url text,
  username text,
  status text not null default 'completed',
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.fanpages (
  id serial primary key,
  customer_id integer not null references erp.customers(id) on delete cascade,
  page_name text not null,
  page_url text not null,
  page_id text,
  category text,
  followers integer,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.fanpage_services (
  id serial primary key,
  customer_id integer not null references erp.customers(id) on delete cascade,
  package_name text not null,
  posts_per_month integer not null default 0,
  reels_per_month integer not null default 0,
  monthly_fee numeric(18, 2),
  start_date date not null,
  end_date date not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.facebook_ads (
  id serial primary key,
  customer_id integer not null references erp.customers(id) on delete cascade,
  ad_account text,
  monthly_budget numeric(18, 2) not null,
  spend numeric(18, 2) not null default 0,
  leads integer not null default 0,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.google_ads (
  id serial primary key,
  customer_id integer not null references erp.customers(id) on delete cascade,
  campaign_name text not null,
  budget numeric(18, 2) not null,
  spend numeric(18, 2) not null default 0,
  leads integer not null default 0,
  impressions integer not null default 0,
  phone_calls integer not null default 0,
  directions integer not null default 0,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.google_profiles (
  id serial primary key,
  customer_id integer not null references erp.customers(id) on delete cascade,
  business_name text not null,
  map_link text,
  place_id text,
  category text,
  review_count integer,
  rating numeric(3, 1),
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.employees (
  id serial primary key,
  full_name text not null,
  phone text not null,
  email text not null,
  role text not null default 'Sale',
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists erp_customers_name_idx on erp.customers (name);
create index if not exists erp_domains_expire_idx on erp.domains (expire_date);
create index if not exists erp_hostings_expire_idx on erp.hostings (expire_date);
create index if not exists erp_audit_logs_created_idx on erp.audit_logs (created_at desc);
