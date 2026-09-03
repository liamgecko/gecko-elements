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
import { NumberField } from "@gecko/ui/components/number-field";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@gecko/ui/components/field";
import { Button } from "@gecko/ui/components/button";

export function NumberFieldPage() {
  const importSnippet = `import { NumberField } from "@gecko/ui/components/number-field"`;

  const basicExampleSnippet = `<NumberField
  aria-label="Amount"
  id="amount"
  name="amount"
  defaultValue={100}
/>`;

  const sizesSnippet = `<NumberField aria-label="Quantity" size="sm|md|lg" />`;

  const disabledSnippet = `<Field data-disabled>
  <FieldLabel htmlFor="number-field-states-disabled">Amount</FieldLabel>
  <NumberField
    id="number-field-states-disabled"
    name="number-field-states-disabled"
    defaultValue={10}
    disabled
  />
</Field>`;

  const errorSnippet = `<Field data-invalid>
  <FieldLabel htmlFor="number-field-states-error">Amount</FieldLabel>
  <NumberField
    id="number-field-states-error"
    name="number-field-states-error"
    defaultValue={10}
    aria-invalid
    aria-describedby="number-field-states-error-msg"
  />
  <FieldError id="number-field-states-error-msg">
    Enter a valid amount within the allowed range.
  </FieldError>
</Field>`;

  const withinFormSnippet = `<form onSubmit={handleSubmit}>
  <FieldSet>
    <FieldLegend>Booking details</FieldLegend>
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="tickets">Tickets</FieldLabel>
        <FieldContent>
          <NumberField
            id="tickets"
            name="tickets"
            defaultValue={2}
            min={1}
            max={10}
            required
          />
          <FieldDescription>
            Choose between 1 and 10 tickets.
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
    <Button type="submit">Save booking</Button>
  </FieldSet>
</form>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Number field"
          description="The Number field is a numeric input with increment and decrement controls. People can type a value or step it up and down."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use a Number field exclusively for numeric quantities — counts and
              amounts where stepper controls help. Pair it with a{" "}
              <DocsPageLink to="/components/field">Field</DocsPageLink> when the
              control needs a label, help text, or validation.
              <br />
              <br />
              Avoid using it for free-form text or values that are not numeric —
              use an{" "}
              <DocsPageLink to="/components/input">
                Input field
              </DocsPageLink>{" "}
              instead.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import NumberField to add a numeric input with steppers."
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
          description="The default Number field allows direct entry or stepper controls."
        />
        <ComponentExample>
          <div className="space-y-6">
            <NumberField
              aria-label="Amount"
              id="amount"
              name="amount"
              defaultValue={100}
            />
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

      <PageSection id="sizes" label="Sizes">
        <PageSectionHeader
          title="Sizes"
          description="Choose the size that matches the surrounding form controls. Medium is the default."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-col items-start gap-4">
              <NumberField
                aria-label="Small quantity"
                size="sm"
                defaultValue={8}
              />
              <NumberField
                aria-label="Medium quantity"
                size="md"
                defaultValue={16}
              />
              <NumberField
                aria-label="Large quantity"
                size="lg"
                defaultValue={24}
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={sizesSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="states" label="States">
        <PageSectionHeader
          title="States"
          description="The field can be unavailable or invalid. Use the state that matches whether the person can change the value, and whether it is valid."
        />

        <PageSubsectionHeader
          id="states-disabled"
          title="Disabled"
          description={
            <>
              Blocks the field using the <Code>disabled</Code> prop. Use this
              when the value cannot be changed yet.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Field data-disabled>
              <FieldLabel htmlFor="number-field-states-disabled">
                Amount
              </FieldLabel>
              <NumberField
                id="number-field-states-disabled"
                name="number-field-states-disabled"
                defaultValue={10}
                disabled
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
              control and <Code>data-invalid</Code> on the field. Use this when
              the value is out of range or otherwise invalid.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field data-invalid>
              <FieldLabel htmlFor="number-field-states-error">
                Amount
              </FieldLabel>
              <NumberField
                id="number-field-states-error"
                name="number-field-states-error"
                defaultValue={10}
                aria-invalid
                aria-describedby="number-field-states-error-msg"
              />
              <FieldError id="number-field-states-error-msg">
                Enter a valid amount within the allowed range.
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
          description="Compose Number field with Field when its value needs a visible label, guidance, or constraints."
        />
        <ComponentExample>
          <div className="space-y-6">
            <form onSubmit={(event) => event.preventDefault()}>
              <FieldSet>
                <FieldLegend>Booking details</FieldLegend>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="tickets">Tickets</FieldLabel>
                    <FieldContent>
                      <NumberField
                        id="tickets"
                        name="tickets"
                        defaultValue={2}
                        min={1}
                        max={10}
                        required
                      />
                      <FieldDescription>
                        Choose between 1 and 10 tickets.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldGroup>
                <Button type="submit">Save booking</Button>
              </FieldSet>
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
          description="Use the Number field for numeric values that benefit from stepper controls."
        />
        <DocsDoDont
          doItems={[
            <>
              Set <Code>size</Code> to match the surrounding form controls.
            </>,
            <>
              Pair the control with a <Code>FieldLabel</Code> when the value
              needs context.
            </>,
            <>
              Use constraints such as <Code>min</Code> when the valid range is
              known.
            </>,
            <>
              Set <Code>aria-invalid</Code> and connect a{" "}
              <Code>FieldError</Code> for invalid values.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use a Number field for values that are numeric in appearance
              but are not quantities, such as phone numbers.
            </>,
            <>
              Don’t rely on the stepper controls to explain the expected value.
            </>,
            <>Don’t use the disabled state to represent a validation error.</>,
            <>
              Don’t use it for free-form text. Use an{" "}
              <DocsPageLink to="/components/input">Input field</DocsPageLink>.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Number field."
        />
        <DocsApiTable
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              defaultValue: '"md"',
              description:
                "Sets the control width, height, text size, and padding.",
            },
            {
              name: "defaultValue",
              type: "number",
              description:
                "Sets the initial value when the field is uncontrolled.",
            },
            {
              name: "value",
              type: "number | null",
              description: "Controls the current numeric value.",
            },
            {
              name: "onValueChange",
              type: "(value: number | null, details) => void",
              description: "Runs whenever the numeric value changes.",
            },
            {
              name: "onValueCommitted",
              type: "(value: number | null, details) => void",
              description:
                "Runs when typing is committed or a stepper interaction ends.",
            },
            {
              name: "name",
              type: "string",
              description: "Identifies the value when a form is submitted.",
            },
            {
              name: "min",
              type: "number",
              description: "Sets the minimum valid value.",
            },
            {
              name: "max",
              type: "number",
              description: "Sets the maximum valid value.",
            },
            {
              name: "step",
              type: 'number | "any"',
              defaultValue: "1",
              description:
                "Sets the amount used by stepper and keyboard interactions.",
            },
            {
              name: "required",
              type: "boolean",
              defaultValue: "false",
              description: "Requires a value when the form is submitted.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Prevents typing and using the increment or decrement controls.",
            },
            {
              name: "readOnly",
              type: "boolean",
              defaultValue: "false",
              description:
                "Prevents changes while keeping the value focusable and selectable.",
            },
            {
              name: "format",
              type: "Intl.NumberFormatOptions",
              description: "Formats the displayed numeric value.",
            },
            {
              name: "locale",
              type: "Intl.LocalesArgument",
              description:
                "Sets the locale used to parse and format the value.",
            },
            {
              name: "aria-label",
              type: "string",
              description:
                "Names the input when a visible FieldLabel is not present.",
            },
            {
              name: "aria-describedby",
              type: "string",
              description:
                "Connects the input to supporting or validation text.",
            },
            {
              name: "aria-invalid",
              type: "boolean",
              defaultValue: "false",
              description:
                "Marks the value as invalid for styling and assistive technology.",
            },
            {
              name: "decrementAriaLabel",
              type: "string",
              defaultValue: '"Decrease value"',
              description: "Names the decrement button.",
            },
            {
              name: "incrementAriaLabel",
              type: "string",
              defaultValue: '"Increase value"',
              description: "Names the increment button.",
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
              <DocsExternalLink href="https://base-ui.com/react/components/number-field#api-reference">
                Base UI Number Field API
              </DocsExternalLink>{" "}
              for the underlying behaviour and extended API.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use a related form component when the value or context differs."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/input">Input field</DocsPageLink> —
            for free-form or non-quantity values.
          </li>
          <li>
            <DocsPageLink to="/components/field">Field</DocsPageLink> — to add a
            label, help text, and validation.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
