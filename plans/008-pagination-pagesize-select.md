# Plan 008: Include active pageSize in pagination Select

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 8bf90a2..HEAD -- packages/ui/src/components/data-table/data-table-pagination.tsx`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `8bf90a2`, 2026-06-17

## Why this matters

`DataTablePagination` renders a controlled `<Select value={String(pageSize)}>` with options only from `pageSizeOptions` (default `[10, 25, 50]`). If `initialState.pagination.pageSize` or provider `pageSize` is not in that list (e.g. 20), the Select has no matching item and appears blank.

## Current state

```ts
// data-table-pagination.tsx:23, 33, 59-72
const DEFAULT_PAGE_SIZES = [10, 25, 50] as const
pageSizeOptions = DEFAULT_PAGE_SIZES,
// ...
<Select value={String(pageSize)}>
  {pageSizeOptions.map((size) => (
    <SelectItem key={size} value={String(size)}>{size}</SelectItem>
  ))}
</Select>
```

```ts
// data-table.tsx:222-224
pageSize: initialState?.pagination?.pageSize ?? pageSize,
```

JSDoc on `pageSizeOptions` says `@default [10, 20, 30, 40, 50]` but code uses `[10, 25, 50]` — fix the JSDoc while here.

## Commands you will need

| Purpose   | Command                               | Expected on success |
|-----------|---------------------------------------|---------------------|
| Typecheck | `cd packages/ui && npm run typecheck` | exit 0              |
| Lint      | `cd packages/ui && npm run lint`      | exit 0              |

## Scope

**In scope**:
- `packages/ui/src/components/data-table/data-table-pagination.tsx`

**Out of scope**:
- Changing default `pageSize` on provider
- Page index Select (separate control)

## Git workflow

- Branch: `advisor/008-pagination-pagesize-select`
- Commit: `fix(ui): include active pageSize in pagination options`

## Steps

### Step 1: Merge current pageSize into options

After reading `pageSize` from table state, compute:

```ts
const resolvedPageSizeOptions = React.useMemo(() => {
  const base = [...pageSizeOptions]
  if (!base.includes(pageSize)) {
    base.push(pageSize)
    base.sort((a, b) => a - b)
  }
  return base
}, [pageSize, pageSizeOptions])
```

Use `resolvedPageSizeOptions` in the map instead of `pageSizeOptions`.

### Step 2: Fix JSDoc default comment

Update line 27 to match `DEFAULT_PAGE_SIZES`:

```ts
/** @default [10, 25, 50] */
```

**Verify**: `cd packages/ui && npm run typecheck && npm run lint` → exit 0

## Test plan

Manual: `DataTable` with `initialState={{ pagination: { pageSize: 20 } }}` — page size Select shows `20` selected.

## Done criteria

- [ ] Active `pageSize` always appears in Select options even if not in `pageSizeOptions`
- [ ] Options remain sorted numerically
- [ ] JSDoc matches `DEFAULT_PAGE_SIZES`
- [ ] `npm run typecheck` and `npm run lint` exit 0
- [ ] `plans/README.md` status row updated

## STOP conditions

- Select component requires options to be static at mount — report if dynamic insert fails visually

## Maintenance notes

- Document that custom `pageSize` values are preserved in the dropdown when set via `initialState`.
