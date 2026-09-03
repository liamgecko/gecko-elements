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
import { Field, FieldError, FieldLabel } from "@gecko/ui/components/field";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@gecko/ui/components/native-select";
import { Controller } from "react-hook-form";
import { z } from "zod";

const nativeSelectFormSchema = z.object({
  fruit: z.string().min(1, "Select a fruit."),
});

export function NativeSelectPage() {
  const importSnippet = `import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@gecko/ui/components/native-select"`;

  const compositionSnippet = `NativeSelect
├── NativeSelectOption
└── NativeSelectOptGroup
    └── NativeSelectOption`;

  const basicSnippet = `<NativeSelect aria-label="Fruit">
  <NativeSelectOption value="">Select a fruit</NativeSelectOption>
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
  <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
  <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
</NativeSelect>`;

  const groupsSnippet = `<NativeSelect aria-label="Department">
  <NativeSelectOption value="">Select department</NativeSelectOption>
  <NativeSelectOptGroup label="Engineering">
    <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
    <NativeSelectOption value="backend">Backend</NativeSelectOption>
    <NativeSelectOption value="devops">DevOps</NativeSelectOption>
  </NativeSelectOptGroup>
  <NativeSelectOptGroup label="Sales">
    <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
    <NativeSelectOption value="account-manager">Account Manager</NativeSelectOption>
    <NativeSelectOption value="sales-director">Sales Director</NativeSelectOption>
  </NativeSelectOptGroup>
</NativeSelect>`;

  const withinFormSnippet = `const formSchema = z.object({
  fruit: z.string().min(1, "Select a fruit."),
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { fruit: "" },
})

<form noValidate onSubmit={form.handleSubmit(onSubmit)}>
  <Controller
    name="fruit"
    control={form.control}
    render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={field.name}>Fruit</FieldLabel>
        <NativeSelect {...field} id={field.name} required aria-invalid={fieldState.invalid}>
          <NativeSelectOption value="">Select a fruit</NativeSelectOption>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
        </NativeSelect>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    )}
  />
  <Button type="submit">Save selection</Button>
</form>`;

  const sizeSnippet = `<NativeSelect size="sm|md|lg" aria-label="Fruit">
  <NativeSelectOption value="">Select a fruit</NativeSelectOption>
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
  <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
</NativeSelect>`;

  const disabledSnippet = `<Field data-disabled>
  <FieldLabel htmlFor="native-select-states-disabled">Fruit</FieldLabel>
  <NativeSelect id="native-select-states-disabled" name="native-select-states-disabled" disabled>
    <NativeSelectOption value="">Select a fruit</NativeSelectOption>
    <NativeSelectOption value="apple">Apple</NativeSelectOption>
    <NativeSelectOption value="banana">Banana</NativeSelectOption>
    <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
  </NativeSelect>
</Field>`;

  const invalidSnippet = `<Field data-invalid>
  <FieldLabel htmlFor="native-select-states-invalid">Fruit</FieldLabel>
  <NativeSelect
    id="native-select-states-invalid"
    name="native-select-states-invalid"
    aria-invalid
    aria-describedby="native-select-states-invalid-error"
  >
    <NativeSelectOption value="">Select a fruit</NativeSelectOption>
    <NativeSelectOption value="apple">Apple</NativeSelectOption>
    <NativeSelectOption value="banana">Banana</NativeSelectOption>
    <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
  </NativeSelect>
  <FieldError id="native-select-states-invalid-error">
    Please choose a fruit from the list.
  </FieldError>
</Field>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Native select"
        description="Native select is a styled browser select control. It keeps native option menus while matching the design system."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Native select on student-facing surfaces — forms, events, and
            the live chat widget — where native mobile menu behaviour is
            preferred. Pair it with{" "}
            <DocsPageLink to="/components/field">Field</DocsPageLink> when the
            control needs a label, help text, or errors.
            <br />
            <br />
            Avoid using it in admin / product UI when you need custom menu
            interactions or richer option content — that is{" "}
            <DocsPageLink to="/components/select">Select</DocsPageLink> or{" "}
            <DocsPageLink to="/components/combobox">Combobox</DocsPageLink>.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Native select and its option parts."
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
        <ChildSection
          id="usage-composition"
          title="Composition"
          description="Options can be direct children, or grouped with NativeSelectOptGroup."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="text"
              code={compositionSnippet}
              showCopyButton
              copyLabel="Copy composition"
            />
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="basic-example"
        title="Basic example"
        description={
          <>
            A native dropdown using <Code>NativeSelect</Code> and{" "}
            <Code>NativeSelectOption</Code>. Use this when a simple list of
            choices is enough.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <NativeSelect aria-label="Fruit">
              <NativeSelectOption value="">Select a fruit</NativeSelectOption>
              <NativeSelectOption value="apple">Apple</NativeSelectOption>
              <NativeSelectOption value="banana">Banana</NativeSelectOption>
              <NativeSelectOption value="blueberry">
                Blueberry
              </NativeSelectOption>
              <NativeSelectOption value="pineapple">
                Pineapple
              </NativeSelectOption>
            </NativeSelect>
            <Code
              variant="block"
              language="tsx"
              code={basicSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="groups"
        title="Groups"
        description={
          <>
            Organises options using <Code>NativeSelectOptGroup</Code> with a{" "}
            <Code>label</Code>. Use this when choices belong to named
            categories.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <NativeSelect aria-label="Department">
              <NativeSelectOption value="">
                Select department
              </NativeSelectOption>
              <NativeSelectOptGroup label="Engineering">
                <NativeSelectOption value="frontend">
                  Frontend
                </NativeSelectOption>
                <NativeSelectOption value="backend">Backend</NativeSelectOption>
                <NativeSelectOption value="devops">DevOps</NativeSelectOption>
              </NativeSelectOptGroup>
              <NativeSelectOptGroup label="Sales">
                <NativeSelectOption value="sales-rep">
                  Sales Rep
                </NativeSelectOption>
                <NativeSelectOption value="account-manager">
                  Account Manager
                </NativeSelectOption>
                <NativeSelectOption value="sales-director">
                  Sales Director
                </NativeSelectOption>
              </NativeSelectOptGroup>
              <NativeSelectOptGroup label="Operations">
                <NativeSelectOption value="support">
                  Customer Support
                </NativeSelectOption>
                <NativeSelectOption value="product-manager">
                  Product Manager
                </NativeSelectOption>
                <NativeSelectOption value="ops-manager">
                  Operations Manager
                </NativeSelectOption>
              </NativeSelectOptGroup>
            </NativeSelect>
            <Code
              variant="block"
              language="tsx"
              code={groupsSnippet}
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
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-end gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium">Small</p>
                <NativeSelect size="sm" aria-label="Fruit">
                  <NativeSelectOption value="">
                    Select a fruit
                  </NativeSelectOption>
                  <NativeSelectOption value="apple">Apple</NativeSelectOption>
                  <NativeSelectOption value="banana">Banana</NativeSelectOption>
                  <NativeSelectOption value="pineapple">
                    Pineapple
                  </NativeSelectOption>
                </NativeSelect>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Medium</p>
                <NativeSelect size="md" aria-label="Fruit">
                  <NativeSelectOption value="">
                    Select a fruit
                  </NativeSelectOption>
                  <NativeSelectOption value="apple">Apple</NativeSelectOption>
                  <NativeSelectOption value="banana">Banana</NativeSelectOption>
                  <NativeSelectOption value="pineapple">
                    Pineapple
                  </NativeSelectOption>
                </NativeSelect>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Large</p>
                <NativeSelect size="lg" aria-label="Fruit">
                  <NativeSelectOption value="">
                    Select a fruit
                  </NativeSelectOption>
                  <NativeSelectOption value="apple">Apple</NativeSelectOption>
                  <NativeSelectOption value="banana">Banana</NativeSelectOption>
                  <NativeSelectOption value="pineapple">
                    Pineapple
                  </NativeSelectOption>
                </NativeSelect>
              </div>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={sizeSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="states"
        title="States"
        description="The field can be unavailable or invalid. Use the state that matches whether the person can choose an option, and whether the value is valid."
      >
        <ChildSection
          id="states-disabled"
          title="Disabled"
          description={
            <>
              Blocks the field using the <Code>disabled</Code> prop. Use this
              when a choice cannot be made yet.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Field data-disabled>
                <FieldLabel htmlFor="native-select-states-disabled">
                  Fruit
                </FieldLabel>
                <NativeSelect
                  id="native-select-states-disabled"
                  name="native-select-states-disabled"
                  disabled
                >
                  <NativeSelectOption value="">
                    Select a fruit
                  </NativeSelectOption>
                  <NativeSelectOption value="apple">Apple</NativeSelectOption>
                  <NativeSelectOption value="banana">Banana</NativeSelectOption>
                  <NativeSelectOption value="pineapple">
                    Pineapple
                  </NativeSelectOption>
                </NativeSelect>
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
          id="states-invalid"
          title="Invalid"
          description={
            <>
              Shows a validation error using <Code>aria-invalid</Code> on the
              control and <Code>data-invalid</Code> on the field. Use this when
              the chosen option is not valid.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Field data-invalid>
                <FieldLabel htmlFor="native-select-states-invalid">
                  Fruit
                </FieldLabel>
                <NativeSelect
                  id="native-select-states-invalid"
                  name="native-select-states-invalid"
                  aria-invalid
                  aria-describedby="native-select-states-invalid-error"
                >
                  <NativeSelectOption value="">
                    Select a fruit
                  </NativeSelectOption>
                  <NativeSelectOption value="apple">Apple</NativeSelectOption>
                  <NativeSelectOption value="banana">Banana</NativeSelectOption>
                  <NativeSelectOption value="pineapple">
                    Pineapple
                  </NativeSelectOption>
                </NativeSelect>
                <FieldError id="native-select-states-invalid-error">
                  Please choose a fruit from the list.
                </FieldError>
              </Field>
              <Code
                variant="block"
                language="tsx"
                code={invalidSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="within-form"
        title="Within form"
        description={
          <>
            Pairs the select with a label using <Code>Field</Code> and{" "}
            <Code>FieldLabel</Code>. Use this when the control needs a visible
            name in a form.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <RequiredForm
              className="space-y-4"
              schema={nativeSelectFormSchema}
              defaultValues={{ fruit: "" }}
            >
              {(form) => (
                <>
                  <Controller
                    name="fruit"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="native-select-fruit">
                          Fruit
                        </FieldLabel>
                        <NativeSelect
                          {...field}
                          id="native-select-fruit"
                          required
                          aria-invalid={fieldState.invalid}
                        >
                          <NativeSelectOption value="">
                            Select a fruit
                          </NativeSelectOption>
                          <NativeSelectOption value="apple">
                            Apple
                          </NativeSelectOption>
                          <NativeSelectOption value="banana">
                            Banana
                          </NativeSelectOption>
                          <NativeSelectOption value="blueberry">
                            Blueberry
                          </NativeSelectOption>
                          <NativeSelectOption value="pineapple">
                            Pineapple
                          </NativeSelectOption>
                        </NativeSelect>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Button type="submit">Save selection</Button>
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
        id="do-dont"
        title="Do and don’t"
        description="Use the browser’s native select behaviour for straightforward option lists."
      >
        <DocsDoDont
          doItems={[
            <>
              Pair Native select with{" "}
              <DocsPageLink to="/components/field">Field</DocsPageLink> when it
              needs a label or error.
            </>,
            <>
              Group related choices with <Code>NativeSelectOptGroup</Code> and a
              clear <Code>label</Code>.
            </>,
            <>
              Set <Code>aria-invalid</Code> and connect <Code>FieldError</Code>{" "}
              when the choice is invalid.
            </>,
            <>
              Match <Code>size</Code> to the surrounding form controls.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use Native select when options need rich content or custom
              menu interactions.
            </>,
            <>Don’t use an empty group label.</>,
            <>
              Don’t show only a visual error state without{" "}
              <Code>aria-invalid</Code>.
            </>,
            <>Don’t mix sizes within the same form without a layout reason.</>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Native select."
      >
        <ChildSection
          id="api-native-select"
          title="NativeSelect"
          description="Props on NativeSelect."
        >
          <DocsApiTable
            rows={[
              {
                name: "size",
                type: '"sm" | "md" | "lg"',
                defaultValue: '"md"',
                description: "Sets the control height, padding, and text size.",
              },
              {
                name: "disabled",
                type: "boolean",
                defaultValue: "false",
                description:
                  "Makes the control unavailable and excludes it from form submission.",
              },
              {
                name: "required",
                type: "boolean",
                defaultValue: "false",
                description:
                  "Requires a non-empty choice before native form submission.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-native-select-option"
          title="NativeSelectOption"
          description="Props on NativeSelectOption."
        >
          <DocsApiTable
            rows={[
              {
                name: "value",
                type: "string | number | readonly string[]",
                description:
                  "Sets the value submitted when the option is selected.",
              },
              {
                name: "disabled",
                type: "boolean",
                defaultValue: "false",
                description: "Makes an individual option unavailable.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-native-select-opt-group"
          title="NativeSelectOptGroup"
          description="Props on NativeSelectOptGroup."
        >
          <DocsApiTable
            rows={[
              {
                name: "label",
                type: "string",
                description: "Names a related group of options.",
              },
              {
                name: "disabled",
                type: "boolean",
                defaultValue: "false",
                description: "Makes every option in the group unavailable.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/native-select">
                Shadcn Native Select documentation
              </DocsExternalLink>{" "}
              for the component source and the{" "}
              <DocsExternalLink href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select">
                MDN select reference
              </DocsExternalLink>{" "}
              for native form behaviour.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use a custom choice control when native options are not enough."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/select">Select</DocsPageLink> — for a
            custom popup and richer option content.
          </li>
          <li>
            <DocsPageLink to="/components/combobox">Combobox</DocsPageLink> —
            for a filterable list of options.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
