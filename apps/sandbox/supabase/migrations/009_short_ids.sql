-- Sandbox prototype: convert UUID primary keys to 8-digit text ids.
-- Truncates all prototype data. Re-run seed scripts after this migration.
--
-- Foreign keys must be dropped before column types can change.

truncate table
  workflow_templates,
  workflows,
  broadcast_campaigns,
  form_payment_items,
  form_payment_settings,
  payment_items,
  forms,
  form_groups,
  users,
  accounts
cascade;

alter table workflow_templates drop constraint if exists workflow_templates_account_id_fkey;
alter table workflow_templates drop constraint if exists workflow_templates_source_workflow_id_fkey;
alter table workflow_templates drop constraint if exists workflow_templates_created_by_user_id_fkey;

alter table workflows drop constraint if exists workflows_account_id_fkey;
alter table workflows drop constraint if exists workflows_locked_by_user_id_fkey;
alter table workflows drop constraint if exists workflows_created_by_user_id_fkey;

alter table broadcast_campaigns drop constraint if exists broadcast_campaigns_account_id_fkey;
alter table broadcast_campaigns drop constraint if exists broadcast_campaigns_created_by_user_id_fkey;

alter table form_payment_items drop constraint if exists form_payment_items_form_id_fkey;
alter table form_payment_items drop constraint if exists form_payment_items_payment_item_id_fkey;

alter table form_payment_settings drop constraint if exists form_payment_settings_form_id_fkey;

alter table payment_items drop constraint if exists payment_items_account_id_fkey;
alter table payment_items drop constraint if exists payment_items_locked_by_user_id_fkey;
alter table payment_items drop constraint if exists payment_items_created_by_user_id_fkey;

alter table forms drop constraint if exists forms_account_id_fkey;
alter table forms drop constraint if exists forms_locked_by_user_id_fkey;
alter table forms drop constraint if exists forms_form_group_id_fkey;
alter table forms drop constraint if exists forms_created_by_user_id_fkey;
alter table forms drop constraint if exists forms_archived_by_user_id_fkey;

alter table form_groups drop constraint if exists form_groups_account_id_fkey;

alter table users drop constraint if exists users_account_id_fkey;

alter table accounts alter column id type text using id::text;

alter table users alter column id type text using id::text;
alter table users alter column account_id type text using account_id::text;

alter table form_groups alter column id type text using id::text;
alter table form_groups alter column account_id type text using account_id::text;

alter table forms alter column id type text using id::text;
alter table forms alter column account_id type text using account_id::text;
alter table forms alter column locked_by_user_id type text using locked_by_user_id::text;
alter table forms alter column form_group_id type text using form_group_id::text;
alter table forms alter column created_by_user_id type text using created_by_user_id::text;
alter table forms alter column archived_by_user_id type text using archived_by_user_id::text;

alter table payment_items alter column id type text using id::text;
alter table payment_items alter column account_id type text using account_id::text;
alter table payment_items alter column locked_by_user_id type text using locked_by_user_id::text;
alter table payment_items alter column created_by_user_id type text using created_by_user_id::text;

alter table form_payment_settings alter column form_id type text using form_id::text;

alter table form_payment_items alter column form_id type text using form_id::text;
alter table form_payment_items alter column payment_item_id type text using payment_item_id::text;

alter table broadcast_campaigns alter column id type text using id::text;
alter table broadcast_campaigns alter column account_id type text using account_id::text;
alter table broadcast_campaigns alter column created_by_user_id type text using created_by_user_id::text;

alter table workflows alter column id type text using id::text;
alter table workflows alter column account_id type text using account_id::text;
alter table workflows alter column locked_by_user_id type text using locked_by_user_id::text;
alter table workflows alter column created_by_user_id type text using created_by_user_id::text;

alter table workflow_templates alter column id type text using id::text;
alter table workflow_templates alter column account_id type text using account_id::text;
alter table workflow_templates alter column source_workflow_id type text using source_workflow_id::text;
alter table workflow_templates alter column created_by_user_id type text using created_by_user_id::text;

alter table users
  add constraint users_account_id_fkey
  foreign key (account_id) references accounts (id) on delete cascade;

alter table form_groups
  add constraint form_groups_account_id_fkey
  foreign key (account_id) references accounts (id) on delete cascade;

alter table forms
  add constraint forms_account_id_fkey
  foreign key (account_id) references accounts (id) on delete cascade;

alter table forms
  add constraint forms_locked_by_user_id_fkey
  foreign key (locked_by_user_id) references users (id) on delete set null;

alter table forms
  add constraint forms_form_group_id_fkey
  foreign key (form_group_id) references form_groups (id) on delete restrict;

alter table forms
  add constraint forms_created_by_user_id_fkey
  foreign key (created_by_user_id) references users (id) on delete restrict;

alter table forms
  add constraint forms_archived_by_user_id_fkey
  foreign key (archived_by_user_id) references users (id) on delete set null;

alter table payment_items
  add constraint payment_items_account_id_fkey
  foreign key (account_id) references accounts (id) on delete cascade;

alter table payment_items
  add constraint payment_items_locked_by_user_id_fkey
  foreign key (locked_by_user_id) references users (id) on delete set null;

alter table payment_items
  add constraint payment_items_created_by_user_id_fkey
  foreign key (created_by_user_id) references users (id) on delete restrict;

alter table form_payment_settings
  add constraint form_payment_settings_form_id_fkey
  foreign key (form_id) references forms (id) on delete cascade;

alter table form_payment_items
  add constraint form_payment_items_form_id_fkey
  foreign key (form_id) references forms (id) on delete cascade;

alter table form_payment_items
  add constraint form_payment_items_payment_item_id_fkey
  foreign key (payment_item_id) references payment_items (id) on delete cascade;

alter table broadcast_campaigns
  add constraint broadcast_campaigns_account_id_fkey
  foreign key (account_id) references accounts (id) on delete cascade;

alter table broadcast_campaigns
  add constraint broadcast_campaigns_created_by_user_id_fkey
  foreign key (created_by_user_id) references users (id) on delete restrict;

alter table workflows
  add constraint workflows_account_id_fkey
  foreign key (account_id) references accounts (id) on delete cascade;

alter table workflows
  add constraint workflows_locked_by_user_id_fkey
  foreign key (locked_by_user_id) references users (id) on delete set null;

alter table workflows
  add constraint workflows_created_by_user_id_fkey
  foreign key (created_by_user_id) references users (id) on delete restrict;

alter table workflow_templates
  add constraint workflow_templates_account_id_fkey
  foreign key (account_id) references accounts (id) on delete cascade;

alter table workflow_templates
  add constraint workflow_templates_source_workflow_id_fkey
  foreign key (source_workflow_id) references workflows (id) on delete set null;

alter table workflow_templates
  add constraint workflow_templates_created_by_user_id_fkey
  foreign key (created_by_user_id) references users (id) on delete restrict;
