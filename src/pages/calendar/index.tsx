import { useState } from "react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"

export function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  })
  const [dropdownDate, setDropdownDate] = useState<Date | undefined>(new Date())
  const year = new Date().getFullYear()
  const [bookedDate, setBookedDate] = useState<Date | undefined>(
    new Date(year, 0, 6)
  )
  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new Date(year, 0, 12 + i)
  )

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
          <p className="text-sm text-muted-foreground">
            A calendar component for selecting a date or a range of dates, built
            on React DayPicker.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic">
          <h2 className="text-lg font-semibold">Basic</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A basic calendar with single-date selection. Use{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
              mode="single"
            </code>{" "}
            with <code className="rounded bg-muted px-1.5 py-0.5 text-xs">selected</code> and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">onSelect</code>.
          </p>
          <ComponentExample>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border"
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="date-range" label="Date range">
          <h2 className="text-lg font-semibold">Date range</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">mode="range"</code> to
            let users select a range of dates. Shown here with two months.
          </p>
          <ComponentExample>
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className="rounded-lg border"
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="month-year" label="Month and year selector">
          <h2 className="text-lg font-semibold">Month and year selector</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">captionLayout="dropdown"</code> to
            show month and year dropdowns for quick navigation.
          </p>
          <ComponentExample>
            <Calendar
              mode="single"
              selected={dropdownDate}
              onSelect={setDropdownDate}
              captionLayout="dropdown"
              className="rounded-lg border"
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="booked-dates" label="Booked dates">
          <h2 className="text-lg font-semibold">Booked dates</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Disable specific dates with the <code className="rounded bg-muted px-1.5 py-0.5 text-xs">disabled</code> prop
            and use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">modifiers</code> and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs">modifiersClassNames</code> to
            style them (e.g. booked or unavailable).
          </p>
          <ComponentExample>
            <Calendar
              mode="single"
              defaultMonth={bookedDate}
              selected={bookedDate}
              onSelect={setBookedDate}
              disabled={bookedDates}
              modifiers={{ booked: bookedDates }}
              modifiersClassNames={{
                booked: "[&>button]:line-through opacity-100",
              }}
              className="rounded-lg border"
            />
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
