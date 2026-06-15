-- Sandbox prototype: forms domain (no RLS — prototype only, not for production)

create extension if not exists "pgcrypto";

create table accounts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts (id) on delete cascade,
  name text not null,
  initials text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table form_groups (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (account_id, name)
);

create table forms (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts (id) on delete cascade,
  name text not null,
  status text not null check (status in ('published', 'draft', 'unpublished')),
  lock_status text not null check (
    lock_status in ('unlocked', 'locked-can-edit', 'locked-view-only')
  ),
  locked_by_user_id uuid references users (id) on delete set null,
  archived boolean not null default false,
  form_group_id uuid not null references form_groups (id) on delete restrict,
  response_count integer not null default 0,
  created_by_user_id uuid not null references users (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index forms_account_id_idx on forms (account_id);
create index forms_form_group_id_idx on forms (form_group_id);
create index forms_created_by_user_id_idx on forms (created_by_user_id);

-- Prototype: disable RLS so the anon key can read/write without auth policies.
alter table accounts disable row level security;
alter table users disable row level security;
alter table form_groups disable row level security;
alter table forms disable row level security;
