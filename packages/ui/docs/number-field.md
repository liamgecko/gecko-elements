# Number field

Import: `@gecko/ui/components/number-field`  
Status: Stable  
Source: `src/components/number-field.tsx`  
Human documentation: `apps/docs/src/pages/number-field/index.tsx`

## Purpose

Number field is a Gecko-styled wrapper around Base UI Number Field. Use it for quantities and amounts that benefit from direct entry and increment or decrement controls.

Do not use it for values that only look numeric, such as telephone numbers, reference numbers, card numbers, or postcodes. Use Input field for those values.

## Canonical field

Compose Number field with Field and a visible FieldLabel in product forms:

```tsx
<Field>
  <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
  <NumberField
    id="quantity"
    name="quantity"
    defaultValue={1}
    min={1}
    max={10}
  />
</Field>
```

The `htmlFor` and `id` values match. The `name` property supplies the submitted form key.

## Within form

Use FieldSet and FieldGroup when the Number field belongs to a larger form section:

```tsx
<form onSubmit={handleSubmit}>
  <FieldSet>
    <FieldLegend>Booking details</FieldLegend>
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="tickets">Tickets</FieldLabel>
        <FieldContent>
          <NumberField
            id="tickets"
            name="tickets"
            defaultValue={2}
            min={1}
            max={10}
            required
          />
          <FieldDescription>Choose between 1 and 10 tickets.</FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
    <Button type="submit">Save booking</Button>
  </FieldSet>
</form>
```

Keep the submit button enabled until submission begins. Let the form validate the submitted value.

## Value and stepping

Use `defaultValue` for uncontrolled state. Use `value` with `onValueChange` for controlled state. Use `onValueCommitted` when work should wait until typing is committed or a stepper interaction ends.

The default step is `1`. Set `min` and `max` whenever the accepted range is known. Base UI supports modified keyboard stepping and additional step behaviour; consult its API before exposing advanced behaviour in product code.

## Formatting

Use `format` for display formatting and `locale` when the product must override the runtime locale:

```tsx
<NumberField
  aria-label="Amount"
  defaultValue={1250}
  locale="en-GB"
  format={{ style: "currency", currency: "GBP" }}
/>
```

The stored value remains numeric. Do not use formatting to represent a non-quantity identifier.

## Disabled and validation

Use `disabled` when the complete control is unavailable. Add `data-disabled` to the surrounding Field so its label and supporting content share the state.

For an invalid value, add `data-invalid` to Field, `aria-invalid="true"` to NumberField, and connect a visible FieldError using `aria-describedby`:

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
  <NumberField
    id="quantity"
    name="quantity"
    defaultValue={12}
    min={1}
    max={10}
    aria-invalid
    aria-describedby="quantity-error"
  />
  <FieldError id="quantity-error">Choose between 1 and 10.</FieldError>
</Field>
```

An invalid border alone is not a complete error.

## Sizing

| Size | Use                                                    |
| ---- | ------------------------------------------------------ |
| `sm` | Dense interfaces where neighbouring controls are small |
| `md` | Default                                                |
| `lg` | Layouts whose neighbouring controls use the large size |

Use the default unless the surrounding form establishes another size.

## Interface

| Property             | Type                       | Default            | Meaning                                   |
| -------------------- | -------------------------- | ------------------ | ----------------------------------------- |
| `size`               | `"sm" \| "md" \| "lg"`     | `"md"`             | Sets the approved control dimensions      |
| `defaultValue`       | `number`                   | —                  | Sets the initial uncontrolled value       |
| `value`              | `number \| null`           | —                  | Controls the current numeric value        |
| `onValueChange`      | `(value, details) => void` | —                  | Runs when the numeric value changes       |
| `onValueCommitted`   | `(value, details) => void` | —                  | Runs when the current interaction commits |
| `min`                | `number`                   | —                  | Sets the minimum valid value              |
| `max`                | `number`                   | —                  | Sets the maximum valid value              |
| `step`               | `number \| "any"`          | `1`                | Sets the standard step amount             |
| `format`             | `Intl.NumberFormatOptions` | —                  | Formats the displayed value               |
| `locale`             | `Intl.LocalesArgument`     | Runtime locale     | Sets the parsing and formatting locale    |
| `aria-label`         | `string`                   | —                  | Names an input without a visible label    |
| `aria-describedby`   | `string`                   | —                  | Connects supporting or validation text    |
| `aria-invalid`       | `boolean`                  | `false`            | Marks the input as invalid                |
| `decrementAriaLabel` | `string`                   | `"Decrease value"` | Names the decrement button                |
| `incrementAriaLabel` | `string`                   | `"Increase value"` | Names the increment button                |

NumberField also accepts the supported Base UI Number Field Root properties. Treat the Gecko component type as authoritative.

## Accessibility

- Give every product Number field a visible FieldLabel connected by `htmlFor` and `id`.
- Use `aria-label` only when a visible label is intentionally unavailable, such as an isolated visual demonstration.
- Connect help or error text with `aria-describedby`.
- Use custom stepper labels when the generic value wording is unclear in context.
- Preserve typing, arrow-key, Home, End, and stepper-button behaviour supplied by Base UI.
- Use native `required`, `disabled`, and form submission semantics.

## Agent rules

1. Import NumberField from `@gecko/ui/components/number-field`.
2. Use Number field only for quantities or amounts that benefit from stepping.
3. Compose product controls with Field and a visible FieldLabel.
4. Set meaningful `id` and `name` properties when the value participates in a form.
5. Set `min`, `max`, and `step` when product constraints are known.
6. Render the complete invalid Field pattern rather than adding error classes directly.
7. Use Gecko’s visual sizes and states without restyling the internal Base UI parts.
8. Extend behaviour through the Gecko API. Consult Base UI to understand the underlying contract before proposing an extension.

## API reference

- [Base UI Number Field API](https://base-ui.com/react/components/number-field#api-reference)

## Related

- **Field** — visible labels, descriptions, errors, and form grouping.
- **Input field** — free-form or non-quantity values.
