import { ComponentExample } from "@/components/layout/component-example"

import { Code } from "@gecko/ui/components/code"
import { PageSection } from "@/components/layout/page-section"
import { Switch } from "@gecko/ui/components/switch"
import { Field, FieldContent, FieldError } from "@gecko/ui/components/field"

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
              label
            </Code>{" "}
            and{" "}
            <Code>
              description
            </Code>{" "}
            props for accessible naming and helper text.
          </p>

          <h3 id="label-and-description-label" className="mb-3 text-base font-semibold">Label</h3>
          <ComponentExample className="mb-6">
            <Switch id="switch-label" label="Switch with label" />
          </ComponentExample>

          <h3 id="label-and-description-label-desc" className="mb-3 text-base font-semibold">Label and description</h3>
          <ComponentExample>
            <div className="max-w-sm">
              <Switch
                id="switch-label-desc"
                label="Switch with label and description"
                description="Focus is shared across devices, and turns off when you leave the app."
              />
            </div>
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
            <Switch id="switch-disabled-unchecked" disabled label="Disabled" />
          </ComponentExample>

          <h3 id="state-error" className="mb-3 text-base font-semibold">Error</h3>
          <ComponentExample>
            <Field orientation="horizontal" data-invalid className="max-w-md">
              <FieldContent>
                <Switch
                  id="switch-invalid-unchecked"
                  label="Invalid"
                  aria-invalid="true"
                  aria-describedby="switch-invalid-unchecked-error"
                />
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
