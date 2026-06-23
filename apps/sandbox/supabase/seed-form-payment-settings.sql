-- Seed form payment settings. Requires forms and payment_items seeds.

insert into form_payment_settings (form_id, provider) values
  ('40000001', 'Flywire'),
  ('40000004', 'TouchNet');

insert into form_payment_items (form_id, payment_item_id, sort_order) values
  ('40000001', '50000001', 0),
  ('40000001', '50000002', 1),
  ('40000001', '50000003', 2),
  ('40000004', '50000004', 0),
  ('40000004', '50000005', 1);
