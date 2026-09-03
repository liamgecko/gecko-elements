# Sensitive field

Import: `@gecko/ui/components/sensitive-field`  
Status: Stable  
Source: `src/components/sensitive-field.tsx`  
Human documentation: `apps/docs/src/pages/sensitive-field/index.tsx`

## Purpose

Sensitive field lets someone review or replace an existing private value without leaving it visible by default. Use it for API keys, secrets, tokens, and similar values in product settings.

Sensitive field is not the sign-in password pattern. Use a dedicated password input for authentication and account-password flows. Use Input inside Field when a value does not need concealment.

Concealment is presentational privacy, not encryption or access control. The application still owns secure transport, storage, authorization, logging, and redaction.

## Ownership

Sensitive field is Gecko-owned. It composes Gecko Input group, Button, and Tooltip with approved Lucide icons. It does not expose or require another component library’s API.

Applications import SensitiveField rather than rebuilding its mask, reveal action, focus behaviour, or visibility state.

## Canonical usage

Use Field to provide a visible label and any supporting content:

```tsx
<Field>
  <FieldLabel htmlFor="api-key">API key</FieldLabel>
  <SensitiveField
    id="api-key"
    name="apiKey"
    defaultValue="sk_live_example_secret"
    autoComplete="off"
    aria-describedby="api-key-description"
  />
  <FieldDescription id="api-key-description">
    Used to authenticate requests from this integration.
  </FieldDescription>
</Field>
```

Use `aria-label` only for an isolated demonstration where a visible label would add noise. Product forms use a visible FieldLabel.

## Concealment

The value is concealed by default:

- the input uses password semantics so assistive technology does not expose the value;
- the visible mask always contains ten bullets and does not reveal value length;
- the concealed input is read-only and removed from the tab order;
- the reveal button remains the keyboard entry point.

When revealed, the input changes to text semantics, becomes editable, joins the tab order, and receives focus. Hiding it returns the input to its concealed read-only state.

Do not infer a value’s length from the visual mask. Do not replace the fixed mask with one bullet per character.

## Visibility state

Use uncontrolled visibility unless application state must coordinate it:

```tsx
<SensitiveField defaultValue="secret" defaultVisible />
```

Use `visible` with `onVisibleChange` together for controlled visibility:

```tsx
const [visible, setVisible] = React.useState(false)

<SensitiveField
  value={apiKey}
  onChange={(event) => setApiKey(event.target.value)}
  visible={visible}
  onVisibleChange={setVisible}
/>
```

Keep the value concealed by default. The consuming application may set visibility to false when its surrounding surface closes or when a product security policy requires concealment.

## Keyboard and focus

- Tab reaches the reveal button while the value is concealed.
- Enter or Space on the reveal button reveals the value.
- Revealing moves focus to the input so editing can begin immediately.
- Tab and Shift+Tab follow normal form order while the input is revealed.
- Activating the hide button conceals the value without clearing it.
- Disabled prevents both revealing and editing.

Do not add a second keyboard shortcut or a pointer-only reveal interaction.

## Form behaviour

SensitiveField accepts applicable native input properties except `size`, `type`, and `readOnly`. The component owns those properties because they implement sizing and concealment.

Use `name` to submit the value. Use controlled `value` and `onChange` when the application owns edits, or `defaultValue` for an uncontrolled initial value.

The concealed input is read-only, so native `required` validation does not run while it is concealed. Validate required sensitive values in application form logic, then use FieldError, `data-invalid`, `aria-invalid`, and `aria-describedby` to present the result.

Never place real credentials or production secrets in documentation, fixtures, analytics, URLs, or logs.

## Size

```tsx
<SensitiveField size="sm|md|lg" />
```

Use medium by default. Match another size only when the surrounding form establishes it. Do not recreate sizes with application classes.

## Interface

| Property          | Type                         | Default | Meaning                                            |
| ----------------- | ---------------------------- | ------- | -------------------------------------------------- |
| `size`            | `"sm" \| "md" \| "lg"`       | `"md"`  | Sets the field and reveal-control size             |
| `defaultVisible`  | `boolean`                    | `false` | Sets initial uncontrolled visibility               |
| `visible`         | `boolean`                    | —       | Controls whether the value is visible and editable |
| `onVisibleChange` | `(visible: boolean) => void` | —       | Reports reveal and conceal changes                 |
| `value`           | Native input value           | —       | Controls the current value                         |
| `defaultValue`    | Native input value           | —       | Sets the initial uncontrolled value                |
| `onChange`        | Native input change handler  | —       | Reports edits while the input is revealed          |
| `name`            | `string`                     | —       | Sets the submitted form-field name                 |
| `disabled`        | `boolean`                    | `false` | Prevents revealing and editing                     |
| `autoComplete`    | `string`                     | `"off"` | Sets browser autocomplete behaviour                |
| `className`       | `string`                     | —       | Extends the outer Input group                      |

## Accessibility

- Give every Sensitive field a visible FieldLabel in product forms.
- Keep the reveal action keyboard operable and visibly focused.
- Preserve the action labels “Show sensitive value” and “Hide sensitive value”.
- Connect supporting text and errors with `aria-describedby`.
- Put `aria-invalid` on SensitiveField and `data-invalid` on Field.
- Do not expose the concealed value through text-input semantics or visible character count.

## Styling contract

The library owns the fixed mask, icon, tooltip, reveal button, focus transition, sizing, border, hover, disabled, and invalid treatments.

Use `className` only to position the complete component in its parent. Request a library change when a legitimate treatment is missing.

## Agent rules

1. Import SensitiveField from `@gecko/ui/components/sensitive-field`.
2. Use it only for existing private values that need concealed review or editing.
3. Use Field and FieldLabel in product forms.
4. Keep the value concealed by default.
5. Preserve the fixed ten-bullet mask and password semantics while concealed.
6. Preserve keyboard reveal, input focus, and native form order.
7. Use `name` for submission and controlled value state when the application owns edits.
8. Validate required values in application form logic rather than relying on native `required` while concealed.
9. Never put real secrets in examples, fixtures, URLs, analytics, or logs.
10. Do not rebuild the component from Input group, Button, and Tooltip.
11. Do not add automatic concealment, copying, generation, or persistence behaviour without explicit product approval.

## Related

- **Field** — visible labels, supporting text, validation, and form layout.
- **Input field** — ordinary values that do not need concealment.
