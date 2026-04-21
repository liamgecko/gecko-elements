"use client"

import { SensitiveField } from "@/components/ui/sensitive-field"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Code } from "@/components/ui/code"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"

export function SensitiveFieldPage() {

  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Sensitive field</h1>
          <p className="text-pretty text-sm text-muted-foreground">
            A masked input that stays read-only until the user triggers the eye
            control. While masked, the field always shows ten bullets (not one
            per character), so value length is not revealed. When visible, the
            value is shown and the field is editable. Built with the input group
            components.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              SensitiveField
            </Code>{" "}
            for API keys, secrets, and other values that stay hidden until the
            user chooses to reveal them.
          </p>
          <ComponentExample>
            <SensitiveField defaultValue="sk_live_example_secret" />
          </ComponentExample>
        </PageSection>

        <PageSection id="sizing" label="Sizing">
          <h2 className="text-lg font-semibold">Sizing</h2>
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

          <h3 id="sizing-small" className="mb-3 text-base font-semibold">
            Small
          </h3>
          <ComponentExample className="mb-6">
            <SensitiveField size="sm" defaultValue="secret" />
          </ComponentExample>

          <h3 id="sizing-medium" className="mb-3 text-base font-semibold">
            Medium
          </h3>
          <ComponentExample className="mb-6">
            <SensitiveField size="md" defaultValue="secret" />
          </ComponentExample>

          <h3 id="sizing-large" className="mb-3 text-base font-semibold">
            Large
          </h3>
          <ComponentExample>
            <SensitiveField size="lg" defaultValue="secret" />
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
              <FieldLabel htmlFor="sensitive-field-states-disabled">API key</FieldLabel>
              <SensitiveField
                id="sensitive-field-states-disabled"
                name="sensitive-field-states-disabled"
                defaultValue="secret"
                disabled
              />
            </Field>
          </ComponentExample>

          <h3 id="states-error" className="mb-3 text-base font-semibold">
            Error
          </h3>
          <ComponentExample>
            <Field data-invalid>
              <FieldLabel htmlFor="sensitive-field-states-error">API key</FieldLabel>
              <SensitiveField
                id="sensitive-field-states-error"
                name="sensitive-field-states-error"
                defaultValue="secret"
                aria-invalid
                aria-describedby="sensitive-field-states-error-msg"
              />
              <FieldError id="sensitive-field-states-error-msg">
                This API key format is not valid. Check the value and try again.
              </FieldError>
            </Field>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
