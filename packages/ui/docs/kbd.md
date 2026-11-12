# Kbd

Import: `@geckolabs/elements/components/kbd`

Status: Stable

Source: `src/components/kbd.tsx`

Human documentation: `apps/docs/src/pages/kbd/index.tsx`

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

## Composition

```text
Kbd — one key or key name
KbdGroup — one shortcut
├── Kbd — modifier
└── Kbd — key
```

Use separate Kbd children when a shortcut contains multiple keys. The existing
`KbdGroup` interface accepts native div properties but renders a kbd element;
it is not a layout container for unrelated controls.

Compose keycaps inside an [Input Group](input-group.md), [Button](button.md)
or [Tooltip](tooltip.md) through that component's documented content slots.
The enclosing control owns interaction. A keycap inside a button is not a
second button, and Kbd itself is excluded from pointer interaction.

## Interface

| Part       | Public properties             | Meaning                                                                         |
| ---------- | ----------------------------- | ------------------------------------------------------------------------------- |
| `Kbd`      | `React.ComponentProps<"kbd">` | One semantic keycap, including native attributes, children and a forwarded ref. |
| `KbdGroup` | `React.ComponentProps<"div">` | Current group interface; renders a kbd element containing keycaps.              |

Neither part has a `size` or `variant` prop, registers keyboard handlers, or acts
as a button. Use `className` only for outer layout placement. The keycap's size,
spacing, typography, colours and contextual tooltip treatment are library-owned.

## Shortcut ownership

The application chooses keys appropriate to its supported platforms, registers
the handler and removes it when the owning interface unmounts. Display only
shortcuts that are active in that interface. Keycaps do not provide behaviour
just because they contain text such as `Esc` or `Ctrl+K`.

The docs input example registers Ctrl+K and Command+K to focus its labelled
input. The button example provides the same action through a visible control.
Use those examples for the separation between display and application behaviour.

## Accessibility and styling

- Show the actual keys for the supported platform. Use understandable key names or an accessible text equivalent for ambiguous symbols.
- Keep Kbd passive; put activation, focus and shortcut handling on the owning application control.
- Keep the normal action available without its shortcut. Kbd is neither a focus stop nor an interactive control.
- Inside a button, hide a redundant shortcut from assistive technology when the button already has a complete accessible name.
- Request a library change for a missing presentation instead of drawing local keycaps.

## Agent rules

1. Import both parts from `@geckolabs/elements/components/kbd`.
2. Use Kbd for one key and KbdGroup for the keys of one shortcut.
3. Keep shortcut registration, platform selection and cleanup in the owning application.
4. Use the enclosing Button or input for activation and focus; keep keycaps passive.
5. Provide an understandable name for ambiguous symbols and retain the visible action.
6. Preserve native attributes and refs, and the library's contextual styling. Request approval for new props or presentation rather than adding local keycap styles.

## API reference

- [Shadcn Kbd documentation](https://ui.shadcn.com/docs/components/base/kbd)

## Related

- [Input Group](input-group.md) — shortcut hints inside the input boundary.
- [Button](button.md) — the visible action associated with a shortcut.
- [Tooltip](tooltip.md) — supplementary shortcut hints with contextual keycap styling.
- [Command](command.md) — command palette interaction and its own shortcut composition.
