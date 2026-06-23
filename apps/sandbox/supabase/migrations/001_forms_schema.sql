-- Sandbox prototype: forms domain (no RLS — prototype only, not for production)


create table accounts (
  id text primary key,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table users (
  id text primary key,
  account_id text not null references accounts (id) on delete cascade,
  name text not null,
  initials text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table form_groups (
  id text primary key,
  account_id text not null references accounts (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (account_id, name)
);

create table forms (
  id text primary key,
  account_id text not null references accounts (id) on delete cascade,
  name text not null,
  status text not null check (status in ('published', 'draft', 'unpublished')),
  lock_status text not null check (
    lock_status in ('unlocked', 'locked-can-edit', 'locked-view-only')
  ),
  locked_by_user_id text references users (id) on delete set null,
  archived boolean not null default false,
  form_group_id text not null references form_groups (id) on delete restrict,
  response_count integer not null default 0,
  created_by_user_id text not null references users (id) on delete restrict,
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
