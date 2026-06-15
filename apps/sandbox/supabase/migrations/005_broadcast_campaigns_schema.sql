-- Sandbox prototype: broadcast campaigns (no RLS)

create table broadcast_campaigns (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts (id) on delete cascade,
  name text not null,
  status text not null check (status in ('active', 'completed', 'paused', 'failed')),
  start_date timestamptz not null,
  end_date timestamptz not null,
  last_refreshed_at timestamptz not null,
  stats jsonb not null default '{}',
  created_by_user_id uuid not null references users (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index broadcast_campaigns_account_id_idx on broadcast_campaigns (account_id);
create index broadcast_campaigns_status_idx on broadcast_campaigns (status);
create index broadcast_campaigns_created_by_user_id_idx on broadcast_campaigns (created_by_user_id);

alter table broadcast_campaigns disable row level security;
