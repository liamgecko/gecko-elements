# Plan 005: Wire ReplyBox basic send button

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 8bf90a2..HEAD -- packages/ui/src/components/reply-box/reply-box-content.tsx`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: bug
- **Planned at**: commit `8bf90a2`, 2026-06-17

## Why this matters

`ReplyBox` with `variant="basic"` renders a send button in `ReplyBoxContent` that has no `onClick`. The footer variant correctly invokes `ctx.onSend`, so `onSend` on `<ReplyBox>` never fires from the basic layout — a broken primary action.

## Current state

Broken button (`reply-box-content.tsx:122-129`):

```tsx
{showSend ? (
  <Button type="button" size="icon-xs" aria-label="Send">
    {noteMode ? (
      <CirclePlus className="size-4" aria-hidden />
    ) : (
      <SendHorizontal className="size-4" aria-hidden />
    )}
  </Button>
) : null}
```

Working reference (`reply-box-footer.tsx:60-75`):

```tsx
aria-label={resolvedNoteMode ? "Add note" : showStop ? "Stop" : "Send"}
onClick={() => {
  if (showStop) {
    ctx.onStop?.()
    return
  }
  ctx.onSend?.()
}}
```

`useReplyBox()` from `reply-box-context.tsx` exposes context values including `onSend`, `onStop`, `noteMode`, `stopEnabled`.

## Commands you will need

| Purpose   | Command                               | Expected on success |
|-----------|---------------------------------------|---------------------|
| Typecheck | `cd packages/ui && npm run typecheck` | exit 0              |
| Lint      | `cd packages/ui && npm run lint`      | exit 0              |

## Scope

**In scope**:
- `packages/ui/src/components/reply-box/reply-box-content.tsx`

**Out of scope**:
- Footer send/stop behavior (already correct)
- `chat` / `textarea` variants

## Git workflow

- Branch: `advisor/005-reply-box-basic-send`
- Commit: `fix(ui): wire ReplyBox basic variant send button`

## Steps

### Step 1: Read context in basic variant branch

At the start of the `variant === "basic"` block, destructure from `useReplyBox()`:

```ts
const { onSend, onStop, noteMode: ctxNoteMode, stopEnabled } = useReplyBox()
```

Use `noteMode` from context (already available as `noteMode` from outer destructure at line 38 — reuse it).

Compute `showStop` the same way as footer if applicable:

```ts
const showStop = stopEnabled // match footer logic — read reply-box-footer.tsx for exact condition
```

Read `reply-box-footer.tsx` for the exact `showStop` derivation and mirror it.

### Step 2: Wire onClick and aria-label on send Button

Replace the send `Button` with:

```tsx
<Button
  type="button"
  size="icon-xs"
  aria-label={noteMode ? "Add note" : showStop ? "Stop" : "Send"}
  onClick={() => {
    if (showStop) {
      onStop?.()
      return
    }
    onSend?.()
  }}
>
```

Keep existing icon children unchanged.

**Verify**: `cd packages/ui && npm run typecheck && npm run lint` → exit 0

## Test plan

Manual in `apps/docs` reply-box page: `variant="basic"` with `onSend` handler — clicking send should fire the callback. Compare behavior to footer variant.

## Done criteria

- [ ] Basic variant send `Button` has `onClick` calling `onSend` / `onStop` per footer parity
- [ ] `aria-label` matches footer semantics
- [ ] `npm run typecheck` and `npm run lint` exit 0 in `packages/ui`
- [ ] `plans/README.md` status row updated

## STOP conditions

- `useReplyBox()` does not expose `onSend` / `onStop` — read `reply-box-context.tsx` and report actual API
- Basic variant is deprecated or removed in live code

## Maintenance notes

- Any future send/stop behavior change must update both `reply-box-footer.tsx` and `reply-box-content.tsx` basic branch — consider a shared `useReplyBoxSendAction()` helper in a follow-up.
