import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Switch } from "@/components/ui/switch"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

export function SwitchPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
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
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              {"<Switch />"}
            </code>{" "}
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
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              Field
            </code>{" "}
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
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              disabled
            </code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              aria-invalid
            </code>{" "}
            props together with the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              Field
            </code>{" "}
            component to communicate disabled and error states.
          </p>

          <h3 id="state-disabled" className="mb-3 text-base font-semibold">Disabled</h3>
          <ComponentExample className="mb-6">
            <div className="flex flex-col gap-4">
              <Field orientation="horizontal" data-disabled className="w-fit">
                <Switch id="switch-disabled-unchecked" disabled />
                <FieldLabel htmlFor="switch-disabled-unchecked">Disabled</FieldLabel>
              </Field>
            </div>
          </ComponentExample>

          <h3 id="state-invalid" className="mb-3 text-base font-semibold">Invalid</h3>
          <ComponentExample>
            <div className="flex flex-col gap-4">
              <Field orientation="horizontal" data-invalid className="w-fit">
                <Switch id="switch-invalid-unchecked" aria-invalid="true" />
                <FieldLabel htmlFor="switch-invalid-unchecked">Invalid</FieldLabel>
              </Field>
            </div>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
