-- Sandbox prototype: workflows (no RLS)

create table workflows (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts (id) on delete cascade,
  name text not null,
  lock_status text not null check (
    lock_status in ('unlocked', 'locked-can-edit', 'locked-view-only')
  ),
  locked_by_user_id uuid references users (id) on delete set null,
  enabled boolean not null default true,
  last_run timestamptz,
  action_type text not null check (
    action_type in (
      'add-label',
      'add-to-campaign',
      'add-to-event',
      'send-message',
      'assign-agent'
    )
  ),
  trigger_type text not null check (
    trigger_type in (
      'before-conversation',
      'during-conversation',
      'after-conversation-end'
    )
  ),
  label_ids text[] not null default '{}',
  created_by_user_id uuid not null references users (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index workflows_account_id_idx on workflows (account_id);
create index workflows_lock_status_idx on workflows (lock_status);
create index workflows_action_type_idx on workflows (action_type);
create index workflows_trigger_type_idx on workflows (trigger_type);
create index workflows_enabled_idx on workflows (enabled);
create index workflows_created_by_user_id_idx on workflows (created_by_user_id);

alter table workflows disable row level security;
