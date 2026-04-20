import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Code } from "@/components/ui/code"

export function LabelPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Label</h1>
          <p className="text-sm text-muted-foreground">
            Placeholder for Label component examples.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>Label</Code> with{" "}
            <Code>htmlFor</Code> to associate the label with a form control.
          </p>
          <ComponentExample>
            <Label htmlFor="email">Your email address</Label>
          </ComponentExample>
        </PageSection>

        <PageSection id="within-form" label="Within form">
          <h2 className="text-lg font-semibold">Within form</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>FieldLabel</Code> inside{" "}
            <Code>Field</Code> to pair a label with an input.
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
            Add the <Code>required</Code> attribute to the input so the browser enforces the field before submit. Pair with <Code>FieldLabel</Code> for an accessible required field.
          </p>
          <ComponentExample>
            <Field>
              <FieldLabel htmlFor="required-email">Your email address</FieldLabel>
              <Input id="required-email" type="email" required placeholder="you@example.com" />
            </Field>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
