import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
 
export function TextareaPage() {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
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
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              Textarea
            </code>{" "}
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
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              disabled
            </code>{" "}
            prop or{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              aria-invalid
            </code>{" "}
            to show disabled and validation states.
          </p>
 
          <h3 id="states-disabled" className="mb-3 text-base font-semibold">Disabled</h3>
          <ComponentExample className="mb-6">
            <Textarea placeholder="Disabled textarea" disabled />
          </ComponentExample>
 
          <h3 id="states-invalid" className="mb-3 text-base font-semibold">Invalid</h3>
          <ComponentExample>
            <Textarea placeholder="Invalid textarea" aria-invalid />
          </ComponentExample>
        </PageSection>
 
        <PageSection id="required" label="Required">
          <h2 className="text-lg font-semibold">Required</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Add the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              required
            </code>{" "}
            attribute and pair the textarea with a{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              FieldLabel
            </code>{" "}
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
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              size
            </code>{" "}
            prop for{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              sm
            </code>
            ,{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              md
            </code>{" "}
            or{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              lg
            </code>
            . Default is{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              md
            </code>
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
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              Field
            </code>{" "}
            components with{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              Textarea
            </code>{" "}
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
      <PageSectionNav />
    </div>
  )
}
