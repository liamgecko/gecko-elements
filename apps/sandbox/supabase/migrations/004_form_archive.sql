-- Sandbox prototype: form archive metadata (no RLS)

alter table forms
  add column archived_by_user_id uuid references users (id) on delete set null,
  add column archived_at timestamptz;

create index forms_archived_by_user_id_idx on forms (archived_by_user_id);

-- Backfill seeded archived forms when migration runs after seed.sql
update forms
set
  archived_by_user_id = 'a0000003-0000-4000-8000-000000000003',
  archived_at = '2025-10-06T14:30:00.000Z'
where id = 'f0000003-0000-4000-8000-000000000003';

update forms
set
  archived_by_user_id = 'a0000002-0000-4000-8000-000000000002',
  archived_at = '2025-10-26T11:15:00.000Z'
where id = 'f0000007-0000-4000-8000-000000000007';
