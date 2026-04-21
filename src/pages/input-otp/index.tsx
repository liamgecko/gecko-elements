import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { Code } from "@/components/ui/code"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

export function InputOtpPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">One time password input</h1>
          <p className="text-sm text-muted-foreground">
            Placeholder for one time password input component examples.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A 6-digit OTP input using <Code>InputOTP</Code>,{" "}
            <Code>InputOTPGroup</Code>, and{" "}
            <Code>InputOTPSlot</Code>.
          </p>
          <ComponentExample>
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </ComponentExample>
        </PageSection>

        <PageSection id="separator" label="Separator">
          <h2 className="text-lg font-semibold">Separator</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>InputOTPSeparator</Code> between slots to visually group digits (e.g. 3-3).
          </p>
          <ComponentExample>
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSeparator />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </ComponentExample>
        </PageSection>

        <PageSection id="alphanumeric" label="Alphanumeric">
          <h2 className="text-lg font-semibold">Alphanumeric</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code>pattern</Code> prop with{" "}
            <Code>REGEXP_ONLY_DIGITS_AND_CHARS</Code> from{" "}
            <Code>input-otp</Code> to allow letters and numbers.
          </p>
          <ComponentExample>
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </ComponentExample>
        </PageSection>

        <PageSection id="custom" label="Custom">
          <h2 className="text-lg font-semibold">Custom</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Control how many inputs make up the OTP by setting <Code>maxLength</Code> and rendering the same number of <Code>InputOTPSlot</Code> components (each with <Code>index</Code> 0 to maxLength − 1).
          </p>
          <ComponentExample>
            <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </ComponentExample>
        </PageSection>

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>disabled</Code> on{" "}
            <Code>InputOTP</Code> to lock the field. For
            validation styling, set <Code>aria-invalid</Code>{" "}
            on each <Code>InputOTPSlot</Code> (and on{" "}
            <Code>InputOTP</Code> so the hidden control matches
            your form state).
          </p>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">
            Disabled
          </h3>
          <ComponentExample className="mb-6">
            <Field data-disabled>
              <FieldLabel htmlFor="input-otp-states-disabled">One-time code</FieldLabel>
              <InputOTP
                id="input-otp-states-disabled"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                disabled
                aria-label="One-time code (disabled)"
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
          </ComponentExample>

          <h3 id="states-error" className="mb-3 text-base font-semibold">
            Error
          </h3>
          <ComponentExample>
            <Field data-invalid>
              <FieldLabel htmlFor="input-otp-states-error">One-time code</FieldLabel>
              <InputOTP
                id="input-otp-states-error"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                aria-label="One-time code (invalid)"
                aria-describedby="input-otp-states-error-msg"
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
              <FieldError id="input-otp-states-error-msg">
                Enter the six-digit code exactly as it appears in your message.
              </FieldError>
            </Field>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
