# Supabase in the sandbox app

The sandbox prototype uses Supabase as the source of truth for **forms**, **chargeable items**, **form payment settings**, **broadcast campaigns**, **workflows**, and **workflow templates**. Other areas still use local mock data.

## What you need from Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. From **Project Settings → API**, copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`
3. Create `apps/sandbox/.env.local`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Restart the dev server after changing env vars.

## Database setup

In the Supabase dashboard, open **SQL Editor** and run, in order:

1. `apps/sandbox/supabase/migrations/001_forms_schema.sql` — forms tables
2. `apps/sandbox/supabase/seed.sql` — accounts, users, form groups, forms
3. `apps/sandbox/supabase/migrations/002_payment_items_schema.sql` — chargeable items table
4. `apps/sandbox/supabase/seed-payment-items.sql` — 15 chargeable items
5. `apps/sandbox/supabase/migrations/003_form_payment_settings.sql` — form payment settings tables
6. `apps/sandbox/supabase/seed-form-payment-settings.sql` — payment settings for two seed forms
7. `apps/sandbox/supabase/migrations/004_form_archive.sql` — archived by / archived at columns
8. `apps/sandbox/supabase/migrations/005_broadcast_campaigns_schema.sql` — broadcast campaigns table
9. `apps/sandbox/supabase/seed-broadcast-campaigns.sql` — 10 sample campaigns
10. `apps/sandbox/supabase/migrations/006_workflows_schema.sql` — workflows table
11. `apps/sandbox/supabase/seed-workflows.sql` — 8 sample workflows
12. `apps/sandbox/supabase/migrations/007_workflows_definition.sql` — `definition` jsonb column for the workflow builder graph
13. `apps/sandbox/supabase/migrations/008_workflow_templates.sql` — workflow templates table
14. `apps/sandbox/supabase/migrations/009_short_ids.sql` — **only if upgrading an existing UUID database**; truncates data, drops foreign keys, converts ids to 8-digit text, then re-adds foreign keys. Re-run all seed scripts after.

If `009` fails partway through, run the full script again from the top (it is safe to re-run after truncate).

Prototype ids are **8-digit text** (e.g. `40000006` for a form), not UUIDs.

### Reset prototype data

```sql
truncate table workflow_templates, workflows, broadcast_campaigns, form_payment_items, form_payment_settings, payment_items, forms, form_groups, users, accounts cascade;
```

Then run `seed.sql`, `seed-payment-items.sql`, `seed-form-payment-settings.sql`, `seed-broadcast-campaigns.sql`, and `seed-workflows.sql` again.

**Note:** RLS is disabled on these tables for the prototype. Do not use this setup in production.

## Data model

| Table | Purpose |
|-------|---------|
| `accounts` | Single tenant shell (`Gecko`) |
| `users` | Creators and lockers (no login yet) |
| `form_groups` | Form grouping lookup |
| `forms` | Form catalog |
| `payment_items` | Chargeable item catalog |
| `form_payment_settings` | Payment provider per form |
| `form_payment_items` | Chargeable items attached to a form |
| `broadcast_campaigns` | Broadcast campaign catalog; `stats` JSONB stores a `campaignSeed` for client-generated chart data |
| `workflows` | Workflow catalog; `label_ids` stores filter label keys; `definition` stores the React Flow graph (`nodes`, `edges`) |
| `workflow_templates` | Reusable workflow templates; `definition` stores the React Flow graph; optional `source_workflow_id` when saved from a workflow |

## Code structure

```
apps/sandbox/src/
  lib/supabase/
    client.ts       # Supabase client singleton
    constants.ts    # Stable seed ids for prototype writes
    env.ts          # Env helpers
    types.ts        # Hand-written DB types
  data/
    mappers/        # DB row → UI model
    repositories/   # Data access (no UI imports)
  hooks/
    useForms.ts
    useForm.ts
    usePaymentItems.ts
    useFormPaymentSettings.ts
    useArchivedForms.ts
    useBroadcastCampaigns.ts
    useBroadcastCampaign.ts
    useWorkflows.ts
    useWorkflow.ts
    useWorkflowTemplates.ts
    useWorkflowTemplate.ts
```

UI states (not configured, load errors) use `Alert` from `@gecko/ui/components/alert` via `components/supabase-setup-notice.tsx`.

### Adding a new entity

1. Add a SQL migration under `supabase/migrations/`.
2. Extend `lib/supabase/types.ts` (or generate types later).
3. Add a mapper if the UI shape differs from the DB row.
4. Add `data/repositories/[entity]Repository.ts`.
5. Add `hooks/use[Entity].ts` for React consumers.
6. Keep components free of direct Supabase calls.

## Still using mock data

- Campaign stats time-series (generated client-side from `campaignSeed` in DB)
- Overview assistant (hardcoded by design)
- Favourites (`localStorage`)
- ~70 stub pages with no data yet
