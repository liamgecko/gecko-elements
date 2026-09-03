import { useState } from "react";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@gecko/ui/components/calendar";
import { Code } from "@gecko/ui/components/code";
import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { PageSection } from "@/components/layout/page-section";
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header";

export function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });
  const [dropdownDate, setDropdownDate] = useState<Date | undefined>(
    new Date(),
  );
  const year = new Date().getFullYear();
  const [bookedDate, setBookedDate] = useState<Date | undefined>(
    new Date(year, 0, 6),
  );
  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new Date(year, 0, 12 + i),
  );

  const importSnippet = `import { Calendar } from "@gecko/ui/components/calendar"`;

  const basicExampleSnippet = `<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>`;

  const dateRangeSnippet = `<Calendar
  mode="range"
  defaultMonth={dateRange?.from}
  selected={dateRange}
  onSelect={setDateRange}
  numberOfMonths={2}
/>`;

  const monthYearSnippet = `const currentYear = new Date().getFullYear()

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  captionLayout="dropdown"
  startMonth={new Date(currentYear - 10, 0)}
  endMonth={new Date(currentYear + 10, 11)}
/>`;

  const bookedDatesSnippet = `<Calendar
  mode="single"
  defaultMonth={date}
  selected={date}
  onSelect={setDate}
  bookedDates={bookedDates}
/>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Calendar"
          description="The Calendar component lets people pick a day, or a stretch of days, from a month view. It is the calendar itself — not a field in a form."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Calendar inside a{" "}
              <DocsPageLink to="/components/date-picker">
                Date picker
              </DocsPageLink>{" "}
              for choosing future or general dates. Standalone Calendar on a
              page is uncommon in Gecko today.
              <br />
              <br />
              Avoid using it for date of birth — use a{" "}
              <DocsPageLink to="/components/date-field">
                Date field
              </DocsPageLink>
              . Avoid using it to display a schedule.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import Calendar to show a month people can pick from."
        />
        <ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={importSnippet}
            showCopyButton
            copyLabel="Copy import"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="basic" label="Basic example">
        <PageSectionHeader
          title="Basic example"
          description={
            <>
              A single date using <Code>mode=&quot;single&quot;</Code> with{" "}
              <Code>selected</Code> and <Code>onSelect</Code>. Use this when the
              person is choosing one day.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Calendar mode="single" selected={date} onSelect={setDate} />
            <Code
              variant="block"
              language="tsx"
              code={basicExampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="date-range" label="Date range">
        <PageSectionHeader
          title="Date range"
          description={
            <>
              A start and end date using <Code>mode=&quot;range&quot;</Code>.
              This example also sets <Code>numberOfMonths=&#123;2&#125;</Code>.
              Use this when the person is choosing a start and end date.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
            <Code
              variant="block"
              language="tsx"
              code={dateRangeSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="month-year" label="Month and year selector">
        <PageSectionHeader
          title="Month and year selector"
          description={
            <>
              Month and year dropdowns using{" "}
              <Code>captionLayout=&quot;dropdown&quot;</Code>. Always set{" "}
              <Code>startMonth</Code> and <Code>endMonth</Code> to boundaries
              that match the task.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Calendar
              mode="single"
              selected={dropdownDate}
              onSelect={setDropdownDate}
              captionLayout="dropdown"
              startMonth={new Date(year - 10, 0)}
              endMonth={new Date(year + 10, 11)}
            />
            <Code
              variant="block"
              language="tsx"
              code={monthYearSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="booked-dates" label="Booked dates">
        <PageSectionHeader
          title="Booked dates"
          description={
            <>
              Pass booked days to <Code>bookedDates</Code>. Calendar disables
              them and applies the approved booked treatment automatically.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Calendar
              mode="single"
              defaultMonth={bookedDate}
              selected={bookedDate}
              onSelect={setBookedDate}
              bookedDates={bookedDates}
            />
            <Code
              variant="block"
              language="tsx"
              code={bookedDatesSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Use mode for one day or a range. Do not restyle the calendar cells."
        />
        <DocsDoDont
          doItems={[
            <>
              Use <Code>mode=&quot;single&quot;</Code> with{" "}
              <Code>selected</Code> and <Code>onSelect</Code> when choosing one
              day.
            </>,
            <>
              Use <Code>mode=&quot;range&quot;</Code> and{" "}
              <Code>numberOfMonths</Code> when choosing a start and end date.
            </>,
            <>
              Set <Code>captionLayout=&quot;dropdown&quot;</Code>,{" "}
              <Code>startMonth</Code> and <Code>endMonth</Code> when people need
              to jump far from the current month.
            </>,
            <>
              Use <Code>bookedDates</Code> for booked days. Use{" "}
              <Code>disabled</Code> for other dates that cannot be selected.
            </>,
          ]}
          dontItems={[
            <>Don’t use a Calendar to display a schedule.</>,
            <>
              Don’t use it when the person only needs to type a date. Use a{" "}
              <DocsPageLink to="/components/date-field">
                Date field
              </DocsPageLink>
              .
            </>,
            <>
              Don’t leave a range on one month if two months would make the
              stretch easier to see.
            </>,
            <>
              Don’t override <Code>buttonVariant</Code>, <Code>components</Code>
              , <Code>classNames</Code>, <Code>modifiers</Code>,{" "}
              <Code>modifiersClassNames</Code>, formatters or day styling
              without agreement.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Calendar."
        />
        <DocsApiTable
          rows={[
            {
              name: "mode",
              type: '"single" | "range" | "multiple"',
              description:
                "What the person is choosing. Single and range are approved. Multiple requires agreement before use.",
            },
            {
              name: "selected",
              type: "Date | DateRange | Date[]",
              description: "The current selection. Pair with onSelect.",
            },
            {
              name: "onSelect",
              type: "function",
              description: "Called when a day is chosen.",
            },
            {
              name: "numberOfMonths",
              type: "number",
              defaultValue: "1",
              description: "How many months to show. Use 2 for a range.",
            },
            {
              name: "captionLayout",
              type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"',
              defaultValue: '"label"',
              description:
                "Month navigation. Use dropdown when people need to jump far.",
            },
            {
              name: "startMonth",
              type: "Date",
              description:
                "Earliest navigable month. Required with a dropdown caption.",
            },
            {
              name: "endMonth",
              type: "Date",
              description:
                "Latest navigable month. Required with a dropdown caption.",
            },
            {
              name: "showOutsideDays",
              type: "boolean",
              defaultValue: "true",
              description:
                "Shows adjacent-month dates to preserve the month grid.",
            },
            {
              name: "disabled",
              type: "Matcher | Matcher[]",
              description:
                "Non-booked dates that cannot be selected, such as dates outside an allowed period.",
            },
            {
              name: "bookedDates",
              type: "Matcher | Matcher[]",
              description:
                "Booked dates. Calendar disables and styles them automatically.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-reference"
          className="mt-6"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://daypicker.dev/api">
                React DayPicker API
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/calendar">
                Shadcn Calendar documentation
              </DocsExternalLink>{" "}
              for the underlying API and source composition.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use a different control when the Calendar is the wrong shape for the job."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/date-picker">
              Date picker
            </DocsPageLink>{" "}
            — when the calendar should open from a field.
          </li>
          <li>
            <DocsPageLink to="/components/date-field">Date field</DocsPageLink>{" "}
            — when the person only needs to type a date.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
