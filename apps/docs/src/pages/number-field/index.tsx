import { ComponentExample } from "@/components/layout/component-example"

import { Code } from "@gecko/ui/components/code"
import { PageSection } from "@/components/layout/page-section"
import { NumberField } from "@gecko/ui/components/number-field"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@gecko/ui/components/field"

export function NumberFieldPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">
            Number field
          </h1>
          <p className="text-sm text-muted-foreground">
            Numeric input with increment and decrement controls. Built on Base
            UI&apos;s <Code>NumberField</Code>{" "}
            primitive.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              NumberField
            </Code>{" "}
            component for numeric inputs that need simple up and down controls.
          </p>
          <ComponentExample>
            <NumberField id="amount" name="amount" defaultValue={100} />
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
            .
          </p>

          <h3 id="sizes-small" className="mb-3 text-base font-semibold">
            Small
          </h3>
          <ComponentExample className="mb-6">
            <NumberField size="sm" defaultValue={8} />
          </ComponentExample>

          <h3 id="sizes-medium" className="mb-3 text-base font-semibold">
            Medium
          </h3>
          <ComponentExample className="mb-6">
            <NumberField size="md" defaultValue={16} />
          </ComponentExample>

          <h3 id="sizes-large" className="mb-3 text-base font-semibold">
            Large
          </h3>
          <ComponentExample>
            <NumberField size="lg" defaultValue={24} />
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
              <FieldLabel htmlFor="number-field-states-disabled">Amount</FieldLabel>
              <NumberField
                id="number-field-states-disabled"
                name="number-field-states-disabled"
                defaultValue={10}
                disabled
              />
            </Field>
          </ComponentExample>

          <h3 id="states-error" className="mb-3 text-base font-semibold">
            Error
          </h3>
          <ComponentExample>
            <Field data-invalid>
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
            </Field>
          </ComponentExample>
        </PageSection>

        <PageSection id="within-form" label="Within form">
          <h2 className="text-lg font-semibold">Within form</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>Field</Code> to pair a number
            field with a label and help text inside a form.
          </p>
          <ComponentExample>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="tickets">Tickets</FieldLabel>
                  <FieldContent>
                    <NumberField id="tickets" name="tickets" defaultValue={2} min={0} />
                    <FieldDescription>
                      Choose how many tickets to include in this booking.
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldGroup>
            </FieldSet>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
