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

-- Pha 1: kỳ thu (billing periods) + liên kết marketing customer_records
alter table erp.customers add column if not exists tax_id text;
alter table erp.customers add column if not exists external_id text;

create unique index if not exists erp_customers_external_id_idx
  on erp.customers (external_id) where external_id is not null;

alter table erp.contracts add column if not exists external_contract_code text;

create unique index if not exists erp_contracts_external_code_idx
  on erp.contracts (external_contract_code) where external_contract_code is not null;

create table if not exists erp.billing_periods (
  id serial primary key,
  contract_id integer not null references erp.contracts(id) on delete cascade,
  customer_id integer not null references erp.customers(id) on delete cascade,
  period_start date not null,
  period_end date not null,
  due_date date not null,
  amount_due numeric(18, 2) not null default 0,
  amount_paid numeric(18, 2) not null default 0,
  status text not null default 'pending',
  label text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table erp.receipts add column if not exists billing_period_id integer
  references erp.billing_periods(id) on delete set null;

create index if not exists erp_billing_periods_due_idx on erp.billing_periods (due_date);
create index if not exists erp_billing_periods_status_idx on erp.billing_periods (status);
create index if not exists erp_billing_periods_contract_idx on erp.billing_periods (contract_id);
create unique index if not exists erp_billing_periods_contract_range_idx
  on erp.billing_periods (contract_id, period_start, period_end);
create index if not exists erp_receipts_billing_period_idx on erp.receipts (billing_period_id);

-- Pha 2: ghi nhận doanh thu dồn tích (accrual) + chu kỳ hợp đồng
alter table erp.contracts add column if not exists billing_cycle text;

create table if not exists erp.revenue_recognition (
  id serial primary key,
  billing_period_id integer not null references erp.billing_periods(id) on delete cascade,
  contract_id integer not null references erp.contracts(id) on delete cascade,
  customer_id integer not null references erp.customers(id) on delete cascade,
  recognition_year integer not null,
  recognition_month integer not null check (recognition_month between 1 and 12),
  amount numeric(18, 2) not null,
  method text not null default 'monthly',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (billing_period_id, recognition_year, recognition_month)
);

create index if not exists erp_revenue_recognition_period_idx
  on erp.revenue_recognition (recognition_year, recognition_month);
create index if not exists erp_revenue_recognition_customer_idx
  on erp.revenue_recognition (customer_id);
create index if not exists erp_revenue_recognition_contract_idx
  on erp.revenue_recognition (contract_id);

-- Pha 3: hóa đơn nội bộ + VAT + đối soát phiếu thu
create table if not exists erp.invoices (
  id serial primary key,
  code text not null unique,
  customer_id integer not null references erp.customers(id) on delete restrict,
  contract_id integer references erp.contracts(id) on delete set null,
  billing_period_id integer references erp.billing_periods(id) on delete set null,
  tax_id text,
  buyer_name text not null,
  buyer_address text,
  buyer_email text,
  buyer_phone text,
  subtotal numeric(18, 2) not null default 0,
  vat_rate numeric(5, 2) not null default 8,
  vat_amount numeric(18, 2) not null default 0,
  total_amount numeric(18, 2) not null default 0,
  status text not null default 'draft',
  issue_date date not null,
  notes text,
  created_by text not null default 'Admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists erp.invoice_lines (
  id serial primary key,
  invoice_id integer not null references erp.invoices(id) on delete cascade,
  line_no integer not null default 1,
  description text not null,
  unit text not null default 'Gói',
  quantity numeric(18, 2) not null default 1,
  unit_price numeric(18, 2) not null,
  amount numeric(18, 2) not null,
  created_at timestamptz not null default now()
);

create table if not exists erp.invoice_receipts (
  invoice_id integer not null references erp.invoices(id) on delete cascade,
  receipt_id integer not null references erp.receipts(id) on delete restrict,
  amount numeric(18, 2) not null,
  created_at timestamptz not null default now(),
  primary key (invoice_id, receipt_id)
);

create index if not exists erp_invoices_customer_idx on erp.invoices (customer_id);
create index if not exists erp_invoices_status_idx on erp.invoices (status);
create index if not exists erp_invoices_issue_date_idx on erp.invoices (issue_date desc);
create index if not exists erp_invoice_lines_invoice_idx on erp.invoice_lines (invoice_id);
create index if not exists erp_invoice_receipts_receipt_idx on erp.invoice_receipts (receipt_id);

-- Loại khách + thông tin hóa đơn (Pha 3 UX)
alter table erp.customers add column if not exists customer_type text default 'individual';
alter table erp.customers add column if not exists contact_person text;
alter table erp.customers add column if not exists invoice_address text;
alter table erp.customers add column if not exists needs_vat_invoice boolean not null default false;
alter table erp.customers add column if not exists customer_status text default 'active';

-- Pha 4: chi phí gắn khách hàng (P&L theo KH)
alter table erp.expenses add column if not exists customer_id integer references erp.customers(id) on delete set null;
create index if not exists erp_expenses_customer_idx on erp.expenses (customer_id);

-- Pha 5: trạng thái thanh toán phiếu chi (AP thật)
alter table erp.expenses add column if not exists payment_status text not null default 'unpaid';
create index if not exists erp_expenses_payment_status_idx on erp.expenses (payment_status);

-- Kế toán / thuế (P1): cấu hình TNHH + GTGT quý
create table if not exists erp.tax_settings (
  id serial primary key,
  entity_type text not null default 'TNHH',
  company_name text,
  company_tax_id text,
  company_address text,
  vat_filing_period text not null default 'quarterly',
  vat_default_rate numeric(5, 2) not null default 8,
  cit_rate numeric(5, 2) not null default 20,
  quarterly_vat_due_day integer not null default 30,
  updated_at timestamptz not null default now()
);

insert into erp.tax_settings (entity_type, vat_filing_period)
select 'TNHH', 'quarterly'
where not exists (select 1 from erp.tax_settings limit 1);
