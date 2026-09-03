import { useState } from "react";
import { Checkbox, CheckboxGroup } from "@gecko/ui/components/checkbox";
import { Button } from "@gecko/ui/components/button";
import { Code } from "@gecko/ui/components/code";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
} from "@gecko/ui/components/field";
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
import { Controller } from "react-hook-form";
import { z } from "zod";

const checkboxFormSchema = z.object({
  productUpdates: z.literal(true, {
    errorMap: () => ({ message: "Confirm that you want product updates." }),
  }),
});

export function CheckboxPage() {
  const [groupValue, setGroupValue] = useState<string[]>(["email"]);
  const [channelValue, setChannelValue] = useState<string[]>(["email"]);

  const importSnippet = `import { Checkbox, CheckboxGroup } from "@gecko/ui/components/checkbox"`;

  const compositionSnippet = `CheckboxGroup
└── Checkbox`;

  const basicSnippet = `<Checkbox
  id="terms"
  name="terms"
  required
  label="Accept terms and conditions"
/>`;

  const descriptionSnippet = `<Checkbox
  id="product-updates"
  name="product-updates"
  label="Send me product updates"
  description="Receive occasional product news by email."
/>`;

  const defaultStateSnippet = `<Checkbox
  id="archived"
  name="archived"
  label="Show archived conversations"
/>`;

  const checkedSnippet = `<Checkbox
  id="archived"
  name="archived"
  defaultChecked
  label="Show archived conversations"
/>`;

  const indeterminateSnippet = `const channels = ["email", "sms", "whatsapp"]
const [selectedChannels, setSelectedChannels] = useState(["email"])

<CheckboxGroup
  label="Communication channels"
  value={selectedChannels}
  onValueChange={setSelectedChannels}
  allValues={channels}
>
  <Checkbox parent label="Select all channels" />
  <Checkbox value="email" label="Email" />
  <Checkbox value="sms" label="SMS" />
  <Checkbox value="whatsapp" label="WhatsApp" />
</CheckboxGroup>`;

  const disabledSnippet = `<Field orientation="horizontal" data-disabled>
  <Checkbox
    id="sms-notifications"
    name="sms-notifications"
    disabled
    label="Enable SMS notifications"
  />
</Field>`;

  const errorSnippet = `<Field orientation="horizontal" data-invalid>
  <FieldContent>
    <Checkbox
      id="terms-checkbox-invalid"
      name="terms-checkbox-invalid"
      aria-invalid
      aria-describedby="terms-checkbox-invalid-error"
      label="Accept terms and conditions"
    />
    <FieldError id="terms-checkbox-invalid-error">
      You must accept the terms and conditions to continue.
    </FieldError>
  </FieldContent>
</Field>`;

  const groupSnippet = `<CheckboxGroup
  label="Communication channels"
  description="Select every channel your team can use."
  value={groupValue}
  onValueChange={setGroupValue}
>
  <Checkbox value="email" label="Email" />
  <Checkbox value="sms" label="SMS" />
  <Checkbox value="whatsapp" label="WhatsApp" />
</CheckboxGroup>`;

  const asButtonBasicSnippet = `<CheckboxGroup
  horizontal
  label="Preferred contact methods"
  defaultValue={["email"]}
>
  <Checkbox asButton value="email" label="Email" />
  <Checkbox asButton value="sms" label="SMS" />
  <Checkbox asButton value="phone" label="Phone" />
</CheckboxGroup>`;

  const asButtonDescriptionSnippet = `<CheckboxGroup
  horizontal
  label="Event formats"
  defaultValue={["online"]}
>
  <Checkbox
    asButton
    value="in-person"
    label="In person"
    description="Attend the event on campus."
  />
  <Checkbox
    asButton
    value="online"
    label="Online"
    description="Join the event remotely."
  />
</CheckboxGroup>`;

  const asButtonDisabledSnippet = `<CheckboxGroup
  horizontal
  label="Event formats"
  defaultValue={["online"]}
  disabled
>
  <Checkbox
    asButton
    value="in-person"
    label="In person"
  />
  <Checkbox
    asButton
    value="online"
    label="Online"
  />
</CheckboxGroup>`;

  const asButtonErrorSnippet = `<Field data-invalid>
  <FieldContent>
    <CheckboxGroup
      horizontal
      aria-invalid
      aria-describedby="event-formats-error"
      label="Event formats"
    >
      <Checkbox
        asButton
        value="in-person"
        label="In person"
      />
      <Checkbox
        asButton
        value="online"
        label="Online"
      />
    </CheckboxGroup>
    <FieldError id="event-formats-error">
      Select at least one event format.
    </FieldError>
  </FieldContent>
</Field>`;

  const withinFormSnippet = `const formSchema = z.object({
  productUpdates: z.literal(true, {
    errorMap: () => ({ message: "Confirm that you want product updates." }),
  }),
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { productUpdates: false },
})

<form noValidate onSubmit={form.handleSubmit(onSubmit)}>
  <Controller
    name="productUpdates"
    control={form.control}
    render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid}>
        <Checkbox
          id={field.name}
          name={field.name}
          checked={field.value}
          onCheckedChange={field.onChange}
          label="Send me product updates"
          required
          aria-invalid={fieldState.invalid}
        />
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </Field>
    )}
  />
  <Button type="submit">Save preferences</Button>
</form>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Checkbox"
        description="The Checkbox component lets people turn an option on or off. It is for choices that can sit together — more than one can be selected at a time."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use a Checkbox when someone can select one or more options from a
            list. Use <Code>CheckboxGroup</Code> when related options make up
            one multiple-choice value.
            <br />
            <br />
            Use the button variant (<Code>asButton</Code>) with{" "}
            <Code>horizontal</Code> when the choices should draw more attention
            — for example, a short set of selectable options. This changes
            presentation only; every option remains a Checkbox and multiple
            options may be selected.
            <br />
            <br />
            Avoid using it when only one choice is allowed; use a{" "}
            <DocsPageLink to="/components/radio-group">
              Radio group
            </DocsPageLink>{" "}
            instead. Do not use it as an on/off setting that takes effect
            immediately — that is a{" "}
            <DocsPageLink to="/components/switch">Switch</DocsPageLink>.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Checkbox for a single option, and CheckboxGroup for a list."
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
          description="A group holds the shared label and state. Each option is a Checkbox."
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
        id="basic"
        title="Basic"
        description={
          <>
            A labelled checkbox using the <Code>label</Code> prop. Use this for
            one independent boolean choice.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Checkbox
              id="terms"
              name="terms"
              required
              label="Accept terms and conditions"
            />
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
        id="with-description"
        title="With description"
        description={
          <>
            Adds helper text using the <Code>description</Code> prop. Checkbox
            automatically connects it to the control for assistive technology.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="max-w-sm">
              <Checkbox
                id="product-updates"
                name="product-updates"
                label="Send me product updates"
                description="Receive occasional product news by email."
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={descriptionSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="states"
        title="States"
        description="A checkbox can be empty, selected, mixed, unavailable, or invalid. Use the state that matches where the option is."
      >
        <ChildSection
          id="states-default"
          title="Default"
          description="The empty checkbox. Use this before the person has made a choice."
        >
          <ComponentExample>
            <div className="space-y-6">
              <Checkbox
                id="states-default"
                name="archived"
                label="Show archived conversations"
              />
              <Code
                variant="block"
                language="tsx"
                code={defaultStateSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="states-checked"
          title="Checked"
          description={
            <>
              Starts selected using <Code>defaultChecked</Code>. Use this only
              when the initial selection reflects an existing preference or a
              safe product default. Consent choices start unchecked.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Checkbox
                id="states-checked"
                name="archived"
                defaultChecked
                label="Show archived conversations"
              />
              <Code
                variant="block"
                language="tsx"
                code={checkedSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="states-indeterminate"
          title="Indeterminate"
          description={
            <>
              A parent checkbox becomes indeterminate automatically when some,
              but not all, child options are selected. Pass every child value
              through <Code>allValues</Code> and add <Code>parent</Code> to the
              parent Checkbox.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <CheckboxGroup
                label="Communication channels"
                value={channelValue}
                onValueChange={setChannelValue}
                allValues={["email", "sms", "whatsapp"]}
              >
                <Checkbox parent label="Select all channels" />
                <Checkbox value="email" label="Email" />
                <Checkbox value="sms" label="SMS" />
                <Checkbox value="whatsapp" label="WhatsApp" />
              </CheckboxGroup>
              <Code
                variant="block"
                language="tsx"
                code={indeterminateSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="states-disabled"
          title="Disabled"
          description={
            <>
              Prevents interaction using the <Code>disabled</Code> prop. Use
              this when the option is not available yet.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <FieldGroup>
                <Field orientation="horizontal" data-disabled>
                  <Checkbox
                    id="sms-notifications"
                    name="sms-notifications"
                    disabled
                    label="Enable SMS notifications"
                  />
                </Field>
              </FieldGroup>
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
              checkbox and <Code>data-invalid</Code> on the field. Use this when
              the option must be selected before continuing.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <FieldGroup>
                <Field
                  orientation="horizontal"
                  data-invalid
                  className="max-w-md"
                >
                  <FieldContent>
                    <Checkbox
                      id="terms-checkbox-invalid"
                      name="terms-checkbox-invalid"
                      aria-invalid
                      aria-describedby="terms-checkbox-invalid-error"
                      label="Accept terms and conditions"
                    />
                    <FieldError id="terms-checkbox-invalid-error">
                      You must accept the terms and conditions to continue.
                    </FieldError>
                  </FieldContent>
                </Field>
              </FieldGroup>
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
        id="checkbox-group"
        title="Checkbox group"
        description={
          <>
            Related options represented by one shared array value. The group
            owns its legend, description, orientation and disabled state; each
            Checkbox supplies one unique <Code>value</Code>.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <CheckboxGroup
              label="Communication channels"
              description="Select every channel your team can use."
              value={groupValue}
              onValueChange={setGroupValue}
            >
              <Checkbox value="email" label="Email" />
              <Checkbox value="sms" label="SMS" />
              <Checkbox value="whatsapp" label="WhatsApp" />
            </CheckboxGroup>
            <Code
              variant="block"
              language="tsx"
              code={groupSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="as-button"
        title="As button"
        description={
          <>
            Renders the option as a button using the <Code>asButton</Code> prop.
            Use this when the choices should feel like selectable chips rather
            than a list of ticks. A checkbox remains visible at the start of
            every option, so selection never moves its content.
          </>
        }
      >
        <ChildSection
          id="as-button-basic"
          title="Basic"
          description={
            <>
              Button-style options in a <Code>CheckboxGroup</Code> with{" "}
              <Code>horizontal</Code>. Use this for a short row of choices.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <CheckboxGroup
                horizontal
                label="Preferred contact methods"
                defaultValue={["email"]}
              >
                <Checkbox asButton value="email" label="Email" />
                <Checkbox asButton value="sms" label="SMS" />
                <Checkbox asButton value="phone" label="Phone" />
              </CheckboxGroup>
              <Code
                variant="block"
                language="tsx"
                code={asButtonBasicSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="as-button-with-description"
          title="With description"
          description={
            <>
              Button-style options with descriptions. Use these for a short set
              of choices that need supporting context.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="max-w-xl">
                <CheckboxGroup
                  horizontal
                  label="Event formats"
                  defaultValue={["online"]}
                >
                  <Checkbox
                    asButton
                    value="in-person"
                    label="In person"
                    description="Attend the event on campus."
                  />
                  <Checkbox
                    asButton
                    value="online"
                    label="Online"
                    description="Join the event remotely."
                  />
                </CheckboxGroup>
              </div>
              <Code
                variant="block"
                language="tsx"
                code={asButtonDescriptionSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="as-button-disabled"
          title="Disabled"
          description={
            <>
              Set <Code>disabled</Code> on CheckboxGroup when the complete set
              is unavailable. The group applies the state to every option and
              its legend.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <CheckboxGroup
                horizontal
                label="Event formats"
                defaultValue={["online"]}
                disabled
              >
                <Checkbox asButton value="in-person" label="In person" />
                <Checkbox asButton value="online" label="Online" />
              </CheckboxGroup>
              <Code
                variant="block"
                language="tsx"
                code={asButtonDisabledSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="as-button-error"
          title="Error"
          description={
            <>
              Put <Code>aria-invalid</Code> and the error description on
              CheckboxGroup. The group applies the invalid treatment to every
              option, so individual checkboxes need no error styling props.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Field data-invalid className="w-fit max-w-full">
                <FieldContent>
                  <CheckboxGroup
                    horizontal
                    aria-invalid
                    aria-describedby="event-formats-error"
                    label="Event formats"
                  >
                    <Checkbox asButton value="in-person" label="In person" />
                    <Checkbox asButton value="online" label="Online" />
                  </CheckboxGroup>
                  <FieldError id="event-formats-error">
                    Select at least one event format.
                  </FieldError>
                </FieldContent>
              </Field>
              <Code
                variant="block"
                language="tsx"
                code={asButtonErrorSnippet}
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
        description="Place Checkbox inside the form flow and give it a submitted name. Keep the action at its default width."
      >
        <ComponentExample>
          <div className="space-y-6">
            <RequiredForm
              className="space-y-6"
              schema={checkboxFormSchema}
              defaultValues={{ productUpdates: false }}
            >
              {(form) => (
                <>
                  <Controller
                    name="productUpdates"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          label="Send me product updates"
                          required
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Button type="submit">Save preferences</Button>
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
        description="Use label for the option name. Do not restyle the checkbox chrome."
      >
        <DocsDoDont
          doItems={[
            <>
              Name the option with the <Code>label</Code> prop. Add{" "}
              <Code>description</Code> when it needs a short explanation.
            </>,
            <>
              Wrap related choices in <Code>CheckboxGroup</Code> with a{" "}
              <Code>value</Code> on each <Code>Checkbox</Code>.
            </>,
            <>
              Set <Code>asButton</Code> and <Code>horizontal</Code> when the
              choices should feel like selectable chips.
            </>,
            <>
              Put <Code>aria-invalid</Code> and <Code>aria-describedby</Code> on
              CheckboxGroup when validation belongs to the complete choice.
            </>,
            <>
              Use <Code>parent</Code> and <Code>allValues</Code> for a
              select-all option. CheckboxGroup derives its indeterminate state.
            </>,
          ]}
          dontItems={[
            <>
              Don’t override size, radius, or colour with <Code>className</Code>
              .
            </>,
            <>
              Don’t use a Checkbox when only one choice is allowed. Use a{" "}
              <DocsPageLink to="/components/radio-group">
                Radio group
              </DocsPageLink>
              .
            </>,
            <>
              Don’t use it as an on/off setting that takes effect immediately.
              Use a <DocsPageLink to="/components/switch">Switch</DocsPageLink>.
            </>,
            <>
              Don’t omit <Code>value</Code> on options inside a group.
            </>,
            <>Don’t preselect consent or marketing choices.</>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Checkbox."
      >
        <DocsApiTable
          rows={[
            {
              name: "label",
              type: "React.ReactNode",
              description: "Visible name of the option.",
            },
            {
              name: "description",
              type: "React.ReactNode",
              description:
                "Helper text automatically connected to the Checkbox or CheckboxGroup.",
            },
            {
              name: "asButton",
              type: "boolean",
              defaultValue: "false",
              description:
                "Uses the approved selectable-card treatment with a checkbox fixed at the start. Selection semantics remain Checkbox.",
            },
            {
              name: "horizontal",
              type: "boolean",
              defaultValue: "false",
              description:
                "On CheckboxGroup. Lays options out in a wrapping row.",
            },
            {
              name: "indeterminate",
              type: "boolean",
              defaultValue: "false",
              description:
                "Explicit mixed state. Prefer parent with CheckboxGroup allValues when the state represents child options.",
            },
            {
              name: "parent",
              type: "boolean",
              defaultValue: "false",
              description:
                "Makes a Checkbox control every value listed in CheckboxGroup allValues.",
            },
            {
              name: "allValues",
              type: "string[]",
              description:
                "On CheckboxGroup. Values controlled by its parent Checkbox.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Prevents interaction.",
            },
            {
              name: "value",
              type: "string",
              description:
                "On Checkbox inside a group. Identifies the option in value and onValueChange.",
            },
            {
              name: "value / defaultValue",
              type: "string[]",
              description:
                "On CheckboxGroup. Controlled or initial selected option values.",
            },
            {
              name: "onValueChange",
              type: "(value: string[]) => void",
              description:
                "On CheckboxGroup. Reports the complete selected value array.",
            },
            {
              name: "checked / defaultChecked",
              type: "boolean",
              description:
                "Controlled or initial state for an independent Checkbox.",
            },
            {
              name: "onCheckedChange",
              type: "(checked: boolean) => void",
              description: "Reports an independent Checkbox state change.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/checkbox">
                Base UI Checkbox API
              </DocsExternalLink>
              {", the "}
              <DocsExternalLink href="https://base-ui.com/react/components/checkbox-group">
                Base UI Checkbox Group API
              </DocsExternalLink>{" "}
              and the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/checkbox">
                Shadcn Checkbox documentation
              </DocsExternalLink>{" "}
              for the underlying APIs and source composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use a different control when the Checkbox is the wrong shape for the job."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/radio-group">
              Radio group
            </DocsPageLink>{" "}
            — when only one choice is allowed.
          </li>
          <li>
            <DocsPageLink to="/components/switch">Switch</DocsPageLink> — when
            the setting takes effect immediately.
          </li>
          <li>
            <DocsPageLink to="/components/field">Field</DocsPageLink> — when the
            option needs an error, help text, or form layout.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
