import * as React from "react"
import { ComponentExample } from "@/components/layout/component-example"

import { Code } from "@/components/ui/code"
import { PageSection } from "@/components/layout/page-section"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function FieldPage() {
  const [showValidationErrors, setShowValidationErrors] = React.useState(false)

  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Field</h1>
          <p className="text-sm text-muted-foreground">
            Compose form fields with labels, descriptions, and validation using Field primitives.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Wrap inputs with{" "}
            <Code>FieldSet</Code>,{" "}
            <Code>FieldGroup</Code>, and{" "}
            <Code>Field</Code>. Use{" "}
            <Code>FieldLabel</Code> with{" "}
            <Code>htmlFor</Code> to associate the label with the input.
          </p>
          <ComponentExample>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input id="username" type="text" placeholder="Enter your username" />
                </Field>
              </FieldGroup>
            </FieldSet>
          </ComponentExample>
        </PageSection>

        <PageSection id="help-text" label="Help text">
          <h2 className="text-lg font-semibold">Help text</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Add{" "}
            <Code>FieldDescription</Code>{" "}
            below the input to show hint or help text. It uses muted styling and supports links.
          </p>
          <ComponentExample>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input id="email" type="email" placeholder="you@example.com" />
                  <FieldDescription>
                    We’ll use this to send you updates and account notifications.
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldSet>
          </ComponentExample>
        </PageSection>

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Set <Code>data-disabled</Code> on <Code>Field</Code> together with{" "}
            <Code>disabled</Code> on the control. For errors, set{" "}
            <Code>data-invalid</Code> on <Code>Field</Code>,{" "}
            <Code>aria-invalid</Code> on the control, and wire{" "}
            <Code>FieldError</Code> with <Code>aria-describedby</Code>.
          </p>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">
            Disabled
          </h3>
          <ComponentExample className="mb-6">
            <FieldSet>
              <FieldGroup>
                <Field data-disabled>
                  <FieldLabel htmlFor="field-states-disabled">
                    Company name
                  </FieldLabel>
                  <Input
                    id="field-states-disabled"
                    name="field-states-disabled"
                    type="text"
                    placeholder="Acme Inc."
                    disabled
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </ComponentExample>

          <h3 id="states-error" className="mb-3 text-base font-semibold">
            Error
          </h3>
          <ComponentExample>
            <FieldSet>
              <FieldGroup>
                <Field data-invalid>
                  <FieldLabel htmlFor="field-states-error">Tax ID</FieldLabel>
                  <Input
                    id="field-states-error"
                    name="field-states-error"
                    type="text"
                    placeholder="00-0000000"
                    aria-invalid
                    aria-describedby="field-states-error-msg"
                  />
                  <FieldError id="field-states-error-msg">
                    Enter a valid tax ID format.
                  </FieldError>
                </Field>
              </FieldGroup>
            </FieldSet>
          </ComponentExample>
        </PageSection>

        <PageSection id="validation" label="Validation">
          <h2 className="text-lg font-semibold">Validation</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use{" "}
            <Code>FieldError</Code>{" "}
            below a field to show validation messages. It renders with destructive styling and{" "}
            <Code>role=&quot;alert&quot;</Code> for accessibility. Also set{" "}
            <Code>aria-invalid</Code> and <Code>aria-describedby</Code> on the control:{" "}
            <Code>Input</Code> uses those for destructive placeholder and value text, while{" "}
            <Code>Field</Code> <Code>data-invalid</Code> mainly affects group-level styling
            (such as the label).
          </p>
          <ComponentExample>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setShowValidationErrors(true)
              }}
            >
              <FieldSet>
                <FieldGroup>
                  <Field data-invalid={showValidationErrors || undefined}>
                    <FieldLabel htmlFor="validation-email">Email</FieldLabel>
                    <Input
                      id="validation-email"
                      type="email"
                      placeholder="you@example.com"
                      aria-invalid={showValidationErrors}
                      aria-describedby={
                        showValidationErrors
                          ? "validation-email-error"
                          : undefined
                      }
                    />
                    {showValidationErrors && (
                      <FieldError id="validation-email-error">
                        Please enter a valid email address.
                      </FieldError>
                    )}
                  </Field>
                  <Field data-invalid={showValidationErrors || undefined}>
                    <FieldLabel htmlFor="validation-password">Password</FieldLabel>
                    <Input
                      id="validation-password"
                      type="password"
                      placeholder="••••••••"
                      aria-invalid={showValidationErrors}
                      aria-describedby={
                        showValidationErrors
                          ? "validation-password-error"
                          : undefined
                      }
                    />
                    {showValidationErrors && (
                      <FieldError id="validation-password-error">
                        Password must be at least 8 characters.
                      </FieldError>
                    )}
                  </Field>
                  <div className="flex w-fit">
                    <Button type="submit">Submit</Button>
                  </div>
                </FieldGroup>
              </FieldSet>
            </form>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
