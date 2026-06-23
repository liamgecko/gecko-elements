-- Sandbox prototype: form payment settings (no RLS)

create table form_payment_settings (
  form_id text primary key references forms (id) on delete cascade,
  provider text check (provider in ('Flywire', 'TouchNet')),
  updated_at timestamptz not null default now()
);

create table form_payment_items (
  form_id text not null references forms (id) on delete cascade,
  payment_item_id text not null references payment_items (id) on delete cascade,
  sort_order integer not null default 0,
  primary key (form_id, payment_item_id)
);

create index form_payment_items_form_id_idx on form_payment_items (form_id);
create index form_payment_items_payment_item_id_idx on form_payment_items (payment_item_id);

alter table form_payment_settings disable row level security;
alter table form_payment_items disable row level security;
