"use client"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { FileInput } from "@/components/ui/file-input"
import { Code } from "@/components/ui/code"

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
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Input</Code>{" "}
            component for file input.
          </p>
          <ComponentExample>
            <FileInput />
          </ComponentExample>
        </PageSection>

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">disabled</Code> prop or{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">aria-invalid</Code> to show disabled and validation states.
          </p>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">Disabled</h3>
          <ComponentExample className="mb-6">
            <FileInput disabled />
          </ComponentExample>

          <h3 id="states-invalid" className="mb-3 text-base font-semibold">Invalid</h3>
          <ComponentExample>
            <FileInput aria-invalid />
          </ComponentExample>
        </PageSection>

        <PageSection id="sizing" label="Sizing">
          <h2 className="text-lg font-semibold">Sizing</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">size</Code> prop for{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">sm</Code>,{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">md</Code>, or{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">lg</Code>. Default is <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">md</Code>.
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
            Add the <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">required</Code> attribute so the browser enforces the field before form submit. Pair with a <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">FieldLabel</Code> for an accessible required field.
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
