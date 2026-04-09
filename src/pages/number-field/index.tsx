import { ComponentExample } from "@/components/layout/component-example"

import { Code } from "@/components/ui/code"
import { PageSection } from "@/components/layout/page-section"
import { NumberField } from "@/components/ui/number-field"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"

export function NumberFieldPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">
            Number field
          </h1>
          <p className="text-sm text-muted-foreground">
            Numeric input with increment and decrement controls. Built on Base
            UI&apos;s <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">NumberField</Code>{" "}
            primitive.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
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
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              size
            </Code>{" "}
            prop for{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              sm
            </Code>
            ,{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              md
            </Code>
            , or{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              lg
            </Code>
            . Default is{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
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
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              disabled
            </Code>{" "}
            prop or{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              aria-invalid
            </Code>{" "}
            to show disabled and validation states.
          </p>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">
            Disabled
          </h3>
          <ComponentExample className="mb-6">
            <NumberField defaultValue={10} disabled />
          </ComponentExample>

          <h3 id="states-invalid" className="mb-3 text-base font-semibold">
            Invalid
          </h3>
          <ComponentExample>
            <NumberField defaultValue={10} aria-invalid />
          </ComponentExample>
        </PageSection>

        <PageSection id="within-form" label="Within form">
          <h2 className="text-lg font-semibold">Within form</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Field</Code> to pair a number
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
