import * as React from "react"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { DateInput } from "@/components/ui/date-input"
import { Field, FieldLabel } from "@/components/ui/field"

export function DateInputPage() {
  const [basicDate, setBasicDate] = React.useState<Date | undefined>(undefined)
  const [fourDigitDate, setFourDigitDate] = React.useState<Date | undefined>(undefined)
  const [americanDate, setAmericanDate] = React.useState<Date | undefined>(undefined)

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-semibold text-foreground">Date input</h1>
          <p className="text-sm text-muted-foreground">
            Three segment inputs for day, month, and year (DD MM YY or DD MM YYYY). Uses the existing Input component. Supports day‑first or month‑first (American) order; focus auto‑advances when a segment is full.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Default order is day, month, then 2‑digit year (DD MM YY). Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">value</code> and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">onChange</code> for controlled usage.
          </p>
          <ComponentExample>
            <Field>
              <FieldLabel htmlFor="date-input-basic">Date</FieldLabel>
              <DateInput
                id="date-input-basic"
                value={basicDate}
                onChange={setBasicDate}
                aria-label="Date (day month year)"
              />
            </Field>
          </ComponentExample>
        </PageSection>

        <PageSection id="four-digit-year" label="4-digit year">
          <h2 className="text-lg font-semibold">4-digit year</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Set <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">yearDigits=4</code> for a full year (DD MM YYYY).
          </p>
          <ComponentExample>
            <Field>
              <FieldLabel htmlFor="date-input-four">Date</FieldLabel>
              <DateInput
                id="date-input-four"
                yearDigits={4}
                value={fourDigitDate}
                onChange={setFourDigitDate}
                aria-label="Date (day month year)"
              />
            </Field>
          </ComponentExample>
        </PageSection>

        <PageSection id="american-format" label="American format">
          <h2 className="text-lg font-semibold">American format</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Set <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">monthFirst</code> to true for MM DD order.
          </p>
          <ComponentExample>
            <Field>
              <FieldLabel htmlFor="date-input-american">Date</FieldLabel>
              <DateInput
                id="date-input-american"
                monthFirst
                value={americanDate}
                onChange={setAmericanDate}
                aria-label="Date (month day year)"
              />
            </Field>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
