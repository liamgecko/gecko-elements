import { useState } from "react"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { TelephoneField } from "@gecko/ui/components/telephone-field"
import { Code } from "@gecko/ui/components/code"
import { Field, FieldError, FieldLabel } from "@gecko/ui/components/field"

export function TelephoneFieldPage() {
  const [value, setValue] = useState<string>("")

  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">
            Telephone field
          </h1>
          <p className="text-sm text-muted-foreground">
            Phone number input with an international country selector. Built with{" "}
            <Code>
              react-phone-number-input
            </Code>{" "}
            and the design system&apos;s input and popover components.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              TelephoneField
            </Code>{" "}
            component for collecting phone numbers with a country selector in a popover.
          </p>
          <ComponentExample>
            <TelephoneField
              placeholder="Enter a phone number"
              value={value}
              onChange={(next) => setValue((next as string) || "")}
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="default-country" label="Default country">
          <h2 className="text-lg font-semibold">Default country</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              defaultCountry
            </Code>{" "}
            prop to preselect the country (e.g. United Kingdom).
          </p>
          <ComponentExample>
            <TelephoneField
              defaultCountry="GB"
              placeholder="Enter a phone number"
              value={value}
              onChange={(next) => setValue((next as string) || "")}
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="force-international-format" label="Force international format">
          <h2 className="text-lg font-semibold">Force international format</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              international
            </Code>{" "}
            prop to always show the number with the country calling code in the input (e.g.{" "}
            <Code>+44 7911 123456</Code>).
          </p>
          <ComponentExample>
            <TelephoneField
              international
              defaultCountry="GB"
              placeholder="Enter a phone number"
              value={value}
              onChange={(next) => setValue((next as string) || "")}
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="sizes" label="Sizes">
          <h2 className="text-lg font-semibold">Sizes</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              size
            </Code>{" "}
            prop for{" "}
            <Code>
              sm
            </Code>
            ,{" "}
            <Code>
              md
            </Code>
            , or{" "}
            <Code>
              lg
            </Code>
            . Default is{" "}
            <Code>
              md
            </Code>
            . Matches the Input component sizing.
          </p>

          <h3 id="sizes-small" className="mb-3 text-base font-semibold">
            Small
          </h3>
          <ComponentExample className="mb-6">
            <TelephoneField
              size="sm"
              defaultCountry="GB"
              placeholder="Enter a phone number"
              value={value}
              onChange={(next) => setValue((next as string) || "")}
            />
          </ComponentExample>

          <h3 id="sizes-medium" className="mb-3 text-base font-semibold">
            Medium
          </h3>
          <ComponentExample className="mb-6">
            <TelephoneField
              size="md"
              defaultCountry="GB"
              placeholder="Enter a phone number"
              value={value}
              onChange={(next) => setValue((next as string) || "")}
            />
          </ComponentExample>

          <h3 id="sizes-large" className="mb-3 text-base font-semibold">
            Large
          </h3>
          <ComponentExample>
            <TelephoneField
              size="lg"
              defaultCountry="GB"
              placeholder="Enter a phone number"
              value={value}
              onChange={(next) => setValue((next as string) || "")}
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              disabled
            </Code>{" "}
            prop or{" "}
            <Code>
              aria-invalid
            </Code>{" "}
            to show disabled and validation states.
          </p>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">
            Disabled
          </h3>
          <ComponentExample className="mb-6">
            <Field data-disabled>
              <FieldLabel htmlFor="telephone-field-states-disabled">Phone</FieldLabel>
              <TelephoneField
                id="telephone-field-states-disabled"
                name="telephone-field-states-disabled"
                defaultCountry="GB"
                placeholder="Enter a phone number"
                disabled
              />
            </Field>
          </ComponentExample>

          <h3 id="states-error" className="mb-3 text-base font-semibold">
            Error
          </h3>
          <ComponentExample>
            <Field data-invalid>
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
            </Field>
          </ComponentExample>
        </PageSection>
    </div>
  )
}

