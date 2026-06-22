# Plan 013: Memoize DataTable context value

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 8bf90a2..HEAD -- packages/ui/src/components/data-table/data-table.tsx packages/ui/src/components/data-table/data-table-context.tsx`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P3
- **Effort**: M
- **Risk**: MED
- **Depends on**: none (coordinate with plans 003/007 if merging same file)
- **Category**: perf
- **Planned at**: commit `8bf90a2`, 2026-06-17

## Why this matters

`DataTableProvider` passes a new object to `DataTableContext.Provider` on every render. Any table state change (sort, filter, pagination, selection) recreates the context value and re-renders all `useDataTableContext` subscribers — toolbar, filters, pagination, and body — even when only row data relevant to one slice changed.

## Current state

```ts
// data-table.tsx:272-287
return (
  <DataTableContext.Provider
    value={{
      table: table as Table<unknown>,
      expandable: expandable as DataTableExpandableConfig<unknown> | undefined,
      selectActions,
      onSelectAction: onSelectAction as ...,
      filterUiResetKey,
      resetFilterUi,
    }}
  >
```

`resetFilterUi` is already stable (`useCallback` at 228-230). `table` identity changes when TanStack recomputes. `selectActions` / `onSelectAction` / `expandable` are typically stable props.

## Commands you will need

| Purpose   | Command                               | Expected on success |
|-----------|---------------------------------------|---------------------|
| Typecheck | `cd packages/ui && npm run typecheck` | exit 0              |
| Lint      | `cd packages/ui && npm run lint`      | exit 0              |

## Scope

**In scope**:
- `packages/ui/src/components/data-table/data-table.tsx` — `DataTableProvider` only

**Out of scope**:
- Splitting context into multiple providers (follow-up if memo insufficient)
- Row virtualization
- TanStack Table configuration

## Git workflow

- Branch: `advisor/013-datatable-context-memo`
- Commit: `perf(ui): memoize DataTable context provider value`

## Steps

### Step 1: Memoize the context value

After `const table = useReactTable({...})`, add:

```ts
const contextValue = React.useMemo(
  () => ({
    table: table as import("@tanstack/react-table").Table<unknown>,
    expandable: expandable as DataTableExpandableConfig<unknown> | undefined,
    selectActions,
    onSelectAction: onSelectAction as
      | ((
          actionId: string,
          context: DataTableSelectActionContext<unknown>
        ) => void)
      | undefined,
    filterUiResetKey,
    resetFilterUi,
  }),
  [
    table,
    expandable,
    selectActions,
    onSelectAction,
    filterUiResetKey,
    resetFilterUi,
  ]
)
```

Use the provider:

```tsx
<DataTableContext.Provider value={contextValue}>
```

### Step 2: Stabilize selectActions default

If `selectActions` defaults to `[]` inline in destructuring, a new array is created each render and defeats memoization. In `DataTableProvider` props destructuring, ensure:

```ts
selectActions = EMPTY_SELECT_ACTIONS,
```

with module-level:

```ts
const EMPTY_SELECT_ACTIONS: DataTableRowAction[] = []
```

Apply the same pattern for any other default array props passed into the context object.

**Verify**: read live `DataTableProvider` — fix inline `[]` defaults if present.

### Step 3: Typecheck and lint

**Verify**: `cd packages/ui && npm run typecheck && npm run lint` → exit 0

## Test plan

Manual: DataTable with toolbar + filters + pagination — sort/filter/paginate; UI should behave identically. No automated perf test.

Optional dev check: React DevTools "highlight updates" — context consumers may still re-render when `table` changes (expected); memo prevents re-renders when parent re-renders without table state change.

## Done criteria

- [ ] `DataTableContext.Provider` receives `useMemo`-wrapped `contextValue`
- [ ] No inline `[]` defaults for `selectActions` (or similar) in provider props
- [ ] `npm run typecheck` and `npm run lint` exit 0
- [ ] `plans/README.md` status row updated

## STOP conditions

- Memoization causes stale `filterUiResetKey` or `resetFilterUi` in consumers — remove memo and report
- `table` reference is unstable on every parent render even without state change — document; splitting context is follow-up

## Maintenance notes

- If adding fields to `DataTableContextValue`, include them in the `useMemo` dependency array.
- Further optimization: split `DataTableTableContext` (table only) from chrome context (filterUiResetKey, selectActions) so pagination changes don't re-render row body — deferred.
