# Plan 006: Reset DateRangeFilter on controlled clear

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 8bf90a2..HEAD -- packages/ui/src/components/filters.tsx`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `8bf90a2`, 2026-06-17

## Why this matters

`DateRangeFilter` syncs controlled `value` into local `customRange` only when both `from` and `to` are set. When a parent clears the filter (`value={undefined}`), local preset selection and custom calendar state stay stale while the trigger label resets.

## Current state

```ts
// filters.tsx:652-658
React.useEffect(() => {
  if (value?.from && value?.to) {
    setCustomRange(value)
    setCalendarMonth(value.from)
  }
}, [value?.from, value?.to])
```

Local state also includes `selectedPresetId` (641-643) and `customRange` (645-647).

## Commands you will need

| Purpose   | Command                               | Expected on success |
|-----------|---------------------------------------|---------------------|
| Typecheck | `cd packages/ui && npm run typecheck` | exit 0              |
| Lint      | `cd packages/ui && npm run lint`      | exit 0              |

## Scope

**In scope**:
- `packages/ui/src/components/filters.tsx` — `DateRangeFilter` sync effect only

**Out of scope**:
- `Filter` / `Sort` components
- Extracting date presets to shared lib

## Git workflow

- Branch: `advisor/006-date-range-filter-clear`
- Commit: `fix(ui): reset DateRangeFilter when controlled value clears`

## Steps

### Step 1: Extend the controlled sync effect

Replace the effect at lines 652-658 with:

```ts
React.useEffect(() => {
  if (value?.from && value?.to) {
    setCustomRange(value)
    setCalendarMonth(value.from)
    return
  }

  // Parent cleared or partial range — reset local UI state
  setCustomRange(undefined)
  setSelectedPresetId(null)
  setCalendarMonth(new Date())
}, [value])
```

Using `[value]` (or `[value?.from, value?.to]` plus explicit undefined branch) ensures clear is detected when parent sets `value` to `undefined`.

### Step 2: Confirm partial ranges

If `value` has only `from` without `to`, treat as cleared for local state (same else branch). Document in a one-line comment if product expects partial ranges later.

**Verify**: `cd packages/ui && npm run typecheck && npm run lint` → exit 0

## Test plan

Manual: controlled `DateRangeFilter` with a preset selected → parent sets `value={undefined}` → reopen menu shows no stale preset/calendar selection.

## Done criteria

- [ ] Clearing controlled `value` resets `customRange`, `selectedPresetId`, and `calendarMonth`
- [ ] Setting a complete range still syncs as before
- [ ] `npm run typecheck` and `npm run lint` exit 0
- [ ] `plans/README.md` status row updated

## STOP conditions

- Live code uses partial `DateRange` intentionally for in-progress selection — report before wiping on partial `from`-only

## Maintenance notes

- If date preset logic moves to shared `lib/`, keep this sync effect with the component or move it with the state.
