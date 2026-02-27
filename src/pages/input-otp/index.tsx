import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"

export function InputOtpPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-2">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-semibold text-foreground">Input Otp</h1>
        <p className="text-sm text-muted-foreground">
          Placeholder for Input Otp component examples.
        </p>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
