# OTP field

Import: `@gecko/ui/components/input-otp`  
Status: Stable  
Source: `src/components/input-otp.tsx`  
Human documentation: `apps/docs/src/pages/input-otp/index.tsx`  
Human route: `/components/otp-field`

## Purpose

OTP field collects a fixed-length verification code. It follows Shadcn’s Input OTP composition and uses `input-otp` for a single native input, paste, selection, mobile keyboard, autofill, and password-manager handling.

Use OTP field only for short verification codes. Use Input field for general text, passwords, telephone numbers, or identifiers.

## Canonical field

Use a digits-only pattern unless the code source explicitly sends letters:

```tsx
<Field>
  <FieldLabel htmlFor="verification-code">Verification code</FieldLabel>
  <InputOTP
    id="verification-code"
    name="verificationCode"
    maxLength={6}
    pattern={REGEXP_ONLY_DIGITS}
  >
    <InputOTPGroup>
      <InputOTPSlot index={0} />
      <InputOTPSlot index={1} />
      <InputOTPSlot index={2} />
      <InputOTPSlot index={3} />
      <InputOTPSlot index={4} />
      <InputOTPSlot index={5} />
    </InputOTPGroup>
  </InputOTP>
</Field>
```

Render exactly one sequentially indexed slot for every character allowed by `maxLength`. The visible slots mirror one native input; do not build separate inputs for each character.

## Composition

```text
InputOTP
└── InputOTPGroup
    ├── InputOTPSlot
    └── InputOTPSeparator
```

The Gecko slot spacing and individual rounded boundaries are intentional. Do not replace them with Shadcn’s contiguous visual treatment.

## Patterns and input mode

Use the approved regular expressions from `input-otp`. Application code may import these constants, but must import the rendered components from Gecko.

```tsx
<InputOTP
  aria-label="One-time code"
  inputMode="text"
  maxLength={6}
  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

The underlying library defaults to a numeric input mode. Set `inputMode="text"` for alphanumeric codes so touch devices offer an appropriate keyboard.

## Within form

```tsx
<form onSubmit={handleSubmit}>
  <FieldSet>
    <FieldLegend>Verify your account</FieldLegend>
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="verification-code">Verification code</FieldLabel>
        <FieldDescription id="verification-code-description">
          Enter the six-digit code sent to your email address.
        </FieldDescription>
        <InputOTP
          id="verification-code"
          name="verificationCode"
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          aria-describedby="verification-code-description"
          required
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </FieldGroup>
    <Button type="submit">Verify account</Button>
  </FieldSet>
</form>
```

`input-otp` defaults to `autoComplete="one-time-code"` and allows full-code paste. Preserve both behaviours. Keep the submit button enabled until submission begins.

## Disabled and validation

Use `disabled` when code entry is unavailable. Add `data-disabled` to Field so its label shares the state.

For an invalid code, set `aria-invalid` on InputOTP for assistive technology and on every InputOTPSlot for the visual state. Connect FieldError to the native input with `aria-describedby`:

```tsx
<Field data-invalid>
  <FieldLabel htmlFor="verification-code">Verification code</FieldLabel>
  <InputOTP
    id="verification-code"
    name="verificationCode"
    maxLength={6}
    pattern={REGEXP_ONLY_DIGITS}
    aria-invalid
    aria-describedby="verification-code-error"
  >
    <InputOTPGroup>
      <InputOTPSlot index={0} aria-invalid />
      <InputOTPSlot index={1} aria-invalid />
      <InputOTPSlot index={2} aria-invalid />
      <InputOTPSlot index={3} aria-invalid />
      <InputOTPSlot index={4} aria-invalid />
      <InputOTPSlot index={5} aria-invalid />
    </InputOTPGroup>
  </InputOTP>
  <FieldError id="verification-code-error">
    Enter the six-digit code exactly as it appears in your message.
  </FieldError>
</Field>
```

## Interface

| Property                    | Type                        | Default           | Meaning                                          |
| --------------------------- | --------------------------- | ----------------- | ------------------------------------------------ |
| `InputOTP.maxLength`        | `number`                    | —                 | Sets the exact maximum code length               |
| `InputOTP.pattern`          | `string`                    | —                 | Restricts accepted characters                    |
| `InputOTP.inputMode`        | `string`                    | `"numeric"`       | Selects the on-screen keyboard                   |
| `InputOTP.autoComplete`     | `string`                    | `"one-time-code"` | Enables supported verification-code autofill     |
| `InputOTP.name`             | `string`                    | —                 | Identifies the submitted form value              |
| `InputOTP.value`            | `string`                    | —                 | Controls the complete code                       |
| `InputOTP.onChange`         | `(value: string) => void`   | —                 | Runs when the complete value changes             |
| `InputOTP.onComplete`       | `(value: string) => void`   | —                 | Runs when the value reaches the maximum length   |
| `InputOTP.pasteTransformer` | `(value: string) => string` | —                 | Normalises pasted text before validation         |
| `InputOTP.disabled`         | `boolean`                   | `false`           | Prevents code entry                              |
| `InputOTP.required`         | `boolean`                   | `false`           | Requires a complete value for form submission    |
| `InputOTPSlot.index`        | `number`                    | —                 | Chooses the mirrored character, starting at zero |

InputOTP accepts the supported native input properties and `input-otp` properties. Treat the Gecko component type as authoritative.

## Accessibility

- Give every product OTP field a visible FieldLabel connected by `htmlFor` and `id`.
- Use `aria-label` only when a visible label is intentionally unavailable, such as an isolated visual demonstration.
- Preserve a single native input, full-code paste, and one-time-code autocomplete.
- Set invalid semantics on the native input and invalid styling on every slot.
- Connect descriptions and errors with `aria-describedby`.
- Keep the fake caret still when reduced motion is requested.

## Agent rules

1. Import OTP field components from `@gecko/ui/components/input-otp`.
2. Import only approved pattern constants from `input-otp`; do not render `OTPInput` directly.
3. Use OTP field only for short, fixed-length verification codes.
4. Compose product controls with Field and a visible FieldLabel.
5. Match the slot count and sequential indexes to `maxLength`.
6. Use numeric input mode for digits-only codes and text input mode for alphanumeric codes.
7. Preserve paste, autofill, selection, and password-manager behaviour.
8. Preserve Gecko’s separated, rounded slot presentation.
9. Render the complete invalid Field pattern rather than styling slots alone.

## API reference

- [Shadcn Input OTP documentation](https://ui.shadcn.com/docs/components/base/input-otp)
- [input-otp documentation](https://input-otp.rodz.dev/)

## Related

- **Field** — visible labels, descriptions, errors, and form grouping.
- **Input field** — general text and non-verification values.
