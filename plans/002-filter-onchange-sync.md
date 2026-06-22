# Plan 002: Call Filter onChange synchronously

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 8bf90a2..HEAD -- packages/ui/src/components/filters.tsx`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: perf
- **Planned at**: commit `8bf90a2`, 2026-06-17

## Why this matters

`Filter` notifies parents via a `useEffect` that runs on mount and on every values/operators change. That causes an extra render frame per interaction and, when bridged to TanStack Table, wipes filters on mount (fixed in plan 003). Calling `onChange` synchronously from mutation handlers removes the mount-time callback and tightens the update path.

## Current state

`packages/ui/src/components/filters.tsx`:

```ts
// lines 153-155
React.useEffect(() => {
  onChange?.(values, operators)
}, [values, operators, onChange])
```

Mutations happen in `updateCategory` (163-203), `setOperator` (205-207), and `clearCategory` (209-223).

`packages/ui/src/components/data-table/data-table-filters.tsx:51-54` — `onChange` calls `table.setColumnFilters(...)`.

## Commands you will need

| Purpose   | Command                               | Expected on success |
|-----------|---------------------------------------|---------------------|
| Typecheck | `cd packages/ui && npm run typecheck` | exit 0              |
| Lint      | `cd packages/ui && npm run lint`      | exit 0              |

## Scope

**In scope**:
- `packages/ui/src/components/filters.tsx` — `Filter` component only (not `Sort` or `DateRangeFilter` unless they share the effect)

**Out of scope**:
- `DataTableFilters` bridge (plan 003)
- Adding `defaultValues` props (plan 003)
- `Sort` component (no onChange effect)

## Git workflow

- Branch: `advisor/002-filter-onchange-sync`
- Commit: `fix(ui): call Filter onChange synchronously`

## Steps

### Step 1: Remove the mount/update effect

Delete the `useEffect` block at lines 153-155.

### Step 2: Add a stable onChange ref

At the top of `Filter`, add:

```ts
const onChangeRef = React.useRef(onChange)
React.useEffect(() => {
  onChangeRef.current = onChange
}, [onChange])

const notifyChange = React.useCallback(
  (nextValues: Record<string, string[]>, nextOperators: Record<string, FilterOperator>) => {
    onChangeRef.current?.(nextValues, nextOperators)
  },
  []
)
```

Using a ref avoids stale closures while keeping `notifyChange` stable.

### Step 3: Notify from mutation handlers

**`setOperator`**: after `setOperators`, call `notifyChange` with the merged operators and current values. Because `setOperators` is async, compute `nextOperators` inline:

```ts
const setOperator = React.useCallback((categoryId: string, next: FilterOperator) => {
  setOperators((prev) => {
    const nextOperators = { ...prev, [categoryId]: next }
    setValues((currentValues) => {
      notifyChange(currentValues, nextOperators)
      return currentValues
    })
    return nextOperators
  })
}, [notifyChange])
```

Prefer a cleaner pattern if you can: e.g. `useReducer` for `{ values, operators }` and call `notifyChange` once per dispatch. The requirement is: **no `useEffect` for onChange** and **no notify on mount**.

**`clearCategory`**: after computing cleared state, call `notifyChange(nextValues, nextOperators)`.

**`updateCategory`**: this is the hardest — it may update `values`, `operators`, and `selectionOrder` in one user action. Refactor so that after computing `nextValues` and any operator changes for that action, call `notifyChange` once with the final `values` and `operators` snapshots. Using `useReducer` is acceptable:

```ts
type FilterState = {
  values: Record<string, string[]>
  operators: Record<string, FilterOperator>
  selectionOrder: string[]
}
```

Dispatch actions like `{ type: 'toggle', categoryId, ... }` and call `notifyChange` in the reducer return path via a side-effect in the dispatch wrapper (not inside the reducer function itself).

**Verify**: `grep -n "onChange?.(values, operators)" packages/ui/src/components/filters.tsx` → no matches in `useEffect`

### Step 4: Confirm Sort is unchanged

`Sort` does not use `onChange` via effect — leave it alone.

**Verify**: `cd packages/ui && npm run typecheck && npm run lint` → exit 0

## Test plan

Manual smoke in docs app (`apps/docs` filters page): toggle a filter chip — table/callback should still update. No automated tests yet.

## Done criteria

- [ ] No `useEffect` in `Filter` calls `onChange` with `values`/`operators`
- [ ] User interactions in `Filter` still invoke `onChange` with correct payloads
- [ ] `npm run typecheck` and `npm run lint` exit 0 in `packages/ui`
- [ ] `plans/README.md` status row updated

## STOP conditions

- Refactoring `updateCategory` requires touching `Sort` or `DateRangeFilter` beyond read-only inspection
- You cannot call `notifyChange` exactly once per user mutation without nested `setState` calls that cause double notifications — switch to `useReducer` or report back

## Maintenance notes

- Plan 003 adds `defaultValues`; it depends on this plan so mount no longer fires `onChange` with empty state.
- If adding controlled `values`/`operators` props later, notify only on user-driven deltas, not prop sync.
