import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from "@gecko/ui/components/combobox";

import { Code } from "@gecko/ui/components/code";
import { Field, FieldError, FieldLabel } from "@gecko/ui/components/field";
import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;
const timezones = [
  {
    value: "Americas",
    items: ["(GMT-5) New York", "(GMT-8) Los Angeles", "(GMT-6) Chicago"],
  },
  {
    value: "Europe",
    items: ["(GMT+0) London", "(GMT+1) Paris", "(GMT+1) Berlin"],
  },
  {
    value: "Asia/Pacific",
    items: ["(GMT+9) Tokyo", "(GMT+8) Singapore", "(GMT+11) Sydney"],
  },
] as const;

type Framework = (typeof frameworks)[number];
type TimezoneGroup = (typeof timezones)[number];
type TimezoneItem = TimezoneGroup["items"][number];

function FrameworkOptions() {
  return (
    <>
      <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
      <ComboboxList>
        {(item: Framework) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        )}
      </ComboboxList>
    </>
  );
}

export function ComboboxPage() {
  const multipleAnchor = useComboboxAnchor();

  const importSnippet = `import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@gecko/ui/components/combobox"`;
  const compositionSnippet = `Combobox
├── ComboboxInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        └── ComboboxItem`;
  const listSnippet = `<ComboboxContent>
  <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
  <ComboboxList>
    {(item) => (
      <ComboboxItem key={item} value={item}>
        {item}
      </ComboboxItem>
    )}
  </ComboboxList>
</ComboboxContent>`;
  const basicSnippet = `<Field>
  <FieldLabel htmlFor="framework">Framework</FieldLabel>
  <Combobox items={frameworks} name="framework">
    <ComboboxInput id="framework" placeholder="Select a framework" />
    ${listSnippet}
  </Combobox>
</Field>`;
  const multipleSnippet = `const multipleAnchor = useComboboxAnchor()

<Field>
  <FieldLabel htmlFor="frameworks">Frameworks</FieldLabel>
  <Combobox items={frameworks} name="frameworks" multiple>
    <ComboboxChips ref={multipleAnchor}>
      <ComboboxValue>
        {(values) => (
          <>
            {values.map((value) => (
              <ComboboxChip key={value}>{value}</ComboboxChip>
            ))}
            <ComboboxChipsInput id="frameworks" placeholder="Select frameworks" />
          </>
        )}
      </ComboboxValue>
    </ComboboxChips>
    <ComboboxContent anchor={multipleAnchor}>
      <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
      <ComboboxList>
        {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</Field>`;
  const clearSnippet = `<Field>
  <FieldLabel htmlFor="clear-framework">Framework</FieldLabel>
  <Combobox items={frameworks} name="framework" defaultValue={frameworks[0]}>
    <ComboboxInput id="clear-framework" placeholder="Select a framework" showClear />
    ${listSnippet}
  </Combobox>
</Field>`;
  const groupsSnippet = `<Field>
  <FieldLabel htmlFor="timezone">Timezone</FieldLabel>
  <Combobox items={timezones} name="timezone">
    <ComboboxInput id="timezone" placeholder="Select a timezone" />
    <ComboboxContent>
      <ComboboxEmpty>No timezones found.</ComboboxEmpty>
      <ComboboxList>
        {(group, index) => (
          <ComboboxGroup key={group.value} items={group.items}>
            <ComboboxLabel>{group.value}</ComboboxLabel>
            <ComboboxCollection>
              {(item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}
            </ComboboxCollection>
            {index < timezones.length - 1 && <ComboboxSeparator />}
          </ComboboxGroup>
        )}
      </ComboboxList>
    </ComboboxContent>
  </Combobox>
</Field>`;
  const disabledSnippet = `<Field data-disabled>
  <FieldLabel htmlFor="disabled-framework">Framework</FieldLabel>
  <Combobox items={frameworks} name="framework" disabled>
    <ComboboxInput id="disabled-framework" placeholder="Select a framework" />
    ${listSnippet}
  </Combobox>
</Field>`;
  const errorSnippet = `<Field data-invalid>
  <FieldLabel htmlFor="required-framework">Framework</FieldLabel>
  <Combobox items={frameworks} name="framework" required>
    <ComboboxInput
      id="required-framework"
      placeholder="Select a framework"
      aria-invalid
      aria-describedby="required-framework-error"
    />
    ${listSnippet}
  </Combobox>
  <FieldError id="required-framework-error">Choose a framework from the list.</FieldError>
</Field>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Combobox"
        description="A searchable selection field. People type to filter a predefined list, then choose one or more options."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use a Combobox when a predefined list is long enough to benefit from
            filtering. Use a{" "}
            <DocsPageLink to="/components/select">Select</DocsPageLink> for a
            short list, and a text field when people may enter a value outside
            the list.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import the parts needed by the chosen configuration."
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
          description="The input filters the options in the list. An empty state appears when nothing matches."
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
        description="The canonical single-selection configuration. Always provide a visible label and put the form name on Combobox."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="combobox-framework">Framework</FieldLabel>
              <Combobox items={frameworks} name="framework">
                <ComboboxInput
                  id="combobox-framework"
                  placeholder="Select a framework"
                />
                <ComboboxContent>
                  <FrameworkOptions />
                </ComboboxContent>
              </Combobox>
            </Field>
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
        id="multiple"
        title="Multiple"
        description="Use chips when people may select more than one option. Chips wrap as selections are added."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="combobox-frameworks">Frameworks</FieldLabel>
              <Combobox items={frameworks} name="frameworks" multiple>
                <ComboboxChips ref={multipleAnchor}>
                  <ComboboxValue>
                    {(values: readonly Framework[]) => (
                      <>
                        {values.map((value) => (
                          <ComboboxChip key={value}>{value}</ComboboxChip>
                        ))}
                        <ComboboxChipsInput
                          id="combobox-frameworks"
                          placeholder="Select frameworks"
                        />
                      </>
                    )}
                  </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent anchor={multipleAnchor}>
                  <FrameworkOptions />
                </ComboboxContent>
              </Combobox>
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={multipleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="with-clear"
        title="With clear"
        description={
          <>
            Set <Code>showClear</Code> when an optional selection should be easy
            to remove. The component names the control.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="combobox-clear-framework">
                Framework
              </FieldLabel>
              <Combobox
                items={frameworks}
                name="framework"
                defaultValue={frameworks[0]}
              >
                <ComboboxInput
                  id="combobox-clear-framework"
                  placeholder="Select a framework"
                  showClear
                />
                <ComboboxContent>
                  <FrameworkOptions />
                </ComboboxContent>
              </Combobox>
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={clearSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="groups"
        title="Groups"
        description="Use labelled groups when categories make a long list easier to scan."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="combobox-timezone">Timezone</FieldLabel>
              <Combobox items={timezones} name="timezone">
                <ComboboxInput
                  id="combobox-timezone"
                  placeholder="Select a timezone"
                />
                <ComboboxContent>
                  <ComboboxEmpty>No timezones found.</ComboboxEmpty>
                  <ComboboxList>
                    {(group: TimezoneGroup, index: number) => (
                      <ComboboxGroup key={group.value} items={group.items}>
                        <ComboboxLabel>{group.value}</ComboboxLabel>
                        <ComboboxCollection>
                          {(item: TimezoneItem) => (
                            <ComboboxItem key={item} value={item}>
                              {item}
                            </ComboboxItem>
                          )}
                        </ComboboxCollection>
                        {index < timezones.length - 1 && <ComboboxSeparator />}
                      </ComboboxGroup>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
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
        id="states"
        title="States"
        description="Set field-wide behaviour on Combobox and reflect validation state on the input and Field."
      >
        <ChildSection
          id="states-disabled"
          title="Disabled"
          description={
            <>
              Set <Code>disabled</Code> on <Code>Combobox</Code> so every
              related control becomes unavailable together.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Field data-disabled>
                <FieldLabel htmlFor="combobox-disabled-framework">
                  Framework
                </FieldLabel>
                <Combobox items={frameworks} name="framework" disabled>
                  <ComboboxInput
                    id="combobox-disabled-framework"
                    placeholder="Select a framework"
                  />
                  <ComboboxContent>
                    <FrameworkOptions />
                  </ComboboxContent>
                </Combobox>
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
              Set <Code>required</Code> on <Code>Combobox</Code>. Connect the
              invalid input to a visible <Code>FieldError</Code>.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Field data-invalid>
                <FieldLabel htmlFor="combobox-required-framework">
                  Framework
                </FieldLabel>
                <Combobox items={frameworks} name="framework" required>
                  <ComboboxInput
                    id="combobox-required-framework"
                    placeholder="Select a framework"
                    aria-invalid
                    aria-describedby="combobox-required-framework-error"
                  />
                  <ComboboxContent>
                    <FrameworkOptions />
                  </ComboboxContent>
                </Combobox>
                <FieldError id="combobox-required-framework-error">
                  Choose a framework from the list.
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
        id="do-dont"
        title="Do and don’t"
        description="Keep the field understandable and within the supported contract."
      >
        <DocsDoDont
          doItems={[
            <>
              Use a visible <Code>FieldLabel</Code>; a placeholder is not a
              label.
            </>,
            <>
              Put form and state props on <Code>Combobox</Code>.
            </>,
            <>
              Use chips for multiple selection and write a specific empty
              message.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use Combobox for unrestricted text entry or a palette of
              actions.
            </>,
            <>
              Don’t replace or restyle its input, trigger, clear control, or
              selection chrome.
            </>,
            <>
              Don’t enable <Code>autoHighlight</Code> unless highlighting the
              first match is intentional.
            </>,
            <>
              Don’t add props, variants, or interaction patterns without
              component-library approval.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Combobox."
      >
        <DocsApiTable
          rows={[
            {
              name: "items",
              type: "Item[]",
              description: "Supplies the predefined options.",
            },
            {
              name: "name",
              type: "string",
              description: "Names the value submitted with a form.",
            },
            {
              name: "defaultValue",
              type: "Item | Item[]",
              description: "Sets the initial uncontrolled selection.",
            },
            {
              name: "value",
              type: "Item | Item[] | null",
              description: "Controls the current selection.",
            },
            {
              name: "onValueChange",
              type: "(value) => void",
              description: "Responds when the selection changes.",
            },
            {
              name: "multiple",
              type: "boolean",
              defaultValue: "false",
              description: "Allows multiple selections.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Disables the whole Combobox.",
            },
            {
              name: "required",
              type: "boolean",
              defaultValue: "false",
              description: "Marks the form value as required.",
            },
            {
              name: "autoHighlight",
              type: "boolean",
              defaultValue: "false",
              description:
                "Automatically highlights the first filtered option.",
            },
            {
              name: "itemToStringLabel",
              type: "(item) => string",
              description:
                "Provides an object item’s display and filter label.",
            },
            {
              name: "itemToStringValue",
              type: "(item) => string",
              description: "Provides an object item’s submitted value.",
            },
            {
              name: "showTrigger",
              type: "boolean",
              defaultValue: "true",
              description: "Shows the input’s options trigger.",
            },
            {
              name: "showClear",
              type: "boolean",
              defaultValue: "false",
              description: "Shows the input’s clear control.",
            },
            {
              name: "showRemove",
              type: "boolean",
              defaultValue: "true",
              description: "Shows a chip’s remove control.",
            },
            {
              name: "removeLabel",
              type: "string",
              description:
                "Names removal when a chip’s children are not plain text.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/combobox">
                Base UI Combobox API
              </DocsExternalLink>{" "}
              and the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/combobox">
                Shadcn Combobox documentation
              </DocsExternalLink>{" "}
              for the underlying API and source composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Choose the control that matches the kind of value being entered."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/select">Select</DocsPageLink> — a
            short predefined list without filtering.
          </li>
          <li>
            <DocsPageLink to="/components/native-select">
              Native select
            </DocsPageLink>{" "}
            — a platform-native selection control.
          </li>
          <li>
            <DocsPageLink to="/components/command">Command</DocsPageLink> — a
            searchable palette of actions.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
