import { useState } from "react"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Field, FieldContent, FieldError } from "@gecko/ui/components/field"
import { RadioGroup, RadioGroupItem } from "@gecko/ui/components/radio-group"
import { Code } from "@gecko/ui/components/code"

export function RadioGroupPage() {
  const [groupValue, setGroupValue] = useState<string>("fuji")
  const [asButtonValue, setAsButtonValue] = useState<string>("a")
  const [asButtonDescValue, setAsButtonDescValue] = useState<string>("terms")

  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Radio group</h1>
          <p className="text-sm text-muted-foreground">
            A control for selecting one option from a set. Use the{" "}
            <Code>
              label
            </Code>
            and{" "}
            <Code>
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
            <Code>
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
            <Field orientation="horizontal">
              <FieldContent>
                <RadioGroup value="" onValueChange={() => {}}>
                  <RadioGroupItem id="states-default" value="unchecked" label="Unselected" />
                </RadioGroup>
              </FieldContent>
            </Field>
          </ComponentExample>

          <h3 id="states-checked" className="mb-3 text-base font-semibold">Checked</h3>
          <ComponentExample className="mb-6">
            <Field orientation="horizontal">
              <FieldContent>
                <RadioGroup value="checked" onValueChange={() => {}}>
                  <RadioGroupItem id="states-checked" value="checked" label="Selected" />
                </RadioGroup>
              </FieldContent>
            </Field>
          </ComponentExample>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">Disabled</h3>
          <ComponentExample className="mb-6">
            <Field orientation="horizontal" data-disabled>
              <FieldContent>
                <RadioGroup defaultValue="">
                  <RadioGroupItem value="option1" id="disabled-1" disabled label="Disabled" />
                </RadioGroup>
              </FieldContent>
            </Field>
          </ComponentExample>

          <h3 id="states-error" className="mb-3 text-base font-semibold">Error</h3>
          <ComponentExample>
            <Field orientation="horizontal" data-invalid className="max-w-md">
              <FieldContent>
                <RadioGroup defaultValue="email">
                  <RadioGroupItem value="email" id="invalid-email" aria-invalid aria-describedby="invalid-email-error" label="Email only" />
                </RadioGroup>
              </FieldContent>
            </Field>
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
            <Code>
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
          <ComponentExample className="mb-8">
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

          <h3 id="as-button-disabled" className="mb-3 text-base font-semibold">Disabled</h3>
          <ComponentExample className="mb-8">
            <RadioGroup value="b" onValueChange={() => {}} disabled>
              <RadioGroupItem asButton id="as-button-disabled-a" value="a" label="Option A" />
              <RadioGroupItem asButton id="as-button-disabled-b" value="b" label="Option B" />
            </RadioGroup>
          </ComponentExample>

          <h3 id="as-button-error" className="mb-3 text-base font-semibold">Error</h3>
          <ComponentExample>
            <Field data-invalid className="w-fit max-w-full">
              <FieldContent>
                <RadioGroup value="" onValueChange={() => {}} label="Select an option">
                  <RadioGroupItem
                    asButton
                    id="as-button-error-a"
                    value="a"
                    label="Option A"
                    aria-invalid
                    aria-describedby="as-button-error-msg"
                  />
                  <RadioGroupItem
                    asButton
                    id="as-button-error-b"
                    value="b"
                    label="Option B"
                    aria-invalid
                    aria-describedby="as-button-error-msg"
                  />
                </RadioGroup>
                <FieldError id="as-button-error-msg">
                  This field is required—select an option before continuing.
                </FieldError>
              </FieldContent>
            </Field>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
