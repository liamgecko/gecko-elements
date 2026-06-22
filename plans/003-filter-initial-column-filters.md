# Plan 003: Seed Filter from initial column filters

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 8bf90a2..HEAD -- packages/ui/src/components/filters.tsx packages/ui/src/components/data-table/data-table-filters.tsx`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW
- **Depends on**: plans/002-filter-onchange-sync.md
- **Category**: bug
- **Planned at**: commit `8bf90a2`, 2026-06-17

## Why this matters

When `DataTableProvider` receives `initialState.columnFilters`, mounting `DataTableFilters` resets TanStack filters to `[]` because `Filter` starts with empty local state and (before plan 002) fired `onChange` on mount. Even after plan 002, the filter chips won't reflect pre-set filters without seeding local state from the table.

## Current state

`filters.tsx` — `Filter` initializes empty:

```ts
const [values, setValues] = React.useState<Record<string, string[]>>({})
const [operators, setOperators] = React.useState<Record<string, FilterOperator>>({})
```

`data-table-filters.tsx` — maps UI → TanStack via `mapToColumnFilters` but has no inverse map or default props:

```ts
const handleChange = React.useCallback(
  (values, operators) => {
    table.setColumnFilters(mapToColumnFilters(values, operators))
  },
  [table]
)
```

`DataTableMultiSelectFilterValue` in `data-table-columns.tsx:14-18`:

```ts
export type DataTableMultiSelectFilterValue = {
  operator: "is" | "is not" | "is any of"
  values: string[]
}
```

`filterUiResetKey` remounts `Filter` via `key={filterUiResetKey}` — after external `resetColumnFilters`, UI remounts empty unless defaults are passed from current table state.

## Commands you will need

| Purpose   | Command                               | Expected on success |
|-----------|---------------------------------------|---------------------|
| Typecheck | `cd packages/ui && npm run typecheck` | exit 0              |
| Lint      | `cd packages/ui && npm run lint`      | exit 0              |

## Scope

**In scope**:
- `packages/ui/src/components/filters.tsx` — add optional default props to `Filter`
- `packages/ui/src/components/data-table/data-table-filters.tsx` — seed from table state

**Out of scope**:
- Changing `DataTableMultiSelectFilter` logic
- Standalone `Filter` usage outside data-table (defaults remain optional)

## Git workflow

- Branch: `advisor/003-filter-initial-column-filters`
- Commit: `fix(ui): seed Filter UI from DataTable column filter state`

## Steps

### Step 1: Add default props to FilterProps

In `filters.tsx`, extend `FilterProps`:

```ts
defaultValues?: Record<string, string[]>
defaultOperators?: Record<string, FilterOperator>
```

Initialize state:

```ts
const [values, setValues] = React.useState<Record<string, string[]>>(() => defaultValues ?? {})
const [operators, setOperators] = React.useState<Record<string, FilterOperator>>(
  () => defaultOperators ?? {}
)
const [selectionOrder, setSelectionOrder] = React.useState<string[]>(() =>
  Object.entries(defaultValues ?? {})
    .filter(([, vals]) => (vals?.length ?? 0) > 0)
    .map(([id]) => id)
)
```

Destructure `defaultValues` and `defaultOperators` from props (do not pass them to the root `div`).

### Step 2: Add inverse mapper in data-table-filters.tsx

```ts
function mapFromColumnFilters(
  columnFilters: ColumnFiltersState
): {
  values: Record<string, string[]>
  operators: Record<string, FilterOperator>
} {
  const values: Record<string, string[]> = {}
  const operators: Record<string, FilterOperator> = {}

  for (const filter of columnFilters) {
    const raw = filter.value
    if (Array.isArray(raw)) {
      // legacy string[] shape
      if (raw.length > 0) {
        values[filter.id] = raw
        operators[filter.id] = raw.length >= 2 ? "is any of" : "is"
      }
      continue
    }
    if (raw && typeof raw === "object" && "values" in raw) {
      const v = raw as DataTableMultiSelectFilterValue
      if ((v.values?.length ?? 0) > 0) {
        values[filter.id] = v.values
        operators[filter.id] = v.operator
      }
    }
  }

  return { values, operators }
}
```

### Step 3: Pass defaults from table state into Filter

In `DataTableFilters`:

```ts
const columnFilters = table.getState().columnFilters
const { values: defaultValues, operators: defaultOperators } = React.useMemo(
  () => mapFromColumnFilters(columnFilters),
  // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed by filterUiResetKey for remount sync
  [filterUiResetKey, columnFilters]
)
```

Pass to `Filter`:

```tsx
<Filter
  key={filterUiResetKey}
  defaultValues={defaultValues}
  defaultOperators={defaultOperators}
  ...
/>
```

When `filterUiResetKey` increments, remount + fresh defaults from (cleared) table state keeps UI in sync.

**Do not** call `table.setColumnFilters` on mount — plan 002 removed that path.

### Step 4: Verify initialState scenario

In `apps/docs/src/pages/data-table/index.tsx` (read-only check), confirm whether `initialState.columnFilters` is used. If not, manually verify logic: with `initialState={{ columnFilters: [{ id: 'status', value: { operator: 'is', values: ['active'] } }] }}`, chips should appear without user interaction.

**Verify**: `cd packages/ui && npm run typecheck && npm run lint` → exit 0

## Test plan

No automated tests. Manual: DataTable with `initialState.columnFilters` shows active filter chips on first paint; `resetColumnFilters` + `resetFilterUi` clears chips.

## Done criteria

- [ ] `Filter` accepts `defaultValues` / `defaultOperators` and initializes state from them
- [ ] `DataTableFilters` passes defaults derived from `table.getState().columnFilters`
- [ ] Mounting `DataTableFilters` does not call `setColumnFilters([])`
- [ ] `npm run typecheck` and `npm run lint` exit 0
- [ ] `plans/README.md` status row updated

## STOP conditions

- Plan 002 is not merged — mount `useEffect` still fires `onChange` on empty state
- `columnFilters` value shapes in production differ from `DataTableMultiSelectFilterValue` and legacy array — report sample shapes before guessing

## Maintenance notes

- If adding fully controlled `Filter` (`values` prop), coordinate with `defaultValues` semantics (controlled wins).
- `filterUiResetKey` remount pattern must always pass fresh defaults from table state.
