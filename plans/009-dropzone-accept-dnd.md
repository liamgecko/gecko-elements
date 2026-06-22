# Plan 009: Enforce DropZone accept on drag-and-drop

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report — do not improvise. When done, update the status row for this plan in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat 8bf90a2..HEAD -- packages/ui/src/components/drop-zone.tsx`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: security
- **Planned at**: commit `8bf90a2`, 2026-06-17

## Why this matters

`DropZone` sets `accept` on the hidden file input, which browsers enforce for the browse picker but not for drag-and-drop. `handleDrop` adds all dropped files unconditionally, bypassing client-side type gating consumers rely on before upload.

## Current state

```ts
// drop-zone.tsx:145-153
const handleDrop = React.useCallback((e) => {
  ...
  const dropped = Array.from(e.dataTransfer.files ?? [])
  if (dropped.length) addFiles(dropped)
}, [addFiles, disabled])

// line 189 — accept only on <Input type="file" accept={accept} />
```

`addFiles` (105-110) appends without validation.

## Commands you will need

| Purpose   | Command                               | Expected on success |
|-----------|---------------------------------------|---------------------|
| Typecheck | `cd packages/ui && npm run typecheck` | exit 0              |
| Lint      | `cd packages/ui && npm run lint`      | exit 0              |

## Scope

**In scope**:
- `packages/ui/src/components/drop-zone.tsx`

**Out of scope**:
- Server-side upload validation
- `file-input.tsx`

## Git workflow

- Branch: `advisor/009-dropzone-accept-dnd`
- Commit: `fix(ui): enforce DropZone accept on drag-and-drop`

## Steps

### Step 1: Add accept matcher helper

Above the component, add:

```ts
function fileMatchesAccept(file: File, accept: string | undefined): boolean {
  if (!accept?.trim()) return true

  const tokens = accept.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
  const name = file.name.toLowerCase()
  const type = (file.type || "").toLowerCase()

  return tokens.some((token) => {
    if (token.startsWith(".")) {
      return name.endsWith(token)
    }
    if (token.endsWith("/*")) {
      const prefix = token.slice(0, -1)
      return type.startsWith(prefix)
    }
    return type === token
  })
}

function filterFilesByAccept(files: File[], accept: string | undefined): File[] {
  return files.filter((f) => fileMatchesAccept(f, accept))
}
```

This mirrors common HTML `accept` semantics (extensions, MIME types, `image/*` wildcards).

### Step 2: Filter in addFiles or drop handler

Preferred: filter at the boundary in `addFiles`:

```ts
const addFiles = React.useCallback(
  (incoming: File[]) => {
    const accepted = filterFilesByAccept(incoming, accept)
    if (!accepted.length) return
    const next = multiple ? [...files, ...accepted] : accepted.slice(0, 1)
    setFiles(next)
  },
  [accept, files, multiple, setFiles]
)
```

This aligns browse (`handleInputChange`) and drop paths.

### Step 3: Optional — set aria-invalid on reject-all drop

Only if `incoming.length > 0 && accepted.length === 0` and you can do so without new props — skip if it requires API changes (out of scope). Silent reject is acceptable for this plan.

**Verify**: `cd packages/ui && npm run typecheck && npm run lint` → exit 0

## Test plan

Manual: `accept="image/*"` — drag a `.png` → accepted; drag a `.txt` → rejected (file list unchanged). Browse picker behavior unchanged.

## Done criteria

- [ ] Dropped files filtered by `accept` the same as browse selection
- [ ] `accept` undefined still accepts all files
- [ ] `npm run typecheck` and `npm run lint` exit 0
- [ ] `plans/README.md` status row updated

## STOP conditions

- Product requires notifying user on rejected drops — report; adding `onReject` is a follow-up, not in scope

## Maintenance notes

- MIME types from drag-and-drop can be empty on some OS/browser combos — extension tokens in `accept` improve reliability.
- Server validation remains mandatory; this is client-side parity only.
