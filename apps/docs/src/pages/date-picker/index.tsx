import { useState } from "react";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";

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
import { Code } from "@gecko/ui/components/code";
import { Button } from "@gecko/ui/components/button";
import { DatePicker } from "@gecko/ui/components/date-picker";
import { Field, FieldError, FieldLabel } from "@gecko/ui/components/field";

export function DatePickerPage() {
  const [basicDate, setBasicDate] = useState<Date | undefined>();
  const [rangeDate, setRangeDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });
  const [dobDate, setDobDate] = useState<Date | undefined>(undefined);
  const [subscriptionDate, setSubscriptionDate] = useState<Date | undefined>(
    new Date("2025-06-01"),
  );
  const [timeDate, setTimeDate] = useState<Date | undefined>(undefined);

  const importSnippet = `import { DatePicker } from "@gecko/ui/components/date-picker"`;

  const basicSnippet = `<DatePicker
  id="date-picker-basic"
  value={date}
  onChange={setDate}
  placeholder="Select a date"
/>`;

  const rangeSnippet = `<DatePicker
  id="date-picker-range"
  mode="range"
  value={range}
  onChange={setRange}
  numberOfMonths={2}
  placeholder="Select a date"
/>`;

  const dobSnippet = `<DatePicker
  id="date-of-birth"
  variant="dob"
  value={date}
  onChange={setDate}
  placeholder="Select a date"
/>`;

  const buttonTriggerSnippet = `<DatePicker
  id="date-required"
  trigger="button"
  value={date}
  onChange={setDate}
  placeholder="Select a date"
/>`;

  const timeSnippet = `<DatePicker
  variant="time"
  id="date-picker-time"
  value={date}
  onChange={setDate}
  placeholder="Select a date"
/>`;

  const disabledSnippet = `<Field data-disabled>
  <FieldLabel htmlFor="date-picker-states-disabled">Date</FieldLabel>
  <DatePicker
    id="date-picker-states-disabled"
    disabled
    aria-label="Date (disabled)"
  />
</Field>`;

  const errorSnippet = `<Field data-invalid>
  <FieldLabel htmlFor="date-picker-states-error">Date</FieldLabel>
  <DatePicker
    id="date-picker-states-error"
    aria-invalid
    aria-label="Date (invalid)"
    aria-describedby="date-picker-states-error-msg"
  />
  <FieldError id="date-picker-states-error-msg">
    Choose a valid date using the calendar or type a correct value.
  </FieldError>
</Field>`;

  const withinFormSnippet = `<form onSubmit={handleSubmit}>
  <Field>
    <FieldLabel htmlFor="form-subscription-date">Subscription date</FieldLabel>
    <DatePicker
      id="form-subscription-date"
      value={subscriptionDate}
      onChange={setSubscriptionDate}
      aria-label="Subscription date"
    />
  </Field>
  <Button type="submit">Save subscription</Button>
</form>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Date picker"
          description="The Date picker is a field for choosing a day — or a stretch of days — from a calendar. People can type a date or open the calendar."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use a Date picker for date fields that typically involve future
              dates — event dates, deadlines, and similar. It belongs next to a
              label, like any other field.
              <br />
              <br />
              Avoid using it for date of birth — use a{" "}
              <DocsPageLink to="/components/date-field">
                Date field
              </DocsPageLink>{" "}
              instead. Avoid using it to display a schedule on the page without
              a field — use a{" "}
              <DocsPageLink to="/components/calendar">Calendar</DocsPageLink>{" "}
              instead.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import DatePicker to add a date field with a calendar."
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

      <PageSection id="basic" label="Basic">
        <PageSectionHeader
          title="Basic"
          description={
            <>
              A single date using <Code>value</Code> and <Code>onChange</Code>.
              The default trigger is a native date field. Use this when the
              person is choosing one day.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field className="w-44">
              <FieldLabel htmlFor="date-picker-basic">Date</FieldLabel>
              <DatePicker
                id="date-picker-basic"
                value={basicDate}
                onChange={setBasicDate}
                placeholder="Select a date"
              />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={basicSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="range" label="Range picker">
        <PageSectionHeader
          title="Range picker"
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
            <Code
              variant="block"
              language="tsx"
              code={rangeSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="dob" label="Date of birth">
        <PageSectionHeader
          title="Date of birth"
          description={
            <>
              Month and year dropdowns in the calendar using{" "}
              <Code>variant=&quot;dob&quot;</Code>. In Gecko, prefer a{" "}
              <DocsPageLink to="/components/date-field">
                Date field
              </DocsPageLink>{" "}
              for date of birth. Use this variant only when a calendar-based
              picker is required.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
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
            <Code
              variant="block"
              language="tsx"
              code={dobSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="button-trigger" label="Button trigger">
        <PageSectionHeader
          title="Button trigger"
          description={
            <>
              Opens the calendar from a button using{" "}
              <Code>trigger=&quot;button&quot;</Code>. Use this when a native
              date field is not the right control.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
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
            <Code
              variant="block"
              language="tsx"
              code={buttonTriggerSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="with-time" label="With time">
        <PageSectionHeader
          title="With time"
          description={
            <>
              A date and a time together using{" "}
              <Code>variant=&quot;time&quot;</Code>. Use this when the person
              must choose both the day and the clock time.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <DatePicker
              variant="time"
              id="date-picker-time"
              value={timeDate}
              onChange={setTimeDate}
              placeholder="Select a date"
              className="w-full max-w-48"
            />
            <Code
              variant="block"
              language="tsx"
              code={timeSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="states" label="States">
        <PageSectionHeader
          title="States"
          description="The field can be unavailable or invalid. Use the state that matches whether the person can choose, and whether the date is required."
        />

        <PageSubsectionHeader
          id="states-disabled"
          title="Disabled"
          description={
            <>
              Blocks the field using the <Code>disabled</Code> prop. Use this
              when the date cannot be changed yet.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Field data-disabled>
              <FieldLabel htmlFor="date-picker-states-disabled">
                Date
              </FieldLabel>
              <DatePicker
                id="date-picker-states-disabled"
                disabled
                aria-label="Date (disabled)"
                className="w-full max-w-48"
              />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={disabledSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="states-error"
          title="Error"
          description={
            <>
              Shows a validation error using <Code>aria-invalid</Code> on the
              picker and <Code>data-invalid</Code> on the field. Use this when a
              date is required before continuing.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
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
            <Code
              variant="block"
              language="tsx"
              code={errorSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="within-form" label="Within form">
        <PageSectionHeader
          title="Within form"
          description="Use a controlled Date picker inside the form and submit its Date value with the rest of the form state."
        />
        <ComponentExample>
          <div className="space-y-6">
            <form
              className="space-y-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <Field>
                <FieldLabel htmlFor="form-subscription-date">
                  Subscription date
                </FieldLabel>
                <DatePicker
                  id="form-subscription-date"
                  value={subscriptionDate}
                  onChange={setSubscriptionDate}
                  aria-label="Subscription date"
                  className="w-full max-w-48"
                />
              </Field>
              <Button type="submit">Save subscription</Button>
            </form>
            <Code
              variant="block"
              language="tsx"
              code={withinFormSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Choose the picker variant that matches the date format. Do not restyle the field or calendar chrome."
        />
        <DocsDoDont
          doItems={[
            <>
              Use a visible <Code>FieldLabel</Code> to name the date being
              requested.
            </>,
            <>
              Use <Code>mode=&quot;range&quot;</Code> for a start and end date.
            </>,
            <>
              Pair <Code>aria-invalid</Code> with a visible{" "}
              <Code>FieldError</Code>.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use Date picker for date of birth. Use a{" "}
              <DocsPageLink to="/components/date-field">
                Date field
              </DocsPageLink>
              .
            </>,
            <>
              Don’t use <Code>variant=&quot;time&quot;</Code> when only a
              calendar date is needed.
            </>,
            <>
              Don’t use <Code>trigger=&quot;button&quot;</Code> when a date
              field is the clearer control.
            </>,
            <>
              Don’t make an unavailable picker look active; use{" "}
              <Code>disabled</Code>.
            </>,
            <>
              Don’t override the trigger, input, or calendar chrome with{" "}
              <Code>className</Code>.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on DatePicker."
        />
        <DocsApiTable
          rows={[
            {
              name: "mode",
              type: '"single" | "range"',
              defaultValue: '"single"',
              description: "Chooses one date or a start and end date.",
            },
            {
              name: "variant",
              type: '"default" | "dob" | "time"',
              defaultValue: '"default"',
              description: "Selects the date entry behaviour.",
            },
            {
              name: "trigger",
              type: '"input" | "button"',
              defaultValue: '"input"',
              description: "Opens the calendar from a date input or button.",
            },
            {
              name: "value",
              type: "Date | DateRange | undefined",
              description: "Controls the selected date or range.",
            },
            {
              name: "onChange",
              type: "(value: Date | DateRange | undefined) => void",
              description: "Runs when the selection changes.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Makes the picker unavailable.",
            },
            {
              name: "placeholder",
              type: "string",
              defaultValue: '"Select a date"',
              description: "Labels an empty picker.",
            },
            {
              name: "aria-label",
              type: "string",
              description:
                "Names the field and provides context for its calendar button.",
            },
            {
              name: "calendarButtonAriaLabel",
              type: "string",
              description:
                "Overrides the calendar button's derived accessible name.",
            },
            {
              name: "aria-invalid",
              type: "boolean | string",
              defaultValue: "false",
              description: "Applies the invalid state to the date input.",
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
              </DocsExternalLink>
              {", "}
              <DocsExternalLink href="https://date-fns.org/docs/Getting-Started">
                date-fns documentation
              </DocsExternalLink>
              {", the "}
              <DocsExternalLink href="https://base-ui.com/react/components/popover">
                Base UI Popover API
              </DocsExternalLink>{" "}
              and the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/date-picker">
                Shadcn Date Picker documentation
              </DocsExternalLink>{" "}
              for the underlying APIs and source composition.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use a simpler date control when a composed picker is not needed."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/calendar">Calendar</DocsPageLink> —
            when the calendar should remain visible.
          </li>
          <li>
            <DocsPageLink to="/components/date-field">Date field</DocsPageLink>{" "}
            — when direct date entry is enough.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
