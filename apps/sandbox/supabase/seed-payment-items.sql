-- Seed chargeable items. Requires accounts, users from seed.sql first.

insert into payment_items (
  id,
  account_id,
  name,
  internal_name,
  amount,
  currency,
  provider,
  lock_status,
  locked_by_user_id,
  min_quantity,
  max_quantity,
  available_quantity,
  created_by_user_id,
  created_at
) values
  ('50000001', '10000000', 'Application fee', null, 50, 'GBP', 'Flywire', 'unlocked', null, null, null, null, '20000005', '2025-07-23T09:30:00.000Z'),
  ('50000002', '10000000', 'Tuition payment', null, 9250, 'GBP', 'Flywire', 'locked-can-edit', '20000003', null, null, null, '20000006', '2025-08-28T14:00:00.000Z'),
  ('50000003', '10000000', 'International student levy', null, 120, 'GBP', 'Flywire', 'locked-view-only', '20000004', null, null, null, '20000001', '2025-09-05T11:30:00.000Z'),
  ('50000004', '10000000', 'Deposit', null, 500, 'GBP', 'TouchNet', 'unlocked', null, null, null, null, '20000002', '2025-10-10T16:00:00.000Z'),
  ('50000005', '10000000', 'Accommodation deposit', null, 250, 'GBP', 'TouchNet', 'locked-view-only', '20000006', null, null, null, '20000003', '2025-11-15T13:30:00.000Z'),
  ('50000006', '10000000', 'Scholarship acceptance fee', null, 75, 'GBP', 'TouchNet', 'unlocked', null, null, null, null, '20000004', '2025-07-20T10:00:00.000Z'),
  ('50000007', '10000000', 'EU application fee', 'eu-app-fee', 60, 'EUR', 'Flywire', 'locked-can-edit', '20000002', null, null, null, '20000005', '2025-08-25T15:30:00.000Z'),
  ('50000008', '10000000', 'Semester tuition', null, 4500, 'EUR', 'Flywire', 'unlocked', null, null, null, null, '20000006', '2025-09-02T12:00:00.000Z'),
  ('50000009', '10000000', 'Student health insurance', null, 180, 'EUR', 'TouchNet', 'locked-view-only', '20000004', 1, 1, 250, '20000001', '2025-10-07T09:30:00.000Z'),
  ('50000010', '10000000', 'Graduation ceremony fee', null, 95, 'EUR', 'TouchNet', 'unlocked', null, null, null, null, '20000002', '2025-11-12T14:00:00.000Z'),
  ('50000011', '10000000', 'US application fee', 'us-app-fee', 65, 'USD', 'Flywire', 'locked-can-edit', '20000006', null, null, null, '20000003', '2025-07-17T11:30:00.000Z'),
  ('50000012', '10000000', 'Tuition installment', null, 8500, 'USD', 'Flywire', 'locked-view-only', '20000001', null, null, null, '20000004', '2025-08-22T16:00:00.000Z'),
  ('50000013', '10000000', 'Orientation package', null, 125, 'USD', 'TouchNet', 'unlocked', null, null, null, null, '20000005', '2025-09-27T13:30:00.000Z'),
  ('50000014', '10000000', 'Campus housing deposit', null, 600, 'USD', 'TouchNet', 'locked-view-only', '20000003', 1, 2, 40, '20000006', '2025-10-04T10:00:00.000Z'),
  ('50000015', '10000000', 'International student services fee', null, 150, 'USD', 'Flywire', 'unlocked', null, null, null, null, '20000001', '2025-11-09T15:30:00.000Z');
