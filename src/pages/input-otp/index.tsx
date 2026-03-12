import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"

export function InputOtpPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">One time password input</h1>
          <p className="text-sm text-muted-foreground">
            Placeholder for one time password input component examples.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A 6-digit OTP input using <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">InputOTP</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">InputOTPGroup</code>, and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">InputOTPSlot</code>.
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
            Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">InputOTPSeparator</code> between slots to visually group digits (e.g. 3-3).
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
            Use the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">pattern</code> prop with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">REGEXP_ONLY_DIGITS_AND_CHARS</code> from{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">input-otp</code> to allow letters and numbers.
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
            Control how many inputs make up the OTP by setting <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">maxLength</code> and rendering the same number of <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">InputOTPSlot</code> components (each with <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">index</code> 0 to maxLength − 1).
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
