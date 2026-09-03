# Switch

Import: `@gecko/ui/components/switch`  
Status: Stable  
Source: `src/components/switch.tsx`  
Human documentation: `apps/docs/src/pages/switch/index.tsx`

## Purpose

Switch lets someone turn an independent setting on or off. Use it when the change takes effect immediately.

Use Checkbox when a choice is submitted later. Use Radio group when exactly one option must be selected from a set.

Switch wraps Base UI through the Shadcn component. Application code imports the Gecko component rather than either underlying implementation.

## Canonical Switch

Give every Switch a visible label that names the on state.

```tsx
<Switch
  label="Share across devices"
  checked={shared}
  onCheckedChange={setShared}
/>
```

Application code owns persistence. Switch owns interaction, semantics and presentation.

## Label and description

Use `label` for the visible and accessible setting name. Add `description` when the effect needs supporting context.

```tsx
<Switch
  label="Share focus status"
  description="Focus is shared across devices and turns off when you leave the app."
/>
```

Switch generates an ID when one is not supplied, links its label to the control and connects its description with `aria-describedby`. A caller-supplied `aria-describedby` value is preserved and combined with the generated description relationship.

A bare Switch requires an explicit `aria-label` or `aria-labelledby`. Prefer a visible `label` unless surrounding content already makes the setting unambiguous.

## Controlled and uncontrolled state

Use `checked` with `onCheckedChange` for controlled state. Use `defaultChecked` for the initial uncontrolled state.

```tsx
<Switch
  label="Send read receipts"
  checked={sendReadReceipts}
  onCheckedChange={setSendReadReceipts}
/>
```

Do not add a separate save action for an ordinary Switch. If a value is intentionally collected for later submission, use Checkbox instead.

## Size

Choose the size that matches the surrounding interface density.

```tsx
<Switch size="sm|default|lg" label="Setting" />
```

Use the default size unless a compact surface already establishes the small control density.

## Label position

Place a label before or after the control when supporting text is not present.

```tsx
<Switch label="Setting" labelPosition="before|after" />
```

When a description is present, Switch uses the approved control-and-text-stack composition instead of moving the label independently.

## Validation and unavailable settings

Set `disabled` only when the setting is unavailable. Keep a visible explanation nearby when the reason is not apparent.

For validation, place `aria-invalid` on Switch and connect the error using `aria-describedby`. Field supplies the surrounding error layout.

```tsx
<Field orientation="horizontal" data-invalid>
  <FieldContent>
    <Switch
      id="sharing"
      label="Share across devices"
      aria-invalid
      aria-describedby="sharing-error"
    />
    <FieldError id="sharing-error">
      Review this setting before you continue.
    </FieldError>
  </FieldContent>
</Field>
```

## Accessibility

- Every canonical Switch has a visible label naming the on state.
- Label text toggles and focuses its Switch.
- Descriptions are automatically connected with `aria-describedby`.
- Tab moves focus to the control and Space changes its state.
- Checked and unchecked states are exposed by Base UI and remain distinguishable by position and colour.
- The visual control retains the approved Gecko geometry and an enlarged interaction target.
- Disabled and invalid states use the shared Gecko control treatments.

## Interface

| Property           | Type                         | Default      | Meaning                                                                |
| ------------------ | ---------------------------- | ------------ | ---------------------------------------------------------------------- |
| `size`             | `"sm" \| "default" \| "lg"`  | `"default"`  | Control size                                                           |
| `label`            | `React.ReactNode`            | none         | Visible setting name and canonical accessible label                    |
| `description`      | `React.ReactNode`            | none         | Supporting text automatically connected to the control                 |
| `labelPosition`    | `"before" \| "after"`        | `"after"`    | Label placement when no description is present                         |
| `checked`          | `boolean`                    | uncontrolled | Controlled on or off state                                             |
| `defaultChecked`   | `boolean`                    | `false`      | Initial uncontrolled state                                             |
| `onCheckedChange`  | `(checked: boolean) => void` | none         | Reports state changes                                                  |
| `disabled`         | `boolean`                    | `false`      | Makes the setting unavailable                                          |
| `readOnly`         | `boolean`                    | `false`      | Prevents changes while retaining the control state                     |
| `required`         | `boolean`                    | `false`      | Marks the control as required when native form semantics are necessary |
| `name`             | `string`                     | none         | Native form field name                                                 |
| `value`            | `string`                     | `"on"`       | Submitted value when checked                                           |
| `uncheckedValue`   | `string`                     | none         | Submitted value when unchecked                                         |
| `id`               | `string`                     | generated    | Control ID used for label and description relationships                |
| `aria-describedby` | `string`                     | none         | Additional supporting or validation text relationships                 |

Switch also accepts Base UI Switch Root properties.

## Agent rules

- Import Switch from `@gecko/ui/components/switch`.
- Use Switch only for an independent setting that takes effect immediately.
- Use Checkbox for choices submitted later and Radio group for one choice from a set.
- Give every canonical Switch a visible positive label describing its on state.
- Use controlled state when the product must react to or persist the change.
- Use the approved sizes and label positions rather than recreating the composition.
- Do not restyle the control geometry, thumb, focus, disabled, invalid or dark-mode treatments in application code.

## API references

- [Shadcn Switch documentation](https://ui.shadcn.com/docs/components/base/switch)
- [Base UI Switch API](https://base-ui.com/react/components/switch)

## Related

- Checkbox — independent or multiple form choices submitted later
- Radio group — exactly one option from a set
- Field — validation and form layout
