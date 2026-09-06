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
import { Code } from "@gecko/ui/components/code";
import { Button } from "@gecko/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@gecko/ui/components/field";
import { Input } from "@gecko/ui/components/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@gecko/ui/components/input-group";
import Copy from "@hugeicons/core-free-icons/Copy01Icon";
import Search from "@hugeicons/core-free-icons/Search01Icon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";
import { Controller } from "react-hook-form";
import { z } from "zod";

const inputFormSchema = z.object({
  name: z.string().trim().min(1, "Enter your name."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address."),
});

export function InputPage() {
  const importSnippet = `import { Input } from "@gecko/ui/components/input"`;

  const basicExampleSnippet = `<Input
  aria-label="Email address"
  name="email"
  type="email"
  autoComplete="email"
  placeholder="name@example.com"
/>`;

  const formSnippet = `const formSchema = z.object({
  name: z.string().trim().min(1, "Enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { name: "", email: "" },
})

<form noValidate onSubmit={form.handleSubmit(onSubmit)}>
  <FieldGroup>
    <Controller
      name="name"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Name</FieldLabel>
          <Input {...field} id={field.name} required aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
    <Controller
      name="email"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
          <Input {...field} id={field.name} type="email" required aria-invalid={fieldState.invalid} />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  </FieldGroup>
  <Button type="submit">Save details</Button>
</form>`;

  const disabledSnippet = `<Field data-disabled>
  <FieldLabel htmlFor="input-states-disabled">Label</FieldLabel>
  <Input
    id="input-states-disabled"
    name="input-states-disabled"
    type="text"
    placeholder="Disabled input"
    disabled
  />
</Field>`;

  const errorSnippet = `<Field data-invalid>
  <FieldLabel htmlFor="input-states-invalid">Label</FieldLabel>
  <Input
    id="input-states-invalid"
    name="input-states-invalid"
    type="text"
    placeholder="Invalid input"
    aria-invalid
    aria-describedby="input-states-invalid-error"
  />
  <FieldError id="input-states-invalid-error">
    This value is not valid. Try again with a different entry.
  </FieldError>
</Field>`;

  const readOnlySnippet = `<Field>
  <FieldLabel htmlFor="input-read-only">Account ID</FieldLabel>
  <Input
    id="input-read-only"
    name="accountId"
    readOnly
    defaultValue="ACC-2048"
  />
</Field>`;

  const requiredSnippet = `<Field>
  <FieldLabel htmlFor="required-input">Email address</FieldLabel>
  <Input
    id="required-input"
    name="email"
    type="email"
    autoComplete="email"
    placeholder="name@example.com"
    required
  />
</Field>`;

  const sizeSmallSnippet = `<Input aria-label="Small input example" id="input-size-sm" size="sm" type="text" placeholder="Small" />`;

  const sizeMediumSnippet = `<Input aria-label="Medium input example" id="input-size-md" size="md" type="text" placeholder="Medium" />`;

  const sizeLargeSnippet = `<Input aria-label="Large input example" id="input-size-lg" size="lg" type="text" placeholder="Large" />`;

  const iconsLeftSnippet = `<InputGroup size="sm|md|lg">
  <InputGroupAddon align="inline-start">
    <Search aria-hidden="true" />
  </InputGroupAddon>
  <InputGroupInput aria-label="Search" placeholder="Search..." />
</InputGroup>`;

  const iconsRightSnippet = `<InputGroup size="sm|md|lg">
  <InputGroupInput aria-label="Search" placeholder="Search..." />
  <InputGroupAddon align="inline-end">
    <Search aria-hidden="true" />
  </InputGroupAddon>
</InputGroup>`;

  const iconsBothSnippet = `<InputGroup size="sm|md|lg">
  <InputGroupAddon align="inline-start">
    <Search aria-hidden="true" />
  </InputGroupAddon>
  <InputGroupInput aria-label="Search" placeholder="Search..." />
  <InputGroupAddon align="inline-end">
    <Search aria-hidden="true" />
  </InputGroupAddon>
</InputGroup>`;

  const buttonSnippet = `<InputGroup size="sm|md|lg">
  <InputGroupInput aria-label="Value to copy" placeholder="Copy to clipboard" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton aria-label="Copy value">
      <Copy aria-hidden="true" />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`;

  const inlineSnippet = `<Field orientation="horizontal">
  <Input aria-label="Search" type="search" placeholder="Search..." />
  <Button>Search</Button>
</Field>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Input field"
        description="The Input field is a single-line text control. People type a short value; it belongs next to a label, like any other field."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use an Input field when someone needs to type a short value. Pair it
            with a <DocsPageLink to="/components/field">Field</DocsPageLink>{" "}
            when the control needs a name, help text, or an error.
            <br />
            <br />
            Avoid using it for more than one line; that is a{" "}
            <DocsPageLink to="/components/textarea">
              Textarea field
            </DocsPageLink>
            . Do not use it as a labelled group on its own — wrap it in Field.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Input to add a single-line text field."
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
            The default Input rendered on its own. Its accessible name is
            provided with <Code>aria-label</Code> because this visual example
            does not include a visible label.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Input
              aria-label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
            />
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
          description={
            <>
              Blocks the field using the <Code>disabled</Code> prop. Use this
              when the value cannot be changed yet.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Field data-disabled>
                <FieldLabel htmlFor="input-states-disabled">Label</FieldLabel>
                <Input
                  id="input-states-disabled"
                  name="input-states-disabled"
                  type="text"
                  placeholder="Disabled input"
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
          description={
            <>
              Shows a validation error using <Code>aria-invalid</Code> on the
              input and <Code>data-invalid</Code> on the field. Use this when
              the value is not valid.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Field data-invalid>
                <FieldLabel htmlFor="input-states-invalid">Label</FieldLabel>
                <Input
                  id="input-states-invalid"
                  name="input-states-invalid"
                  type="text"
                  placeholder="Invalid input"
                  aria-invalid
                  aria-describedby="input-states-invalid-error"
                />
                <FieldError id="input-states-invalid-error">
                  This value is not valid. Try again with a different entry.
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
        description={
          <>
            Prevents editing using the <Code>readOnly</Code> prop while keeping
            the value focusable, selectable, and available for copying. Use this
            when the value should be visible but not changed.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="input-read-only">Account ID</FieldLabel>
              <Input
                id="input-read-only"
                name="accountId"
                readOnly
                defaultValue="ACC-2048"
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
        description={
          <>
            Marks the control with the <Code>required</Code> attribute. Pair it
            with <Code>FieldLabel</Code> so the required marker is visible. Use
            this when the field must be completed before continuing.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="required-input">Email address</FieldLabel>
              <Input
                id="required-input"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                required
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
        id="sizing"
        title="Sizing"
        description={
          <>
            Sets the field size using the <Code>size</Code> prop. Default is{" "}
            <Code>md</Code>. Use the size that matches the form around it.
          </>
        }
      >
        <ChildSection
          id="sizing-small"
          title="Small"
          description={
            <>
              A compact field using <Code>size=&quot;sm&quot;</Code>. Use this
              when space is tight.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Input
                aria-label="Small input example"
                id="input-size-sm"
                size="sm"
                type="text"
                placeholder="Small"
              />
              <Code
                variant="block"
                language="tsx"
                code={sizeSmallSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="sizing-medium"
          title="Medium"
          description={
            <>
              The default size using <Code>size=&quot;md&quot;</Code>. Use this
              in a standard form.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Input
                aria-label="Medium input example"
                id="input-size-md"
                size="md"
                type="text"
                placeholder="Medium"
              />
              <Code
                variant="block"
                language="tsx"
                code={sizeMediumSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="sizing-large"
          title="Large"
          description={
            <>
              A larger field using <Code>size=&quot;lg&quot;</Code>. Use this
              when the field is the focus of the layout.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Input
                aria-label="Large input example"
                id="input-size-lg"
                size="lg"
                type="text"
                placeholder="Large"
              />
              <Code
                variant="block"
                language="tsx"
                code={sizeLargeSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="icons"
        title="Icons"
        description={
          <>
            Places an icon in the field using <Code>InputGroup</Code> and{" "}
            <Code>InputGroupAddon</Code>. Set <Code>align</Code> to{" "}
            <Code>inline-start</Code> or <Code>inline-end</Code>. Use this when
            a symbol belongs inside the field.
          </>
        }
      >
        <ChildSection
          id="icons-left"
          title="Left aligned"
          description={
            <>
              An icon at the start using{" "}
              <Code>align=&quot;inline-start&quot;</Code>. Use this when the
              icon introduces the field.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <InputGroup size="sm">
                  <InputGroupAddon align="inline-start">
                    <HugeiconsIcon icon={Search} aria-hidden="true" />
                  </InputGroupAddon>
                  <InputGroupInput
                    aria-label="Search"
                    placeholder="Search..."
                  />
                </InputGroup>
                <InputGroup size="md">
                  <InputGroupAddon align="inline-start">
                    <HugeiconsIcon icon={Search} aria-hidden="true" />
                  </InputGroupAddon>
                  <InputGroupInput
                    aria-label="Search"
                    placeholder="Search..."
                  />
                </InputGroup>
                <InputGroup size="lg">
                  <InputGroupAddon align="inline-start">
                    <HugeiconsIcon icon={Search} aria-hidden="true" />
                  </InputGroupAddon>
                  <InputGroupInput
                    aria-label="Search"
                    placeholder="Search..."
                  />
                </InputGroup>
              </div>
              <Code
                variant="block"
                language="tsx"
                code={iconsLeftSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="icons-right"
          title="Right aligned"
          description={
            <>
              An icon at the end using <Code>align=&quot;inline-end&quot;</Code>
              . Use this when the icon sits after the value.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <InputGroup size="sm">
                  <InputGroupInput
                    aria-label="Search"
                    placeholder="Search..."
                  />
                  <InputGroupAddon align="inline-end">
                    <HugeiconsIcon icon={Search} aria-hidden="true" />
                  </InputGroupAddon>
                </InputGroup>
                <InputGroup size="md">
                  <InputGroupInput
                    aria-label="Search"
                    placeholder="Search..."
                  />
                  <InputGroupAddon align="inline-end">
                    <HugeiconsIcon icon={Search} aria-hidden="true" />
                  </InputGroupAddon>
                </InputGroup>
                <InputGroup size="lg">
                  <InputGroupInput
                    aria-label="Search"
                    placeholder="Search..."
                  />
                  <InputGroupAddon align="inline-end">
                    <HugeiconsIcon icon={Search} aria-hidden="true" />
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <Code
                variant="block"
                language="tsx"
                code={iconsRightSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="icons-left-and-right"
          title="Left and right aligned"
          description="Icons on both sides of the field. Use this when the field needs a symbol at each end."
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="flex flex-col gap-4">
                <InputGroup size="sm">
                  <InputGroupAddon align="inline-start">
                    <HugeiconsIcon icon={Search} aria-hidden="true" />
                  </InputGroupAddon>
                  <InputGroupInput
                    aria-label="Search"
                    placeholder="Search..."
                  />
                  <InputGroupAddon align="inline-end">
                    <HugeiconsIcon icon={Search} aria-hidden="true" />
                  </InputGroupAddon>
                </InputGroup>
                <InputGroup size="md">
                  <InputGroupAddon align="inline-start">
                    <HugeiconsIcon icon={Search} aria-hidden="true" />
                  </InputGroupAddon>
                  <InputGroupInput
                    aria-label="Search"
                    placeholder="Search..."
                  />
                  <InputGroupAddon align="inline-end">
                    <HugeiconsIcon icon={Search} aria-hidden="true" />
                  </InputGroupAddon>
                </InputGroup>
                <InputGroup size="lg">
                  <InputGroupAddon align="inline-start">
                    <HugeiconsIcon icon={Search} aria-hidden="true" />
                  </InputGroupAddon>
                  <InputGroupInput
                    aria-label="Search"
                    placeholder="Search..."
                  />
                  <InputGroupAddon align="inline-end">
                    <HugeiconsIcon icon={Search} aria-hidden="true" />
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <Code
                variant="block"
                language="tsx"
                code={iconsBothSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="button"
        title="Button"
        description={
          <>
            Adds a control at the end using <Code>InputGroupButton</Code> inside{" "}
            <Code>InputGroupAddon</Code>. Button size follows the group{" "}
            <Code>size</Code>. Use this when the field has an action next to the
            value.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-col gap-4">
              <InputGroup size="sm">
                <InputGroupInput
                  aria-label="Value to copy"
                  placeholder="Copy to clipboard"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton aria-label="Copy value">
                    <HugeiconsIcon icon={Copy} aria-hidden="true" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup size="md">
                <InputGroupInput
                  aria-label="Value to copy"
                  placeholder="Copy to clipboard"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton aria-label="Copy value">
                    <HugeiconsIcon icon={Copy} aria-hidden="true" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              <InputGroup size="lg">
                <InputGroupInput
                  aria-label="Value to copy"
                  placeholder="Copy to clipboard"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton aria-label="Copy value">
                    <HugeiconsIcon icon={Copy} aria-hidden="true" />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={buttonSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="inline"
        title="Inline"
        description={
          <>
            Places the field beside a button using{" "}
            <Code>orientation=&quot;horizontal&quot;</Code> on{" "}
            <Code>Field</Code>. Use this when the input and action should sit on
            one row.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Field orientation="horizontal">
              <Input
                aria-label="Search"
                type="search"
                placeholder="Search..."
              />
              <Button>Search</Button>
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={inlineSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="within-form"
        title="Within form"
        description="Compose Input with Field for its visible label and FieldSet for a related form section."
      >
        <ComponentExample>
          <div className="space-y-6">
            <RequiredForm
              schema={inputFormSchema}
              defaultValues={{ name: "", email: "" }}
            >
              {(form) => (
                <FieldSet aria-describedby="account-details-description">
                  <FieldLegend>Account details</FieldLegend>
                  <FieldDescription id="account-details-description">
                    Used to identify and contact the account owner.
                  </FieldDescription>
                  <FieldGroup>
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="account-name">Name</FieldLabel>
                          <Input
                            {...field}
                            id="account-name"
                            autoComplete="name"
                            required
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="account-email">
                            Email address
                          </FieldLabel>
                          <Input
                            {...field}
                            id="account-email"
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
                  </FieldGroup>
                  <Button type="submit">Save details</Button>
                </FieldSet>
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
        description="Use Input for short, single-line values and keep its state clear."
      >
        <DocsDoDont
          doItems={[
            <>
              Pair Input with{" "}
              <DocsPageLink to="/components/field">Field</DocsPageLink> when it
              needs a label, help text, or an error.
            </>,
            <>
              Use <Code>readOnly</Code> when a value should remain visible but
              cannot be edited.
            </>,
            <>
              Set <Code>required</Code> on the control so its associated label
              shows the required marker.
            </>,
            <>
              Set <Code>name</Code>, <Code>type</Code>, and{" "}
              <Code>autoComplete</Code> for the value being collected.
            </>,
            <>
              Use <Code>InputGroup</Code> for icons or a button inside the
              field.
            </>,
            <>
              Match <Code>size</Code> to the surrounding form controls.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use Input for multi-line content; use a{" "}
              <DocsPageLink to="/components/textarea">
                Textarea field
              </DocsPageLink>
              .
            </>,
            <>Don’t use placeholder text as the only label.</>,
            <>
              Don’t use <Code>disabled</Code> when the value still needs to be
              readable or submitted.
            </>,
            <>
              Don’t position icons over Input; compose them with{" "}
              <Code>InputGroup</Code>.
            </>,
            <>Don’t mix sizes within the same form without a layout reason.</>,
          ]}
        />
      </MainSection>

      <MainSection id="api" title="API" description="Behaviour props on Input.">
        <DocsApiTable
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              defaultValue: '"md"',
              description: "Sets the input height, padding, and text size.",
            },
            {
              name: "readOnly",
              type: "boolean",
              defaultValue: "false",
              description:
                "Prevents editing while keeping the value focusable, selectable, and available for copying.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/input#api-reference">
                Base UI Input API
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/input">
                Shadcn Input documentation
              </DocsExternalLink>{" "}
              for the underlying API and source composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Choose the field that matches the value and interaction."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/textarea">
              Textarea field
            </DocsPageLink>{" "}
            — for values that need more than one line.
          </li>
          <li>
            <DocsPageLink to="/components/search">Search</DocsPageLink> — for a
            dedicated search control.
          </li>
          <li>
            <DocsPageLink to="/components/field">Field</DocsPageLink> — to
            compose a label, Input, help text, and error.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
