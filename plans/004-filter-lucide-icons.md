# Plan 004: Remove lucide icons catalog import

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 8bf90a2..HEAD -- packages/ui/src/components/filters.tsx apps/docs/src/pages/filters`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: perf
- **Planned at**: commit `8bf90a2`, 2026-06-17

## Why this matters

`filters.tsx` imports `icons` from `lucide-react` and resolves string `triggerIcon` names dynamically. That pulls the entire lucide icon catalog into any bundle importing `Filter`, `Sort`, or `DateRangeFilter` — a large avoidable cost for a hot-path component.

## Current state

```ts
// filters.tsx:4-10
import {
  ArrowDownWideNarrow,
  icons,
  ListFilterPlus,
  X,
  type LucideIcon,
} from "lucide-react"

// resolveLucideIcon uses icons[raw] and icons[pascal] — lines 115-134
```

Known string usage:
- `apps/docs/src/pages/filters/index.tsx:204` — `triggerIcon="funnel"`

`Sort` defaults `triggerIcon = ArrowDownWideNarrow` (component, not string).

## Commands you will need

| Purpose   | Command                               | Expected on success |
|-----------|---------------------------------------|---------------------|
| Typecheck | `cd packages/ui && npm run typecheck` | exit 0              |
| Lint      | `cd packages/ui && npm run lint`      | exit 0              |

## Scope

**In scope**:
- `packages/ui/src/components/filters.tsx`
- `apps/docs/src/pages/filters/index.tsx` (update string icon to component import)

**Out of scope**:
- Other components' named lucide imports (already tree-shakeable)
- Removing `triggerIcon?: string` from types (deprecate via JSDoc instead)

## Git workflow

- Branch: `advisor/004-filter-lucide-icons`
- Commit: `perf(ui): drop lucide icons catalog from filters`

## Steps

### Step 1: Add a curated icon map

In `filters.tsx`, remove `icons` from the import. Add:

```ts
import { ArrowDownWideNarrow, Funnel, ListFilterPlus, X, type LucideIcon } from "lucide-react"

const FILTER_TRIGGER_ICONS = {
  funnel: Funnel,
  Funnel,
  "arrow-down-wide-narrow": ArrowDownWideNarrow,
  ArrowDownWideNarrow,
  "list-filter-plus": ListFilterPlus,
  ListFilterPlus,
} as const satisfies Record<string, LucideIcon>
```

Extend the map only for string names found in the repo:

```bash
grep -r 'triggerIcon="' apps packages --include='*.tsx'
```

### Step 2: Replace resolveLucideIcon

```ts
function resolveLucideIcon(icon: unknown): LucideIcon {
  if (!icon) return ListFilterPlus
  if (typeof icon === "function" || typeof icon === "object") {
    return icon as LucideIcon
  }
  if (typeof icon !== "string") return ListFilterPlus

  const raw = icon.trim()
  const direct = FILTER_TRIGGER_ICONS[raw as keyof typeof FILTER_TRIGGER_ICONS]
  if (direct) return direct

  const pascal = toPascalCase(raw)
  const resolved = FILTER_TRIGGER_ICONS[pascal as keyof typeof FILTER_TRIGGER_ICONS]
  if (resolved) return resolved

  return ListFilterPlus
}
```

### Step 3: Update docs call site

In `apps/docs/src/pages/filters/index.tsx`, replace `triggerIcon="funnel"` with `triggerIcon={Funnel}` and import `Funnel` from `lucide-react`.

**Verify**: `grep -r 'from "lucide-react"' packages/ui/src/components/filters.tsx` → no `icons` import

```bash
grep 'icons' packages/ui/src/components/filters.tsx
```

→ should only appear in comments or `FILTER_TRIGGER_ICONS`, not `import { icons }`

### Step 4: Typecheck and lint

**Verify**: `cd packages/ui && npm run typecheck && npm run lint` → exit 0

**Verify**: `cd apps/docs && npm run typecheck` (if script exists) or `npx tsc --noEmit` → exit 0

## Test plan

Visual: docs filters page still shows funnel icon on filter trigger.

## Done criteria

- [ ] No `import { icons` from `lucide-react` in `filters.tsx`
- [ ] String `triggerIcon="funnel"` in docs replaced with `Funnel` component
- [ ] `npm run typecheck` exits 0 in `packages/ui`
- [ ] `plans/README.md` status row updated

## STOP conditions

- Grep finds many undocumented string `triggerIcon` values across apps — stop and list them for map expansion before proceeding
- Removing `icons` breaks build for unknown string icons in consumer code outside this repo — document fallback to `ListFilterPlus` in JSDoc on `triggerIcon`

## Maintenance notes

- Prefer `LucideIcon` components over strings in new code; add new aliases to `FILTER_TRIGGER_ICONS` only when strings are required for API compat.
- Update `FilterProps` / `SortProps` JSDoc: string names are limited to the curated map.
