import { useState } from "react"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox"
import { Code } from "@/components/ui/code"

export function CheckboxPage() {
  const [groupValue, setGroupValue] = useState<string[]>(["fuji"])

  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Checkbox</h1>
          <p className="text-sm text-muted-foreground">
            A control that toggles between checked and unchecked. Use the{" "}
            <Code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              label
            </Code>
            {" "}
            and
            <Code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              description
            </Code>
            {" "}
            props for accessible labeling and helper text.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic">
          <h2 className="text-lg font-semibold">Basic</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Provide a label for accessible naming. The checkbox and label are
            laid out automatically.
          </p>
          <ComponentExample>
            <Checkbox id="terms" label="Accept terms and conditions" />
          </ComponentExample>
        </PageSection>

        <PageSection id="with-description" label="With description">
          <h2 className="text-lg font-semibold">With description</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Add optional helper text below the label with the{" "}
            <Code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              description
            </Code>
            {" "}
            prop.
          </p>
          <ComponentExample>
            <div className="max-w-sm">
              <Checkbox
                id="terms-desc"
                name="terms-desc"
                defaultChecked
                label="Accept terms and conditions"
                description="By clicking this checkbox, you agree to the terms."
              />
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Default, checked, indeterminate, disabled, and error states.
          </p>

          <h3 id="states-default" className="mb-3 text-base font-semibold">Default</h3>
          <ComponentExample className="mb-6">
            <Checkbox id="states-default" label="Unchecked" />
          </ComponentExample>

          <h3 id="states-checked" className="mb-3 text-base font-semibold">Checked</h3>
          <ComponentExample className="mb-6">
            <Checkbox id="states-checked" defaultChecked label="Checked" />
          </ComponentExample>

          <h3 id="states-indeterminate" className="mb-3 text-base font-semibold">Indeterminate</h3>
          <ComponentExample className="mb-6">
            <Checkbox
              id="states-indeterminate"
              indeterminate
              readOnly
              label="Indeterminate"
            />
          </ComponentExample>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">Disabled</h3>
          <ComponentExample className="mb-6">
            <Checkbox id="states-disabled" disabled label="Disabled" />
          </ComponentExample>

          <h3 id="states-error" className="mb-3 text-base font-semibold">Error</h3>
          <ComponentExample>
            <Checkbox
              id="states-error"
              aria-invalid
              label="Accept terms and conditions"
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="checkbox-group" label="Checkbox group">
          <h2 className="text-lg font-semibold">Checkbox group</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use CheckboxGroup for a list of options with shared state.
          </p>
          <ComponentExample>
            <CheckboxGroup
              label="Select your favourite apples"
              value={groupValue}
              onValueChange={setGroupValue}
            >
              <Checkbox id="group-fuji" value="fuji" label="Fuji" />
              <Checkbox id="group-gala" value="gala" label="Gala" />
              <Checkbox id="group-granny-smith" value="granny-smith" label="Granny Smith" />
              <Checkbox id="group-honeycrisp" value="honeycrisp" label="Honeycrisp" />
            </CheckboxGroup>
          </ComponentExample>
        </PageSection>

        <PageSection id="as-button" label="As button">
          <h2 className="text-lg font-semibold">As button</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">asButton</Code> prop to
            render the checkbox as an outline-style button. Checked state uses a
            darker border and gray-100 background; hover state is applied.
          </p>
          <h3 id="as-button-basic" className="mb-3 text-base font-semibold">Basic</h3>
          <ComponentExample className="mb-8">
            <div className="flex flex-wrap gap-2">
              <Checkbox asButton id="as-button-basic" label="Checkbox as button" />
              <Checkbox
                asButton
                id="as-button-checked"
                defaultChecked
                label="Checked button"
              />
            </div>
          </ComponentExample>

          <h3 id="as-button-with-description" className="mb-3 text-base font-semibold">With description</h3>
          <ComponentExample>
            <div className="max-w-sm">
              <Checkbox
                asButton
                id="as-button-desc"
                name="as-button-desc"
                label="Accept terms and conditions"
                description="By clicking this checkbox, you agree to the terms and conditions."
              />
            </div>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
