# Input

Import: `@gecko/ui/components/input`  
Status: Stable  
Source: `src/components/input.tsx`  
Human documentation: `apps/docs/src/pages/input/index.tsx`

## Purpose

Input collects one short, single-line text value. Use it for names, email addresses, identifiers, URLs and other values that are valid as free text.

Use Textarea for multiline content. Use Number field for quantities with stepper controls. Use Search when the value filters content elsewhere. Use Combobox or Select when the value must come from a predefined list.

Input is Gecko’s styled Shadcn wrapper around Base UI Input. Gecko adds approved sizes and visual states. Application code imports Input from Gecko rather than Shadcn or Base UI directly.

## Canonical field

Compose Input with Field and a visible FieldLabel in product forms:

```tsx
<Field>
  <FieldLabel htmlFor="email">Email address</FieldLabel>
  <Input
    id="email"
    name="email"
    type="email"
    autoComplete="email"
    placeholder="name@example.com"
  />
</Field>
```

The `htmlFor` and `id` values match. The placeholder shows an example and does not replace the label.

## Within form

Use FieldSet for a semantically related form section, FieldLegend for its shared name and FieldGroup for the standard layout between fields:

```tsx
<form onSubmit={handleSubmit}>
  <FieldSet aria-describedby="account-details-description">
    <FieldLegend>Account details</FieldLegend>
    <FieldDescription id="account-details-description">
      Used to identify and contact the account owner.
    </FieldDescription>
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="account-name">Name</FieldLabel>
        <Input id="account-name" name="name" autoComplete="name" />
      </Field>
      <Field>
        <FieldLabel htmlFor="account-email">Email address</FieldLabel>
        <Input
          id="account-email"
          name="email"
          type="email"
          autoComplete="email"
        />
      </Field>
    </FieldGroup>
    <Button type="submit">Save details</Button>
  </FieldSet>
</form>
```

Button retains its intrinsic width inside FieldSet. Set `className="w-full"` only when a deliberately full-width action is required.

Use one standalone Field without FieldSet when the controls do not form a related group.

## Native input contract

Input accepts native input properties. Choose `type`, `name`, `autoComplete` and `inputMode` for the value being collected so browsers, mobile keyboards and autofill can assist correctly.

Use native React input state:

- use `defaultValue` for an uncontrolled initial value;
- use `value` with `onChange` for a controlled value;
- allow paste, autofill and password-manager behaviour;
- keep validation and persistence in the product.

The Gecko type intentionally follows Shadcn’s native input interface. Base UI explains the underlying primitive, but Base-only extensions such as `onValueChange`, function-valued `className` and `render` are not part of Gecko Input’s public TypeScript contract.

## Disabled and read-only

Use `disabled` when the control and its value are unavailable. Add `data-disabled` to the surrounding Field so its label and supporting content share the disabled treatment.

```tsx
<Field data-disabled>
  <FieldLabel htmlFor="workspace">Workspace</FieldLabel>
  <Input id="workspace" name="workspace" disabled />
</Field>
```

Use `readOnly` when a value remains available but cannot be edited. Read-only Input remains focusable, selectable, copyable and included in form submission. Do not set `data-disabled` or remove it from the tab order.

```tsx
<Field>
  <FieldLabel htmlFor="account-id">Account ID</FieldLabel>
  <Input id="account-id" name="accountId" readOnly value={accountId} />
</Field>
```

## Required and validation

Set native `required` on Input. Gecko’s associated FieldLabel displays the required marker.

The product decides when validation runs. For an invalid value:

- add `data-invalid` to Field for the shared visual state;
- add `aria-invalid="true"` to Input;
- connect Input to FieldError using `aria-describedby`;
- focus the first invalid control after submission.

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="email">Email address</FieldLabel>
  <Input
    id="email"
    name="email"
    type="email"
    autoComplete="email"
    aria-invalid
    aria-describedby="email-error"
  />
  <FieldError id="email-error">Enter a valid email address.</FieldError>
</Field>
```

An invalid border is not the complete error. Keep the corrective message visible and programmatically associated.

## Sizing

| Size | Use                                                    |
| ---- | ------------------------------------------------------ |
| `sm` | Dense interfaces where neighbouring controls are small |
| `md` | Default                                                |
| `lg` | Layouts whose neighbouring controls use the large size |

Use the default unless the surrounding form establishes another size. Keep controls in the same form visually consistent.

## Input Group

Use InputGroup when an icon, text or action belongs inside the input boundary. Use InputGroupInput rather than positioning content over Input.

```tsx
<InputGroup>
  <InputGroupAddon align="inline-start">
    <Search aria-hidden="true" />
  </InputGroupAddon>
  <InputGroupInput aria-label="Search" type="search" />
</InputGroup>
```

Every icon-only InputGroupButton has an accessible name. Decorative icons are hidden from assistive technology.

## Interface

| Property   | Type                   | Default | Meaning                                                                   |
| ---------- | ---------------------- | ------- | ------------------------------------------------------------------------- |
| `size`     | `"sm" \| "md" \| "lg"` | `"md"`  | Sets the approved height, padding and text size                           |
| `readOnly` | `boolean`              | `false` | Prevents editing while retaining focus, selection, copying and submission |

Input also accepts native input properties except native numeric `size`, which is replaced by Gecko’s visual size property.

## Accessibility

- Give every product Input a visible FieldLabel connected by `htmlFor` and `id`.
- Use `aria-label` only when a visible label is intentionally unavailable, such as an isolated visual demonstration or a search control whose surrounding interface supplies the visible context.
- Use the correct native input type and autocomplete token.
- Preserve native keyboard, selection, paste and autofill behaviour.
- Keep read-only values focusable and selectable.
- Pair invalid styling with a connected FieldError.
- Use native `disabled`, `readOnly` and `required` semantics rather than recreating them with ARIA.

## Agent rules

1. Import Input from `@gecko/ui/components/input`.
2. Compose product inputs with Field and a visible FieldLabel.
3. Set meaningful `id`, `name`, `type` and `autoComplete` properties for the value.
4. Use placeholders only for examples or format hints.
5. Use native `onChange` for controlled state; the product owns value state, validation and persistence.
6. Keep read-only Input focusable, selectable and copyable.
7. Render the complete invalid Field pattern rather than adding error classes directly.
8. Use InputGroup for content inside the input boundary.
9. Use Gecko’s size property and visual states without restyling the component in application code.
10. Treat the public Gecko type as authoritative; consult Base UI for underlying behaviour rather than assuming every Base-only property is exposed.

## API reference

- [Base UI Input API](https://base-ui.com/react/components/input#api-reference)
- [Shadcn Input documentation](https://ui.shadcn.com/docs/components/base/input)

## Related

- **Field** — labels, descriptions, errors and fieldset composition.
- **Input Group** — icons, text or actions inside the input boundary.
- **Textarea field** — multiline free text.
- **Search** — filtering content elsewhere.
- **Number field** — numeric quantities.
- **File field** and **Attachment** — approved file-selection patterns.
