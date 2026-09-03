# Separator

Import: `@gecko/ui/components/separator`  
Status: Stable  
Source: `src/components/separator.tsx`  
Human documentation: `apps/docs/src/pages/separator/index.tsx`

## Purpose

Separator creates a horizontal or vertical structural boundary between related groups of functionality or data. Use it to clarify dense layouts without adding a heading or carrying status.

Separator wraps Base UI through Shadcn’s composition. Application code must import the Gecko component rather than importing either dependency directly.

Use Marker when a labelled divider or status message is required in a conversation. Use FieldSeparator for divisions within a FieldGroup.

## Canonical horizontal separator

Horizontal is the default orientation:

```tsx
<Separator />
```

Place it between related groups rather than around every child. Keep enough space around the line for each group to remain readable.

## Vertical separator

Use a vertical separator between inline items:

```tsx
<div className="flex h-5 items-center gap-4">
  <span>Blog</span>
  <Separator orientation="vertical" />
  <span>Docs</span>
</div>
```

The parent must have a measurable block size. That size may be explicit or established by its content. Separator stretches to the parent’s available height.

## Semantics

Base UI renders an accessible separator and communicates its orientation to assistive technology. Keep that semantic boundary when it helps identify distinct content groups.

When a line is purely decorative and the surrounding document structure already communicates the grouping, remove the duplicate announcement:

```tsx
<Separator aria-hidden="true" />
```

Separator must not communicate status, selection, progress or a change in state. Use the component that owns that meaning instead.

## Interface

| Property      | Type                         | Default        | Meaning                                       |
| ------------- | ---------------------------- | -------------- | --------------------------------------------- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Sets the direction of the structural boundary |

Separator accepts Base UI Separator properties and native `div` attributes.

## Accessibility

- Preserve the separator role and orientation supplied by Base UI when the boundary is structural.
- Set `aria-hidden="true"` only when the line is decorative and surrounding semantics already provide the same structure.
- Do not make Separator interactive or keyboard focusable.
- Do not use colour or the line alone to communicate status or state.
- Keep vertical separators inside a parent with a measurable height.

## Agent rules

1. Import Separator from `@gecko/ui/components/separator`.
2. Use the default orientation between stacked groups.
3. Use the vertical orientation between inline groups.
4. Keep spacing around the line so the groups remain readable.
5. Preserve the Base UI separator semantics unless the line is purely decorative.
6. Use `aria-hidden="true"` for a decorative line only when surrounding structure already communicates the boundary.
7. Use Marker for a labelled conversation divider and FieldSeparator inside FieldGroup.
8. Do not use Separator for status, selection, progress or state changes.
9. Do not restyle Separator in application code; request a library change when another approved treatment is required.
10. Do not import Shadcn or Base UI Separator directly in application code.

## API reference

- [Shadcn Separator documentation](https://ui.shadcn.com/docs/components/base/separator)
- [Base UI Separator API](https://base-ui.com/react/components/separator)

## Related

- **Marker** — labelled conversation divider or status note.
- **FieldSeparator** — visual division inside a FieldGroup.
