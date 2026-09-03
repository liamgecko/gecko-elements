import * as React from "react";
import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { PageSection } from "@/components/layout/page-section";
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header";
import { DateInput } from "@gecko/ui/components/date-input";
import { Button } from "@gecko/ui/components/button";
import { Field, FieldError, FieldLabel } from "@gecko/ui/components/field";
import { Code } from "@gecko/ui/components/code";

export function DateInputPage() {
  const [basicDate, setBasicDate] = React.useState<Date | undefined>(undefined);
  const [twoDigitDate, setTwoDigitDate] = React.useState<Date | undefined>(
    undefined,
  );
  const [americanDate, setAmericanDate] = React.useState<Date | undefined>(
    undefined,
  );

  const importSnippet = `import { DateInput } from "@gecko/ui/components/date-input"`;

  const basicSnippet = `<DateInput
  id="date-input-basic"
  value={date}
  onChange={setDate}
  aria-label="Date"
/>`;

  const twoDigitSnippet = `<DateInput
  id="date-input-two"
  yearDigits={2}
  value={date}
  onChange={setDate}
  aria-label="Date"
/>`;

  const americanSnippet = `<DateInput
  id="date-input-american"
  monthFirst
  value={date}
  onChange={setDate}
  aria-label="Date"
/>`;

  const disabledSnippet = `<Field data-disabled>
  <FieldLabel htmlFor="date-input-states-disabled">Date</FieldLabel>
  <DateInput
    id="date-input-states-disabled"
    disabled
    aria-label="Date"
  />
</Field>`;

  const errorSnippet = `<Field data-invalid>
  <FieldLabel htmlFor="date-input-states-error">Date</FieldLabel>
  <DateInput
    id="date-input-states-error"
    aria-invalid
    aria-label="Date"
    aria-describedby="date-input-states-error-msg"
  />
  <FieldError id="date-input-states-error-msg">
    Enter a complete valid date using the day, month, and year fields.
  </FieldError>
</Field>`;

  const withinFormSnippet = `<form onSubmit={handleSubmit}>
  <Field>
    <FieldLabel htmlFor="form-date-of-birth">Date of birth</FieldLabel>
    <DateInput
      id="form-date-of-birth"
      value={dateOfBirth}
      onChange={setDateOfBirth}
      aria-label="Date of birth"
    />
  </Field>
  <Button type="submit">Save date of birth</Button>
</form>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Date field"
          description="The Date field is three small inputs for day, month, and year. People type each part in turn; focus moves to the next segment when one is full."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use a Date field for date of birth. The segmented day, month, and
              year inputs let people type a birth date without scrolling back
              many years in a calendar. Pair it with a{" "}
              <DocsPageLink to="/components/field">Field</DocsPageLink> when the
              control needs a label or validation message.
              <br />
              <br />
              Avoid using it for general date selection — especially future
              dates. Use a{" "}
              <DocsPageLink to="/components/date-picker">
                Date picker
              </DocsPageLink>{" "}
              instead.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import DateInput to add a segmented date field."
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

      <PageSection id="basic-example" label="Basic example">
        <PageSectionHeader
          title="Basic example"
          description={
            <>
              A controlled field using <Code>value</Code> and{" "}
              <Code>onChange</Code>. Default order is day, month, then a
              four-digit year. Use this when the person is typing a date in
              parts.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="date-input-basic">Date</FieldLabel>
              <DateInput
                id="date-input-basic"
                value={basicDate}
                onChange={setBasicDate}
                aria-label="Date"
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

      <PageSection id="two-digit-year" label="2-digit year">
        <PageSectionHeader
          title="2-digit year"
          description={
            <>
              A shortened year using <Code>yearDigits=&#123;2&#125;</Code>. Use
              this only when the surrounding product context makes the century
              unambiguous. Four digits remain the canonical default.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="date-input-two">Date</FieldLabel>
              <DateInput
                id="date-input-two"
                yearDigits={2}
                value={twoDigitDate}
                onChange={setTwoDigitDate}
                aria-label="Date"
              />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={twoDigitSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="american-format" label="American format">
        <PageSectionHeader
          title="American format"
          description={
            <>
              Month before day using the <Code>monthFirst</Code> prop. Use this
              when the date should be typed as month, then day, then year.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="date-input-american">Date</FieldLabel>
              <DateInput
                id="date-input-american"
                monthFirst
                value={americanDate}
                onChange={setAmericanDate}
                aria-label="Date"
              />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={americanSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="states" label="States">
        <PageSectionHeader
          title="States"
          description="The field can be unavailable or invalid. Use the state that matches whether the person can type, and whether the date is complete."
        />

        <PageSubsectionHeader
          id="states-disabled"
          title="Disabled"
          description={
            <>
              Locks every segment using the <Code>disabled</Code> prop. Use this
              when the date cannot be changed yet.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Field data-disabled>
              <FieldLabel htmlFor="date-input-states-disabled">Date</FieldLabel>
              <DateInput
                id="date-input-states-disabled"
                disabled
                aria-label="Date"
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
              field and <Code>data-invalid</Code> on the wrapper. Use this when
              the date is missing or not valid.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field data-invalid>
              <FieldLabel htmlFor="date-input-states-error">Date</FieldLabel>
              <DateInput
                id="date-input-states-error"
                aria-invalid
                aria-label="Date"
                aria-describedby="date-input-states-error-msg"
              />
              <FieldError id="date-input-states-error-msg">
                Enter a complete valid date using the day, month, and year
                fields.
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
          description="Use a controlled Date field inside the form and submit its Date value with the rest of the form state."
        />
        <ComponentExample>
          <div className="space-y-6">
            <form
              className="space-y-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <Field>
                <FieldLabel htmlFor="form-date-of-birth">
                  Date of birth
                </FieldLabel>
                <DateInput
                  id="form-date-of-birth"
                  value={basicDate}
                  onChange={setBasicDate}
                  aria-label="Date of birth"
                />
              </Field>
              <Button type="submit">Save date of birth</Button>
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
          description="Use the four-digit default and change the date order only when the product locale requires it."
        />
        <DocsDoDont
          doItems={[
            <>
              Control the date with <Code>value</Code> and <Code>onChange</Code>
              .
            </>,
            <>
              Use the default four-digit year for date of birth and other
              canonical Date fields.
            </>,
            <>
              Use <Code>monthFirst</Code> only when the field follows
              month-day-year order.
            </>,
            <>Pair an invalid Date field with a clear validation message.</>,
          ]}
          dontItems={[
            <>Don’t mix date orders within the same form.</>,
            <>
              Don’t use <Code>yearDigits=&#123;2&#125;</Code> when the century
              could be ambiguous.
            </>,
            <>
              Don’t enable <Code>monthFirst</Code> while labelling the field day
              first.
            </>,
            <>
              Don’t use <Code>disabled</Code> for a date that can still be
              changed.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Date field."
        />
        <DocsApiTable
          rows={[
            {
              name: "value",
              type: "Date | undefined",
              description:
                "Date shown across the day, month, and year segments.",
            },
            {
              name: "onChange",
              type: "(date: Date | undefined) => void",
              description:
                "Called after each edit with a valid Date, or undefined while the entry is incomplete or invalid.",
            },
            {
              name: "yearDigits",
              type: "2 | 4",
              defaultValue: "4",
              description:
                "Sets the number of year digits. Two-digit years use 00–30 for 2000–2030 and 31–99 for 1931–1999.",
            },
            {
              name: "monthFirst",
              type: "boolean",
              defaultValue: "false",
              description: "Places the month segment before the day segment.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              defaultValue: '"md"',
              description: "Matches the surrounding form field size.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Prevents editing every date segment.",
            },
            {
              name: "id",
              type: "string",
              description:
                "Connects FieldLabel to the first visible date segment.",
            },
            {
              name: "aria-label",
              type: "string",
              description:
                "Names the grouped date and prefixes the accessible name of each segment.",
            },
            {
              name: "aria-invalid",
              type: "boolean | string",
              defaultValue: "false",
              description: "Applies the invalid state to every date segment.",
            },
            {
              name: "aria-describedby",
              type: "string",
              description:
                "Connects supporting or error text to the group and every segment.",
            },
          ]}
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use these components for calendar selection and form structure."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/date-picker">
              Date picker
            </DocsPageLink>{" "}
            — for choosing a date from a month view.
          </li>
          <li>
            <DocsPageLink to="/components/calendar">Calendar</DocsPageLink> —
            for an inline month view.
          </li>
          <li>
            <DocsPageLink to="/components/field">Field</DocsPageLink> — for the
            label and validation message around a Date field.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
