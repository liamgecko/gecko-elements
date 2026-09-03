# Button Group

Import: `@gecko/ui/components/button-group`  
Status: Stable  
Source: `src/components/button-group.tsx`  
Human documentation: `apps/docs/src/pages/button-group/index.tsx`

## Purpose

Button Group visually joins a short set of related actions. Use it when the buttons operate on the same object or value, for split actions, or for controls around one input.

Use Toggle Group when the controls remain selected. Use standalone Buttons when the actions are not closely related.

## Composition

```text
ButtonGroup
├── Button, Input, or SelectTrigger
├── ButtonGroupText
└── ButtonGroupSeparator
```

Button Group supplies grouping semantics and joined edges. Each child keeps its native or Gecko component behaviour.

## Canonical group

```tsx
<ButtonGroup aria-label="Message actions">
  <Button variant="outline">Archive</Button>
  <Button variant="outline">Report</Button>
</ButtonGroup>
```

Every group has an accessible name. Peer actions use the same variant and size.

## Orientation

Horizontal is the default. Use vertical only when the action set is intentionally stacked.

```tsx
<ButtonGroup orientation="vertical" aria-label="Zoom controls">
  <Button variant="outline">Zoom in</Button>
  <Button variant="outline">Zoom out</Button>
</ButtonGroup>
```

## Split action

A split action keeps the primary action visible and places closely related alternatives in a Dropdown Menu opened by the adjoining trigger. ButtonGroupSeparator can distinguish adjacent borderless buttons. Outlined buttons already provide their own boundary and do not need a separator.

## Inputs and selects

An Input may sit inside ButtonGroup when a separate adjoining button submits or acts on the value. Use Input Group instead when the action belongs inside the field boundary.

A Select trigger may sit beside an Input when its choice qualifies the adjoining value, such as a currency and amount. Keep the Select content portalled outside the group through the standard Select composition.

ButtonGroupText remains available for non-interactive prefixes, suffixes, and shared values.

## Interface

### ButtonGroup

| Property      | Type                         | Default        | Meaning                         |
| ------------- | ---------------------------- | -------------- | ------------------------------- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Sets layout and connected edges |

### ButtonGroupText

| Property | Type                      | Default | Meaning                                   |
| -------- | ------------------------- | ------- | ----------------------------------------- |
| `render` | React element or function | none    | Replaces or composes the rendered element |

### ButtonGroupSeparator

| Property      | Type                         | Default      | Meaning                    |
| ------------- | ---------------------------- | ------------ | -------------------------- |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Sets the divider direction |

ButtonGroup accepts native div properties. ButtonGroupSeparator accepts Gecko Separator properties.

## Accessibility

- Give every ButtonGroup an `aria-label` or `aria-labelledby`.
- Give every icon-only child Button an accessible name.
- Preserve Tab navigation between child controls.
- Keep ButtonGroupText non-interactive.
- Do not use ButtonGroup styling to imply a selected state.

## Agent rules

1. Import group parts from `@gecko/ui/components/button-group` and children from their Gecko modules.
2. Group only actions that operate on the same object or value.
3. Give the group an accessible name.
4. Keep peer Button variants and sizes consistent.
5. Use ButtonGroupSeparator for borderless adjacent actions, not between outlined Buttons.
6. Implement split actions with Dropdown Menu rather than an inert icon button.
7. Pair Select with Input only when the choice qualifies the adjoining value.
8. Use ButtonGroupText only for non-interactive content.
9. Use Toggle Group for persistent selected states and Input Group when content belongs inside a field boundary.
10. Do not join unrelated page actions or import Shadcn primitives directly.

## API reference

- [Shadcn Button Group documentation](https://ui.shadcn.com/docs/components/base/button-group)
- [Gecko Button contract](./button.md)
- [Gecko Separator contract](./separator.md)

## Related

- **Button** — one standalone action.
- **Toggle Group** — related persistent states.
- **Input Group** — content and actions inside one field boundary.
