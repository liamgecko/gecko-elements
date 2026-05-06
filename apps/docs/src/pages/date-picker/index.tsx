import { useState } from "react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"
import { parseDate } from "chrono-node"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Code } from "@gecko/ui/components/code"
import { DatePicker } from "@gecko/ui/components/date-picker"
import { Field, FieldError, FieldLabel } from "@gecko/ui/components/field"

function formatLongDate(date: Date | undefined) {
  if (!date) return ""
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function DatePickerPage() {
  const [basicDate, setBasicDate] = useState<Date | undefined>()
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })
  const [dobDate, setDobDate] = useState<Date | undefined>(undefined)
  const [subscriptionDate, setSubscriptionDate] = useState<Date | undefined>(
    new Date("2025-06-01")
  )
  const [timeDate, setTimeDate] = useState<Date | undefined>(undefined)
  const [naturalValue, setNaturalValue] = useState("In 2 days")
  const [naturalDate, setNaturalDate] = useState<Date | undefined>(
    parseDate("In 2 days") || undefined
  )

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <h1 className="text-2xl font-bold text-foreground">Date picker</h1>
        <p className="text-sm text-muted-foreground">
          Choose single dates or ranges using a calendar-based picker.
        </p>
      </PageSection>

      <PageSection id="basic" label="Basic">
        <h2 className="text-lg font-semibold">Basic</h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Single-date pickers default to a native <Code>type=&quot;date&quot;</Code> field plus calendar (
          <Code>trigger=&quot;input&quot;</Code>, or omit <Code>trigger</Code>). Use <Code>ArrowDown</Code> on the field to open the calendar.{" "}
          <Code>variant=&quot;default&quot;</Code> is implied when you omit <Code>variant</Code>.
        </p>
        <ComponentExample>
          <Field className="w-44">
            <FieldLabel htmlFor="date-picker-basic">Date</FieldLabel>
            <DatePicker
              id="date-picker-basic"
              value={basicDate}
              onChange={setBasicDate}
              placeholder="Select a date"
            />
          </Field>
        </ComponentExample>
      </PageSection>

      <PageSection id="range" label="Range picker">
        <h2 className="text-lg font-semibold">Range picker</h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Select a start and end date for booking windows or reporting periods. Range mode always uses an outline button trigger (native date inputs do not apply to a range).
        </p>
        <ComponentExample>
          <Field className="w-60">
            <FieldLabel htmlFor="date-picker-range">Date range</FieldLabel>
            <DatePicker
              id="date-picker-range"
              mode="range"
              value={rangeDate}
              onChange={setRangeDate}
              numberOfMonths={2}
              placeholder="Select a date"
            />
          </Field>
        </ComponentExample>
      </PageSection>

      <PageSection id="dob" label="Date of birth">
        <h2 className="text-lg font-semibold">Date of birth</h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Use <Code>variant=&quot;dob&quot;</Code> for month/year dropdowns in the calendar. With the default native date field (
          <Code>trigger=&quot;input&quot;</Code>), the input shows the browser&apos;s date format; use{" "}
          <Code>trigger=&quot;button&quot;</Code> if you want a locale-style date label on the trigger instead.
        </p>
        <ComponentExample>
          <Field className="w-44">
            <FieldLabel htmlFor="date-of-birth">Date of birth</FieldLabel>
            <DatePicker
              id="date-of-birth"
              variant="dob"
              value={dobDate}
              onChange={setDobDate}
              placeholder="Select a date"
            />
          </Field>
        </ComponentExample>
      </PageSection>

      <PageSection id="button-trigger" label="Button trigger">
        <h2 className="text-lg font-semibold">Button trigger</h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Set <Code>trigger=&quot;button&quot;</Code> on a single <Code>variant=&quot;default&quot;</Code> or{" "}
          <Code>variant=&quot;dob&quot;</Code> picker to use the outline button instead of the native date field.
        </p>
        <ComponentExample>
          <Field className="w-56">
            <FieldLabel htmlFor="date-required">Subscription date</FieldLabel>
            <DatePicker
              id="date-required"
              trigger="button"
              value={subscriptionDate}
              onChange={setSubscriptionDate}
              placeholder="Select a date"
            />
          </Field>
        </ComponentExample>
      </PageSection>

      <PageSection id="time-picker" label="Time picker">
        <h2 className="text-lg font-semibold">Time picker</h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Use <Code>variant=&quot;time&quot;</Code> for a date button with calendar plus a native time field in one control.
        </p>
        <ComponentExample>
          <DatePicker
            variant="time"
            id="date-picker-time"
            value={timeDate}
            onChange={setTimeDate}
            placeholder="Select a date"
            className="w-full max-w-48"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="natural-language" label="Natural language">
        <h2 className="text-lg font-semibold">Natural language</h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Use <Code>variant=&quot;natural&quot;</Code> with <Code>textValue</Code> / <Code>onTextChange</Code> and optional{" "}
          <Code>parseText</Code> for phrases like &quot;next Friday&quot;.
        </p>
        <ComponentExample>
          <Field className="max-w-xs">
            <FieldLabel htmlFor="date-optional">Schedule date</FieldLabel>
            <DatePicker
              id="date-optional"
              variant="natural"
              value={naturalDate}
              onChange={setNaturalDate}
              textValue={naturalValue}
              onTextChange={setNaturalValue}
              textPlaceholder="Tomorrow or next week"
              parseText={(raw) => parseDate(raw) || undefined}
              formatTextFromDate={formatLongDate}
            />
            <div className="text-xs text-muted-foreground">
              Your post will be published on{" "}
              <span className="font-medium">
                {formatLongDate(naturalDate)}
              </span>
              .
            </div>
          </Field>
        </ComponentExample>
      </PageSection>

      <PageSection id="states" label="States">
        <h2 className="text-lg font-semibold">States</h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Pass <Code>disabled</Code> on <Code>DatePicker</Code>, or <Code>aria-invalid</Code> on the native date field (
          default <Code>trigger=&quot;input&quot;</Code> for <Code>default</Code> / <Code>dob</Code>) and on{" "}
          <Code>variant=&quot;natural&quot;</Code> for validation styling.
        </p>

        <h3 id="states-disabled" className="mb-3 text-base font-semibold">
          Disabled
        </h3>
        <ComponentExample className="mb-6">
          <Field data-disabled>
            <FieldLabel htmlFor="date-picker-states-disabled">Date</FieldLabel>
            <DatePicker
              id="date-picker-states-disabled"
              disabled
              aria-label="Date (disabled)"
              className="w-full max-w-48"
            />
          </Field>
        </ComponentExample>

        <h3 id="states-error" className="mb-3 text-base font-semibold">
          Error
        </h3>
        <ComponentExample>
          <Field data-invalid>
            <FieldLabel htmlFor="date-picker-states-error">Date</FieldLabel>
            <DatePicker
              id="date-picker-states-error"
              aria-invalid
              aria-label="Date (invalid)"
              className="w-full max-w-48"
              aria-describedby="date-picker-states-error-msg"
            />
            <FieldError id="date-picker-states-error-msg">
              Choose a valid date using the calendar or type a correct value.
            </FieldError>
          </Field>
        </ComponentExample>
      </PageSection>
    </div>
  )
}
