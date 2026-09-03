# Native select

Import: `@gecko/ui/components/native-select`  
Status: Stable  
Source: `src/components/native-select.tsx`  
Human documentation: `apps/docs/src/pages/native-select/index.tsx`

## Purpose

Native select provides a styled native HTML `select`. Use it when browser-native behaviour, mobile-optimised menus and a straightforward list of text options are preferred.

Use Select for a custom popup or richer option content. Use Combobox when people need to search or filter a longer option list.

Native select follows Shadcn’s native component composition. It does not wrap a Base UI primitive, so Base UI Select properties do not apply.

## Canonical field

Compose Native select with Field and a visible FieldLabel in product forms:

```tsx
<Field>
  <FieldLabel htmlFor="fruit">Fruit</FieldLabel>
  <NativeSelect id="fruit" name="fruit">
    <NativeSelectOption value="">Select a fruit</NativeSelectOption>
    <NativeSelectOption value="apple">Apple</NativeSelectOption>
    <NativeSelectOption value="banana">Banana</NativeSelectOption>
  </NativeSelect>
</Field>
```

The `htmlFor` and `id` values match. The first option is a prompt, not a replacement for the visible label.

## Groups

Use NativeSelectOptGroup when a longer list contains clear categories:

```tsx
<Field>
  <FieldLabel htmlFor="department">Department</FieldLabel>
  <NativeSelect id="department" name="department">
    <NativeSelectOption value="">Select a department</NativeSelectOption>
    <NativeSelectOptGroup label="Engineering">
      <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
      <NativeSelectOption value="backend">Backend</NativeSelectOption>
    </NativeSelectOptGroup>
    <NativeSelectOptGroup label="Sales">
      <NativeSelectOption value="sales">Sales</NativeSelectOption>
    </NativeSelectOptGroup>
  </NativeSelect>
</Field>
```

Every option has a stable submitted value. Every option group has a concise, non-empty label.

## Form behaviour

Native select accepts native select properties including `name`, `value`, `defaultValue`, `onChange`, `required`, `disabled` and `aria-invalid`.

- use `defaultValue` for an uncontrolled initial choice;
- use `value` with `onChange` for controlled state;
- set `name` when the value participates in form submission;
- use a first option with `value=""` when the control needs an unselected prompt;
- preserve native keyboard, mobile menu and form behaviour.

Gecko’s visual `size` property replaces the native numeric `size` attribute. Native multi-row and multiple selection are not approved Native select patterns. Use the relevant Gecko multi-selection component instead.

## Disabled and validation

Use native `disabled` when the complete control is unavailable. Add `data-disabled` to the surrounding Field so its label and supporting content share the state.

For an invalid value, add `data-invalid` to Field, `aria-invalid="true"` to NativeSelect and connect a visible FieldError using `aria-describedby`:

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="fruit">Fruit</FieldLabel>
  <NativeSelect
    id="fruit"
    name="fruit"
    aria-invalid
    aria-describedby="fruit-error"
  >
    <NativeSelectOption value="">Select a fruit</NativeSelectOption>
    <NativeSelectOption value="apple">Apple</NativeSelectOption>
  </NativeSelect>
  <FieldError id="fruit-error">Select a fruit.</FieldError>
</Field>
```

An invalid border alone is not a complete error.

## Sizing

| Size | Use                                                    |
| ---- | ------------------------------------------------------ |
| `sm` | Dense interfaces where neighbouring controls are small |
| `md` | Default                                                |
| `lg` | Layouts whose neighbouring controls use the large size |

Use the default unless the surrounding form establishes another size. Set `className="w-full"` when the select should fill its container; the default width follows its content.

## Interface

| Property                        | Type                   | Default | Meaning                                                |
| ------------------------------- | ---------------------- | ------- | ------------------------------------------------------ |
| `NativeSelect.size`             | `"sm" \| "md" \| "lg"` | `"md"`  | Sets the approved height, padding and text size        |
| `NativeSelect.disabled`         | `boolean`              | `false` | Makes the control unavailable                          |
| `NativeSelect.required`         | `boolean`              | `false` | Requires a non-empty choice for native form submission |
| `NativeSelectOption.value`      | native option value    | —       | Sets the submitted value                               |
| `NativeSelectOption.disabled`   | `boolean`              | `false` | Makes an individual option unavailable                 |
| `NativeSelectOptGroup.label`    | `string`               | —       | Names a related group                                  |
| `NativeSelectOptGroup.disabled` | `boolean`              | `false` | Makes every option in the group unavailable            |

NativeSelect, NativeSelectOption and NativeSelectOptGroup also accept the native properties for their corresponding HTML elements, except the native numeric `size` property.

## Accessibility

- Give every product Native select a visible FieldLabel connected by `htmlFor` and `id`.
- Use `aria-label` only when a visible label is intentionally unavailable, such as an isolated visual demonstration.
- Keep the prompt option distinct from the control’s accessible name.
- Use native `required` and `disabled` semantics.
- Pair invalid styling with a connected FieldError.
- Do not place rich content or interactive controls inside an option.

## Agent rules

1. Import Native select parts from `@gecko/ui/components/native-select`.
2. Use Native select for short, stable lists of text choices that benefit from native browser behaviour.
3. Compose product controls with Field and a visible FieldLabel.
4. Set meaningful `id`, `name` and option `value` properties.
5. Use NativeSelectOptGroup only for genuinely related option categories and always provide its label.
6. Use Select for custom presentation and Combobox for searchable choices.
7. Do not use Native select for multiple selection or native multi-row listboxes.
8. Render the complete invalid Field pattern rather than adding error classes directly.
9. Use Gecko’s visual sizes and states without restyling the inner select in application code.
10. Treat the native HTML interface as authoritative; Base UI Select properties do not apply.

## API reference

- [Shadcn Native Select documentation](https://ui.shadcn.com/docs/components/base/native-select)
- [MDN select reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select)

## Related

- **Field** — visible labels, descriptions and errors.
- **Select** — a custom popup and richer option content.
- **Combobox** — searchable selection from a longer list.
