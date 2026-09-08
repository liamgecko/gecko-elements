# Radio group

Import: `@gecko/ui/components/radio-group`  
Status: Stable  
Source: `src/components/radio-group.tsx`  
Human documentation: `apps/docs/src/pages/radio-group/index.tsx`

## Purpose

Radio group lets someone choose exactly one option from a known set. Use Checkbox when zero, one or several options may be selected. Use Switch for an independent setting that takes effect immediately.

Gecko wraps Shadcn’s Base UI Radio group and adds integrated group and option labels, descriptions, horizontal layout and an approved button treatment.

## Composition

```text
RadioGroup
└── RadioGroupItem
```

## Canonical usage

Give the group a visible label and give every option a unique value and clear label.

```tsx
<RadioGroup label="Notification frequency" defaultValue="important">
  <RadioGroupItem value="all" label="All activity" />
  <RadioGroupItem value="important" label="Important activity" />
  <RadioGroupItem value="none" label="No notifications" />
</RadioGroup>
```

RadioGroup connects its label and description to the radiogroup automatically. RadioGroupItem does the same for each option.

## Controlled and uncontrolled state

Use `value` with `onValueChange` for controlled state. Use `defaultValue` for the initial uncontrolled value. The value is one string, unlike CheckboxGroup’s string array.

Radio options normally retain one selection after a choice is made. Do not add a clear action when the question requires one answer.

## Required groups

Requiredness belongs to the complete question. Set `required` on RadioGroup, never on RadioGroupItem. RadioGroup renders one required marker beside its legend and preserves native group validation. The individual option labels never show required markers.

```tsx
<RadioGroup
  required
  name="notificationFrequency"
  label="Notification frequency"
>
  <RadioGroupItem value="all" label="All activity" />
  <RadioGroupItem value="important" label="Important activity" />
  <RadioGroupItem value="none" label="No notifications" />
</RadioGroup>
```

Although native radio semantics associate the required constraint with the group’s options, the user is answering one required question—not several required questions. Repeating the marker beside every option falsely implies that every option must be selected. Connect one validation error to RadioGroup and do not repeat `required`, `aria-invalid` or the error relationship on its items.

## Button treatment

Use `asButton` for a short, prominent set. Button presentation does not change radio semantics: exactly one option remains selectable. A visible radio stays fixed at the start of every option, so selection is not communicated by colour alone and the content does not move when the state changes.

```tsx
<RadioGroup label="Billing cycle" defaultValue="monthly">
  <RadioGroupItem asButton value="monthly" label="Monthly" />
  <RadioGroupItem asButton value="annual" label="Annual" />
</RadioGroup>
```

Use Checkbox button options instead when several choices may be selected independently.

## Within form

Give the group a name so its selected value is submitted.

```tsx
<form onSubmit={handleSubmit}>
  <FieldGroup>
    <RadioGroup
      name="notificationFrequency"
      label="Notification frequency"
      defaultValue="important"
    >
      <RadioGroupItem value="all" label="All activity" />
      <RadioGroupItem value="important" label="Important activity" />
      <RadioGroupItem value="none" label="No notifications" />
    </RadioGroup>
  </FieldGroup>
  <Button type="submit">Save preferences</Button>
</form>
```

Button retains its intrinsic width. Keep submit enabled and validate a required group on submission.

## Validation

Validation belongs to the complete group. Connect one error to RadioGroup; the group applies the visual invalid treatment to its items.

```tsx
<Field data-invalid>
  <FieldContent>
    <RadioGroup
      required
      aria-invalid
      aria-describedby="frequency-error"
      label="Notification frequency"
    >
      <RadioGroupItem value="all" label="All activity" />
      <RadioGroupItem value="important" label="Important activity" />
    </RadioGroup>
    <FieldError id="frequency-error">
      Choose a notification frequency.
    </FieldError>
  </FieldContent>
</Field>
```

The product decides when validation runs and focuses the first invalid group after submission.

## Accessibility

- RadioGroup has one visible group label.
- A required RadioGroup shows one required marker on its group label; option labels never repeat it.
- Every RadioGroupItem has its own visible option label.
- Group and option descriptions are connected automatically.
- Arrow keys move between enabled options; Space selects the focused option.
- Tab enters and leaves the group as one form control.
- The standard control has an enlarged interaction target while retaining its approved visual size.
- Button-style options preserve radio semantics, keep a visible radio selection cue and do not become ordinary buttons.

## Interface

### RadioGroup

| Property        | Type                      | Default      | Meaning                                                  |
| --------------- | ------------------------- | ------------ | -------------------------------------------------------- |
| `label`         | `React.ReactNode`         | none         | Visible legend and accessible group name                 |
| `description`   | `React.ReactNode`         | none         | Supporting text connected to the group                   |
| `value`         | `string`                  | uncontrolled | Controlled selected value                                |
| `defaultValue`  | `string`                  | none         | Initial uncontrolled selected value                      |
| `onValueChange` | `(value: string) => void` | none         | Reports the newly selected value                         |
| `name`          | `string`                  | none         | Native form field name                                   |
| `horizontal`    | `boolean`                 | `false`      | Approved wrapping-row layout                             |
| `disabled`      | `boolean`                 | `false`      | Makes the complete group unavailable                     |
| `readOnly`      | `boolean`                 | `false`      | Prevents the selected value from changing                |
| `required`      | `boolean`                 | `false`      | Requires one group value and marks the group legend once |

### RadioGroupItem

| Property      | Type              | Default | Meaning                                 |
| ------------- | ----------------- | ------- | --------------------------------------- |
| `value`       | `string`          | none    | Unique option value within the group    |
| `label`       | `React.ReactNode` | none    | Visible and accessible option name      |
| `description` | `React.ReactNode` | none    | Supporting text connected to the option |
| `asButton`    | `boolean`         | `false` | Approved button-style presentation      |
| `disabled`    | `boolean`         | `false` | Makes one option unavailable            |

RadioGroup and RadioGroupItem also accept the relevant Base UI Radio group and Radio Root properties.

## API reference

See the [Shadcn Radio group documentation](https://ui.shadcn.com/docs/components/base/radio-group) and [Base UI Radio API](https://base-ui.com/react/components/radio) for the underlying API and source composition.

## Styling contract

The library owns visual size, radius, colour, indicator, hit area, typography, spacing, orientation, hover, focus, disabled and invalid treatments.

The selected border matches the selected fill, including on hover. On selection, the centred inner indicator shrinks smoothly from the control’s full inner size to its normal size, revealing the selected ring around it. Reduced-motion users receive an opacity-only transition.

Use `className` only to position the complete RadioGroup within its parent layout. Request a library change when a legitimate treatment is missing.

Agents must obtain explicit user consent before adding or changing props, states, variants, behaviours or styling.

Implementation rule: never put `required` on RadioGroupItem. Put it on RadioGroup, render the required marker once on the legend, and associate one error with the complete group. Do not repeat `aria-invalid` or `aria-describedby` on every item.
