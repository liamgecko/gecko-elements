# Migration fidelity checklist

Use this before implementing a replacement screen. Copy the evidence record below into the consumer issue or implementation notes. Preserve verified behaviour and product copy unless the user requests a change. A screenshot shows appearance, not hidden permissions or API support; inspect the existing source and exercise each state.

## Evidence record

- Source route, branch/commit and date inspected:
- Target route and supported record/editor types:
- Fields: name, original label/help copy, default, required, visible/editable conditions, validation and API key:
- Actions: original label/icon, grouping/order, visibility/permission, enabled conditions, payload, outcome and failure:
- Tabs and destinations: route, title/breadcrumb source, preserved state, unsupported tabs:
- Data: query keys, server sorting/filtering/pagination, hidden columns, default sort, empty/error behaviour:
- Statuses: source values, badges/icons/tooltips, locks, approval transitions, edit restrictions:
- Uploads/editors: formats, limits, scan/approval flow, roundtrip samples, timeout/retry:
- Navigation: clean/dirty, Cancel/Discard, links, tabs, Back/Forward, refresh/close:
- Existing business copy intentionally changed (explicit request/reference):
- Unknown or unsupported capability and evidence needed (do not silently omit or invent):
- Library contracts/recipes used and deviations justified:
- Validation results (commands and real browser scenarios), known limitations:

## Acceptance pass

1. Compare every field, action, tab and status against the source in a behaviour matrix, including non-email/editor variants.
2. Use small Cards for content blocks, shared action icons and required label markers; use supported variants rather than app CSS overrides.
3. Verify initial navigation, cold refresh, cached return and delayed/error responses. Correct title, action row, alerts and sections must not arrive in stages.
4. Exercise duplicate actions, edits during save, independent uploads, retries, removal during upload and out-of-order searches.
5. Verify real API sort/filter keys and permissions. Sorting support in DataTable does not create backend support.
6. Run keyboard, light/dark, 1024px desktop minimum and smaller horizontal-overflow checks. Inspect actual popup geometry and focus return.
7. Record gaps explicitly. A lint pass is not functional parity. Do not call the migration complete while required behaviour is unverified.
