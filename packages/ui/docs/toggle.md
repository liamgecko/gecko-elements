# Toggle

Import: `@gecko/ui/components/toggle`  
Status: Stable  
Source: `src/components/toggle.tsx`  
Human documentation: `apps/docs/src/pages/toggle/index.tsx`

## Purpose

Toggle is a two-state button for a local tool or display mode that remains on until pressed again. Examples include bold formatting, bookmarking and showing a layer.

Use Button for a one-time action. Use Switch for an application setting. Use Checkbox for a binary form value.

Toggle wraps Base UI Toggle through Shadcn’s composition. Gecko uses an outlined surface by default, preserves compact sizes and keeps specialised ghost treatments for application chrome.

## Canonical toggle

```tsx
<Toggle aria-label="Bookmark">
  <Bookmark aria-hidden="true" />
</Toggle>
```

Base UI supplies native button behaviour, `aria-pressed` and keyboard activation. Icon-only usage always has an accessible name.

## State

Use `defaultPressed` for an uncontrolled initial state. Use `pressed` with `onPressedChange` when application state needs the value:

```tsx
const [bookmarked, setBookmarked] = React.useState(false)

<Toggle
  pressed={bookmarked}
  onPressedChange={setBookmarked}
  aria-label="Bookmark"
>
  <Bookmark aria-hidden="true" />
</Toggle>
```

Do not use Toggle as a hidden form control. Choose Checkbox or Switch when a boolean value belongs to a form or setting.

## Sizing

The default Toggle uses the outline treatment. `ghost-light` and `ghost-dark` are specialised treatments for existing application chrome, not ordinary content.

Text sizes are `xs`, `sm`, `default` and `lg`. Icon-only equivalents are `icon-xs`, `icon-sm`, `icon` and `icon-lg`. Match neighbouring controls.

An icon-only Toggle is square at every size, including when a text size is used. Prefer the matching icon size when choosing a size explicitly.

## Interface

| Property          | Type                                                      | Default      | Meaning                            |
| ----------------- | --------------------------------------------------------- | ------------ | ---------------------------------- |
| `variant`         | `"default" \| "outline" \| "ghost-light" \| "ghost-dark"` | `"outline"`  | Sets surface treatment             |
| `size`            | Gecko text or icon Toggle size                            | `"default"`  | Sets control dimensions            |
| `defaultPressed`  | `boolean`                                                 | `false`      | Initial uncontrolled pressed state |
| `pressed`         | `boolean`                                                 | uncontrolled | Controlled pressed state           |
| `onPressedChange` | change handler                                            | none         | Reports pressed-state changes      |
| `disabled`        | `boolean`                                                 | `false`      | Prevents interaction               |

Toggle accepts the remaining Base UI Toggle properties.

## Accessibility

- Give icon-only Toggle an accessible name.
- Keep a visible label when the icon is ambiguous.
- Preserve Base UI’s native button and pressed semantics.
- Keep the visible pressed treatment; do not rely on colour alone for meaning.
- Use `disabled` only when the tool is unavailable in the current context.

## Agent rules

1. Import Toggle from `@gecko/ui/components/toggle`.
2. Use it only for a state that remains on until pressed again.
3. Give icon-only usage an accessible name and hide decorative icons.
4. Use visible text when the icon is ambiguous.
5. Use uncontrolled state unless application logic needs the value.
6. Match neighbouring control size.
7. Keep icon-only toggles square and reserve ghost-light and ghost-dark for their intended application chrome.
8. Use Button for one-time actions, Switch for settings and Checkbox for submitted booleans.
9. Do not recreate pressed semantics or styling in product code.
10. Do not import Shadcn or Base UI Toggle directly.

## API reference

- [Shadcn Toggle documentation](https://ui.shadcn.com/docs/components/base/toggle)
- [Base UI Toggle API](https://base-ui.com/react/components/toggle)

## Related

- **Toggle Group** — related single or multiple pressed states.
- **Button** — one-time action.
- **Switch** — immediate application setting.
- **Checkbox** — submitted binary choice.
