# Plan 011: Add missing use client directives

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 8bf90a2..HEAD -- packages/ui/src/components`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED
- **Depends on**: none
- **Category**: tech-debt
- **Planned at**: commit `8bf90a2`, 2026-06-17

## Why this matters

React Server Components require `"use client"` on modules that use hooks. Several `@gecko/ui` components use `useState`/`useEffect`/etc. without the directive. RSC consumers importing these from Server Components will fail at build time.

## Current state

Verified hook-using files **missing** `"use client"` (at commit `8bf90a2`):

```
packages/ui/src/components/accordion.tsx
packages/ui/src/components/activity-feed.tsx
packages/ui/src/components/alert-dialog.tsx
packages/ui/src/components/alert.tsx
packages/ui/src/components/checkbox.tsx
packages/ui/src/components/header.tsx
packages/ui/src/components/input-otp.tsx
packages/ui/src/components/label.tsx
packages/ui/src/components/radio-group.tsx
packages/ui/src/components/sidebar.tsx
packages/ui/src/components/switch.tsx
```

Exemplar with directive: `filters.tsx:1` — `"use client"` as first line.

Convention: blank line after directive, then imports.

## Commands you will need

| Purpose   | Command                               | Expected on success |
|-----------|---------------------------------------|---------------------|
| Typecheck | `cd packages/ui && npm run typecheck` | exit 0              |
| Lint      | `cd packages/ui && npm run lint`      | exit 0              |
| Re-audit  | see Step 2 verify command             | no output           |

## Scope

**In scope**:
- The 11 files listed above (re-run audit in Step 1 in case list drifted)

**Out of scope**:
- Files that already have `"use client"`
- Adding directives to files without hooks that are safe as server components
- `packages/ui` README (optional one-line note only if README exists in package)

## Git workflow

- Branch: `advisor/011-use-client-directives`
- Commit: `fix(ui): add missing use client directives`

## Steps

### Step 1: Re-run audit

From `packages/ui/src/components`:

```bash
find . -name '*.tsx' | while read f; do
  if grep -qE 'useState|useEffect|useCallback|useMemo|useRef|useContext|useLayoutEffect|useId|useReducer|useImperativeHandle' "$f"; then
    if ! grep -q '"use client"' "$f"; then echo "$f"; fi
  fi
done | sort
```

Add `"use client"` to every file printed.

### Step 2: Add directive to each file

For each file, insert as line 1:

```ts
"use client"

```

If the file already has a shebang or comment block at top (unlikely), place `"use client"` before imports per React docs.

Do **not** change any other code in these files.

**Verify**: re-run audit command → **no output**

### Step 3: Typecheck and lint

**Verify**: `cd packages/ui && npm run typecheck && npm run lint` → exit 0

## Test plan

No automated tests. Optional: import `Header` or `Sidebar` from a Server Component in a scratch Next.js app should now error only if the consumer violates rules — the components themselves should be valid client modules.

## Done criteria

- [ ] Every hook-using component file under `packages/ui/src/components` starts with `"use client"`
- [ ] Audit script in Step 1 returns no files
- [ ] `npm run typecheck` and `npm run lint` exit 0
- [ ] `plans/README.md` status row updated

## STOP conditions

- Audit finds >20 files (scope creep) — add directives only to hook-using files, report full list
- A file uses hooks only in types/comments (false positive) — verify before adding

## Maintenance notes

- New components using hooks must include `"use client"` in the same PR.
- Consider a lint rule (`eslint-plugin-react-server-components` or custom) in a follow-up.
