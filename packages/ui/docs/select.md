# Select

Import: `@gecko/ui/components/select`  
Status: Stable  
Source: `src/components/select.tsx`  
Human documentation: `apps/docs/src/pages/select/index.tsx`

## Purpose

Select lets someone choose one value from a short, fixed list in a custom popup. Use Combobox when filtering materially helps someone find an option. Use Native select when browser-native behaviour is preferred, particularly on student-facing surfaces.

Gecko wraps Shadcn’s Base UI Select composition. Application code imports the Gecko component rather than Base UI directly.

## Composition

```text
Select
├── SelectTrigger
│   └── SelectValue
└── SelectContent
    ├── SelectGroup
    │   ├── SelectLabel
    │   └── SelectItem
    └── SelectSeparator
```

SelectScrollUpButton and SelectScrollDownButton are owned by SelectContent and render automatically when scrolling is available.

## Canonical field

Always place a product Select in a Field with a visible FieldLabel. A placeholder is a hint, not a label. Pass the option collection to `items` so SelectValue renders the visible label instead of the stored value.

```tsx
const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
]

<Field>
  <FieldLabel htmlFor="fruit">Fruit</FieldLabel>
  <Select items={fruits} name="fruit">
    <SelectTrigger id="fruit">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        {fruits.map((fruit) => (
          <SelectItem key={fruit.value} value={fruit.value}>
            {fruit.label}
          </SelectItem>
        ))}
      </SelectGroup>
    </SelectContent>
  </Select>
</Field>
```

Use `aria-label` only when a visible label is intentionally unavailable, such as an isolated visual demonstration.

## Values and items

Every item has a stable stored value and a concise visible label. Pass `{ value, label }` items to Select whenever those strings differ. Base UI uses the items collection to render the selected label and the scalar value for form submission.

For a controlled Select, use `value` with `onValueChange`. Use `defaultValue` for an initial uncontrolled value.

```tsx
<Select items={statuses} value={status} onValueChange={setStatus}>
  {/* canonical trigger and content */}
</Select>
```

Do not display internal identifiers such as `archived-forms` or `cst_china` to people. When the data cannot use the common `{ value, label }` shape, use the Base UI conversion interface documented in the external API rather than formatting identifiers ad hoc.

Select is approved for one selected value. Use Combobox for multiple selection. Base UI’s `multiple` capability is not part of the approved Gecko Select interface.

## Groups

Use SelectGroup with SelectLabel when categories make a longer list easier to scan. Use SelectSeparator between distinct groups. Do not group a short list solely for decoration.

## Positioning

SelectContent aligns the selected item with the trigger by default. In this mode, Base UI controls the overlap and may ignore `side` and `align`.

Set `alignItemWithTrigger={false}` when the popup should use ordinary anchored positioning. Then use `side`, `align`, `sideOffset` and `alignOffset` only where the surrounding layout requires a deliberate placement. This changes positioning; it does not change the popup’s default anchor width.

## Within form

Set `name` on Select when its value participates in form submission. Set `required` on Select when the form requires a choice.

```tsx
<form onSubmit={handleSubmit}>
  <Field>
    <FieldLabel htmlFor="fruit">Fruit</FieldLabel>
    <Select items={fruits} name="fruit" required>
      <SelectTrigger id="fruit">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {fruits.map((fruit) => (
            <SelectItem key={fruit.value} value={fruit.value}>
              {fruit.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </Field>
  <Button type="submit">Save selection</Button>
</form>
```

Button retains its intrinsic width. Keep submit enabled and validate on submission.

## Disabled and validation

Put `disabled` on Select so the complete interaction and hidden form input share the state. Add `data-disabled` to Field so its label and supporting content share the treatment. SelectTrigger inherits the disabled state; repeating `disabled` on the trigger is unnecessary.

For an invalid value, add `data-invalid` to Field, `aria-invalid` to SelectTrigger and connect FieldError with `aria-describedby`.

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="fruit">Fruit</FieldLabel>
  <Select items={fruits} name="fruit" required>
    <SelectTrigger id="fruit" aria-invalid aria-describedby="fruit-error">
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    {/* canonical content */}
  </Select>
  <FieldError id="fruit-error">Select a fruit.</FieldError>
</Field>
```

The product decides when validation runs. Invalid styling must always be accompanied by a connected error message.

## Sizing

| Size      | Use                                                    |
| --------- | ------------------------------------------------------ |
| `sm`      | Dense interfaces whose neighbouring controls are small |
| `default` | Default                                                |
| `lg`      | Layouts whose neighbouring controls use the large size |

Use the default unless the surrounding interface establishes another size. SelectTrigger fills its available width by default, matching other form controls.

## Accessibility and keyboard behaviour

- Every product Select has a visible FieldLabel connected to SelectTrigger.
- A placeholder never replaces the accessible name.
- Down Arrow or Enter opens the popup and highlights an option.
- Up and Down Arrow move through enabled options.
- Typeahead highlights a matching option without turning Select into a searchable field.
- Enter selects the highlighted option; Escape closes without changing the value.
- Tab follows the page’s normal focus order.
- Disabled state belongs on Select so every part consistently ignores interaction.
- Do not add custom roles, ARIA state or keyboard handlers; Base UI owns the select pattern.

## Interface

### Select

| Property        | Type                            | Default      | Meaning                                     |
| --------------- | ------------------------------- | ------------ | ------------------------------------------- |
| `items`         | `Item[]`                        | none         | Maps stored values to their visible labels  |
| `name`          | `string`                        | none         | Native form field name                      |
| `defaultValue`  | `Item \| null`                  | empty        | Initial uncontrolled selection              |
| `value`         | `Item \| null`                  | uncontrolled | Controlled selected value                   |
| `onValueChange` | `(value: Item \| null) => void` | none         | Reports selection changes                   |
| `disabled`      | `boolean`                       | `false`      | Makes the complete field unavailable        |
| `required`      | `boolean`                       | `false`      | Requires a value for native form submission |

### SelectTrigger

| Property           | Type                        | Default     | Meaning                                   |
| ------------------ | --------------------------- | ----------- | ----------------------------------------- |
| `size`             | `"sm" \| "default" \| "lg"` | `"default"` | Sets the approved height and text size    |
| `aria-invalid`     | `boolean`                   | `false`     | Exposes the invalid state                 |
| `aria-describedby` | `string`                    | none        | Connects supporting or validation content |

### SelectValue

| Property      | Type                          | Default | Meaning                                 |
| ------------- | ----------------------------- | ------- | --------------------------------------- |
| `placeholder` | `React.ReactNode`             | none    | Hint shown while no value is selected   |
| `children`    | `React.ReactNode \| function` | derived | Custom rendering for the selected value |

### SelectContent

| Property               | Type                                     | Default    | Meaning                                                  |
| ---------------------- | ---------------------------------------- | ---------- | -------------------------------------------------------- |
| `alignItemWithTrigger` | `boolean`                                | `true`     | Aligns the selected item over the trigger value          |
| `side`                 | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Preferred side when ordinary positioning is active       |
| `align`                | `"start" \| "center" \| "end"`           | `"center"` | Cross-axis alignment when ordinary positioning is active |
| `sideOffset`           | `number`                                 | `4`        | Distance from the trigger                                |
| `alignOffset`          | `number`                                 | `0`        | Cross-axis offset                                        |

### SelectItem

| Property   | Type      | Default | Meaning                             |
| ---------- | --------- | ------- | ----------------------------------- |
| `value`    | `Item`    | none    | Stable selected and submitted value |
| `disabled` | `boolean` | `false` | Makes one option unavailable        |

Select parts also accept the relevant Base UI Select properties, except where this contract narrows approved Gecko behaviour.

## API reference

See the [Shadcn Select documentation](https://ui.shadcn.com/docs/components/base/select) and [Base UI Select API](https://base-ui.com/react/components/select) for the underlying API and source composition.

## Styling contract

The library owns trigger and popup styling, widths, spacing, indicators, scrolling, hover, focus, disabled and invalid treatments.

Use `className` only when a deliberate compact layout needs to override the default full width. Request a library change when a legitimate treatment is missing.

Agents must obtain explicit user consent before adding or changing props, states, behaviours, icons, keyboard interactions or styling.

## Agent rules

1. Import Select parts from `@gecko/ui/components/select`.
2. Use Select for one value from a short, fixed list.
3. Put product Select controls in Field with a visible FieldLabel.
4. Pass `items` whenever stored values and visible labels differ.
5. Set `name`, `required` and `disabled` on Select rather than rebuilding form semantics.
6. Use groups only when categories improve scanning.
7. Keep ordinary positioning unless a real layout requires an override.
8. Use Combobox for filtering or multiple selection and Native select where native behaviour is preferred.
9. Do not expose internal stored values as visible labels.
10. Do not copy application-specific implementations from prototype projects.

## Related components

- **Field** — visible labels, descriptions and errors.
- **Combobox** — searchable or multiple selection.
- **Native select** — platform-native selection from a fixed list.
