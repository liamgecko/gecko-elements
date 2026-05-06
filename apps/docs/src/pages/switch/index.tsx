import { ComponentExample } from "@/components/layout/component-example"

import { Code } from "@gecko/ui/components/code"
import { PageSection } from "@/components/layout/page-section"
import { Switch } from "@gecko/ui/components/switch"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@gecko/ui/components/field"

export function SwitchPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Switch</h1>
          <p className="text-sm text-muted-foreground">
            A simple toggle input for switching between on and off states.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              {"<Switch />"}
            </Code>{" "}
            component to render a standalone toggle.
          </p>
          <ComponentExample>
            <Switch />
          </ComponentExample>
        </PageSection>

        <PageSection id="label-and-description" label="Label and description">
          <h2 className="text-lg font-semibold">Label and description</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              Field
            </Code>{" "}
            component to pair switches with labels and optional descriptive text.
          </p>

          <h3 id="label-and-description-label" className="mb-3 text-base font-semibold">Label</h3>
          <ComponentExample className="mb-6">
            <Field orientation="horizontal" className="max-w-sm">
              <Switch id="switch-label" />
              <FieldContent>
                <FieldLabel htmlFor="switch-label">Switch with label</FieldLabel>
              </FieldContent>
            </Field>
          </ComponentExample>

          <h3 id="label-and-description-label-desc" className="mb-3 text-base font-semibold">Label and description</h3>
          <ComponentExample>
            <Field orientation="horizontal" className="max-w-sm">
              <Switch id="switch-label-desc" />
              <FieldContent>
                <FieldLabel htmlFor="switch-label-desc">
                  Switch with label and description
                </FieldLabel>
                <FieldDescription>
                  Focus is shared across devices, and turns off when you leave the
                  app.
                </FieldDescription>
              </FieldContent>
            </Field>
          </ComponentExample>
        </PageSection>

        <PageSection id="state" label="State">
          <h2 className="text-lg font-semibold">State</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              disabled
            </Code>{" "}
            and{" "}
            <Code>
              aria-invalid
            </Code>{" "}
            props together with the{" "}
            <Code>
              Field
            </Code>{" "}
            component to communicate disabled and error states.
          </p>

          <h3 id="state-disabled" className="mb-3 text-base font-semibold">Disabled</h3>
          <ComponentExample className="mb-6">
            <Field orientation="horizontal" data-disabled>
              <Switch id="switch-disabled-unchecked" disabled />
              <FieldLabel htmlFor="switch-disabled-unchecked">Disabled</FieldLabel>
            </Field>
          </ComponentExample>

          <h3 id="state-error" className="mb-3 text-base font-semibold">Error</h3>
          <ComponentExample>
            <Field orientation="horizontal" data-invalid className="max-w-md">
              <FieldContent>
                <Switch
                  id="switch-invalid-unchecked"
                  aria-invalid="true"
                  aria-describedby="switch-invalid-unchecked-error"
                />
                <FieldLabel htmlFor="switch-invalid-unchecked">Invalid</FieldLabel>
                <FieldError id="switch-invalid-unchecked-error">
                  This setting must be corrected before you can continue.
                </FieldError>
              </FieldContent>
            </Field>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
