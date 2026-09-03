# Popover

Import: `@gecko/ui/components/popover`  
Status: Stable  
Source: `src/components/popover.tsx`  
Human documentation: `apps/docs/src/pages/popover/index.tsx`

## Purpose

Popover displays supporting content or controls in a non-blocking panel anchored to a trigger. Use it when the panel belongs directly to that trigger and must remain available without navigating away.

Use Tooltip for a short hint, Dropdown menu for a list of actions and Dialog for blocking or page-level work.

Popover wraps Base UI through Shadcn’s composition. Application code must import the Gecko parts rather than importing either dependency directly.

## Composition

```text
Popover
├── PopoverTrigger
└── PopoverContent
    ├── PopoverHeader
    │   ├── PopoverTitle
    │   └── PopoverDescription
    └── PopoverFooter
        └── PopoverClose
```

PopoverContent owns the portal and positioning layer. Do not add another Portal or Positioner around it.

## Canonical popover

```tsx
<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Open popover
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
```

Pass a rendered Gecko Button to PopoverTrigger. The visible trigger text supplies its accessible name. Give an icon-only trigger an explicit `aria-label`.

Use PopoverTitle and PopoverDescription whenever the panel needs a name and supporting context. Base UI connects them to the popup semantics.

## Actions and closing

Use PopoverFooter for panel actions and PopoverClose for every action that dismisses the panel:

```tsx
<PopoverFooter>
  <PopoverClose render={<Button variant="outline" size="sm" />}>
    Cancel
  </PopoverClose>
  <PopoverClose render={<Button size="sm" />}>Apply</PopoverClose>
</PopoverFooter>
```

Do not render a Cancel button that leaves the popover open. If Apply can fail validation or an asynchronous request, do not wrap it with PopoverClose; close the controlled Popover only after the operation succeeds.

Base UI requires a PopoverClose inside the popup when `modal` is `true` or `"trap-focus"`. This gives touch screen-reader users a route out of the trapped panel. Use Dialog instead when the task is genuinely modal or blocking.

## Forms

Short contextual forms can sit inside PopoverContent. Compose each control with Field and a visible FieldLabel. Keep the form limited to the task represented by the trigger.

```tsx
<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Edit dimensions
  </PopoverTrigger>
  <PopoverContent align="start">
    <PopoverHeader>
      <PopoverTitle>Dimensions</PopoverTitle>
      <PopoverDescription>Set the width for the layer.</PopoverDescription>
    </PopoverHeader>
    <Field>
      <FieldLabel htmlFor="layer-width">Width</FieldLabel>
      <Input id="layer-width" name="width" defaultValue="100%" />
    </Field>
    <PopoverFooter>
      <PopoverClose render={<Button variant="outline" size="sm" />}>
        Cancel
      </PopoverClose>
      <PopoverClose render={<Button size="sm" />}>Apply</PopoverClose>
    </PopoverFooter>
  </PopoverContent>
</Popover>
```

Use a real `form` and submission handler when values are submitted. Keep the submit button enabled until submission begins and close only after successful validation and submission.

## Positioning

PopoverContent defaults to the bottom centre of its trigger with a four-pixel side offset. Set `side` and `align` only when the interface needs a different preferred placement:

```tsx
<PopoverContent side="inline-end" align="start" />
```

Prefer logical `inline-start` and `inline-end` sides when placement should follow text direction. Base UI collision handling may flip or shift the panel to keep it in the viewport, so treat these values as preferences rather than guaranteed physical positions.

Use `sideOffset` for space away from the trigger and `alignOffset` for movement along the alignment axis. Do not recreate positioning with margins, transforms or application CSS.

## Controlled state

Use `open` with `onOpenChange` only when application state must coordinate the panel. Otherwise use the uncontrolled default. Use `defaultOpen` only for an intentionally open initial state.

```tsx
<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger render={<Button variant="outline" />}>
    Edit dimensions
  </PopoverTrigger>
  <PopoverContent>{/* content */}</PopoverContent>
</Popover>
```

Do not prevent Escape, outside press or focus restoration without a reviewed interaction requirement.

## Interface

| Property                     | Type                                                             | Default    | Meaning                                           |
| ---------------------------- | ---------------------------------------------------------------- | ---------- | ------------------------------------------------- |
| `Popover.open`               | `boolean`                                                        | —          | Controls whether the panel is open                |
| `Popover.defaultOpen`        | `boolean`                                                        | `false`    | Sets the initial uncontrolled open state          |
| `Popover.onOpenChange`       | `(open: boolean, eventDetails) => void`                          | —          | Runs when the panel opens or closes               |
| `Popover.modal`              | `boolean \| "trap-focus"`                                        | `false`    | Limits interaction outside the panel              |
| `PopoverTrigger.disabled`    | `boolean`                                                        | `false`    | Makes the trigger unavailable                     |
| `PopoverTrigger.openOnHover` | `boolean`                                                        | `false`    | Also opens the panel while its trigger is hovered |
| `PopoverContent.align`       | `"start" \| "center" \| "end"`                                   | `"center"` | Sets alignment across the selected side           |
| `PopoverContent.side`        | `"top" \| "right" \| "bottom" \| "left" \| logical inline sides` | `"bottom"` | Sets the preferred side                           |
| `PopoverContent.sideOffset`  | `number`                                                         | `4`        | Sets space between the trigger and panel          |
| `PopoverContent.alignOffset` | `number`                                                         | `0`        | Shifts the panel along its alignment axis         |

Popover, PopoverTrigger, PopoverTitle, PopoverDescription and PopoverClose accept the corresponding Base UI properties. PopoverContent accepts Base UI Popup properties plus the positioning properties listed above. PopoverHeader and PopoverFooter accept native `div` properties.

## Accessibility

- Use a native Gecko Button or another keyboard-operable element as the trigger.
- Give icon-only triggers an explicit accessible name.
- Use PopoverTitle and PopoverDescription when the panel needs context.
- Preserve Base UI’s Escape dismissal, outside interaction and focus restoration.
- Include PopoverClose whenever modal behaviour traps focus.
- Use Field and visible FieldLabel components for controls inside the panel.
- Use Dialog instead when the task must block interaction with the page.
- Allow Base UI collision handling to keep the panel within the viewport.

## Agent rules

1. Import Popover parts from `@gecko/ui/components/popover`.
2. Render the trigger with a Gecko component instance rather than passing a component function.
3. Use the canonical title and description composition when the panel needs context.
4. Use PopoverFooter for actions and PopoverClose for actions that dismiss the panel.
5. Include PopoverClose whenever `modal` traps focus.
6. Use Field composition for form controls inside the panel.
7. Treat side and alignment as placement preferences and retain collision handling.
8. Use logical sides when positioning should follow text direction.
9. Preserve the library’s focus management and dismissal behaviour.
10. Do not restyle the panel or rebuild its portal and positioner in application code.
11. Do not import Shadcn or Base UI Popover parts directly.

## API reference

- [Shadcn Popover documentation](https://ui.shadcn.com/docs/components/base/popover)
- [Base UI Popover API](https://base-ui.com/react/components/popover)

## Related

- **Tooltip** — a short hint without interactive content.
- **Dropdown menu** — a list of actions or choices.
- **Dialog** — blocking content and longer tasks.
- **Field** — labels and validation for controls inside the panel.
