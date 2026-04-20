import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Code } from "@/components/ui/code"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Copy, Search } from "lucide-react"

export function InputPage() {
  return (
    <div className="space-y-12">
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
            <Code>
              Input
            </Code>{" "}
            component for single-line text entry.
          </p>
          <ComponentExample>
            <Input type="text" placeholder="Enter your email" />
          </ComponentExample>
        </PageSection>

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              disabled
            </Code>{" "}
            prop or{" "}
            <Code>
              aria-invalid
            </Code>{" "}
            to show disabled and validation states.
          </p>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">Disabled</h3>
          <ComponentExample className="mb-6">
            <Input type="text" placeholder="Disabled input" disabled />
          </ComponentExample>

          <h3 id="states-invalid" className="mb-3 text-base font-semibold">Invalid</h3>
          <ComponentExample>
            <Input type="text" placeholder="Invalid input" aria-invalid />
          </ComponentExample>
        </PageSection>

        <PageSection id="read-only" label="Read-only">
          <h2 className="text-lg font-semibold">Read-only</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Set{" "}
            <Code>
              readOnly
            </Code>{" "}
            for display-only content: no hover or focus ring and the control is not focusable.
          </p>
          <ComponentExample>
            <Input
              readOnly
              type="text"
              defaultValue="Read-only value"
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="required" label="Required">
          <h2 className="text-lg font-semibold">Required</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Add the{" "}
            <Code>
              required
            </Code>{" "}
            attribute so the browser enforces the field before form submit. Pair
            with a{" "}
            <Code>
              FieldLabel
            </Code>{" "}
            for an accessible required field.
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
            Use the{" "}
            <Code>
              size
            </Code>{" "}
            prop for{" "}
            <Code>
              sm
            </Code>
            ,{" "}
            <Code>
              md
            </Code>
            , or{" "}
            <Code>
              lg
            </Code>
            . Default is{" "}
            <Code>
              md
            </Code>
            .
          </p>

          <h3 id="sizing-small" className="mb-3 text-base font-semibold">Small</h3>
          <ComponentExample className="mb-6">
            <Input id="input-size-sm" size="sm" type="text" placeholder="Small" />
          </ComponentExample>

          <h3 id="sizing-medium" className="mb-3 text-base font-semibold">Medium</h3>
          <ComponentExample className="mb-6">
            <Input id="input-size-md" size="md" type="text" placeholder="Medium" />
          </ComponentExample>

          <h3 id="sizing-large" className="mb-3 text-base font-semibold">Large</h3>
          <ComponentExample>
            <Input id="input-size-lg" size="lg" type="text" placeholder="Large" />
          </ComponentExample>
        </PageSection>

        <PageSection id="icons" label="Icons">
          <h2 className="text-lg font-semibold">Icons</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <Code>
              InputGroup
            </Code>{" "}
            with{" "}
            <Code>
              InputGroupAddon
            </Code>{" "}
            to show icons. Set the addon{" "}
            <Code>
              align
            </Code>{" "}
            prop to{" "}
            <Code>
              inline-start
            </Code>{" "}
            or{" "}
            <Code>
              inline-end
            </Code>{" "}
            to position the icon.
          </p>

          <h3 id="icons-left" className="mb-3 text-base font-semibold">Left aligned</h3>
          <ComponentExample className="mb-6 flex flex-col gap-4">
            <InputGroup size="sm">
              <InputGroupAddon align="inline-start">
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search..." />
            </InputGroup>
            <InputGroup size="md">
              <InputGroupAddon align="inline-start">
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search..." />
            </InputGroup>
            <InputGroup size="lg">
              <InputGroupAddon align="inline-start">
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search..." />
            </InputGroup>
          </ComponentExample>

          <h3 id="icons-right" className="mb-3 text-base font-semibold">Right aligned</h3>
          <ComponentExample className="mb-6 flex flex-col gap-4">
            <InputGroup size="sm">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon align="inline-end">
                <Search />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup size="md">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon align="inline-end">
                <Search />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup size="lg">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon align="inline-end">
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </ComponentExample>

          <h3 id="icons-left-and-right" className="mb-3 text-base font-semibold">Left and right aligned</h3>
          <ComponentExample className="flex flex-col gap-4">
            <InputGroup size="sm">
              <InputGroupAddon align="inline-start">
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon align="inline-end">
                <Search />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup size="md">
              <InputGroupAddon align="inline-start">
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon align="inline-end">
                <Search />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup size="lg">
              <InputGroupAddon align="inline-start">
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon align="inline-end">
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </ComponentExample>
        </PageSection>

        <PageSection id="button" label="Button">
          <h2 className="text-lg font-semibold">Button</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <Code>
              InputGroupButton
            </Code>{" "}
            inside{" "}
            <Code>
              InputGroupAddon
            </Code>{" "}
            for a clickable button (e.g. search trigger). Buttons are always at
            the end. Button size follows the group{" "}
            <Code>
              size
            </Code>{" "}
            (sm, md, lg).
          </p>

          <ComponentExample className="flex flex-col gap-4">
            <InputGroup size="sm">
              <InputGroupInput placeholder="Copy to clipboard" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton>
                  <Copy />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup size="md">
              <InputGroupInput placeholder="Copy to clipboard" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton>
                  <Copy />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup size="lg">
              <InputGroupInput placeholder="Copy to clipboard" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton>
                  <Copy />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </ComponentExample>
        </PageSection>

        <PageSection id="inline" label="Inline">
          <h2 className="text-lg font-semibold">Inline</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <Code>
              Field
            </Code>{" "}
            with{" "}
            <Code>
              orientation="horizontal"
            </Code>{" "}
            to place an input and button side by side.
          </p>
          <ComponentExample>
            <Field orientation="horizontal">
              <Input type="search" placeholder="Search..." />
              <Button>Search</Button>
            </Field>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
