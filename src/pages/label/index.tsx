import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LabelPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-semibold text-foreground">Label</h1>
          <p className="text-sm text-muted-foreground">
            Placeholder for Label component examples.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Label</code> with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">htmlFor</code> to associate the label with a form control.
          </p>
          <ComponentExample>
            <Label htmlFor="email">Your email address</Label>
          </ComponentExample>
        </PageSection>

        <PageSection id="within-form" label="Within form">
          <h2 className="text-lg font-semibold">Within form</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">FieldLabel</code> inside{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Field</code> to pair a label with an input.
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
            Add the <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">required</code> attribute to the input so the browser enforces the field before submit. Pair with <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">FieldLabel</code> for an accessible required field.
          </p>
          <ComponentExample>
            <Field>
              <FieldLabel htmlFor="required-email">Your email address</FieldLabel>
              <Input id="required-email" type="email" required />
            </Field>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
