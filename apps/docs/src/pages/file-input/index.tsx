import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@gecko/ui/components/field"
import { FileInput } from "@gecko/ui/components/file-input"
import { Code } from "@gecko/ui/components/code"

export function FileInputPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">File input</h1>
          <p className="text-sm text-muted-foreground">
            Placeholder for File input component examples.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A simple file input with a placeholder. Use the{" "}
            <Code>Input</Code>{" "}
            component for file input.
          </p>
          <ComponentExample>
            <FileInput />
          </ComponentExample>
        </PageSection>

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code>disabled</Code> prop or{" "}
            <Code>aria-invalid</Code> to show disabled and validation states.
          </p>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">Disabled</h3>
          <ComponentExample className="mb-6">
            <Field data-disabled>
              <FieldLabel htmlFor="file-input-states-disabled">File</FieldLabel>
              <FileInput id="file-input-states-disabled" name="file-input-states-disabled" disabled />
            </Field>
          </ComponentExample>

          <h3 id="states-error" className="mb-3 text-base font-semibold">Error</h3>
          <ComponentExample>
            <Field data-invalid>
              <FieldLabel htmlFor="file-input-states-error">File</FieldLabel>
              <FileInput
                id="file-input-states-error"
                name="file-input-states-error"
                aria-invalid
                aria-describedby="file-input-states-error-msg"
              />
              <FieldError id="file-input-states-error-msg">
                This file type or size is not allowed. Choose a different file.
              </FieldError>
            </Field>
          </ComponentExample>
        </PageSection>

        <PageSection id="sizing" label="Sizing">
          <h2 className="text-lg font-semibold">Sizing</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code>size</Code> prop for{" "}
            <Code>sm</Code>,{" "}
            <Code>md</Code>, or{" "}
            <Code>lg</Code>. Default is <Code>md</Code>.
          </p>

          <h3 id="sizing-small" className="mb-3 text-base font-semibold">Small</h3>
          <ComponentExample className="mb-6">
            <FileInput id="file-input-size-sm" size="sm" />
          </ComponentExample>

          <h3 id="sizing-medium" className="mb-3 text-base font-semibold">Medium</h3>
          <ComponentExample className="mb-6">
            <FileInput id="file-input-size-md" size="md" />
          </ComponentExample>

          <h3 id="sizing-large" className="mb-3 text-base font-semibold">Large</h3>
          <ComponentExample>
            <FileInput id="file-input-size-lg" size="lg" />
          </ComponentExample>
        </PageSection>

        <PageSection id="required" label="Required">
          <h2 className="text-lg font-semibold">Required</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Add the <Code>required</Code> attribute so the browser enforces the field before form submit. Pair with a <Code>FieldLabel</Code> for an accessible required field.
          </p>
          <ComponentExample>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="required-file">File</FieldLabel>
                  <FileInput id="required-file" required />
                  <FieldDescription>This field is required</FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
