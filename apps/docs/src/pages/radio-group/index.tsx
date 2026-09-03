import { useState } from "react";
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
import { Field, FieldContent, FieldError } from "@gecko/ui/components/field";
import { RadioGroup, RadioGroupItem } from "@gecko/ui/components/radio-group";
import { Code } from "@gecko/ui/components/code";
import { Controller } from "react-hook-form";
import { z } from "zod";

const radioGroupFormSchema = z.object({
  notificationFrequency: z.string().min(1, "Select a notification frequency."),
});

export function RadioGroupPage() {
  const [groupValue, setGroupValue] = useState<string>("fuji");
  const [asButtonValue, setAsButtonValue] = useState<string>("a");
  const [asButtonDescValue, setAsButtonDescValue] = useState<string>("terms");

  const importSnippet = `import { RadioGroup, RadioGroupItem } from "@gecko/ui/components/radio-group"`;
  const compositionSnippet = `RadioGroup
└── RadioGroupItem`;

  const basicSnippet = `<RadioGroup
  label="Select your favourite apple"
  value={groupValue}
  onValueChange={setGroupValue}
>
  <RadioGroupItem id="group-fuji" value="fuji" label="Fuji" />
  <RadioGroupItem id="group-gala" value="gala" label="Gala" />
  <RadioGroupItem id="group-granny-smith" value="granny-smith" label="Granny Smith" />
  <RadioGroupItem id="group-honeycrisp" value="honeycrisp" label="Honeycrisp" />
</RadioGroup>`;

  const withDescriptionSnippet = `<RadioGroup label="Notification frequency" defaultValue="important">
  <RadioGroupItem
    value="all"
    label="All activity"
    description="Receive every notification."
  />
  <RadioGroupItem
    value="important"
    label="Important activity"
    description="Receive only mentions and assignments."
  />
  <RadioGroupItem
    value="none"
    label="No notifications"
    description="Do not receive notifications."
  />
</RadioGroup>`;

  const statesDefaultSnippet = `<Field orientation="horizontal">
  <FieldContent>
    <RadioGroup aria-label="Selection state" value="" onValueChange={() => {}}>
      <RadioGroupItem id="states-default" value="unchecked" label="Unselected" />
    </RadioGroup>
  </FieldContent>
</Field>`;

  const statesCheckedSnippet = `<Field orientation="horizontal">
  <FieldContent>
    <RadioGroup aria-label="Selection state" value="checked" onValueChange={() => {}}>
      <RadioGroupItem id="states-checked" value="checked" label="Selected" />
    </RadioGroup>
  </FieldContent>
</Field>`;

  const statesDisabledSnippet = `<Field orientation="horizontal" data-disabled>
  <FieldContent>
    <RadioGroup aria-label="Selection state" defaultValue="">
      <RadioGroupItem value="option1" id="disabled-1" disabled label="Disabled" />
    </RadioGroup>
  </FieldContent>
</Field>`;

  const statesErrorSnippet = `<Field orientation="horizontal" data-invalid className="max-w-md">
  <FieldContent>
    <RadioGroup
      aria-label="Selection state"
      aria-invalid
      aria-describedby="invalid-email-error"
      defaultValue="email"
    >
      <RadioGroupItem
        value="email"
        id="invalid-email"
        aria-invalid
        aria-describedby="invalid-email-error"
        label="Email only"
      />
    </RadioGroup>
    <FieldError id="invalid-email-error">
      Choose a valid notification method.
    </FieldError>
  </FieldContent>
</Field>`;

  const asButtonBasicSnippet = `<RadioGroup
  label="Choose an option"
  value={asButtonValue}
  onValueChange={setAsButtonValue}
>
  <RadioGroupItem asButton id="as-button-basic" value="a" label="Option A" />
  <RadioGroupItem asButton id="as-button-checked" value="b" label="Option B" />
</RadioGroup>`;

  const asButtonWithDescriptionSnippet = `<RadioGroup
  label="Choose an option"
  value={asButtonDescValue}
  onValueChange={setAsButtonDescValue}
>
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
</RadioGroup>`;

  const asButtonDisabledSnippet = `<RadioGroup
  label="Choose an option"
  value="b"
  onValueChange={() => {}}
  disabled
>
  <RadioGroupItem asButton id="as-button-disabled-a" value="a" label="Option A" />
  <RadioGroupItem asButton id="as-button-disabled-b" value="b" label="Option B" />
</RadioGroup>`;

  const asButtonErrorSnippet = `<Field data-invalid className="w-fit max-w-full">
  <FieldContent>
    <RadioGroup
      aria-invalid
      aria-describedby="as-button-error-msg"
      value=""
      onValueChange={() => {}}
      label="Select an option"
    >
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
</Field>`;

  const withinFormSnippet = `const formSchema = z.object({
  notificationFrequency: z.string().min(1, "Select a notification frequency."),
})

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: { notificationFrequency: "" },
})

<form noValidate onSubmit={form.handleSubmit(onSubmit)}>
  <Controller
    name="notificationFrequency"
    control={form.control}
    render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid}>
        <RadioGroup
          name={field.name}
          value={field.value}
          onValueChange={field.onChange}
          label="Notification frequency"
          required
          aria-invalid={fieldState.invalid}
        >
          <RadioGroupItem value="all" label="All activity" aria-invalid={fieldState.invalid} />
          <RadioGroupItem value="important" label="Important activity" aria-invalid={fieldState.invalid} />
          <RadioGroupItem value="none" label="No notifications" aria-invalid={fieldState.invalid} />
        </RadioGroup>
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
        title="Radio group"
        description="Radio group lets people choose exactly one option from a list."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Radio group when one option must be selected from a known set.
            Default to a vertical list. Use button-style options for a short,
            prominent set.
            <br />
            <br />
            Avoid using it for multiple selections — that is{" "}
            <DocsPageLink to="/components/checkbox">Checkbox</DocsPageLink>. If
            the set is long or collapsed, consider{" "}
            <DocsPageLink to="/components/select">Select</DocsPageLink>.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import RadioGroup and RadioGroupItem."
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
          description="Render one RadioGroupItem for each option."
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
        description="A labelled group for choosing exactly one option from a known set."
      >
        <ComponentExample>
          <div className="flex flex-col gap-6">
            <RadioGroup
              label="Select your favourite apple"
              value={groupValue}
              onValueChange={setGroupValue}
            >
              <RadioGroupItem id="group-fuji" value="fuji" label="Fuji" />
              <RadioGroupItem id="group-gala" value="gala" label="Gala" />
              <RadioGroupItem
                id="group-granny-smith"
                value="granny-smith"
                label="Granny Smith"
              />
              <RadioGroupItem
                id="group-honeycrisp"
                value="honeycrisp"
                label="Honeycrisp"
              />
            </RadioGroup>
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
        description="Add supporting text when an option needs more context than its label provides."
      >
        <ComponentExample>
          <div className="flex flex-col gap-6">
            <div className="max-w-sm">
              <RadioGroup
                label="Notification frequency"
                defaultValue="important"
              >
                <RadioGroupItem
                  value="all"
                  label="All activity"
                  description="Receive every notification."
                />
                <RadioGroupItem
                  value="important"
                  label="Important activity"
                  description="Receive only mentions and assignments."
                />
                <RadioGroupItem
                  value="none"
                  label="No notifications"
                  description="Do not receive notifications."
                />
              </RadioGroup>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={withDescriptionSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="states"
        title="States"
        description="The control can be unselected, selected, unavailable, or invalid. Use the state that matches whether the person can choose an option, and whether the value is valid."
      >
        <ChildSection
          id="states-default"
          title="Default"
          description="An unselected radio. Use this when no option has been chosen yet."
        >
          <ComponentExample>
            <div className="flex flex-col gap-6">
              <Field orientation="horizontal">
                <FieldContent>
                  <RadioGroup
                    aria-label="Selection state"
                    value=""
                    onValueChange={() => {}}
                  >
                    <RadioGroupItem
                      id="states-default"
                      value="unchecked"
                      label="Unselected"
                    />
                  </RadioGroup>
                </FieldContent>
              </Field>
              <Code
                variant="block"
                language="tsx"
                code={statesDefaultSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="states-checked"
          title="Checked"
          description="A selected radio. Use this when one option is already chosen."
        >
          <ComponentExample>
            <div className="flex flex-col gap-6">
              <Field orientation="horizontal">
                <FieldContent>
                  <RadioGroup
                    aria-label="Selection state"
                    value="checked"
                    onValueChange={() => {}}
                  >
                    <RadioGroupItem
                      id="states-checked"
                      value="checked"
                      label="Selected"
                    />
                  </RadioGroup>
                </FieldContent>
              </Field>
              <Code
                variant="block"
                language="tsx"
                code={statesCheckedSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="states-disabled"
          title="Disabled"
          description="An unavailable option that cannot be selected."
        >
          <ComponentExample>
            <div className="flex flex-col gap-6">
              <Field orientation="horizontal" data-disabled>
                <FieldContent>
                  <RadioGroup aria-label="Selection state" defaultValue="">
                    <RadioGroupItem
                      value="option1"
                      id="disabled-1"
                      disabled
                      label="Disabled"
                    />
                  </RadioGroup>
                </FieldContent>
              </Field>
              <Code
                variant="block"
                language="tsx"
                code={statesDisabledSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="states-error"
          title="Error"
          description="An invalid selection with an associated validation message."
        >
          <ComponentExample>
            <div className="flex flex-col gap-6">
              <Field orientation="horizontal" data-invalid className="max-w-md">
                <FieldContent>
                  <RadioGroup
                    aria-label="Selection state"
                    aria-invalid
                    aria-describedby="invalid-email-error"
                    defaultValue="email"
                  >
                    <RadioGroupItem
                      value="email"
                      id="invalid-email"
                      aria-invalid
                      aria-describedby="invalid-email-error"
                      label="Email only"
                    />
                  </RadioGroup>
                  <FieldError id="invalid-email-error">
                    Choose a valid notification method.
                  </FieldError>
                </FieldContent>
              </Field>
              <Code
                variant="block"
                language="tsx"
                code={statesErrorSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="as-button"
        title="As button"
        description="Use button-style options for a short, prominent single-choice set."
      >
        <ChildSection
          id="as-button-basic"
          title="Basic"
          description="A compact set of button-style options."
        >
          <ComponentExample>
            <div className="flex flex-col gap-6">
              <RadioGroup
                label="Choose an option"
                value={asButtonValue}
                onValueChange={setAsButtonValue}
              >
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
          description="Button-style options with supporting text for additional context."
        >
          <ComponentExample>
            <div className="flex flex-col gap-6">
              <RadioGroup
                label="Choose an option"
                value={asButtonDescValue}
                onValueChange={setAsButtonDescValue}
              >
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
              <Code
                variant="block"
                language="tsx"
                code={asButtonWithDescriptionSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="as-button-disabled"
          title="Disabled"
          description="An unavailable button-style group that cannot be changed."
        >
          <ComponentExample>
            <div className="flex flex-col gap-6">
              <RadioGroup
                label="Choose an option"
                value="b"
                onValueChange={() => {}}
                disabled
              >
                <RadioGroupItem
                  asButton
                  id="as-button-disabled-a"
                  value="a"
                  label="Option A"
                />
                <RadioGroupItem
                  asButton
                  id="as-button-disabled-b"
                  value="b"
                  label="Option B"
                />
              </RadioGroup>
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
          description="A required button-style group with an associated validation message."
        >
          <ComponentExample>
            <div className="flex flex-col gap-6">
              <Field data-invalid className="w-fit max-w-full">
                <FieldContent>
                  <RadioGroup
                    aria-invalid
                    aria-describedby="as-button-error-msg"
                    value=""
                    onValueChange={() => {}}
                    label="Select an option"
                  >
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
        description="Give the group a submitted name and keep the form action at its default width."
      >
        <ComponentExample>
          <div className="flex flex-col gap-6">
            <RequiredForm
              className="space-y-6"
              schema={radioGroupFormSchema}
              defaultValues={{ notificationFrequency: "" }}
            >
              {(form) => (
                <>
                  <Controller
                    name="notificationFrequency"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <RadioGroup
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                          label="Notification frequency"
                          required
                          aria-invalid={fieldState.invalid}
                        >
                          <RadioGroupItem
                            value="all"
                            label="All activity"
                            aria-invalid={fieldState.invalid}
                          />
                          <RadioGroupItem
                            value="important"
                            label="Important activity"
                            aria-invalid={fieldState.invalid}
                          />
                          <RadioGroupItem
                            value="none"
                            label="No notifications"
                            aria-invalid={fieldState.invalid}
                          />
                        </RadioGroup>
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
        description="Group a known set of options and make each choice clear."
      >
        <DocsDoDont
          doItems={[
            <>
              Give the group a visible label that explains the shared choice.
            </>,
            <>Give every option a unique value and a clear label.</>,
            <>Add supporting text only when an option needs more context.</>,
            <>
              Use button-style options for a short set that should stand out.
            </>,
            <>Associate one validation error with the complete group.</>,
          ]}
          dontItems={[
            <>
              Don’t use Radio group for multiple selections. Use{" "}
              <DocsPageLink to="/components/checkbox">Checkbox</DocsPageLink>.
            </>,
            <>
              Don’t use it for an immediate on/off setting. Use a{" "}
              <DocsPageLink to="/components/switch">Switch</DocsPageLink>.
            </>,
            <>
              Don’t omit the group label when the relationship between options
              is unclear.
            </>,
            <>Don’t repeat a value across items in the same group.</>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on RadioGroup and RadioGroupItem."
      >
        <ChildSection
          id="api-radio-group"
          title="RadioGroup"
          description="Props on RadioGroup."
        >
          <DocsApiTable
            rows={[
              {
                name: "label",
                type: "React.ReactNode",
                description: "Visible legend and accessible group name.",
              },
              {
                name: "description",
                type: "React.ReactNode",
                description: "Supporting text connected to the group.",
              },
              {
                name: "horizontal",
                type: "boolean",
                defaultValue: "false",
                description: "Lays options out in a wrapping row.",
              },
              {
                name: "name",
                type: "string",
                description: "Native form field name shared by the options.",
              },
              {
                name: "value | defaultValue",
                type: "string",
                description: "Controlled value or initial uncontrolled value.",
              },
              {
                name: "onValueChange",
                type: "(value: string) => void",
                description: "Reports the newly selected value.",
              },
              {
                name: "disabled",
                type: "boolean",
                defaultValue: "false",
                description: "Makes the complete group unavailable.",
              },
              {
                name: "required",
                type: "boolean",
                defaultValue: "false",
                description: "Requires one option for native form validation.",
              },
              {
                name: "readOnly",
                type: "boolean",
                defaultValue: "false",
                description: "Prevents the selected value from changing.",
              },
            ]}
          />
        </ChildSection>
        <ChildSection
          id="api-radio-group-item"
          title="RadioGroupItem"
          description="Props on RadioGroupItem."
        >
          <DocsApiTable
            rows={[
              {
                name: "label",
                type: "React.ReactNode",
                description: "Visible and accessible option name.",
              },
              {
                name: "description",
                type: "React.ReactNode",
                description: "Supporting text connected to the option.",
              },
              {
                name: "asButton",
                type: "boolean",
                defaultValue: "false",
                description: "Uses the approved button-style treatment.",
              },
              {
                name: "value",
                type: "string",
                description: "Unique option value within the group.",
              },
              {
                name: "disabled",
                type: "boolean",
                defaultValue: "false",
                description: "Makes one option unavailable.",
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
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/radio-group">
                Shadcn Radio group documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/radio">
                Base UI Radio API
              </DocsExternalLink>{" "}
              for the underlying API and source composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use the control that matches how many choices can be selected."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/checkbox">Checkbox</DocsPageLink> —
            for multiple choices.
          </li>
          <li>
            <DocsPageLink to="/components/switch">Switch</DocsPageLink> — for an
            immediate on/off setting.
          </li>
          <li>
            <DocsPageLink to="/components/select">Select</DocsPageLink> — for
            many options.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
