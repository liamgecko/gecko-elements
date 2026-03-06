import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Input</h1>
          <p className="text-sm text-muted-foreground">
            Text input for forms. Supports placeholder, disabled, invalid state, and file type.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            A simple text input with a placeholder. Use the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Input</code>{" "}
            component for single-line text entry.
          </p>
          <ComponentExample>
            <Input type="text" placeholder="Enter your email" />
          </ComponentExample>
        </PageSection>

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">disabled</code> prop or{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">aria-invalid</code> to show disabled and validation states.
          </p>

          <h3 className="mb-3 text-base font-semibold">Disabled</h3>
          <ComponentExample className="mb-6">
            <Input type="text" placeholder="Disabled input" disabled />
          </ComponentExample>

          <h3 className="mb-3 text-base font-semibold">Invalid</h3>
          <ComponentExample>
            <Input type="text" placeholder="Invalid input" aria-invalid />
          </ComponentExample>
        </PageSection>

        <PageSection id="required" label="Required">
          <h2 className="text-lg font-semibold">Required</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Add the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">required</code> attribute so the browser enforces the field before form submit. Pair with a <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">FieldLabel</code> for an accessible required field.
          </p>
          <ComponentExample>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="required-input">Email</FieldLabel>
                  <Input id="required-input" type="text" placeholder="you@example.com" required />
                </Field>
              </FieldGroup>
            </FieldSet>
          </ComponentExample>
        </PageSection>

        <PageSection id="sizing" label="Sizing">
          <h2 className="text-lg font-semibold">Sizing</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">size</code> prop for{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">sm</code>,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">md</code>, or{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">lg</code>. Default is <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">md</code>.
          </p>

          <h3 className="mb-3 text-base font-semibold">Small</h3>
          <ComponentExample className="mb-6">
            <Input id="input-size-sm" size="sm" type="text" placeholder="Small" />
          </ComponentExample>

          <h3 className="mb-3 text-base font-semibold">Medium</h3>
          <ComponentExample className="mb-6">
            <Input id="input-size-md" size="md" type="text" placeholder="Medium" />
          </ComponentExample>

          <h3 className="mb-3 text-base font-semibold">Large</h3>
          <ComponentExample>
            <Input id="input-size-lg" size="lg" type="text" placeholder="Large" />
          </ComponentExample>
        </PageSection>

        <PageSection id="inline" label="Inline">
          <h2 className="text-lg font-semibold">Inline</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Field</code> with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">orientation="horizontal"</code> to place an input and button side by side.
          </p>
          <ComponentExample>
            <Field orientation="horizontal">
              <Input type="search" placeholder="Search..." />
              <Button>Search</Button>
            </Field>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
