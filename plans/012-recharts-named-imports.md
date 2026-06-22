# Plan 012: Replace recharts namespace import

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 8bf90a2..HEAD -- packages/ui/src/components/chart.tsx`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P3
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: perf
- **Planned at**: commit `8bf90a2`, 2026-06-17

## Why this matters

`chart.tsx` uses `import * as RechartsPrimitive from "recharts"`, which prevents bundlers from tree-shaking unused chart primitives. Consumers of `@gecko/ui/components/chart` pay for more of recharts than they use.

## Current state

```ts
// chart.tsx:4-5
import * as RechartsPrimitive from "recharts"
import type { TooltipValueType } from "recharts"
```

`RechartsPrimitive` usages (grep at plan time):

| Symbol | Usage |
|--------|--------|
| `ResponsiveContainer` | `ChartContainer` wrapper |
| `Tooltip` | `ChartTooltip` alias |
| `Legend` | `ChartLegend` alias |
| `DefaultTooltipContentProps` | type only in tooltip components |
| `DefaultLegendContentProps` | type only in legend components |

Public exports from `chart.tsx:770-781` are all custom wrappers — no recharts re-export at module level besides what's used internally.

`metric-card.tsx` imports recharts directly (separate file — out of scope).

## Commands you will need

| Purpose   | Command                               | Expected on success |
|-----------|---------------------------------------|---------------------|
| Typecheck | `cd packages/ui && npm run typecheck` | exit 0              |
| Lint      | `cd packages/ui && npm run lint`      | exit 0              |

## Scope

**In scope**:
- `packages/ui/src/components/chart.tsx`

**Out of scope**:
- `metric-card.tsx`
- Splitting chart into sub-path exports
- Chart XSS hardening (`chart.tsx` ChartStyle)

## Git workflow

- Branch: `advisor/012-recharts-named-imports`
- Commit: `perf(ui): use named recharts imports in chart wrapper`

## Steps

### Step 1: Replace namespace import

Remove:

```ts
import * as RechartsPrimitive from "recharts"
```

Add named imports:

```ts
import {
  Legend,
  ResponsiveContainer,
  Tooltip,
  type DefaultLegendContentProps,
  type DefaultTooltipContentProps,
} from "recharts"
import type { TooltipValueType } from "recharts"
```

Keep existing `TooltipValueType` import if still needed.

### Step 2: Update references

Replace throughout file:

- `RechartsPrimitive.ResponsiveContainer` → `ResponsiveContainer`
- `RechartsPrimitive.Tooltip` → `Tooltip`
- `RechartsPrimitive.Legend` → `Legend`
- `RechartsPrimitive.DefaultTooltipContentProps` → `DefaultTooltipContentProps`
- `RechartsPrimitive.DefaultLegendContentProps` → `DefaultLegendContentProps`
- `typeof RechartsPrimitive.Tooltip` → `typeof Tooltip`
- `typeof RechartsPrimitive.ResponsiveContainer` → `typeof ResponsiveContainer`

**Verify**: `grep RechartsPrimitive packages/ui/src/components/chart.tsx` → no matches

### Step 3: Typecheck and lint

**Verify**: `cd packages/ui && npm run typecheck && npm run lint` → exit 0

## Test plan

Manual: open docs/sandbox pages using `ChartContainer` and tooltips — charts render without console errors.

## Done criteria

- [ ] No `import * as RechartsPrimitive` in `chart.tsx`
- [ ] All former `RechartsPrimitive.*` references use named imports
- [ ] Public export list unchanged
- [ ] `npm run typecheck` and `npm run lint` exit 0
- [ ] `plans/README.md` status row updated

## STOP conditions

- Live `chart.tsx` uses additional `RechartsPrimitive.*` symbols not listed above — import those by name too; if >10 symbols, report before continuing
- Named import breaks recharts type exports — use `import type` split imports per recharts package docs

## Maintenance notes

- New recharts primitives added to this file should use named imports.
- Further win: split `metric-card` sparkline to lazy sub-module (separate plan).
