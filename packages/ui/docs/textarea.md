# Textarea

Import: `@gecko/ui/components/textarea`  
Status: Stable  
Source: `src/components/textarea.tsx`  
Human documentation: `apps/docs/src/pages/textarea/index.tsx`

## Purpose

Textarea collects multiline free text such as comments, notes, descriptions, and feedback. Use Input for a short, single-line value. Use Reply box for a conversation composer with product actions.

Textarea is Gecko’s styled Shadcn component built on the native HTML `textarea` element. It mirrors Gecko Input’s sizes and visual states. There is no Base UI primitive or Base UI API involved.

## Canonical field

Compose Textarea with Field and a visible FieldLabel in product forms:

```tsx
<Field>
  <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
  <Textarea
    id="feedback"
    name="feedback"
    placeholder="Share your thoughts..."
    rows={4}
    aria-describedby="feedback-description"
  />
  <FieldDescription id="feedback-description">
    Tell us what went well or what we could improve.
  </FieldDescription>
</Field>
```

The `htmlFor` and `id` values match. The placeholder provides an example or prompt and does not replace the label.

## Relationship to Input

Textarea mirrors Input for:

- approved small, medium, and large sizes;
- typography, padding, radius, background, and border;
- hover, focus, invalid, disabled, and read-only behaviour;
- Field composition, descriptions, errors, and required markers;
- native controlled and uncontrolled value state.

Textarea differs only where multiline entry requires it:

- a minimum height rather than a fixed control height;
- content-based growth;
- vertical resizing;
- native textarea properties such as `rows`, `cols`, `minLength`, and `maxLength`.

Do not make Textarea visually diverge from Input without an approved design-system change.

## Native textarea contract

Textarea accepts native textarea properties. Use `defaultValue` for an uncontrolled initial value or `value` with `onChange` for controlled state. The product owns value state, validation, persistence, and character-count presentation.

Use `name` when the value participates in form submission. Use `rows` to establish the initial visible line count when the surrounding layout needs more space than the default minimum height.

Allow selection, copying, pasting, browser spelling support, and native keyboard editing. Do not replace the native element with a content-editable surface for ordinary multiline text.

## Within form

```tsx
<form onSubmit={handleSubmit}>
  <Field>
    <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
    <Textarea
      id="feedback"
      name="feedback"
      rows={4}
      aria-describedby="feedback-description"
    />
    <FieldDescription id="feedback-description">
      Tell us what went well or what we could improve.
    </FieldDescription>
  </Field>
  <Button type="submit">Send feedback</Button>
</form>
```

Button retains its intrinsic width. Keep submit enabled until submission starts, validate on submission, and focus the first invalid control.

## Disabled and read-only

Use `disabled` when the control and its value are unavailable. Add `data-disabled` to Field so its label and supporting content share the disabled treatment.

Use `readOnly` when the value remains available but cannot be edited. A read-only Textarea remains focusable, selectable, copyable, and included in form submission. Do not set `data-disabled`, remove it from the tab order, blur it on focus, disable pointer interaction, or remove its resize behaviour.

```tsx
<Field>
  <FieldLabel htmlFor="published-description">Published description</FieldLabel>
  <Textarea
    id="published-description"
    name="description"
    readOnly
    value={description}
  />
</Field>
```

## Required and validation

Set native `required` on Textarea. Gecko’s associated FieldLabel displays the required marker.

For an invalid value:

- add `data-invalid` to Field;
- add `aria-invalid="true"` to Textarea;
- connect Textarea to FieldError using `aria-describedby`;
- write an error that states how to correct the value.

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="message">Message</FieldLabel>
  <Textarea
    id="message"
    name="message"
    minLength={20}
    aria-invalid
    aria-describedby="message-error"
  />
  <FieldError id="message-error">Enter at least 20 characters.</FieldError>
</Field>
```

An invalid border is not a complete error message.

## Size

```tsx
<Textarea size="sm|md|lg" />
```

Use medium by default. Match another size only when the surrounding form controls establish it. Do not recreate sizes with application classes.

## Interface

| Property       | Type                                      | Default | Meaning                                                                    |
| -------------- | ----------------------------------------- | ------- | -------------------------------------------------------------------------- |
| `size`         | `"sm" \| "md" \| "lg"`                    | `"md"`  | Sets the approved padding and text size                                    |
| `value`        | Native textarea value                     | —       | Controls the current value                                                 |
| `defaultValue` | Native textarea value                     | —       | Sets the initial uncontrolled value                                        |
| `onChange`     | `ChangeEventHandler<HTMLTextAreaElement>` | —       | Reports native value changes                                               |
| `name`         | `string`                                  | —       | Sets the submitted form-field name                                         |
| `rows`         | `number`                                  | —       | Sets the initial visible line count                                        |
| `required`     | `boolean`                                 | `false` | Marks the value as required                                                |
| `minLength`    | `number`                                  | —       | Sets the minimum valid character count                                     |
| `maxLength`    | `number`                                  | —       | Sets the maximum accepted character count                                  |
| `readOnly`     | `boolean`                                 | `false` | Prevents editing while retaining focus, selection, copying, and submission |
| `disabled`     | `boolean`                                 | `false` | Prevents interaction and omits the value from submission                   |
| `aria-invalid` | `boolean \| "true" \| "false"`            | `false` | Exposes validation state to assistive technology                           |
| `className`    | `string`                                  | —       | Extends the textarea                                                       |

Textarea accepts applicable native textarea properties and adds Gecko’s visual `size` interface.

## Accessibility

- Give every product Textarea a visible FieldLabel connected by `htmlFor` and `id`.
- Use `aria-label` only for an isolated demonstration where a visible label would add noise.
- Preserve native keyboard editing, selection, copying, and pasting.
- Keep read-only values focusable and selectable.
- Connect supporting text and errors using `aria-describedby`.
- Pair invalid styling with a specific FieldError.
- Use native `disabled`, `readOnly`, and `required` semantics rather than recreating them with ARIA.

## Styling contract

Textarea owns its typography, padding, radius, background, border, focus ring, hover, disabled, invalid, minimum height, content growth, and vertical resizing. These treatments intentionally mirror Input wherever the controls share behaviour.

Use `className` only to position the complete control or set a deliberate layout width. Request a library change when a legitimate treatment is missing.

## Agent rules

1. Import Textarea from `@gecko/ui/components/textarea`.
2. Use Textarea for multiline free text and Input for single-line values.
3. Compose product textareas with Field and a visible FieldLabel.
4. Set a meaningful `id` and `name` when the value participates in a form.
5. Use placeholders only for examples or prompts, never as the only label.
6. Keep read-only Textarea focusable, selectable, copyable, and submitted.
7. Preserve native keyboard, selection, copy, paste, and spelling behaviour.
8. Render the complete invalid Field pattern rather than adding error classes directly.
9. Write validation messages that explain how to correct the value.
10. Use Gecko’s size property and visual states without restyling the component in application code.
11. Preserve the deliberate multiline differences from Input: minimum height, content growth, vertical resizing, and native textarea properties.

## API reference

- [Shadcn Textarea documentation](https://ui.shadcn.com/docs/components/base/textarea)
- [MDN textarea reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea)

## Related

- **Input** — single-line free text.
- **Field** — labels, descriptions, errors, and form layout.
- **Reply box** — conversation composition with product actions.
