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
import { Field, FieldError, FieldLabel } from "@gecko/ui/components/field";
import { Button } from "@gecko/ui/components/button";
import { Input } from "@gecko/ui/components/input";
import { Label } from "@gecko/ui/components/label";
import { Code } from "@gecko/ui/components/code";
import { Controller } from "react-hook-form";
import { z } from "zod";

const labelFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address."),
});

export function LabelPage() {
  const importSnippet = `import { Label } from "@gecko/ui/components/label"`;

  const basicExampleSnippet = `<div className="space-y-2">
  <Label htmlFor="label-email">Your email address</Label>
  <Input
    id="label-email"
    name="email"
    type="email"
    autoComplete="email"
    placeholder="name@example.com"
    required
  />
</div>`;

  const withinFormSnippet = `const formSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { email: "" },
})

<form noValidate onSubmit={form.handleSubmit(onSubmit)}>
  <Controller
    name="email"
    control={form.control}
    render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name}>Your email address</FieldLabel>
        <Input {...field} id={field.name} type="email" required aria-invalid={fieldState.invalid} />
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    )}
  />
  <Button type="submit">Save email</Button>
</form>`;

  const requiredSnippet = `<Field>
  <FieldLabel htmlFor="required-email">Your email address</FieldLabel>
  <Input id="required-email" type="email" required placeholder="you@example.com" />
</Field>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Label"
        description="The Label component names a form control so people can tell what a field is for. It sits with inputs, checkboxes, and other controls to make forms readable and easy to scan."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Label to give a standalone form control a visible name. Match
            its <Code>htmlFor</Code> to the control’s <Code>id</Code> so
            selecting the label focuses or activates the control.
            <br />
            <br />
            Use <Code>FieldLabel</Code> inside{" "}
            <DocsPageLink to="/components/field">Field</DocsPageLink> for
            product form fields. Avoid using Label as a heading, section title,
            or body copy.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Label to caption a form control."
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
        description={
          <>
            The default Label. Its <Code>htmlFor</Code> matches the control’s{" "}
            <Code>id</Code>. Use this for a standalone labelled control.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="label-email">Your email address</Label>
              <Input
                id="label-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                required
              />
            </div>
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
        id="within-form"
        title="Within form"
        description={
          <>
            Groups the label and control with <Code>Field</Code> and{" "}
            <Code>FieldLabel</Code>. Use this when building forms so the label
            and control stay grouped together. See{" "}
            <DocsPageLink to="/components/field">Field</DocsPageLink>.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <RequiredForm
              className="space-y-4"
              schema={labelFormSchema}
              defaultValues={{ email: "" }}
            >
              {(form) => (
                <>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="field-email">
                          Your email address
                        </FieldLabel>
                        <Input
                          {...field}
                          id="field-email"
                          type="email"
                          autoComplete="email"
                          placeholder="name@example.com"
                          required
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Button type="submit">Save email</Button>
                </>
              )}
            </RequiredForm>
            <Code
              variant="block"
              language="tsx"
              code={withinFormSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="required-field"
        title="Required field"
        description={
          <>
            Shows the required marker by setting <Code>required</Code> on the
            control. Use this when the field must be completed before the form
            can be submitted.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="required-email">
                Your email address
              </FieldLabel>
              <Input
                id="required-email"
                type="email"
                required
                placeholder="you@example.com"
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
        id="do-dont"
        title="Do and don’t"
        description="Give every form control a concise, connected visible name."
      >
        <DocsDoDont
          doItems={[
            <>
              Match <Code>htmlFor</Code> to the control’s <Code>id</Code>.
            </>,
            <>Write a short label that names the value the control accepts.</>,
            <>
              Set <Code>required</Code> on the associated control to show
              Gecko’s required marker.
            </>,
          ]}
          dontItems={[
            <>Don’t use Label as a heading or body text.</>,
            <>Don’t rely on placeholder text instead of a label.</>,
            <>
              Don’t type an asterisk into the label; Gecko adds it from the
              control’s <Code>required</Code> attribute.
            </>,
          ]}
        />
      </MainSection>

      <MainSection id="api" title="API" description="Behaviour props on Label.">
        <DocsApiTable
          rows={[
            {
              name: "htmlFor",
              type: "string",
              description:
                "Connects the label to a control. Gecko adds a required marker when that control has required.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/label">
                Shadcn Label documentation
              </DocsExternalLink>{" "}
              for the source composition. Label also accepts native label
              properties.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use Field when the control needs more than a standalone label."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/field">Field</DocsPageLink> — to
            compose a label, control, help text, and error.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
