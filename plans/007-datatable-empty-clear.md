# Plan 007: Fix DataTable empty-state clear action

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 8bf90a2..HEAD -- packages/ui/src/components/data-table/data-table.tsx`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `8bf90a2`, 2026-06-17

## Why this matters

The empty state shows copy for both search and column filters, but the recovery button only appears when `hasFilters` and only calls `resetColumnFilters()`. Users with search-only or search+filter empty results cannot clear search from the empty state.

## Current state

```ts
// data-table.tsx:308-315
const hasSearch = searchTerm.length > 0
const hasFilters = (state.columnFilters?.length ?? 0) > 0
const description = hasSearch ? ... : hasFilters ? ... : ...

// lines 405-418 — button only when hasFilters
{hasFilters ? (
  <Button onClick={() => {
    table.resetColumnFilters()
    resetFilterUi()
  }}>
    Clear filters
  </Button>
) : null}
```

## Commands you will need

| Purpose   | Command                               | Expected on success |
|-----------|---------------------------------------|---------------------|
| Typecheck | `cd packages/ui && npm run typecheck` | exit 0              |
| Lint      | `cd packages/ui && npm run lint`      | exit 0              |

## Scope

**In scope**:
- `packages/ui/src/components/data-table/data-table.tsx` — `DataTableContent` empty state only

**Out of scope**:
- `DataTableSearch` component internals
- Changing empty-state copy strings

## Git workflow

- Branch: `advisor/007-datatable-empty-clear`
- Commit: `fix(ui): clear search and filters from DataTable empty state`

## Steps

### Step 1: Show button when search or filters active

Replace `{hasFilters ? (` with:

```tsx
{hasSearch || hasFilters ? (
```

### Step 2: Clear both global filter and column filters

Update onClick:

```tsx
onClick={() => {
  if (hasSearch) {
    table.setGlobalFilter("")
  }
  if (hasFilters) {
    table.resetColumnFilters()
    resetFilterUi()
  }
}}
```

### Step 3: Adjust button label

Use dynamic label:

```tsx
{hasSearch && hasFilters
  ? "Clear search and filters"
  : hasSearch
    ? "Clear search"
    : "Clear filters"}
```

**Verify**: `cd packages/ui && npm run typecheck && npm run lint` → exit 0

## Test plan

Manual in docs data-table page: apply search until empty → button appears and clears search; apply column filter until empty → clears filters; both active → clears both.

## Done criteria

- [ ] Empty-state action visible when `hasSearch || hasFilters`
- [ ] Click clears global filter when search active
- [ ] Click clears column filters and resets filter UI when filters active
- [ ] Button label reflects what will be cleared
- [ ] `npm run typecheck` and `npm run lint` exit 0
- [ ] `plans/README.md` status row updated

## STOP conditions

- `DataTableSearch` uses external controlled state not wired to `table.setGlobalFilter` — read `data-table-search.tsx` and report

## Maintenance notes

- If search becomes fully controlled via props, ensure empty-state clear still updates both table state and search input (may need `resetFilterUi` extension).
