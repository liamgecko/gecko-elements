# Toggle Group

Import: `@gecko/ui/components/toggle-group`  
Status: Stable  
Source: `src/components/toggle-group.tsx`  
Human documentation: `apps/docs/src/pages/toggle-group/index.tsx`

## Purpose

Toggle Group coordinates related two-state buttons. Use it for a compact single or multiple selection where each item controls an immediate local state.

Use Radio Group when one value is submitted in a form. Use Button Group for actions that do not remain selected. Use one Toggle for an independent state.

Toggle Group wraps Base UI Toggle Group and Toggle through Shadcn’s composition. Gecko adds shared variants, sizes, spacing and vertical layout. The outlined treatment is the default.

## Composition

```text
ToggleGroup
└── ToggleGroupItem
```

Each ToggleGroupItem has a unique string `value`. The group value is always an array, including single-selection groups.

## Canonical group

```tsx
<ToggleGroup defaultValue={["left"]} aria-label="Text alignment">
  <ToggleGroupItem value="left" aria-label="Align left">
    <TextAlignStart aria-hidden="true" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align centre">
    <AlignCenter aria-hidden="true" />
  </ToggleGroupItem>
</ToggleGroup>
```

Single selection is the default. Pressing an item releases the other pressed item. The selected item may be released, so use Radio Group when exactly one submitted value must remain selected.

## Multiple selection

Set `multiple` when each state can be active independently:

```tsx
<ToggleGroup multiple defaultValue={["bold"]} aria-label="Text formatting">
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
</ToggleGroup>
```

## Spacing and orientation

Items use spacing `2` by default. This is the canonical treatment. Set `spacing={0}` only when the items deliberately form one connected segmented control.

Horizontal is the default orientation. Vertical orientation stacks items and changes Base UI arrow-key navigation to the vertical axis.

Set shared `variant` and `size` on ToggleGroup. Items inherit them. Item-level values are fallbacks only when the group does not provide one. Icon-only items remain square at every size.

## Controlled state

Use `value` and `onValueChange` when the pressed values must coordinate with application state. The value is a string array for both single and multiple selection.

## Interface

### ToggleGroup

| Property        | Type                         | Default        | Meaning                                      |
| --------------- | ---------------------------- | -------------- | -------------------------------------------- |
| `value`         | `readonly string[]`          | uncontrolled   | Controlled pressed item values               |
| `defaultValue`  | `readonly string[]`          | none           | Initial uncontrolled pressed values          |
| `onValueChange` | change handler               | none           | Reports pressed item values                  |
| `multiple`      | `boolean`                    | `false`        | Allows several pressed items                 |
| `orientation`   | `"horizontal" \| "vertical"` | `"horizontal"` | Sets layout and arrow-key direction          |
| `spacing`       | `number`                     | `2`            | Sets the design-system gap between items     |
| `variant`       | Gecko Toggle variant         | `"outline"`    | Sets shared item treatment                   |
| `size`          | Gecko Toggle size            | `"default"`    | Sets shared item dimensions                  |
| `disabled`      | `boolean`                    | `false`        | Prevents interaction with the complete group |
| `loopFocus`     | `boolean`                    | `true`         | Loops arrow-key focus at the group edges     |

### ToggleGroupItem

| Property   | Type                 | Default     | Meaning                                      |
| ---------- | -------------------- | ----------- | -------------------------------------------- |
| `value`    | `string`             | required    | Identifies the item in the group value array |
| `disabled` | `boolean`            | `false`     | Prevents interaction with this item          |
| `variant`  | Gecko Toggle variant | group value | Fallback visual treatment                    |
| `size`     | Gecko Toggle size    | group value | Fallback dimensions                          |

Toggle Group and its items accept their remaining Base UI properties.

## Accessibility

- Give every ToggleGroup an `aria-label` or `aria-labelledby`.
- Give icon-only items accessible names.
- Use unique item values.
- Preserve Base UI roving focus and orientation-aware arrow keys.
- Set orientation accurately so visual layout and keyboard behaviour agree.
- Use Radio Group instead when exactly one form value must remain selected.

## Agent rules

1. Import ToggleGroup and ToggleGroupItem from `@gecko/ui/components/toggle-group`.
2. Place items directly inside the group.
3. Give the group an accessible name and every item a unique value.
4. Treat group values as arrays for both single and multiple selection.
5. Set `multiple` only for independent states.
6. Keep the outlined default and set size, spacing and orientation on the group.
7. Keep the default spacing; use zero only for an intentionally connected control.
8. Do not manage item pressed state separately from the group.
9. Use Radio Group for one submitted choice and Button Group for actions.
10. Keep icon-only items square and give each one an accessible name.
11. Do not import Shadcn or Base UI Toggle Group directly.

## API reference

- [Shadcn Toggle Group documentation](https://ui.shadcn.com/docs/components/base/toggle-group)
- [Base UI Toggle Group API](https://base-ui.com/react/components/toggle-group)
- [Gecko Toggle contract](./toggle.md)

## Related

- **Toggle** — one independent pressed state.
- **Button Group** — related actions without selection.
- **Radio Group** — exactly one submitted choice.
