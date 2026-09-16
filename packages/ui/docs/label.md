# Label

Import: `@geckolabs/elements/components/label`  
Status: Stable  
Source: `src/components/label.tsx`  
Human documentation: `apps/docs/src/pages/label/index.tsx`

## Purpose

Label gives a form control a visible and programmatic name. It renders a native `label` and accepts native label properties.

Use FieldLabel inside Field for product form fields. Use Label directly only when a standalone control needs a visible name without the rest of the Field composition.

Label follows Shadcn’s native Label composition. It does not wrap a Base UI primitive, so Base UI Label properties are not part of Gecko Label’s public contract.

## Basic use

Connect Label to its control by matching `htmlFor` and `id`:

```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email address</Label>
  <Input id="email" name="email" type="email" autoComplete="email" />
</div>
```

Selecting the label focuses or activates the associated control. A placeholder does not replace Label.

## Field composition

Use FieldLabel for the standard product-form composition:

```tsx
<Field>
  <FieldLabel htmlFor="email">Email address</FieldLabel>
  <Input id="email" name="email" type="email" autoComplete="email" />
</Field>
```

FieldLabel is built on Label and retains its native association behaviour.

## Required fields

Set native `required` on the associated control. When Label’s `htmlFor` resolves to that control, Gecko appends the visual required marker automatically:

```tsx
<Field>
  <FieldLabel htmlFor="email">Email address</FieldLabel>
  <Input id="email" name="email" type="email" required />
</Field>
```

Required composite controls such as Combobox expose `aria-required="true"` on
their labelled input. Label recognises this as well as native `required`, and
updates the marker when either attribute changes. Keep `required` on the
Combobox root; do not require its search text independently of its selection.

Every required field must display the required marker. Automatic detection also
handles controls that mount after their label, such as a control replacing a
skeleton. If requiredness is already known while the control is loading, set
`required` on Label or FieldLabel as well so the marker is visible immediately:

```tsx
<Field>
  <FieldLabel htmlFor="body" required>Body</FieldLabel>
  {loading ? <Skeleton aria-hidden className="h-32" /> : (
    <Textarea id="body" name="body" required />
  )}
</Field>
```

The label's `required` property controls its visual marker; retain `required`
(or the owning component's required interface) on the control for semantics and
validation.

Do not type an asterisk into the label. The marker is decorative because the control already exposes required semantics.

## Disabled state

Set native `disabled` on the control. When using Field, also set `data-disabled` on Field so the complete composition shares the unavailable treatment:

```tsx
<Field data-disabled>
  <FieldLabel htmlFor="workspace">Workspace</FieldLabel>
  <Input id="workspace" name="workspace" disabled />
</Field>
```

Do not use `aria-disabled` on Label. The control owns disabled semantics.

## Interface

| Property  | Type     | Meaning                                                                 |
| --------- | -------- | ----------------------------------------------------------------------- |
| `htmlFor` | `string` | Connects Label to a control and enables Gecko’s automatic required mark |

Label also accepts `required?: boolean` (default `false`) to show the marker before its control mounts, and native label properties.

`ControlLabel` is exported for Gecko’s control compositions, including Switch and Radio group. Application code uses each control’s documented label interface rather than importing ControlLabel directly.

## Accessibility

- Give every form control a concise visible label unless its component contract supplies one.
- Match Label’s `htmlFor` to one unique control `id`.
- Keep visible label text in the control’s accessible name.
- Use native `required` and `disabled` on the control.
- Use placeholders only for examples or format hints.
- Do not use Label as a heading or as body copy.

## Agent rules

1. Import Label from `@geckolabs/elements/components/label`.
2. Prefer FieldLabel inside Field for product form fields.
3. Match `htmlFor` and `id`; never leave Label pointing at a missing or duplicate ID.
4. Put `required` and `disabled` on the associated control.
5. Do not add a required asterisk manually.
6. Do not import ControlLabel in application code.
7. Treat native label properties as the public base interface; do not assume Base UI Label extensions are available.

## API reference

- [Shadcn Label documentation](https://ui.shadcn.com/docs/components/base/label)

## Related

- **Field** — standard label, control, description and error composition.
- **Input field** — single-line text control.
- **Checkbox**, **Radio group** and **Switch** — controls with their own documented label composition.
