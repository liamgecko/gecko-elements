import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Code } from "@/components/ui/code"

export function LabelPage() {
  return (
    <div className="flex gap-5.5">
      <div className="flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Label</h1>
          <p className="text-sm text-muted-foreground">
            Placeholder for Label component examples.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Label</Code> with{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">htmlFor</Code> to associate the label with a form control.
          </p>
          <ComponentExample>
            <Label htmlFor="email">Your email address</Label>
          </ComponentExample>
        </PageSection>

        <PageSection id="within-form" label="Within form">
          <h2 className="text-lg font-semibold">Within form</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">FieldLabel</Code> inside{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Field</Code> to pair a label with an input.
          </p>
          <ComponentExample>
            <Field>
              <FieldLabel htmlFor="email">Your email address</FieldLabel>
              <Input id="email" placeholder="you@example.com" />
            </Field>
          </ComponentExample>
        </PageSection>

        <PageSection id="required-field" label="Required field">
          <h2 className="text-lg font-semibold">Required field</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Add the <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">required</Code> attribute to the input so the browser enforces the field before submit. Pair with <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">FieldLabel</Code> for an accessible required field.
          </p>
          <ComponentExample>
            <Field>
              <FieldLabel htmlFor="required-email">Your email address</FieldLabel>
              <Input id="required-email" type="email" required placeholder="you@example.com" />
            </Field>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
