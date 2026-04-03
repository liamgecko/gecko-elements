import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { Code } from "@/components/ui/code"

export function InputOtpPage() {
  return (
    <div className="flex gap-5.5">
      <div className="flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">One time password input</h1>
          <p className="text-sm text-muted-foreground">
            Placeholder for one time password input component examples.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A 6-digit OTP input using <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">InputOTP</Code>,{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">InputOTPGroup</Code>, and{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">InputOTPSlot</Code>.
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
            Use <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">InputOTPSeparator</Code> between slots to visually group digits (e.g. 3-3).
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
            Use the <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">pattern</Code> prop with{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">REGEXP_ONLY_DIGITS_AND_CHARS</Code> from{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">input-otp</Code> to allow letters and numbers.
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
            Control how many inputs make up the OTP by setting <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">maxLength</Code> and rendering the same number of <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">InputOTPSlot</Code> components (each with <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">index</Code> 0 to maxLength − 1).
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
      </div>
      <PageSectionNav />
    </div>
  )
}
