# Colour field

Import: `@gecko/ui/components/color-picker`  
Export: `ColorPicker`  
Status: Stable  
Source: `src/components/color-picker.tsx`  
Human documentation: `apps/docs/src/pages/color-picker/index.tsx`

## Purpose

Colour field lets someone type a hexadecimal colour or choose it visually from the library-owned popover. It coordinates the text input, colour swatch, picker, value format, sizes, keyboard interaction and invalid treatment behind one interface.

Use Colour field for an open colour choice such as an account, heading, button or widget colour. Use Select or an approved swatch-selection component when the choice is limited to a fixed palette. Use Input for text that is not a colour.

The product name uses British spelling: Colour field. The code export remains `ColorPicker`.

## Canonical application usage

Wrap ColorPicker with Field and give it a visible FieldLabel:

```tsx
import { ColorPicker } from "@gecko/ui/components/color-picker";
import { Field, FieldLabel } from "@gecko/ui/components/field";

<Field>
  <FieldLabel htmlFor="brand-colour">Brand colour</FieldLabel>
  <ColorPicker id="brand-colour" name="brand-colour" defaultValue="#6366F1" />
</Field>;
```

The `id` connects FieldLabel to the visible input. The `name` includes that input in native form submission. A placeholder may demonstrate the expected format, but it never replaces FieldLabel.

## Within form

Colour field participates in native form submission through its `name`:

```tsx
<form onSubmit={handleSubmit}>
  <Field>
    <FieldLabel htmlFor="accent-colour">Accent colour</FieldLabel>
    <ColorPicker
      id="accent-colour"
      name="accentColour"
      defaultValue="#6366F1"
    />
  </Field>
  <Button type="submit">Save colour</Button>
</form>
```

Button retains its intrinsic width. Set `className="w-full"` only for a deliberately full-width action.

## Value format

The approved format is exactly `#RRGGBB`: a hash followed by six hexadecimal characters.

- Complete valid values are normalised to uppercase.
- Lowercase input is accepted and becomes uppercase when all six characters are present.
- Partial and invalid strings remain visible while someone is typing.
- The input limits entry to seven characters and owns the native hex pattern.
- The swatch displays the current colour only when the complete value is valid.
- An empty, partial or invalid value displays the neutral unselected swatch.

Agents must preserve this format. Obtain explicit user consent before accepting shorthand hex, alpha, RGB, HSL, OKLCH, named colours or another representation.

## Uncontrolled state

Use `defaultValue` when the field owns its state:

```tsx
<ColorPicker id="heading-colour" name="heading-colour" defaultValue="#EF4444" />
```

Omit `defaultValue` when no colour has been chosen. The field remains empty and shows its neutral swatch.

## Controlled state

Use `value` with `onValueChange` when product state owns the colour:

```tsx
const [colour, setColour] = React.useState("#6366F1")

<ColorPicker
  id="widget-colour"
  name="widget-colour"
  value={colour}
  onValueChange={setColour}
/>
```

`onValueChange` is the single change interface for both typed and picker changes. It reports partial typed strings so controlled input remains responsive. A complete valid value is reported in uppercase.

The parent must update `value` to accept a change. If it retains the previous value, both the input and swatch retain the previous controlled state.

## Picker and direct entry

The leading swatch opens the visual picker. The main input and the popover’s hex input edit the same value. Picker changes produce complete uppercase values.

People may use either interaction. Keep both available; do not hide the text input or make colour the only cue.

The library owns the Popover, visual picker, duplicate popover input, trigger label, focus handling and swatch presentation. Callers do not compose those pieces.

## Validation

The field owns the permitted input length and native pattern. The product owns when validation runs and when an error is shown. Do not mark partial input invalid on every keystroke.

For a visible error, put `data-invalid` on Field and connect FieldError to ColorPicker:

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="accent-colour">Accent colour</FieldLabel>
  <ColorPicker
    id="accent-colour"
    name="accent-colour"
    value={colour}
    onValueChange={setColour}
    aria-invalid
    aria-describedby="accent-colour-error"
  />
  <FieldError id="accent-colour-error">
    Use a six-character hex colour, such as #6366F1.
  </FieldError>
</Field>
```

Keep the submitted value as the source of truth. Do not derive form data from the swatch’s inline style.

## Sizes

The approved sizes mirror Input:

| Value  | Use                                               |
| ------ | ------------------------------------------------- |
| `"sm"` | Compact forms where surrounding fields are small  |
| `"md"` | Standard forms; the default                       |
| `"lg"` | Forms where surrounding fields use the large size |

Use one field size consistently within a form. Agents must obtain explicit consent before adding another size.

## Disabled state

Set `disabled` when the value is visible but cannot currently be changed. This disables typing and the picker trigger.

Put `data-disabled` on the surrounding Field so its label receives the corresponding treatment. Keep a visible explanation nearby when the reason is not apparent.

## Colour contrast

Colour field selects a colour value; it does not certify how that value will perform when applied. Contrast depends on the eventual foreground, background, size and purpose.

The product must validate contrast in the context where the selected colour will be used. Do not add automatic contrast rejection, alternative colours or accessibility claims to ColorPicker without explicit consent and a defined product rule.

## Accessibility

- Every canonical Colour field has a visible FieldLabel connected to the main input.
- The swatch is a native Button that opens the picker and announces the current valid value.
- The popover’s hex input has its own accessible name and edits the same logical value.
- The neutral swatch ensures an empty or invalid value is not represented as white.
- Text entry provides a non-visual alternative to choosing from the colour surface.
- Keyboard users can reach the picker trigger and input independently.
- Invalid state and its corrective message are connected with `aria-invalid` and `aria-describedby`.
- Disabled state applies to both the input and picker trigger.
- Colour is not the only indication of validity; FieldError explains how to correct the value.

## Interface

| Property           | Type                           | Default      | Meaning                                                   |
| ------------------ | ------------------------------ | ------------ | --------------------------------------------------------- |
| `value`            | `string`                       | uncontrolled | Controlled text value                                     |
| `defaultValue`     | `string`                       | `""`         | Initial uncontrolled text value                           |
| `onValueChange`    | `(value: string) => void`      | none         | Reports typed and picker changes                          |
| `size`             | `"sm" \| "md" \| "lg"`         | `"md"`       | Matches the surrounding Input size                        |
| `id`               | `string`                       | none         | Connects the visible input to FieldLabel                  |
| `name`             | `string`                       | none         | Native form field name                                    |
| `placeholder`      | `string`                       | none         | Example format for an empty field                         |
| `disabled`         | `boolean`                      | `false`      | Disables direct entry and the picker                      |
| `required`         | `boolean`                      | `false`      | Applies native required validation to the main form input |
| `aria-invalid`     | `boolean \| "true" \| "false"` | `false`      | Exposes product-controlled invalid state                  |
| `aria-describedby` | `string`                       | none         | Connects description or error content to the field        |

ColorPicker accepts compatible Input properties except properties owned by the colour interface: `type`, `value`, `defaultValue`, `onChange`, `inputMode`, `spellCheck`, `autoComplete`, `pattern`, and `maxLength`.

## Styling contract

The library owns the input width, swatch size and position, logical spacing, neutral and selected swatches, borders, radius, focus and invalid treatments, Popover spacing, visual picker and internal hex input.

Use `className` only for documented parent-layout integration such as placement. Request a library change when a legitimate treatment is missing.

Agents must obtain explicit user consent before adding or changing props, value formats, sizes, picker controls, validation behaviour, callbacks, styling or visual treatments.

## Related components

- **Field** — visible label, description, disabled treatment and validation message.
- **Input** — text values that are not colours.
- **Select** — a fixed set of named colour options.
