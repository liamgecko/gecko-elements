-- Sandbox prototype: chargeable items (no RLS — prototype only)

create table payment_items (
  id text primary key,
  account_id text not null references accounts (id) on delete cascade,
  name text not null,
  internal_name text,
  amount numeric(12, 2) not null check (amount > 0),
  currency text not null check (currency in ('GBP', 'EUR', 'USD')),
  provider text not null check (provider in ('Flywire', 'TouchNet')),
  lock_status text not null check (
    lock_status in ('unlocked', 'locked-can-edit', 'locked-view-only')
  ),
  locked_by_user_id text references users (id) on delete set null,
  min_quantity integer,
  max_quantity integer,
  available_quantity integer,
  created_by_user_id text not null references users (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index payment_items_account_id_idx on payment_items (account_id);
create index payment_items_provider_idx on payment_items (provider);
create index payment_items_currency_idx on payment_items (currency);

alter table payment_items disable row level security;
