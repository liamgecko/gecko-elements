# Date field

Import: `@gecko/ui/components/date-input`  
Export: `DateInput`  
Status: Stable  
Source: `src/components/date-input.tsx`  
Human documentation: `apps/docs/src/pages/date-input/index.tsx`

## Purpose

Date field collects a date through separate day, month and year inputs. It owns segment order, parsing, focus movement, padding, sizes, disabled state and accessible segment names behind one interface.

Use Date field for dates that are easier to type than browse, especially date of birth. Use Date picker for general date selection, particularly future dates. Use Calendar only when the month view should remain visible.

The product name is Date field. The code export remains `DateInput`.

## Canonical usage

Use a controlled value, a visible FieldLabel and an accessible group name:

```tsx
import * as React from "react"

import { DateInput } from "@gecko/ui/components/date-input"
import { Field, FieldLabel } from "@gecko/ui/components/field"

const [dateOfBirth, setDateOfBirth] = React.useState<Date | undefined>()

<Field>
  <FieldLabel htmlFor="date-of-birth">Date of birth</FieldLabel>
  <DateInput
    id="date-of-birth"
    value={dateOfBirth}
    onChange={setDateOfBirth}
    aria-label="Date of birth"
  />
</Field>
```

The `id` connects FieldLabel to the first visible segment. The `aria-label` names the group and prefixes the accessible name of its day, month and year inputs.

## Within form

DateInput reports one controlled Date value rather than a named native form value. Submit that state with the rest of the form:

```tsx
<form onSubmit={(event) => handleSubmit(event, { dateOfBirth })}>
  <Field>
    <FieldLabel htmlFor="date-of-birth">Date of birth</FieldLabel>
    <DateInput
      id="date-of-birth"
      value={dateOfBirth}
      onChange={setDateOfBirth}
      aria-label="Date of birth"
    />
  </Field>
  <Button type="submit">Save date of birth</Button>
</form>
```

Button retains its intrinsic width. Keep submit enabled and validate the controlled date on submission.

## Segment order and year length

The canonical configuration is day, month, then a four-digit year. These are the defaults; omit `monthFirst` and `yearDigits` in application code.

Set `monthFirst` only where the product locale requires month-day-year order.

Set `yearDigits={2}` only when the surrounding context makes the century unambiguous. Two-digit years map `00`–`30` to 2000–2030 and `31`–`99` to 1931–1999. Obtain explicit user consent before changing this mapping, adding another date order or adding another year length.

## Value and validation

`onChange` runs after every segment edit. It receives a local `Date` when all segments form a real calendar date and `undefined` while the entry is empty, incomplete or invalid.

Partial and invalid text remains visible so the product can validate it without the field rewriting or clearing the person’s input. For example, the component preserves `35` as an invalid day rather than changing it to `31`.

When a controlled parent accepts the value returned by `onChange`, the component preserves the active segment draft. A different value supplied externally replaces all three segments.

The product owns when validation runs and when an error is shown. Do not mark the field invalid on every keystroke. On validation, put `data-invalid` on Field and connect FieldError to DateInput:

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="date-of-birth">Date of birth</FieldLabel>
  <DateInput
    id="date-of-birth"
    value={dateOfBirth}
    onChange={setDateOfBirth}
    aria-label="Date of birth"
    aria-invalid
    aria-describedby="date-of-birth-error"
  />
  <FieldError id="date-of-birth-error">Enter a complete valid date.</FieldError>
</Field>
```

DateInput reports state through `onChange`; it does not add a named native form value. Product forms should submit their controlled date state.

## Focus and keyboard behaviour

- Tab moves through day, month and year as three native inputs.
- A complete valid day or month moves focus to the next segment.
- Completing the year keeps focus in the year input.
- A single-digit day or month gains a leading zero on blur.
- Each segment accepts numeric input and retains standard editing, selection and paste behaviour.
- Disabled segments leave the tab order through native `disabled` behaviour.

Application code must not add custom focus movement or keyboard handlers.

## Sizes

| Value  | Use                                               |
| ------ | ------------------------------------------------- |
| `"sm"` | Compact forms where surrounding fields are small  |
| `"md"` | Standard forms; the default                       |
| `"lg"` | Forms where surrounding fields use the large size |

Use one field size consistently within a form. Obtain explicit user consent before adding another size.

## Interface

| Property           | Type                                | Default     | Meaning                                                          |
| ------------------ | ----------------------------------- | ----------- | ---------------------------------------------------------------- |
| `value`            | `Date \| undefined`                 | `undefined` | Controlled complete date                                         |
| `onChange`         | `(date: Date \| undefined) => void` | none        | Reports the parsed date or an incomplete/invalid state           |
| `yearDigits`       | `2 \| 4`                            | `4`         | Sets the visible and parsed year length                          |
| `monthFirst`       | `boolean`                           | `false`     | Places month before day                                          |
| `size`             | `"sm" \| "md" \| "lg"`              | `"md"`      | Matches the surrounding Input size                               |
| `disabled`         | `boolean`                           | `false`     | Disables all segments                                            |
| `id`               | `string`                            | generated   | Connects FieldLabel to the first visible segment                 |
| `aria-label`       | `string`                            | none        | Names the group and its segments                                 |
| `aria-invalid`     | `boolean \| "true" \| "false"`      | `false`     | Exposes product-controlled invalid state on every segment        |
| `aria-describedby` | `string`                            | none        | Connects supporting or error text to the group and every segment |

## Styling contract

The library owns segment widths, spacing, borders, radius, focus, disabled and invalid treatments. Use `className` only for documented parent-layout integration such as placement.

Request a library change when a legitimate treatment is missing. Agents must obtain explicit user consent before adding or changing props, sizes, parsing rules, date order, focus behaviour, callbacks, styling or visual treatments.

## Related components

- **Field** — visible label, description, disabled treatment and validation message.
- **Date picker** — general single-date or range selection.
- **Calendar** — an inline month view.
