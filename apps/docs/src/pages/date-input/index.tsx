import * as React from "react"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { DateInput } from "@gecko/ui/components/date-input"
import { Field, FieldError, FieldLabel } from "@gecko/ui/components/field"
import { Code } from "@gecko/ui/components/code"

export function DateInputPage() {
  const [basicDate, setBasicDate] = React.useState<Date | undefined>(undefined)
  const [fourDigitDate, setFourDigitDate] = React.useState<Date | undefined>(undefined)
  const [americanDate, setAmericanDate] = React.useState<Date | undefined>(undefined)

  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Date field</h1>
          <p className="text-sm text-muted-foreground">
            Three segment inputs for day, month, and year (DD MM YY or DD MM YYYY). Uses the existing Input component. Supports day‑first or month‑first (American) order; focus auto‑advances when a segment is full.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Default order is day, month, then 2‑digit year (DD MM YY). Use <Code>value</Code> and{" "}
            <Code>onChange</Code> for controlled usage.
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
            Set <Code>yearDigits=4</Code> for a full year (DD MM YYYY).
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
            Set <Code>monthFirst</Code> to true for MM DD order.
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

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>disabled</Code> to lock all
            segments, or <Code>aria-invalid</Code> on
            the root so each segment shows validation styling.
          </p>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">
            Disabled
          </h3>
          <ComponentExample className="mb-6">
            <Field data-disabled>
              <FieldLabel htmlFor="date-input-states-disabled">Date</FieldLabel>
              <DateInput
                id="date-input-states-disabled"
                disabled
                aria-label="Date (disabled)"
              />
            </Field>
          </ComponentExample>

          <h3 id="states-error" className="mb-3 text-base font-semibold">
            Error
          </h3>
          <ComponentExample>
            <Field data-invalid>
              <FieldLabel htmlFor="date-input-states-error">Date</FieldLabel>
              <DateInput
                id="date-input-states-error"
                aria-invalid
                aria-label="Date (invalid)"
                aria-describedby="date-input-states-error-msg"
              />
              <FieldError id="date-input-states-error-msg">
                Enter a complete valid date using the day, month, and year fields.
              </FieldError>
            </Field>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
