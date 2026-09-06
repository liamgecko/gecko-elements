# Checkbox

Import: `@gecko/ui/components/checkbox`  
Status: Stable  
Source: `src/components/checkbox.tsx`  
Human documentation: `apps/docs/src/pages/checkbox/index.tsx`

## Purpose

Checkbox lets someone include or exclude an option. Use it for one independent boolean choice or for several related choices where more than one may be selected.

Use Radio group when exactly one option is allowed. Use Switch when changing the value takes effect immediately rather than on form submission.

## Canonical single Checkbox

Use `label` for the visible and accessible option name. Add `description` only when the choice needs supporting context.

```tsx
<Checkbox
  name="product-updates"
  label="Send me product updates"
  description="Receive occasional product news by email."
/>
```

Checkbox generates an ID when one is not supplied and connects its label and description automatically. Supply an explicit `id` when another element must refer to the control, including an external validation message.

Consent and marketing choices start unchecked. Use `defaultChecked` only when the initial selection represents an existing preference or a safe product default.

## Canonical CheckboxGroup

Use CheckboxGroup when related options form one multiple-choice value. It owns the shared array state, legend, description, orientation, disabled state and group semantics.

```tsx
const [channels, setChannels] = useState<string[]>(["email"])

<CheckboxGroup
  label="Communication channels"
  description="Select every channel your team can use."
  value={channels}
  onValueChange={setChannels}
>
  <Checkbox value="email" label="Email" />
  <Checkbox value="sms" label="SMS" />
  <Checkbox value="whatsapp" label="WhatsApp" />
</CheckboxGroup>
```

Every child Checkbox has a unique non-empty `value`. The group returns selected values in `value` and `onValueChange`.

CheckboxGroup is the behavioural interface for one multiple-choice question. FieldGroup is a generic layout container for separate fields and does not replace CheckboxGroup.

## Within form

Give an independent Checkbox a submitted name and place the form action after the field content:

```tsx
<form onSubmit={handleSubmit}>
  <FieldGroup>
    <Checkbox
      id="product-updates"
      name="productUpdates"
      label="Send me product updates"
    />
  </FieldGroup>
  <Button type="submit">Save preferences</Button>
</form>
```

Button retains its intrinsic width. Keep submit enabled and validate required choices on submission.

## Controlled and uncontrolled state

Use `checked` with `onCheckedChange` to control an independent Checkbox. Use `defaultChecked` for its initial uncontrolled state.

Use `value` with `onValueChange` to control CheckboxGroup. Use `defaultValue` for its initial uncontrolled state.

The product owns persisted values and submission. Checkbox and CheckboxGroup own interaction, semantics and presentation.

For native form submission, give an independent Checkbox a `name`. Give every option in a CheckboxGroup the same `name` and its own `value`; checked options submit under that shared name.

## Parent and indeterminate state

Use a parent Checkbox when one option selects or clears all children. Pass every child value to CheckboxGroup through `allValues`, and add `parent` to the parent Checkbox.

```tsx
const channelValues = ["email", "sms", "whatsapp"]
const [channels, setChannels] = useState<string[]>(["email"])

<CheckboxGroup
  label="Communication channels"
  value={channels}
  onValueChange={setChannels}
  allValues={channelValues}
>
  <Checkbox parent label="Select all channels" />
  <Checkbox value="email" label="Email" />
  <Checkbox value="sms" label="SMS" />
  <Checkbox value="whatsapp" label="WhatsApp" />
</CheckboxGroup>
```

CheckboxGroup derives the parent’s checked and indeterminate states. Application code does not calculate them or set `indeterminate` manually for this pattern.

Use the standalone `indeterminate` prop only when the mixed state comes from a source other than CheckboxGroup children.

## Button treatment

Set `asButton` for a short, prominent set of multiple-choice options. Set `horizontal` on CheckboxGroup for the approved wrapping-row layout.

```tsx
<CheckboxGroup
  horizontal
  label="Preferred contact methods"
  defaultValue={["email"]}
>
  <Checkbox asButton value="email" label="Email" />
  <Checkbox asButton value="sms" label="SMS" />
  <Checkbox asButton value="phone" label="Phone" />
</CheckboxGroup>
```

`asButton` changes presentation only. The option remains a Checkbox, and several options may be selected. A visible checkbox is fixed at the start of every option. Its reserved space prevents labels and descriptions from moving when selection changes.

Use button-style Radio group options instead when exactly one prominent choice is allowed. Use the standard vertical CheckboxGroup for longer lists.

## Validation

Validation belongs to the smallest complete choice.

For one required Checkbox, place `aria-invalid` and `aria-describedby` on that Checkbox and render the error with FieldError:

```tsx
<Field orientation="horizontal" data-invalid>
  <FieldContent>
    <Checkbox
      id="terms"
      name="terms"
      required
      aria-invalid
      aria-describedby="terms-error"
      label="Accept terms and conditions"
    />
    <FieldError id="terms-error">
      Accept the terms and conditions to continue.
    </FieldError>
  </FieldContent>
</Field>
```

For CheckboxGroup, place `aria-invalid` and `aria-describedby` on the group only. CheckboxGroup applies the invalid treatment to its options:

```tsx
<Field data-invalid>
  <FieldContent>
    <CheckboxGroup
      aria-invalid
      aria-describedby="formats-error"
      label="Event formats"
    >
      <Checkbox value="in-person" label="In person" />
      <Checkbox value="online" label="Online" />
    </CheckboxGroup>
    <FieldError id="formats-error">
      Select at least one event format.
    </FieldError>
  </FieldContent>
</Field>
```

The product decides when validation runs and focuses the first invalid control after submission. Callers provide the error relationship; they do not add error colours or classes.

## Disabled state

Set `disabled` on an independent Checkbox when that option is unavailable. Set it on CheckboxGroup when the entire question is unavailable; the group applies the state to every option, its legend and its description.

Keep a visible explanation near a disabled choice when the reason is not already apparent.

## Accessibility

- Every canonical Checkbox has a visible `label`.
- Label text toggles its Checkbox.
- Descriptions are automatically connected with `aria-describedby`.
- Space toggles the focused Checkbox; Tab follows the native form order.
- Checked, unchecked and indeterminate states are exposed by Base UI.
- The standard Checkbox includes an enlarged interaction target while retaining the approved 16 px visual size.
- Button-style options keep a visible checkbox at the start and do not rely on colour alone.
- CheckboxGroup exposes one labelled group while each child retains its own option label.
- Invalid groups associate one error with the complete question rather than repeating validation props on every option.

## Interface

### Checkbox

| Property          | Type                         | Default      | Meaning                                                                    |
| ----------------- | ---------------------------- | ------------ | -------------------------------------------------------------------------- |
| `label`           | `React.ReactNode`            | none         | Visible option name and canonical accessible label                         |
| `description`     | `React.ReactNode`            | none         | Supporting text automatically connected to the control                     |
| `asButton`        | `boolean`                    | `false`      | Approved prominent multiple-choice treatment with a fixed leading Checkbox |
| `checked`         | `boolean`                    | uncontrolled | Controlled selected state                                                  |
| `defaultChecked`  | `boolean`                    | `false`      | Initial uncontrolled selected state                                        |
| `onCheckedChange` | `(checked: boolean) => void` | none         | Reports state changes for an independent Checkbox                          |
| `value`           | `string`                     | none         | Unique option value inside CheckboxGroup or submitted form value           |
| `name`            | `string`                     | none         | Native form field name                                                     |
| `required`        | `boolean`                    | `false`      | Requires an independent Checkbox to be selected                            |
| `disabled`        | `boolean`                    | `false`      | Makes the option unavailable                                               |
| `indeterminate`   | `boolean`                    | `false`      | Explicit mixed state when it is not derived by a parent Checkbox           |
| `parent`          | `boolean`                    | `false`      | Controls every value listed by its CheckboxGroup                           |

Checkbox also accepts Base UI Checkbox Root properties.

### CheckboxGroup

| Property        | Type                        | Default      | Meaning                                               |
| --------------- | --------------------------- | ------------ | ----------------------------------------------------- |
| `label`         | `React.ReactNode`           | none         | Visible legend and accessible group name              |
| `description`   | `React.ReactNode`           | none         | Supporting text automatically connected to the group  |
| `value`         | `string[]`                  | uncontrolled | Controlled selected values                            |
| `defaultValue`  | `string[]`                  | `[]`         | Initial uncontrolled selected values                  |
| `onValueChange` | `(value: string[]) => void` | none         | Reports the complete selected value array             |
| `allValues`     | `string[]`                  | `[]`         | Child values controlled by a parent Checkbox          |
| `horizontal`    | `boolean`                   | `false`      | Approved wrapping-row layout for button-style options |
| `disabled`      | `boolean`                   | `false`      | Disables the complete group                           |

CheckboxGroup also accepts Base UI Checkbox Group properties.

## Styling contract

The library owns visual size, radius, colour, checked and indeterminate indicators, hit area, typography, spacing, orientation, hover, focus, disabled and invalid treatments. Indicators scale and fade when entering or leaving the selected state; reduced-motion preferences retain only the opacity transition.

Use `className` only to position the complete Checkbox or CheckboxGroup within its parent layout. Request a library change when a legitimate treatment is missing.

Agents must obtain explicit user consent before adding or changing props, states, variants, indicators, behaviours or styling.

## Relationship to Shadcn

Gecko retains Shadcn’s Base UI Checkbox foundation, checked indicator, native form integration, focus treatment and invalid state. Gecko adds integrated labels and descriptions, CheckboxGroup shared state, vertical and horizontal group layouts, parent and indeterminate presentation, button-style options, automatic selected icons, enlarged interaction targets, and group-owned disabled and invalid styling.

Shadcn composes ordinary Checkbox examples with FieldGroup because its Checkbox stays primitive. Gecko’s CheckboxGroup is the canonical interface for a related multiple-choice value; FieldGroup remains available for arranging unrelated fields.

## Related components

- **Radio group** — exactly one choice from a set.
- **Switch** — an immediate on/off setting.
- **Field** — validation and form layout around a Checkbox or CheckboxGroup.
