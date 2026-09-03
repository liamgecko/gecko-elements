# Field

Import: `@gecko/ui/components/field`  
Status: Stable  
Source: `src/components/field.tsx`  
Human documentation: `apps/docs/src/pages/field/index.tsx`

## Purpose

Field composes visible labels, form controls, supporting descriptions and validation errors with Gecko’s approved spacing and states.

Use Field for one control. Use FieldGroup to arrange adjacent fields. Use FieldSet and FieldLegend when several controls form one semantically related group.

Field is based on Shadcn’s native-element composition. It does not use `@base-ui/react/field`; Base UI Field properties and automatic association behaviour do not apply.

## Import

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@gecko/ui/components/field";
```

Import the form control separately.

## Composition

### Field

One labelled control with supporting text and validation:

```text
Field
├── FieldLabel
├── Input
├── FieldDescription
└── FieldError
```

```tsx
<Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input
    id="email"
    name="email"
    type="email"
    autoComplete="email"
    aria-describedby="email-description"
  />
  <FieldDescription id="email-description">
    We’ll send account notifications to this address.
  </FieldDescription>
</Field>
```

Do not wrap one standalone Field in FieldGroup and FieldSet.

### FieldGroup

FieldGroup applies the standard layout and spacing to adjacent fields:

```text
FieldGroup
├── Field
├── FieldSeparator
└── Field
```

```tsx
<FieldGroup>
  <Field>
    <FieldLabel htmlFor="first-name">First name</FieldLabel>
    <Input id="first-name" name="firstName" autoComplete="given-name" />
  </Field>
  <Field>
    <FieldLabel htmlFor="last-name">Last name</FieldLabel>
    <Input id="last-name" name="lastName" autoComplete="family-name" />
  </Field>
</FieldGroup>
```

FieldGroup is a layout container. It does not provide a shared accessible name or replace FieldSet.

### FieldSet

FieldSet provides native fieldset semantics for controls that answer one related question or belong to one form section:

```text
FieldSet
├── FieldLegend
├── FieldDescription
└── FieldGroup
    ├── Field
    └── Field
```

```tsx
<FieldSet aria-describedby="profile-description">
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription id="profile-description">
    This information appears on your public profile.
  </FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="display-name">Display name</FieldLabel>
      <Input id="display-name" name="displayName" />
    </Field>
    <Field>
      <FieldLabel htmlFor="role">Role</FieldLabel>
      <Input id="role" name="role" />
    </Field>
  </FieldGroup>
</FieldSet>
```

FieldLegend is the shared accessible name. When FieldDescription explains the complete set, give it an ID and reference it from FieldSet with `aria-describedby`.

## Labels and descriptions

Every form control has a visible FieldLabel connected with matching `htmlFor` and `id` values. A placeholder is an example or format hint and never replaces the label.

FieldDescription is not connected automatically. Give it an ID and include that ID in the control’s `aria-describedby` value.

When a description remains useful during validation, render both description and error and include both IDs:

```tsx
<Input aria-describedby="password-description password-error" />
```

Use FieldTitle only for visible supporting content that does not label a control. It has label styling but renders a `div` and creates no accessible association. Prefer FieldLabel whenever the text names an interactive control.

## FieldContent

FieldContent keeps a control-owned label, description and error together in horizontal or compound layouts. Use it when the control already owns its accessible label, including Gecko Checkbox and CheckboxGroup compositions.

```tsx
<Field orientation="horizontal" data-invalid>
  <FieldContent>
    <Checkbox
      id="terms"
      name="terms"
      required
      aria-invalid
      aria-describedby="terms-error"
      label="Accept the terms and conditions"
    />
    <FieldError id="terms-error">
      Accept the terms and conditions to continue.
    </FieldError>
  </FieldContent>
</Field>
```

Do not add FieldLabel when a component’s own documented `label` property already supplies its visible and accessible label.

## Orientation

Field supports three layout orientations:

| Orientation  | Use                                                                          |
| ------------ | ---------------------------------------------------------------------------- |
| `vertical`   | Standard label, control and supporting text stack; default                   |
| `horizontal` | Compact rows where the control and its content sit beside one another        |
| `responsive` | Vertical at narrow container widths and horizontal from the FieldGroup query |

Responsive orientation depends on the container established by FieldGroup. Choose orientation from the owning component’s documented composition rather than restyling Field.

## Disabled, read-only and required fields

For a disabled field, set native `disabled` on the control and `data-disabled` on Field. The control owns unavailable behaviour; Field applies the shared label treatment.

```tsx
<Field data-disabled>
  <FieldLabel htmlFor="company-name">Company name</FieldLabel>
  <Input id="company-name" name="companyName" disabled />
</Field>
```

For a read-only value, set `readOnly` on controls that support it. Do not use `data-disabled`, because read-only values remain available for focus, selection and copying.

Set native `required` on the control. Gecko Label displays the required marker automatically when its `htmlFor` points to that control. The product still validates on submission and provides a useful error when the value is missing.

## Validation

The product owns validation rules and when validation runs. Validate on submission, focus the first invalid control and then render the complete invalid state:

- `data-invalid` on Field for the shared visual state;
- `aria-invalid="true"` on the control;
- `aria-describedby` on the control referencing FieldError;
- FieldError with the referenced ID immediately after the control or inside FieldContent.

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="tax-id">Tax ID</FieldLabel>
  <Input
    id="tax-id"
    name="taxId"
    aria-invalid
    aria-describedby="tax-id-error"
  />
  <FieldError id="tax-id-error">
    Enter a tax ID in the format 00-0000000.
  </FieldError>
</Field>
```

FieldError uses `role="alert"`; render it only when the error should be announced. Do not mount an empty FieldError or use it for ordinary help text.

Pass validation issues to `errors` when several messages may apply. FieldError removes duplicate messages, renders one message directly and renders several as a list.

```tsx
<FieldError id="password-error" errors={errors.password} />
```

Error messages state how to correct the value. Avoid “Invalid value”, “Something went wrong”, blame and unnecessary “please”.

## FieldSeparator

FieldSeparator visually divides parts of a FieldGroup. Pass children only when a short label such as “Or” explains the relationship between the adjoining sections.

It does not create semantic grouping. Use another FieldSet and FieldLegend when the following controls form a separate named group.

## Accessibility

- Every control has a visible label unless its own component contract explicitly provides one.
- Label and control use matching `htmlFor` and `id` values.
- Descriptions and errors are connected manually with `aria-describedby`.
- Native `disabled`, `readOnly`, `required`, `type`, `name` and `autoComplete` properties belong on the control.
- Invalid controls expose `aria-invalid`; Field’s `data-invalid` is visual only.
- FieldSet and FieldLegend provide native grouping and a shared accessible name.
- FieldGroup provides layout only.
- The product focuses the first invalid control after unsuccessful submission.
- FieldError announces newly rendered errors through its alert role.

## Interface

### Parts

| Part               | Underlying element      | Meaning                                                    |
| ------------------ | ----------------------- | ---------------------------------------------------------- |
| `Field`            | `div` with `group` role | One form-control composition                               |
| `FieldContent`     | `div`                   | Groups compound or horizontally arranged field content     |
| `FieldLabel`       | `label`                 | Visible label associated through `htmlFor`                 |
| `FieldTitle`       | `div`                   | Visual label-style title with no control association       |
| `FieldDescription` | `p`                     | Supporting text connected manually with `aria-describedby` |
| `FieldError`       | `div` with `alert` role | Visible and announced validation message                   |
| `FieldGroup`       | `div`                   | Layout and container-query context for adjacent fields     |
| `FieldSet`         | `fieldset`              | Native semantic grouping                                   |
| `FieldLegend`      | `legend`                | Shared name for FieldSet                                   |
| `FieldSeparator`   | `div`                   | Visual division inside FieldGroup                          |

Every part accepts the native properties of its underlying element.

### Behaviour properties

| Component     | Property      | Type                                         | Default      | Meaning                                          |
| ------------- | ------------- | -------------------------------------------- | ------------ | ------------------------------------------------ |
| `Field`       | `orientation` | `"vertical" \| "horizontal" \| "responsive"` | `"vertical"` | Approved field layout                            |
| `FieldLegend` | `variant`     | `"legend" \| "label"`                        | `"legend"`   | Standard or nested-fieldset visual treatment     |
| `FieldError`  | `errors`      | `Array<{ message?: string } \| undefined>`   | none         | Validation issues used when children are omitted |

## Styling contract

The library owns field spacing, orientation, label and description typography, disabled and invalid treatments, error presentation, grouping and separator styling.

Use `className` only to place the complete Field, FieldGroup or FieldSet within its parent layout. Do not override internal spacing, typography, error chrome or state styling in application code. Request a library change when a legitimate treatment is missing.

## Agent rules

- Start with one Field for one control.
- Add FieldGroup only for adjacent-field layout.
- Add FieldSet and FieldLegend when controls require a shared semantic name.
- Connect every visible label, description and error explicitly.
- Preserve native form properties on the control.
- Validate on submission and focus the first invalid control.
- Keep form state, validation schemas and submission behaviour in the product.
- Do not import or apply Base UI Field APIs to this component.
- Do not invent orientations, state props, spacing or error treatments.
- Use the trusted docs application only for visual examples; prototype projects are not component guidance.

## Relationship to Shadcn

Gecko retains Shadcn’s native Field, FieldGroup and FieldSet composition. Gecko adds its approved density, compound-control spacing, disabled-label treatment and enhanced FieldError presentation.

This module does not wrap Base UI Field. Base UI’s Root, Control, Validity, validation and automatic association APIs are a different component model and do not extend Gecko Field.

## Related components

- **Label** — visible control name used by FieldLabel.
- **Input field** — single-line form control.
- **Checkbox** — owns its integrated option label and can use FieldContent for validation.
- **Radio group** — one choice from a related set.
- **Alert** — page- or section-level status rather than one field error.
