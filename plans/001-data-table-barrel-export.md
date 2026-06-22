# Plan 001: Add data-table barrel export

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 8bf90a2..HEAD -- packages/ui/src/components/data-table packages/ui/package.json`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `8bf90a2`, 2026-06-17

## Why this matters

The `data-table/` subsystem has 14 files but no `index.ts`, unlike `reply-box/` which exposes a clean public API. Consumers (sandbox, docs) import deep paths like `@gecko/ui/components/data-table/data-table`. A barrel plus an explicit package export makes the public surface intentional and easier to refactor internals later.

## Current state

- `packages/ui/src/components/reply-box/index.ts` — exemplar barrel; re-exports components and types.
- `packages/ui/package.json:51-58` — `reply-box` has explicit `"./components/reply-box": "./src/components/reply-box/index.ts"`; data-table has no equivalent.
- `packages/ui/src/components/data-table/data-table.tsx` — main orchestrator; exports `DataTable`, `DataTableProvider`, `DataTableContent`, and many types.
- Sandbox imports deep paths (e.g. `apps/sandbox/src/pages/forms/forms/index.tsx` imports from `data-table/data-table`).

## Commands you will need

| Purpose   | Command                                      | Expected on success |
|-----------|----------------------------------------------|---------------------|
| Typecheck | `cd packages/ui && npm run typecheck`        | exit 0              |
| Lint      | `cd packages/ui && npm run lint`             | exit 0              |

## Scope

**In scope**:
- `packages/ui/src/components/data-table/index.ts` (create)
- `packages/ui/package.json` (add export entry)

**Out of scope**:
- Migrating sandbox/docs imports (optional follow-up; deep paths must keep working)
- Renaming or moving data-table internal files
- Changing component behavior

## Git workflow

- Branch: `advisor/001-data-table-barrel`
- Commit message style: `feat(ui): add data-table barrel export` (matches recent `feat(ui):` commits)

## Steps

### Step 1: Create `data-table/index.ts`

Create `packages/ui/src/components/data-table/index.ts` re-exporting the public API:

```ts
export {
  DataTable,
  DataTableProvider,
  DataTableContent,
  type DataTableProps,
  type DataTableProviderProps,
  type DataTableToolbarConfig,
  type DataTableRowAction,
  type DataTableRowActionContext,
  type DataTableSelectActionContext,
  type DataTableColumnMeta,
  type DataTableExpandableConfig,
} from "./data-table"

export {
  DataTableMultiSelectFilter,
  createActionsColumn,
  createExpandColumn,
  createSelectionColumn,
  type DataTableMultiSelectFilterValue,
} from "./data-table-columns"

export { DataTableColumnHeader, type DataTableColumnHeaderProps } from "./data-table-column-header"
export { DataTableColumnToggle, type DataTableColumnToggleProps } from "./data-table-column-toggle"
export { getDataTableColumnToggleLabel } from "./data-table-column-meta"
export { DataTableFilters, type DataTableFiltersProps } from "./data-table-filters"
export { DataTableMultiLineCell, type DataTableMultiLineCellProps } from "./data-table-multi-line-cell"
export { DataTablePagination, type DataTablePaginationProps } from "./data-table-pagination"
export { DataTableSearch, type DataTableSearchProps } from "./data-table-search"
export { DataTableSelectActions, type DataTableSelectActionsProps } from "./data-table-select-actions"
export {
  DataTableRoot,
  DataTableToolbar,
  DataTableToolbarSearchRow,
  DataTableToolbarGroup,
} from "./data-table-toolbar"
export { useDataTableContext } from "./data-table-context"
```

Adjust exports if any symbol name differs in the live file — verify each export exists before committing.

**Verify**: `cd packages/ui && npm run typecheck` → exit 0

### Step 2: Add package.json export

In `packages/ui/package.json` `exports`, add next to the reply-box entry:

```json
"./components/data-table": "./src/components/data-table/index.ts",
```

**Verify**: `node -e "import('@gecko/ui/components/data-table').then(m => console.log(typeof m.DataTable))"` run from `apps/sandbox` (or any workspace app with `@gecko/ui` dependency) → prints `function`

### Step 3: Confirm backward compatibility

Deep imports must still resolve. From repo root:

```bash
grep -r "@gecko/ui/components/data-table/data-table" apps/sandbox apps/docs | head -3
```

No changes required; paths should still work via existing `"./components/*/*"` export pattern.

**Verify**: `cd packages/ui && npm run lint` → exit 0

## Test plan

No test infrastructure exists yet. Verification is typecheck + lint only.

## Done criteria

- [ ] `packages/ui/src/components/data-table/index.ts` exists and exports the public data-table API
- [ ] `packages/ui/package.json` includes `"./components/data-table"` export
- [ ] `npm run typecheck` in `packages/ui` exits 0
- [ ] `npm run lint` in `packages/ui` exits 0
- [ ] `plans/README.md` status row updated

## STOP conditions

- Any export in step 1 fails typecheck because the symbol is not exported from its source file
- `package.json` exports change breaks existing deep import paths (revert export addition and report)

## Maintenance notes

- When adding new public data-table modules, export them from `index.ts` and document whether they are public or internal.
- Deep import paths remain valid; prefer `@gecko/ui/components/data-table` in new code.
