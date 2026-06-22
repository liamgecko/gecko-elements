# Plan 010: Extract shared useControllableState hook

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 8bf90a2..HEAD -- packages/ui/src/hooks packages/ui/src/components/reply-box/reply-box.tsx packages/ui/src/components/date-picker.tsx packages/ui/src/components/sensitive-field.tsx packages/ui/src/components/drop-zone.tsx packages/ui/src/components/color-picker.tsx packages/ui/src/components/header.tsx`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `8bf90a2`, 2026-06-17

## Why this matters

Controlled/uncontrolled state logic is copy-pasted across ~7 components (`reply-box`, `date-picker`, `sensitive-field`, `drop-zone`, `color-picker`, `header`, inline patterns in `search-field`). A shared hook reduces drift and centralizes fixes.

## Current state

Exemplar in `reply-box.tsx:24-41`:

```ts
function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: ControllableStateOptions<T>) {
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultValue)
  const isControlled = value !== undefined
  const resolved = isControlled ? (value as T) : uncontrolled
  const setValue = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      const computed =
        typeof next === "function" ? (next as (prev: T) => T)(resolved) : next
      if (!isControlled) setUncontrolled(computed)
      onChange?.(computed)
    },
    [isControlled, onChange, resolved]
  )
  return [resolved, setValue] as const
}
```

`date-picker.tsx:247-264` — `useControllableOpen` is the same pattern for booleans.

`packages/ui/package.json:54` — `"./hooks/*": "./src/hooks/*.ts"` already exported.

`hooks/use-mobile.ts` — exemplar hook file style.

## Commands you will need

| Purpose   | Command                               | Expected on success |
|-----------|---------------------------------------|---------------------|
| Typecheck | `cd packages/ui && npm run typecheck` | exit 0              |
| Lint      | `cd packages/ui && npm run lint`      | exit 0              |

## Scope

**In scope**:
- `packages/ui/src/hooks/use-controllable-state.ts` (create)
- `packages/ui/src/components/reply-box/reply-box.tsx` — remove local hook, import shared
- `packages/ui/src/components/date-picker.tsx` — replace `useControllableOpen` with shared hook
- `packages/ui/src/components/sensitive-field.tsx` — migrate visibility state
- `packages/ui/src/components/drop-zone.tsx` — migrate files array state
- `packages/ui/src/components/color-picker.tsx` — migrate value state where pattern matches

**Out of scope** (defer to follow-up):
- `header.tsx` pressed toggle (slightly different API)
- `search-field.tsx` (tracks `hasValue`, not full value)
- Full controlled `Filter` props

## Git workflow

- Branch: `advisor/010-use-controllable-state`
- Commit: `refactor(ui): extract useControllableState hook`

## Steps

### Step 1: Create the shared hook

Create `packages/ui/src/hooks/use-controllable-state.ts`:

```ts
import * as React from "react"

export type UseControllableStateOptions<T> = {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>) {
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultValue)
  const isControlled = value !== undefined
  const resolved = isControlled ? (value as T) : uncontrolled

  const setValue = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      const computed =
        typeof next === "function" ? (next as (prev: T) => T)(resolved) : next
      if (!isControlled) setUncontrolled(computed)
      onChange?.(computed)
    },
    [isControlled, onChange, resolved]
  )

  return [resolved, setValue] as const
}
```

Add `"use client"` as the first line (hook uses `useState`).

### Step 2: Migrate reply-box.tsx

Remove local `useControllableState` and `ControllableStateOptions`. Import:

```ts
import { useControllableState } from "@gecko/ui/hooks/use-controllable-state"
```

Existing call sites for `expanded` and `noteMode` stay the same.

### Step 3: Migrate date-picker.tsx

Remove `useControllableOpen`. Replace:

```ts
const [open, setOpen] = useControllableState({
  value: openProp,
  defaultValue: defaultOpen ?? false,
  onChange: onOpenChange,
})
```

Adjust prop names to match live `DatePicker` API.

### Step 4: Migrate sensitive-field.tsx

Replace visibility state:

```ts
const [visible, setVisible] = useControllableState({
  value: visibleProp,
  defaultValue: defaultVisible ?? false,
  onChange: onVisibleChange,
})
```

Remove inline `isControlledVisible` / `visibleUncontrolled` logic.

### Step 5: Migrate drop-zone.tsx

Replace files controlled pattern:

```ts
const [files, setFiles] = useControllableState<File[]>({
  value,
  defaultValue: defaultValue ?? [],
  onChange: onValueChange,
})
```

Remove `isControlled`, `internalFiles`, and duplicate `setFiles` callback if the hook's setter suffices. Keep `addFiles` using `setFiles` from the hook.

### Step 6: Migrate color-picker.tsx (if straightforward)

If `color-picker` uses the same value/defaultValue/onChange trio, migrate; if it has extra input sync logic, migrate only the primary color value state and leave input sync intact.

**Verify**: `cd packages/ui && npm run typecheck && npm run lint` → exit 0

**Verify**: `grep -r "function useControllableState" packages/ui/src/components` → no matches (only hook file)

## Test plan

Manual smoke: ReplyBox expand/collapse, DatePicker open, SensitiveField reveal, DropZone file add/remove, ColorPicker value change.

## Done criteria

- [ ] `packages/ui/src/hooks/use-controllable-state.ts` exists with `"use client"`
- [ ] At least `reply-box`, `date-picker`, `sensitive-field`, `drop-zone` use the shared hook
- [ ] No duplicate `function useControllableState` in components
- [ ] `npm run typecheck` and `npm run lint` exit 0
- [ ] `plans/README.md` status row updated

## STOP conditions

- `color-picker.tsx` migration requires behavioral change beyond mechanical swap — skip color-picker and note in PR
- Hook import path `@gecko/ui/hooks/use-controllable-state` fails resolution — use relative import within package as fallback and fix exports

## Maintenance notes

- Migrate `header.tsx` and `search-field.tsx` in a follow-up when touching those files.
- Consider functional updater fix: including `resolved` in `setValue` deps can cause extra callback identity churn — acceptable for now; match existing behavior.
