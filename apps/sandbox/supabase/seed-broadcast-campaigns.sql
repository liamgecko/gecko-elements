-- Seed broadcast campaigns. Requires accounts, users, and 005_broadcast_campaigns_schema.sql.

insert into broadcast_campaigns (
  id,
  account_id,
  name,
  status,
  start_date,
  end_date,
  last_refreshed_at,
  stats,
  created_by_user_id,
  created_at
) values
  (
    '60000001',
    '10000000',
    'UCAS January deadline reminder',
    'active',
    '2025-12-23T10:30:00.000Z',
    '2025-12-28T10:30:00.000Z',
    '2026-05-21T09:00:00.000Z',
    '{"campaignSeed":0}'::jsonb,
    '20000002',
    '2025-12-18T14:15:00.000Z'
  ),
  (
    '60000002',
    '10000000',
    'Undergraduate open day confirmations',
    'completed',
    '2025-09-28T15:00:00.000Z',
    '2025-09-28T15:00:00.000Z',
    '2026-05-21T09:00:00.000Z',
    '{"campaignSeed":1}'::jsonb,
    '20000006',
    '2025-09-25T08:30:00.000Z'
  ),
  (
    '60000003',
    '10000000',
    'Postgraduate offer holder welcome',
    'paused',
    '2025-10-05T10:30:00.000Z',
    '2025-10-10T10:30:00.000Z',
    '2026-05-21T09:00:00.000Z',
    '{"campaignSeed":2}'::jsonb,
    '20000003',
    '2025-10-04T12:45:00.000Z'
  ),
  (
    '60000004',
    '10000000',
    'Clearing places announcement',
    'failed',
    '2025-11-10T17:00:00.000Z',
    '2025-11-20T17:00:00.000Z',
    '2026-05-21T09:00:00.000Z',
    '{"campaignSeed":3}'::jsonb,
    '20000001',
    '2025-11-01T17:00:00.000Z'
  ),
  (
    '60000005',
    '10000000',
    'Scholarship application nudge',
    'active',
    '2025-12-15T12:30:00.000Z',
    '2025-12-16T12:30:00.000Z',
    '2026-05-21T09:00:00.000Z',
    '{"campaignSeed":4}'::jsonb,
    '20000005',
    '2025-12-01T12:15:00.000Z'
  ),
  (
    '60000006',
    '10000000',
    'Interview day schedule updates',
    'completed',
    '2025-09-20T17:00:00.000Z',
    '2025-09-26T17:00:00.000Z',
    '2026-05-21T09:00:00.000Z',
    '{"campaignSeed":5}'::jsonb,
    '20000004',
    '2025-09-04T15:30:00.000Z'
  ),
  (
    '60000007',
    '10000000',
    'Accommodation deposit reminder',
    'paused',
    '2025-10-25T12:30:00.000Z',
    '2025-10-28T13:30:00.000Z',
    '2026-05-21T09:00:00.000Z',
    '{"campaignSeed":6}'::jsonb,
    '20000002',
    '2025-10-11T10:45:00.000Z'
  ),
  (
    '60000008',
    '10000000',
    'Conditional offer document chase',
    'failed',
    '2025-11-02T08:00:00.000Z',
    '2025-11-04T08:00:00.000Z',
    '2026-05-21T09:00:00.000Z',
    '{"campaignSeed":7}'::jsonb,
    '20000006',
    '2025-11-01T15:00:00.000Z'
  ),
  (
    '60000009',
    '10000000',
    'International student visa briefing',
    'active',
    '2025-12-07T14:30:00.000Z',
    '2025-12-14T14:30:00.000Z',
    '2026-05-21T09:00:00.000Z',
    '{"campaignSeed":8}'::jsonb,
    '20000003',
    '2025-12-01T10:15:00.000Z'
  ),
  (
    '60000010',
    '10000000',
    'Enrolment checklist — autumn intake',
    'completed',
    '2025-09-12T16:00:00.000Z',
    '2025-09-24T16:00:00.000Z',
    '2026-05-21T09:00:00.000Z',
    '{"campaignSeed":9}'::jsonb,
    '20000001',
    '2025-09-04T13:30:00.000Z'
  );
