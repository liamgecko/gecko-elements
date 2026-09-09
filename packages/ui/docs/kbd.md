# Kbd

Import: `@geckolabs/elements/components/kbd`

Status: Stable

Source: `src/components/kbd.tsx`

Human documentation: `apps/docs/src/pages/input-group/index.tsx`

## Purpose

Kbd displays a keyboard key or shortcut. Use it only when the displayed shortcut is implemented. It is passive text: the application owns shortcut registration, platform-specific key choices and the action itself.

Use KbdGroup to arrange separate keycaps for one shortcut. Keep the action available through its normal visible control as well.

## Canonical usage

```tsx
import { Kbd, KbdGroup } from "@geckolabs/elements/components/kbd";

<>
  <Kbd>Esc</Kbd>
  <KbdGroup>
    <Kbd>Ctrl</Kbd>
    <Kbd>K</Kbd>
  </KbdGroup>
</>;
```

For a shortcut that focuses or activates an input, put Kbd inside an `InputGroupAddon` after the input, using `align="inline-end"`. Follow the [Input Group contract](input-group.md) for the enclosing control and label.

## Interface

Kbd accepts native `kbd` properties. KbdGroup currently accepts native `div` properties while rendering a `kbd` element containing its children. Neither component has a `size` or `variant` prop, registers keyboard handlers, or acts as a button.

## Accessibility and styling

- Show the actual keys for the supported platform. Use understandable key names or an accessible text equivalent for ambiguous symbols.
- Keep Kbd passive; put activation, focus and shortcut handling on the owning application control.
- Preserve the library's keycap size, spacing, typography, colours and contextual treatment. Use `className` only for outer layout placement.
- Request a library change for a missing presentation instead of drawing local keycaps.

## Related

- [Input Group](input-group.md) — shortcut hints inside the input boundary.
