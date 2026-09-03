# Telephone field

Import: `@gecko/ui/components/telephone-field`  
Status: Stable  
Source: `src/components/telephone-field.tsx`  
Human documentation: `apps/docs/src/pages/telephone-field/index.tsx`

## Purpose

Telephone field collects and formats an international telephone number. Use it when country context is needed to interpret, format, or validate a number. Use Input for values that are not telephone numbers.

Telephone field is a Gecko-owned composition built on `react-phone-number-input`. The dependency uses `libphonenumber-js` for country metadata, parsing, and E.164 formatting. Gecko owns the visible Input, searchable Dropdown menu, bundled flags, sizing, and states.

Applications import TelephoneField rather than importing `react-phone-number-input` or rebuilding its country selector.

## Composition

```text
TelephoneField
├── DropdownMenu → country selector
└── Input → telephone number
```

The component owns this composition. Consumers do not supply its subcomponents.

## Canonical field

Use Field to provide a visible label and supporting content:

```tsx
<Field>
  <FieldLabel htmlFor="contact-telephone">Telephone number</FieldLabel>
  <TelephoneField
    id="contact-telephone"
    name="telephone"
    autoComplete="tel"
    defaultCountry="GB"
    aria-describedby="contact-telephone-description"
  />
  <FieldDescription id="contact-telephone-description">
    Include a number where the contact can be reached.
  </FieldDescription>
</Field>
```

Use `aria-label` only for an isolated example where a visible label would add noise. Product forms use FieldLabel.

## Value contract

The controlled value may be an E.164 number or an initial external string accepted by the dependency. `onChange` returns an E.164 number while a number is present and an empty string when the control is cleared.

```tsx
const [telephone, setTelephone] = React.useState("")

<TelephoneField value={telephone} onChange={setTelephone} />
```

Do not store the visually formatted input text as the canonical value. Validate whether the returned number satisfies the product requirement before submission; a partially entered value can still be returned while editing.

## Country selection

Set `defaultCountry` only when the interface has a reliable regional default. Leave it unset when no assumption is justified; the International option remains available.

Use `countries` to deliberately limit the selectable countries. Use `onCountryChange` when application behaviour needs the selected country independently of the telephone value.

Use `international` when the calling code must remain visible. `countryCallingCodeEditable` controls whether that prefix can be edited in international mode.

The country list is searchable. Country names, calling codes, keyboard behaviour, focus, disabled state, and read-only state are owned by TelephoneField.

## Within form

Set `name` for form submission and use telephone autocomplete:

```tsx
<form onSubmit={handleSubmit}>
  <Field>
    <FieldLabel htmlFor="contact-telephone">Telephone number</FieldLabel>
    <TelephoneField
      id="contact-telephone"
      name="telephone"
      autoComplete="tel"
      defaultCountry="GB"
      required
    />
  </Field>
  <Button type="submit">Save contact details</Button>
</form>
```

Button retains its intrinsic width. Keep the submit action enabled and present validation after submission.

## Size

```tsx
<TelephoneField size="sm|md|lg" />
```

Use medium by default. Match another size only when the surrounding controls establish it. Do not recreate field sizes with application classes.

## Disabled, read-only, and validation

`disabled` prevents interaction with both the country selector and telephone input. `readOnly` prevents their values changing. Apply `data-disabled` to the parent Field so its label and description share the disabled treatment.

For validation, put `data-invalid` on Field and `aria-invalid` on TelephoneField. Connect FieldError using `aria-describedby`:

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="telephone">Telephone number</FieldLabel>
  <TelephoneField
    id="telephone"
    aria-invalid
    aria-describedby="telephone-error"
  />
  <FieldError id="telephone-error">
    Enter a valid telephone number for the selected country.
  </FieldError>
</Field>
```

## Interface

| Property                     | Type                                | Default | Meaning                                                    |
| ---------------------------- | ----------------------------------- | ------- | ---------------------------------------------------------- |
| `size`                       | `"sm" \| "md" \| "lg"`              | `"md"`  | Sets the country selector and telephone input size         |
| `value`                      | `E164Number \| string`              | —       | Controls the current telephone value                       |
| `onChange`                   | `(value: E164Number \| "") => void` | —       | Reports an E.164 number or an empty value                  |
| `defaultCountry`             | `Country`                           | —       | Sets the initial country for national numbers              |
| `countries`                  | `Country[]`                         | —       | Limits the selectable countries                            |
| `international`              | `boolean`                           | `false` | Uses international input formatting                        |
| `countryCallingCodeEditable` | `boolean`                           | —       | Controls editing of the calling code in international mode |
| `onCountryChange`            | `(country?: Country) => void`       | —       | Reports the selected country                               |
| `limitMaxLength`             | `boolean`                           | `false` | Limits input to the selected country’s maximum length      |
| `disabled`                   | `boolean`                           | `false` | Prevents interaction                                       |
| `readOnly`                   | `boolean`                           | `false` | Prevents the telephone number and country changing         |
| `name`                       | `string`                            | —       | Sets the submitted form-field name                         |
| `autoComplete`               | `string`                            | `"tel"` | Sets browser autocomplete behaviour                        |
| `aria-invalid`               | `boolean \| "true" \| "false"`      | `false` | Exposes validation state to assistive technology           |
| `className`                  | `string`                            | —       | Extends the complete field container                       |

TelephoneField also accepts applicable native input properties and the supported `react-phone-number-input` properties. Prefer the documented Gecko interface unless a product requirement needs a lower-level formatting option.

## Accessibility

- Give the field a visible FieldLabel in product forms.
- Preserve the library-owned label on the country selector.
- Connect descriptions and errors with `aria-describedby`.
- Put `aria-invalid` on TelephoneField and `data-invalid` on Field.
- Use `autoComplete="tel"` for telephone fields in forms.
- Do not use placeholder text as the only label.

## Styling contract

The library owns the combined border, flag treatment, dropdown, focus, hover, disabled, invalid, and size treatments. Bundled flags avoid a runtime image service.

Use `className` only to position the complete field in its parent. Request a library change when a legitimate treatment is missing.

## Agent rules

1. Import TelephoneField from `@gecko/ui/components/telephone-field`.
2. Do not import `react-phone-number-input` directly in application code.
3. Use Field and FieldLabel in product forms.
4. Set `name` and `autoComplete="tel"` when the value is submitted.
5. Treat the changed value as E.164 or an empty string; do not persist display formatting as the canonical value.
6. Set a default country only when a reliable regional default exists.
7. Keep the International option available unless the product explicitly limits countries.
8. Use the controlled value interface when application state owns the number.
9. Validate product-specific number requirements before submission.
10. Preserve the searchable country selector, bundled flags, focus behaviour, and Gecko styling.
11. Do not recreate sizes or states with application classes.

## API reference

See the [`react-phone-number-input` documentation](https://catamphetamine.gitlab.io/react-phone-number-input/) for the underlying formatting and country-selection interface.

## Related

- **Field** — visible labels, supporting text, validation, and form layout.
- **Input field** — values that are not telephone numbers.
- **Dropdown menu** — the searchable country-selection surface.
