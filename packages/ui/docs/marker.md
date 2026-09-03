# Marker

Import: `@gecko/ui/components/marker`  
Status: Stable  
Source: `src/components/marker.tsx`  
Human documentation: `apps/docs/src/pages/marker/index.tsx`

## Purpose

Marker displays a brief status update, system note, bordered row or labelled separator in a conversation thread. Compose it with Message when it appears among messages.

Marker is a Shadcn component built with Base UI’s rendering utilities. There is no standalone Base UI Marker primitive. Application code imports Marker from Gecko rather than importing Shadcn or Base UI utilities directly.

## Import

```tsx
import { Marker, MarkerContent, MarkerIcon } from "@gecko/ui/components/marker";
```

## Composition

```text
Marker
├── MarkerIcon
└── MarkerContent
```

MarkerIcon contains a decorative icon. MarkerContent contains the text that communicates the marker’s meaning.

## Canonical marker

Use the default variant for a short inline system note or completed activity:

```tsx
<Marker>
  <MarkerIcon>
    <GitBranch />
  </MarkerIcon>
  <MarkerContent>Switched to a new branch</MarkerContent>
</Marker>
```

Do not add a live-region role to static or completed information.

## Variants

| Variant     | Use                                                           |
| ----------- | ------------------------------------------------------------- |
| `default`   | Inline status, note or action; canonical default              |
| `separator` | Centred label with divider lines separating groups of content |
| `border`    | Left-aligned row with a bottom boundary                       |

```tsx
<Marker variant="separator">
  <MarkerContent>Today</MarkerContent>
</Marker>
```

Use Separator instead when the division has no label or status meaning.

## In-progress status

Use `role="status"` when a new in-progress update should be announced to assistive technology:

```tsx
<Marker role="status">
  <MarkerIcon>
    <Spinner size="sm" />
  </MarkerIcon>
  <MarkerContent>Running tests</MarkerContent>
</Marker>
```

Do not put `role="status"` on a static note or repeatedly replace text faster than it can be understood.

## Shimmer

Shimmer is a Shadcn utility for streaming status text. Gecko’s `MarkerContent` exposes a boolean `shimmer` convenience property that applies the Shadcn `shimmer` class:

```tsx
<Marker role="status">
  <MarkerContent shimmer>Thinking…</MarkerContent>
</Marker>
```

Use shimmer only while text is actively streaming. Remove it when the update finishes. The effect and its CSS implementation belong to Shadcn, not Gecko.

## Interactive markers

Use `render` to replace the default `div` with the native interactive element that matches the behaviour:

```tsx
<Marker render={<a href="/pull-requests/42" />}>
  <MarkerContent>View the pull request</MarkerContent>
</Marker>
```

```tsx
<Marker render={<button type="button" onClick={handleRevert} />}>
  <MarkerContent>Revert this change</MarkerContent>
</Marker>
```

Use an anchor for navigation and a button for an action. Keep visible MarkerContent so the element has an accessible name.

## Interface

| Property                | Type                                   | Default     | Meaning                                            |
| ----------------------- | -------------------------------------- | ----------- | -------------------------------------------------- |
| `Marker.variant`        | `"default" \| "separator" \| "border"` | `"default"` | Sets the marker layout                             |
| `Marker.render`         | `ReactElement \| function`             | `div`       | Replaces the root with another semantic element    |
| `MarkerContent.shimmer` | `boolean`                              | `false`     | Applies Shadcn’s shimmer utility to streaming text |

Marker, MarkerIcon and MarkerContent also accept the native properties of their rendered elements.

## Accessibility

- Marker is presentational by default; choose semantics from its actual purpose.
- Add `role="status"` only to in-progress updates that should be announced.
- MarkerIcon is decorative and hidden from assistive technology. MarkerContent carries the meaning.
- Give an icon-only Marker an `aria-label`, though visible MarkerContent is preferred.
- Render interactive markers as native links or buttons rather than clickable `div` elements.
- Keep shimmer as a supplementary visual treatment rather than the only indication of progress.

## Agent rules

1. Import Marker and its parts from `@gecko/ui/components/marker`.
2. Use the default variant unless the note is a labelled separator or bordered row.
3. Put decorative symbols inside MarkerIcon and meaningful text inside MarkerContent.
4. Add `role="status"` only for an in-progress update that should be announced.
5. Set `shimmer` only while MarkerContent is actively streaming.
6. Use `render` with an anchor for navigation and a button for actions.
7. Use Badge for a standalone status label, Alert for a warning needing attention and Separator for an unlabelled division.
8. Do not import Base UI rendering utilities or the Shadcn shimmer utility directly in application code.

## API reference

- [Shadcn Marker documentation](https://ui.shadcn.com/docs/components/base/marker)
- [Shadcn shimmer utility](https://ui.shadcn.com/docs/utils/shimmer)

## Related

- **Message** — complete conversation content.
- **Spinner** — visible in-progress indicator within MarkerIcon.
- **Typing indicator** — another participant actively composing.
- **Badge** — compact status attached to an object.
- **Alert** — message requiring attention.
- **Separator** — unlabelled visual division.
