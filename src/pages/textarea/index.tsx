import { ComponentExample } from "@/components/layout/component-example"

import { Code } from "@/components/ui/code"
import { PageSection } from "@/components/layout/page-section"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
 
export function TextareaPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Textarea</h1>
          <p className="text-sm text-muted-foreground">
            Multi-line text input for longer content such as comments or
            descriptions.
          </p>
        </PageSection>
 
        <PageSection id="basic" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code>
              Textarea
            </Code>{" "}
            component for multi-line text entry.
          </p>
          <ComponentExample>
            <Textarea placeholder="Write a message..." />
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
            <Field data-disabled>
              <FieldLabel htmlFor="textarea-states-disabled">Message</FieldLabel>
              <Textarea
                id="textarea-states-disabled"
                name="textarea-states-disabled"
                placeholder="Disabled textarea"
                disabled
              />
            </Field>
          </ComponentExample>
 
          <h3 id="states-invalid" className="mb-3 text-base font-semibold">Invalid</h3>
          <ComponentExample>
            <Field data-invalid>
              <FieldLabel htmlFor="textarea-states-invalid">Message</FieldLabel>
              <Textarea
                id="textarea-states-invalid"
                name="textarea-states-invalid"
                placeholder="Invalid textarea"
                aria-invalid
                aria-describedby="textarea-states-invalid-error"
              />
              <FieldError id="textarea-states-invalid-error">
                This message does not meet the requirements. Please revise and try again.
              </FieldError>
            </Field>
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
            <Textarea
              readOnly
              defaultValue="This text is read-only and cannot be focused."
              rows={4}
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
            attribute and pair the textarea with a{" "}
            <Code>
              FieldLabel
            </Code>{" "}
            so the field is enforced before submit and announced correctly to
            assistive technologies.
          </p>
          <ComponentExample>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="required-textarea">Comment</FieldLabel>
                  <Textarea
                    id="required-textarea"
                    placeholder="Tell us what you think..."
                    required
                    rows={4}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </ComponentExample>
        </PageSection>

        <PageSection id="sizes" label="Sizes">
          <h2 className="text-lg font-semibold">Sizes</h2>
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
            </Code>{" "}
            or{" "}
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
            <Textarea size="sm" placeholder="Short note..." />
          </ComponentExample>
 
          <h3 id="sizing-medium" className="mb-3 text-base font-semibold">Medium</h3>
          <ComponentExample className="mb-6">
            <Textarea size="md" placeholder="Leave a comment..." />
          </ComponentExample>
 
          <h3 id="sizing-large" className="mb-3 text-base font-semibold">Large</h3>
          <ComponentExample>
            <Textarea size="lg" placeholder="Detailed feedback..." />
          </ComponentExample>
        </PageSection>
 
        <PageSection id="form" label="Within form">
          <h2 className="text-lg font-semibold">Within form</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Combine{" "}
            <Code>
              Field
            </Code>{" "}
            components with{" "}
            <Code>
              Textarea
            </Code>{" "}
            to build accessible forms with labels and helper text.
          </p>
          <ComponentExample>
            <form className="space-y-4">
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
                    <Textarea
                      id="feedback"
                      placeholder="Share your thoughts..."
                      rows={4}
                    />
                    <FieldDescription>
                      Tell us what went well or what we could improve.
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldSet>
              <Button type="submit">Submit</Button>
            </form>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
