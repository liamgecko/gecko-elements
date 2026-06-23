-- Seed data for the sandbox forms prototype.
-- Run after 001_forms_schema.sql in the Supabase SQL editor.

insert into accounts (id, name)
values ('10000000', 'Gecko');

insert into users (id, account_id, name, initials) values
  ('20000001', '10000000', 'Sarah Jenkins', 'SJ'),
  ('20000002', '10000000', 'Jonny Carter', 'JC'),
  ('20000003', '10000000', 'Liam Young', 'LY'),
  ('20000004', '10000000', 'Emma Wilson', 'EW'),
  ('20000005', '10000000', 'James Patel', 'JP'),
  ('20000006', '10000000', 'Mia Torres', 'MT');

insert into form_groups (id, account_id, name) values
  ('30000001', '10000000', 'Undergraduate'),
  ('30000002', '10000000', 'Postgraduate'),
  ('30000003', '10000000', 'International'),
  ('30000004', '10000000', 'Events'),
  ('30000005', '10000000', 'Admissions'),
  ('30000006', '10000000', 'Scholarships'),
  ('30000007', '10000000', 'Accommodation'),
  ('30000008', '10000000', 'Mature students');

insert into forms (
  id,
  account_id,
  name,
  status,
  lock_status,
  locked_by_user_id,
  archived,
  form_group_id,
  response_count,
  created_by_user_id,
  created_at
) values
  (
    '40000001',
    '10000000',
    'Undergraduate Application Form',
    'published',
    'unlocked',
    null,
    false,
    '30000001',
    3,
    '20000005',
    '2025-12-23T09:00:00.000Z'
  ),
  (
    '40000002',
    '10000000',
    'Postgraduate Taught Application',
    'draft',
    'locked-can-edit',
    '20000003',
    false,
    '30000006',
    21,
    '20000006',
    '2025-09-28T09:30:00.000Z'
  ),
  (
    '40000003',
    '10000000',
    'International Student Enquiry',
    'unpublished',
    'locked-view-only',
    '20000004',
    true,
    '30000003',
    6,
    '20000001',
    '2025-10-05T09:00:00.000Z'
  ),
  (
    '40000004',
    '10000000',
    'Open Day Registration',
    'published',
    'unlocked',
    null,
    false,
    '30000008',
    10,
    '20000002',
    '2025-11-10T09:30:00.000Z'
  ),
  (
    '40000005',
    '10000000',
    'Offer Holder Response Form',
    'draft',
    'locked-view-only',
    '20000006',
    false,
    '30000005',
    0,
    '20000003',
    '2025-12-15T09:00:00.000Z'
  ),
  (
    '40000006',
    '10000000',
    'Clearing Application',
    'published',
    'unlocked',
    null,
    false,
    '30000002',
    5,
    '20000004',
    '2025-09-20T09:30:00.000Z'
  ),
  (
    '40000007',
    '10000000',
    'Scholarship Application',
    'unpublished',
    'locked-can-edit',
    '20000002',
    true,
    '30000007',
    14,
    '20000005',
    '2025-10-25T09:00:00.000Z'
  ),
  (
    '40000008',
    '10000000',
    'Accommodation Preference Form',
    'published',
    'unlocked',
    null,
    false,
    '30000004',
    8,
    '20000006',
    '2025-11-02T09:30:00.000Z'
  ),
  (
    '40000009',
    '10000000',
    'Mature Student Application',
    'draft',
    'locked-view-only',
    '20000004',
    false,
    '30000001',
    2,
    '20000001',
    '2025-12-07T09:00:00.000Z'
  ),
  (
    '40000010',
    '10000000',
    'Reference Request Form',
    'published',
    'unlocked',
    null,
    false,
    '30000006',
    17,
    '20000002',
    '2025-09-12T09:30:00.000Z'
  );
