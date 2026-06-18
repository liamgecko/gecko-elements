-- Sandbox prototype: workflow templates (no RLS)

create table workflow_templates (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts (id) on delete cascade,
  name text not null,
  definition jsonb,
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
  source_workflow_id uuid references workflows (id) on delete set null,
  created_by_user_id uuid not null references users (id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index workflow_templates_account_id_idx on workflow_templates (account_id);
create index workflow_templates_source_workflow_id_idx on workflow_templates (source_workflow_id);
create index workflow_templates_created_by_user_id_idx on workflow_templates (created_by_user_id);

alter table workflow_templates disable row level security;
