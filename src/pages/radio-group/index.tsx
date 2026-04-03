import { useState } from "react"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Field, FieldLabel } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Code } from "@/components/ui/code"

export function RadioGroupPage() {
  const [groupValue, setGroupValue] = useState<string>("fuji")
  const [asButtonValue, setAsButtonValue] = useState<string>("a")
  const [asButtonDescValue, setAsButtonDescValue] = useState<string>("terms")

  return (
    <div className="flex gap-5.5">
      <div className="flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Radio group</h1>
          <p className="text-sm text-muted-foreground">
            A control for selecting one option from a set. Use the{" "}
            <Code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              label
            </Code>
            and{" "}
            <Code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              description
            </Code>
            props for accessible labeling and helper text.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic">
          <h2 className="text-lg font-semibold">Basic</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Provide a label for accessible naming. The radio and label are laid
            out automatically.
          </p>
          <ComponentExample>
            <RadioGroup value="option-a" onValueChange={() => {}}>
              <RadioGroupItem id="basic-a" value="option-a" label="Option A" />
            </RadioGroup>
          </ComponentExample>
        </PageSection>

        <PageSection id="with-description" label="With description">
          <h2 className="text-lg font-semibold">With description</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Add optional helper text below the label with the{" "}
            <Code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              description
            </Code>{" "}
            prop.
          </p>
          <ComponentExample>
            <div className="max-w-sm">
              <RadioGroup value="option-a" onValueChange={() => {}}>
                <RadioGroupItem
                  id="desc-a"
                  value="option-a"
                  label="Option A"
                  description="Choose this for the first option."
                />
              </RadioGroup>
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Default, checked, disabled, and error states.
          </p>

          <h3 id="states-default" className="mb-3 text-base font-semibold">Default</h3>
          <ComponentExample className="mb-6">
            <RadioGroup value="" onValueChange={() => {}}>
              <RadioGroupItem id="states-default" value="unchecked" label="Unselected" />
            </RadioGroup>
          </ComponentExample>

          <h3 id="states-checked" className="mb-3 text-base font-semibold">Checked</h3>
          <ComponentExample className="mb-6">
            <RadioGroup value="checked" onValueChange={() => {}}>
              <RadioGroupItem id="states-checked" value="checked" label="Selected" />
            </RadioGroup>
          </ComponentExample>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">Disabled</h3>
          <ComponentExample className="mb-6">
            <RadioGroup defaultValue="" className="w-fit">
              <Field orientation="horizontal" data-disabled>
                <RadioGroupItem value="option1" id="disabled-1" disabled />
                <FieldLabel htmlFor="disabled-1">
                  Disabled
                </FieldLabel>
              </Field>
            </RadioGroup>
          </ComponentExample>

          <h3 id="states-error" className="mb-3 text-base font-semibold">Error</h3>
          <ComponentExample>
            <RadioGroup defaultValue="email">
              <Field orientation="horizontal" data-invalid>
                <RadioGroupItem value="email" id="invalid-email" aria-invalid />
                <FieldLabel htmlFor="invalid-email">
                  Email only
                </FieldLabel>
              </Field>
            </RadioGroup>
          </ComponentExample>
        </PageSection>

        <PageSection id="radio-group" label="Radio group">
          <h2 className="text-lg font-semibold">Radio group</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use RadioGroup for a list of options with shared state. Only one
            option can be selected.
          </p>
          <ComponentExample>
            <RadioGroup
              label="Select your favourite apple"
              value={groupValue}
              onValueChange={setGroupValue}
            >
              <RadioGroupItem id="group-fuji" value="fuji" label="Fuji" />
              <RadioGroupItem id="group-gala" value="gala" label="Gala" />
              <RadioGroupItem id="group-granny-smith" value="granny-smith" label="Granny Smith" />
              <RadioGroupItem id="group-honeycrisp" value="honeycrisp" label="Honeycrisp" />
            </RadioGroup>
          </ComponentExample>
        </PageSection>

        <PageSection id="as-button" label="As button">
          <h2 className="text-lg font-semibold">As button</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              asButton
            </Code>{" "}
            prop to render the radio as an outline-style button. Checked state
            uses a darker border and gray-100 background; hover state is
            applied.
          </p>
          <h3 id="as-button-basic" className="mb-3 text-base font-semibold">Basic</h3>
          <ComponentExample className="mb-8">
            <RadioGroup value={asButtonValue} onValueChange={setAsButtonValue}>
              <RadioGroupItem
                asButton
                id="as-button-basic"
                value="a"
                label="Option A"
              />
              <RadioGroupItem
                asButton
                id="as-button-checked"
                value="b"
                label="Option B"
              />
            </RadioGroup>
          </ComponentExample>

          <h3 id="as-button-with-description" className="mb-3 text-base font-semibold">With description</h3>
          <ComponentExample>
              <RadioGroup value={asButtonDescValue} onValueChange={setAsButtonDescValue}>
                <RadioGroupItem
                  asButton
                  id="as-button-desc"
                  value="terms"
                  label="Option A"
                  description="This is a description."
                />
                <RadioGroupItem
                  asButton
                  id="as-button-desc-2"
                  value="decline"
                  label="Option B"
                  description="This is a description."
                />
              </RadioGroup>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
