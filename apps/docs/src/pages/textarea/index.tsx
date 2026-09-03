import { ComponentExample } from "@/components/layout/component-example";
import { RequiredForm } from "@/components/layout/required-form";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";
import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@gecko/ui/components/field";
import { Textarea } from "@gecko/ui/components/textarea";
import { Controller } from "react-hook-form";
import { z } from "zod";

const textareaFormSchema = z.object({
  feedback: z.string().trim().min(1, "Enter your feedback."),
});

export function TextareaPage() {
  const importSnippet = `import { Textarea } from "@gecko/ui/components/textarea"`;

  const basicExampleSnippet = `<Textarea
  aria-label="Message"
  placeholder="Write a message..."
/>`;

  const disabledSnippet = `<Field data-disabled>
  <FieldLabel htmlFor="textarea-states-disabled">Message</FieldLabel>
  <Textarea
    id="textarea-states-disabled"
    name="textarea-states-disabled"
    placeholder="Disabled textarea"
    disabled
  />
</Field>`;

  const errorSnippet = `<Field data-invalid>
  <FieldLabel htmlFor="textarea-states-invalid">Message</FieldLabel>
  <Textarea
    id="textarea-states-invalid"
    name="textarea-states-invalid"
    placeholder="Invalid textarea"
    minLength={20}
    aria-invalid
    aria-describedby="textarea-states-invalid-error"
  />
  <FieldError id="textarea-states-invalid-error">
    Enter at least 20 characters.
  </FieldError>
</Field>`;

  const readOnlySnippet = `<Field>
  <FieldLabel htmlFor="textarea-read-only">Published description</FieldLabel>
  <Textarea
    id="textarea-read-only"
    readOnly
    defaultValue="This text remains focusable, selectable, and copyable."
    rows={4}
  />
</Field>`;

  const requiredSnippet = `<Field>
  <FieldLabel htmlFor="required-textarea">Comment</FieldLabel>
  <Textarea
    id="required-textarea"
    placeholder="Tell us what you think..."
    required
    rows={4}
  />
</Field>`;

  const sizesSnippet = `<Textarea
  aria-label="Feedback"
  size="sm|md|lg"
  placeholder="Share your feedback..."
/>`;

  const formSnippet = `const formSchema = z.object({
  feedback: z.string().trim().min(1, "Enter your feedback."),
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { feedback: "" },
})

<form noValidate onSubmit={form.handleSubmit(onSubmit)}>
  <Controller
    name="feedback"
    control={form.control}
    render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name}>Feedback</FieldLabel>
        <Textarea {...field} id={field.name} required aria-invalid={fieldState.invalid} />
        <FieldDescription>Tell us what went well or what we could improve.</FieldDescription>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    )}
  />
  <Button type="submit">Send feedback</Button>
</form>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Textarea"
        description="A multiline text control for longer content such as comments, notes, and descriptions."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Textarea when someone needs to type more than one line. Pair it
            with a <DocsPageLink to="/components/field">Field</DocsPageLink>{" "}
            when the control needs a name, help text, or an error.
            <br />
            <br />
            Avoid using it for a single short value — that is an{" "}
            <DocsPageLink to="/components/input">Input</DocsPageLink>. Do not
            use it as a labelled group on its own — wrap it in Field.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import the multiline text control required by the interface."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="tsx"
              code={importSnippet}
              showCopyButton
              copyLabel="Copy import"
            />
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="basic-example"
        title="Basic example"
        description="A multiline control for entering longer content."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Textarea aria-label="Message" placeholder="Write a message..." />
            <Code
              variant="block"
              language="tsx"
              code={basicExampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="states"
        title="States"
        description="The field can be unavailable or invalid. Use the state that matches whether the person can type, and whether the value is valid."
      >
        <ChildSection
          id="states-disabled"
          title="Disabled"
          description="Use this when the value and control are unavailable."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Field data-disabled>
                <FieldLabel htmlFor="textarea-states-disabled">
                  Message
                </FieldLabel>
                <Textarea
                  id="textarea-states-disabled"
                  name="textarea-states-disabled"
                  placeholder="Disabled textarea"
                  disabled
                />
              </Field>
              <Code
                variant="block"
                language="tsx"
                code={disabledSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="states-error"
          title="Error"
          description="Connect an invalid control to a specific corrective message."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Field data-invalid>
                <FieldLabel htmlFor="textarea-states-invalid">
                  Message
                </FieldLabel>
                <Textarea
                  id="textarea-states-invalid"
                  name="textarea-states-invalid"
                  placeholder="Invalid textarea"
                  minLength={20}
                  aria-invalid
                  aria-describedby="textarea-states-invalid-error"
                />
                <FieldError id="textarea-states-invalid-error">
                  Enter at least 20 characters.
                </FieldError>
              </Field>
              <Code
                variant="block"
                language="tsx"
                code={errorSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="read-only"
        title="Read-only"
        description="Keep a value available for focus, selection, copying, and form submission without allowing edits."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="textarea-read-only">
                Published description
              </FieldLabel>
              <Textarea
                id="textarea-read-only"
                readOnly
                defaultValue="This text remains focusable, selectable, and copyable."
                rows={4}
              />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={readOnlySnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="required"
        title="Required"
        description="Use a visible field label when the value must be provided."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="required-textarea">Comment</FieldLabel>
              <Textarea
                id="required-textarea"
                placeholder="Tell us what you think..."
                required
                rows={4}
              />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={requiredSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="sizes"
        title="Sizes"
        description="Textarea is available in three sizes. Match the surrounding form controls."
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="space-y-3">
              <Textarea
                aria-label="Small feedback"
                size="sm"
                placeholder="Small"
              />
              <Textarea
                aria-label="Medium feedback"
                size="md"
                placeholder="Medium"
              />
              <Textarea
                aria-label="Large feedback"
                size="lg"
                placeholder="Large"
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={sizesSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="within-form"
        title="Within form"
        description="Give the control a submitted name, visible label, and connected supporting text."
      >
        <ComponentExample>
          <div className="space-y-6">
            <RequiredForm
              className="space-y-4"
              schema={textareaFormSchema}
              defaultValues={{ feedback: "" }}
            >
              {(form) => (
                <>
                  <Controller
                    name="feedback"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
                        <Textarea
                          {...field}
                          id="feedback"
                          placeholder="Share your thoughts..."
                          rows={4}
                          required
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Tell us what went well or what we could improve.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Button type="submit">Send feedback</Button>
                </>
              )}
            </RequiredForm>
            <Code
              variant="block"
              language="tsx"
              code={formSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Use Textarea for clear, accessible multiline entry."
      >
        <DocsDoDont
          doItems={[
            <>
              Pair Textarea with a{" "}
              <DocsPageLink to="/components/field">Field</DocsPageLink> for its
              label and supporting text.
            </>,
            <>
              Use <Code>readOnly</Code> when content should remain visible but
              cannot be edited.
            </>,
            <>
              Match <Code>size</Code> to the surrounding form controls.
            </>,
            <>
              Connect error text with <Code>aria-describedby</Code>.
            </>,
          ]}
          dontItems={[
            <>Don’t use Textarea for a short, single-line value.</>,
            <>Don’t rely on placeholder text as the field label.</>,
            <>
              Don’t use disabled when read-only content still needs to be
              presented.
            </>,
            <>Don’t show an error without explaining how to correct it.</>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Textarea. It also accepts native textarea attributes."
      >
        <DocsApiTable
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              defaultValue: '"md"',
              description: "Sets the field padding and text size.",
            },
            {
              name: "readOnly",
              type: "boolean",
              defaultValue: "false",
              description:
                "Prevents editing while retaining focus, selection, copying, and submission.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description:
                "Prevents interaction and marks the field unavailable.",
            },
            {
              name: "value",
              type: "string",
              description: "Controls the current value.",
            },
            {
              name: "defaultValue",
              type: "string",
              description: "Sets the initial uncontrolled value.",
            },
            {
              name: "onChange",
              type: "ChangeEventHandler<HTMLTextAreaElement>",
              description: "Runs when the value changes.",
            },
            {
              name: "name",
              type: "string",
              description: "Names the submitted form value.",
            },
            {
              name: "rows",
              type: "number",
              description: "Sets the initial visible line count.",
            },
            {
              name: "required",
              type: "boolean",
              defaultValue: "false",
              description: "Marks the value as required for form validation.",
            },
            {
              name: "minLength",
              type: "number",
              description: "Sets the minimum valid character count.",
            },
            {
              name: "maxLength",
              type: "number",
              description: "Sets the maximum accepted character count.",
            },
            {
              name: "aria-invalid",
              type: "boolean | string",
              defaultValue: "false",
              description: "Applies the invalid state for validation errors.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/textarea">
                Shadcn Textarea documentation
              </DocsExternalLink>{" "}
              for the source component and usage guidance.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Choose the field pattern that matches the value being entered."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/input">Input</DocsPageLink> — for a
            single-line value.
          </li>
          <li>
            <DocsPageLink to="/components/field">Field</DocsPageLink> — for
            labels, descriptions, and errors.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
