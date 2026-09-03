# Input Group

Import: `@gecko/ui/components/input-group`  
Status: Stable  
Source: `src/components/input-group.tsx`  
Human documentation: `apps/docs/src/pages/input-group/index.tsx`

## Purpose

Input Group places text, icons or actions inside the same visual boundary as one Input or Textarea. Use it only when that content belongs to the value or acts on the value directly.

Use a standalone Input or Textarea when nothing belongs inside the boundary. Use Button Group when an action sits beside, rather than inside, a control.

Input Group follows Shadcn’s compound composition and uses Gecko Input, Textarea and Button parts. Application code imports every part from Gecko.

## Composition

```text
InputGroup
├── InputGroupInput or InputGroupTextarea
└── InputGroupAddon
    └── Text, icon, button, Kbd, Spinner or DropdownMenu
```

Render the input or textarea first in the DOM. Render addons after the control and use `align` for visual placement. This preserves reading and focus order.

## Canonical input group

```tsx
<InputGroup>
  <InputGroupInput aria-label="Search" placeholder="Search..." />
  <InputGroupAddon align="inline-start">
    <Search aria-hidden="true" />
  </InputGroupAddon>
</InputGroup>
```

Decorative icons are hidden from assistive technology. An icon-only InputGroupButton always has an accessible name.

## Alignment

`inline-start` and `inline-end` place short prefixes, suffixes, icons or actions beside an Input. `block-start` and `block-end` place supporting content or a compact toolbar above or below an Input or Textarea.

```tsx
<InputGroup>
  <InputGroupTextarea aria-label="Reply" />
  <InputGroupAddon align="block-end">
    <InputGroupText>0/500</InputGroupText>
    <InputGroupButton>Send</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

Do not put unrelated form actions inside the boundary.

## Addon content

- Use decorative icons to reinforce the input purpose or show a redundant status cue.
- Use InputGroupText for short prefixes, suffixes, units and counters.
- Use Kbd when a real keyboard shortcut activates or focuses the input.
- Compose Dropdown Menu with InputGroupButton when several actions or scopes operate on the value.
- Use a small Spinner with `aria-busy="true"` on the group while work is in progress.

InputGroupButton sizes labelled content naturally and remains square when its only child is an icon.

## Sizing

InputGroup supports `sm`, `md` and `lg`; `md` is the default. The selected size controls the group height and is inherited by its input, addon text, icons and buttons. Use one size consistently with neighbouring form controls.

## Within form

Wrap the complete group in Field and connect FieldLabel to the input control:

```tsx
<Field>
  <FieldLabel htmlFor="workspace-domain">Workspace domain</FieldLabel>
  <InputGroup>
    <InputGroupInput id="workspace-domain" name="domain" />
    <InputGroupAddon align="inline-end">
      <InputGroupText>.gecko.example</InputGroupText>
    </InputGroupAddon>
  </InputGroup>
</Field>
```

Validation state belongs on the input using `aria-invalid`; Field owns the associated error message. Disabled state belongs on the native control and the surrounding Field.

## Interface

### InputGroup

| Property | Type                   | Default | Meaning                                      |
| -------- | ---------------------- | ------- | -------------------------------------------- |
| `size`   | `"sm" \| "md" \| "lg"` | `"md"`  | Sets group height and inherited content size |

### InputGroupAddon

| Property | Type                                                             | Default          | Meaning                     |
| -------- | ---------------------------------------------------------------- | ---------------- | --------------------------- |
| `align`  | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` | Sets visual addon placement |

### InputGroupButton

| Property  | Type                              | Default    | Meaning                            |
| --------- | --------------------------------- | ---------- | ---------------------------------- |
| `size`    | `"sm" \| "md" \| "lg"`            | inherited  | Overrides the group size           |
| `variant` | Gecko Button variant              | `"ghost"`  | Sets the approved Button treatment |
| `type`    | `"button" \| "submit" \| "reset"` | `"button"` | Sets native form behaviour         |

InputGroupInput accepts the Input interface except native numeric `size`. InputGroupTextarea accepts the Textarea interface. InputGroupText accepts native span properties.

## Accessibility

- Keep the control before addons in DOM order.
- Connect a visible FieldLabel in product forms.
- Give every icon-only InputGroupButton an accessible name.
- Hide decorative icons with `aria-hidden="true"`.
- Keep validation messages visible and connected through `aria-describedby`.
- Preserve native input, textarea and button keyboard behaviour.

## Agent rules

1. Import every Input Group part from `@gecko/ui/components/input-group`.
2. Render exactly one InputGroupInput or InputGroupTextarea per group.
3. Render the control before addons in the DOM.
4. Use `align` instead of rearranging DOM order.
5. Use InputGroupText for visible prefixes, suffixes and counters.
6. Give icon-only actions an accessible name and hide decorative icons from assistive technology.
7. Use Kbd only for a working shortcut and Dropdown Menu for multiple contextual actions.
8. Mark active loading groups with `aria-busy="true"` and use the small Spinner size.
9. Wrap product form usage in Field with a visible FieldLabel and use the group size rather than resizing children.
10. Do not add unnecessary width utilities, position content over a standalone Input, or import implementation dependencies directly.

## API reference

- [Shadcn Input Group documentation](https://ui.shadcn.com/docs/components/base/input-group)
- [Gecko Input contract](./input.md)
- [Gecko Textarea contract](./textarea.md)
- [Gecko Button contract](./button.md)

## Related

- **Input** — single-line text without internal content.
- **Textarea** — multiline text without an internal toolbar.
- **Button Group** — actions joined beside a control.
- **Field** — labels, descriptions, errors and form layout.
