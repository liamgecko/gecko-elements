import { useState } from "react";
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
import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@gecko/ui/components/field";
import { TelephoneField } from "@gecko/ui/components/telephone-field";

export function TelephoneFieldPage() {
  const [value, setValue] = useState<string>("");

  const importSnippet = `import { TelephoneField } from "@gecko/ui/components/telephone-field"`;

  const basicExampleSnippet = `const [value, setValue] = useState("")

<TelephoneField
  aria-label="Telephone number"
  placeholder="Enter a phone number"
  value={value}
  onChange={setValue}
/>`;

  const defaultCountrySnippet = `<TelephoneField
  aria-label="Telephone number"
  defaultCountry="GB"
  placeholder="Enter a phone number"
  value={value}
  onChange={setValue}
/>`;

  const internationalSnippet = `<TelephoneField
  aria-label="Telephone number"
  international
  defaultCountry="GB"
  placeholder="Enter a phone number"
  value={value}
  onChange={setValue}
/>`;

  const sizesSnippet = `<TelephoneField
  aria-label="Telephone number"
  size="sm|md|lg"
  defaultCountry="GB"
  placeholder="Enter a phone number"
/>`;

  const disabledSnippet = `<Field data-disabled>
  <FieldLabel htmlFor="telephone-field-states-disabled">Phone</FieldLabel>
  <TelephoneField
    id="telephone-field-states-disabled"
    name="telephone-field-states-disabled"
    defaultCountry="GB"
    placeholder="Enter a phone number"
    disabled
  />
</Field>`;

  const errorSnippet = `<Field data-invalid>
  <FieldLabel htmlFor="telephone-field-states-error">Phone</FieldLabel>
  <TelephoneField
    id="telephone-field-states-error"
    name="telephone-field-states-error"
    defaultCountry="GB"
    placeholder="Enter a phone number"
    aria-invalid
    aria-describedby="telephone-field-states-error-msg"
  />
  <FieldError id="telephone-field-states-error-msg">
    Enter a valid phone number for the selected country.
  </FieldError>
</Field>`;

  const withinFormSnippet = `<form onSubmit={handleSubmit}>
  <Field>
    <FieldLabel htmlFor="contact-telephone">Telephone number</FieldLabel>
    <TelephoneField
      id="contact-telephone"
      name="telephone"
      autoComplete="tel"
      defaultCountry="GB"
      placeholder="Enter a phone number"
      aria-describedby="contact-telephone-description"
      required
    />
    <FieldDescription id="contact-telephone-description">
      Include a number where the contact can be reached.
    </FieldDescription>
  </Field>
  <Button type="submit">Save contact details</Button>
</form>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Telephone field"
          description="A Gecko phone number control combining Input and Dropdown menu with react-phone-number-input formatting and country metadata."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Telephone field when a form needs a phone number with country
              selection. Pair it with a{" "}
              <DocsPageLink to="/components/field">Field</DocsPageLink> for
              labels and validation. The country list opens in a{" "}
              <DocsPageLink to="/components/dropdown-menu">
                Dropdown menu
              </DocsPageLink>
              .
              <br />
              <br />
              Use an{" "}
              <DocsPageLink to="/components/input">
                Input field
              </DocsPageLink>{" "}
              for values that are not telephone numbers.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import the telephone control required by the interface."
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
          description="A telephone number input with an international country selector."
        />
        <ComponentExample>
          <div className="space-y-6">
            <TelephoneField
              aria-label="Telephone number"
              placeholder="Enter a phone number"
              value={value}
              onChange={setValue}
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

      <PageSection id="default-country" label="Default country">
        <PageSectionHeader
          title="Default country"
          description="Preselect a country when the form has a reliable regional default."
        />
        <ComponentExample>
          <div className="space-y-6">
            <TelephoneField
              aria-label="Telephone number"
              defaultCountry="GB"
              placeholder="Enter a phone number"
              value={value}
              onChange={setValue}
            />
            <Code
              variant="block"
              language="tsx"
              code={defaultCountrySnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection
        id="force-international-format"
        label="Force international format"
      >
        <PageSectionHeader
          title="Force international format"
          description="Keep the country calling code visible when the stored or displayed value must use international format."
        />
        <ComponentExample>
          <div className="space-y-6">
            <TelephoneField
              aria-label="Telephone number"
              international
              defaultCountry="GB"
              placeholder="Enter a phone number"
              value={value}
              onChange={setValue}
            />
            <Code
              variant="block"
              language="tsx"
              code={internationalSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="sizes" label="Sizes">
        <PageSectionHeader
          title="Sizes"
          description="Telephone field is available in three sizes. Match the surrounding controls."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="space-y-3">
              <TelephoneField
                aria-label="Small telephone number"
                size="sm"
                defaultCountry="GB"
                placeholder="Small"
              />
              <TelephoneField
                aria-label="Medium telephone number"
                size="md"
                defaultCountry="GB"
                placeholder="Medium"
              />
              <TelephoneField
                aria-label="Large telephone number"
                size="lg"
                defaultCountry="GB"
                placeholder="Large"
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
          description="Demonstrate unavailable and validation states."
        />
        <PageSubsectionHeader
          id="states-disabled"
          title="Disabled"
          description="Use this when the telephone number cannot be edited."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Field data-disabled>
              <FieldLabel htmlFor="telephone-field-states-disabled">
                Phone
              </FieldLabel>
              <TelephoneField
                id="telephone-field-states-disabled"
                name="telephone-field-states-disabled"
                defaultCountry="GB"
                placeholder="Enter a phone number"
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
          description="Connect the invalid control to a clear validation message."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field data-invalid>
              <FieldLabel htmlFor="telephone-field-states-error">
                Phone
              </FieldLabel>
              <TelephoneField
                id="telephone-field-states-error"
                name="telephone-field-states-error"
                defaultCountry="GB"
                placeholder="Enter a phone number"
                aria-invalid
                aria-describedby="telephone-field-states-error-msg"
              />
              <FieldError id="telephone-field-states-error-msg">
                Enter a valid phone number for the selected country.
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
          description="Give the control a submitted name, a visible label, and telephone autocomplete."
        />
        <ComponentExample>
          <div className="space-y-6">
            <form
              className="space-y-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <Field>
                <FieldLabel htmlFor="contact-telephone">
                  Telephone number
                </FieldLabel>
                <TelephoneField
                  id="contact-telephone"
                  name="telephone"
                  autoComplete="tel"
                  defaultCountry="GB"
                  placeholder="Enter a phone number"
                  aria-describedby="contact-telephone-description"
                  required
                />
                <FieldDescription id="contact-telephone-description">
                  Include a number where the contact can be reached.
                </FieldDescription>
              </Field>
              <Button type="submit">Save contact details</Button>
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
          description="Collect telephone numbers with the country context needed to interpret them."
        />
        <DocsDoDont
          doItems={[
            <>Choose a sensible regional default when one is known.</>,
            <>
              Keep the calling code visible when international format matters.
            </>,
            <>Match the size of neighbouring fields.</>,
            <>Show a clear validation message when the number is not valid.</>,
          ]}
          dontItems={[
            <>
              Don’t use Telephone field for non-phone values. Use an{" "}
              <DocsPageLink to="/components/input">Input field</DocsPageLink>.
            </>,
            <>Don’t assume a country without a reliable regional default.</>,
            <>Don’t remove the country selector from international forms.</>,
            <>
              Don’t mix local and international display formats without a clear
              requirement.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Telephone field."
        />
        <DocsApiTable
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              defaultValue: '"md"',
              description:
                "Sets the country selector and telephone input size.",
            },
            {
              name: "value",
              type: "E164Number | string",
              description: "Controls the current telephone number.",
            },
            {
              name: "onChange",
              type: '(value: E164Number | "") => void',
              description:
                "Receives the E.164 number, or an empty string when cleared.",
            },
            {
              name: "defaultCountry",
              type: "Country",
              description:
                "Preselects the country used to interpret a national number.",
            },
            {
              name: "countries",
              type: "Country[]",
              description: "Limits the countries available for selection.",
            },
            {
              name: "international",
              type: "boolean",
              defaultValue: "false",
              description: "Uses international formatting for the input.",
            },
            {
              name: "countryCallingCodeEditable",
              type: "boolean",
              description:
                "Controls whether the calling code can be edited in international mode.",
            },
            {
              name: "onCountryChange",
              type: "(country?: Country) => void",
              description: "Runs when the selected country changes.",
            },
            {
              name: "limitMaxLength",
              type: "boolean",
              defaultValue: "false",
              description:
                "Limits input to the selected country’s maximum length.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Prevents interaction with both controls.",
            },
            {
              name: "readOnly",
              type: "boolean",
              defaultValue: "false",
              description:
                "Prevents the telephone number and country changing.",
            },
            {
              name: "name",
              type: "string",
              description: "Names the submitted telephone value.",
            },
            {
              name: "autoComplete",
              type: "string",
              defaultValue: '"tel"',
              description: "Sets the browser autocomplete purpose.",
            },
            {
              name: "aria-invalid",
              type: "boolean | string",
              defaultValue: "false",
              description: "Exposes the invalid state to assistive technology.",
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
              <DocsExternalLink href="https://catamphetamine.gitlab.io/react-phone-number-input/">
                react-phone-number-input documentation
              </DocsExternalLink>{" "}
              for the complete formatting and country-selection API.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use standard form components around the telephone control."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/input">Input field</DocsPageLink> —
            for values that are not telephone numbers.
          </li>
          <li>
            <DocsPageLink to="/components/field">Field</DocsPageLink> — for the
            label, description, and validation message.
          </li>
          <li>
            <DocsPageLink to="/components/dropdown-menu">
              Dropdown menu
            </DocsPageLink>{" "}
            — for the searchable country selector.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
