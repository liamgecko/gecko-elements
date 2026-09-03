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
import { Code } from "@gecko/ui/components/code";
import { Field, FieldContent, FieldError } from "@gecko/ui/components/field";
import { Switch } from "@gecko/ui/components/switch";

export function SwitchPage() {
  const importSnippet = `import { Switch } from "@gecko/ui/components/switch"`;

  const basicExampleSnippet = `<Switch label="Share across devices" />`;

  const sizeSnippet = `<Switch size="sm|default|lg" label="Setting" />`;

  const labelSnippet = `<Switch id="switch-label" label="Switch with label" />`;

  const labelAndDescriptionSnippet = `<Switch
  id="switch-label-desc"
  label="Switch with label and description"
  description="Focus is shared across devices, and turns off when you leave the app."
/>`;

  const labelPositionSnippet = `<Switch label="Setting" labelPosition="before|after" />`;

  const disabledSnippet = `<Switch id="switch-disabled-unchecked" disabled label="Disabled" />`;

  const errorSnippet = `<Field orientation="horizontal" data-invalid>
  <FieldContent>
    <Switch
      id="switch-invalid-unchecked"
      label="Invalid"
      aria-invalid
      aria-describedby="switch-invalid-unchecked-error"
    />
    <FieldError id="switch-invalid-unchecked-error">
      This setting must be corrected before you can continue.
    </FieldError>
  </FieldContent>
</Field>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Switch"
        description="The Switch component lets people turn a setting on or off. It takes effect immediately — the change applies as soon as the switch moves."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use a Switch when a setting should turn on or off right away. The
            label should name what changes.
            <br />
            <br />
            Pair it with a{" "}
            <DocsPageLink to="/components/field">Field</DocsPageLink> when the
            control needs an error message or sits in a form layout. Avoid using
            it when someone can pick more than one option — that is a{" "}
            <DocsPageLink to="/components/checkbox">Checkbox</DocsPageLink>.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import Switch to add an on/off toggle."
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
        description="A labelled switch for an immediate setting."
      >
        <ComponentExample>
          <div className="space-y-6">
            <Switch label="Share across devices" />
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
        id="size"
        title="Size"
        description="Choose the size that matches the surrounding interface density."
      >
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-col items-start gap-4">
              <Switch size="sm" label="Small" />
              <Switch size="default" label="Default" />
              <Switch size="lg" label="Large" />
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
        id="label-and-description"
        title="Label and description"
        description={
          <>
            Names the setting using the <Code>label</Code> prop, and adds helper
            text with <Code>description</Code>. Use this when the switch needs a
            clear name or a short explanation.
          </>
        }
      >
        <ChildSection
          id="label-and-description-label"
          title="Label"
          description={
            <>
              A labelled switch using the <Code>label</Code> prop. Use this when
              the setting needs a visible name.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Switch id="switch-label" label="Switch with label" />
              <Code
                variant="block"
                language="tsx"
                code={labelSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="label-and-description-label-desc"
          title="Label and description"
          description={
            <>
              A switch with <Code>label</Code> and <Code>description</Code>. Use
              this when the setting needs a short explanation under the name.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="max-w-sm">
                <Switch
                  id="switch-label-desc"
                  label="Switch with label and description"
                  description="Focus is shared across devices, and turns off when you leave the app."
                />
              </div>
              <Code
                variant="block"
                language="tsx"
                code={labelAndDescriptionSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="label-and-description-position"
          title="Label position"
          description="Place a label before or after the control when supporting text is not present."
        >
          <ComponentExample>
            <div className="space-y-6">
              <div className="flex flex-col items-start gap-4">
                <Switch label="Before" labelPosition="before" />
                <Switch label="After" labelPosition="after" />
              </div>
              <Code
                variant="block"
                language="tsx"
                code={labelPositionSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="state"
        title="State"
        description="A switch can be unavailable or invalid. Use the state that matches whether the person can change the setting, and whether the value is valid."
      >
        <ChildSection
          id="state-disabled"
          title="Disabled"
          description={
            <>
              Prevents interaction using the <Code>disabled</Code> prop. Use
              this when the setting cannot be changed yet.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Switch
                id="switch-disabled-unchecked"
                disabled
                label="Disabled"
              />
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
          id="state-error"
          title="Error"
          description={
            <>
              Shows a validation error using <Code>aria-invalid</Code> on the
              switch and <Code>data-invalid</Code> on the field. Use this when
              the setting must be corrected before continuing.
            </>
          }
        >
          <ComponentExample>
            <div className="space-y-6">
              <Field orientation="horizontal" data-invalid className="max-w-md">
                <FieldContent>
                  <Switch
                    id="switch-invalid-unchecked"
                    label="Invalid"
                    aria-invalid
                    aria-describedby="switch-invalid-unchecked-error"
                  />
                  <FieldError id="switch-invalid-unchecked-error">
                    This setting must be corrected before you can continue.
                  </FieldError>
                </FieldContent>
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
        description="Use Switch for settings that take effect immediately."
      >
        <DocsDoDont
          doItems={[
            <>Write a label that names the setting being turned on or off.</>,
            <>
              Add <Code>description</Code> when the effect needs a short
              explanation.
            </>,
            <>
              Pair invalid switches with a{" "}
              <DocsPageLink to="/components/field">Field</DocsPageLink> error.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use Switch when changes wait for a separate submit action.
            </>,
            <>Don’t hide the label unless the setting is clear from context.</>,
            <>
              Don’t use a disabled switch without making its unavailable state
              understandable.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Switch."
      >
        <DocsApiTable
          rows={[
            {
              name: "size",
              type: '"sm" | "default" | "lg"',
              defaultValue: '"default"',
              description: "Sets the control size.",
            },
            {
              name: "label",
              type: "React.ReactNode",
              defaultValue: "—",
              description:
                "Names the setting and links the text to the control.",
            },
            {
              name: "description",
              type: "React.ReactNode",
              defaultValue: "—",
              description: "Adds supporting text beneath the label.",
            },
            {
              name: "labelPosition",
              type: '"before" | "after"',
              defaultValue: '"after"',
              description:
                "Places a label before or after the control when there is no description.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Prevents the setting from being changed.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/switch">
                Shadcn Switch documentation
              </DocsExternalLink>{" "}
              and{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/switch">
                Base UI Switch API
              </DocsExternalLink>{" "}
              for the source composition and underlying behaviour.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Choose a form control based on how the choice behaves."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/checkbox">Checkbox</DocsPageLink> —
            for a form choice that is submitted later.
          </li>
          <li>
            <DocsPageLink to="/components/radio-group">
              Radio group
            </DocsPageLink>{" "}
            — for one choice from a set.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
