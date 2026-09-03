import * as React from "react";

import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { PageSection } from "@/components/layout/page-section";
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header";
import { Code } from "@gecko/ui/components/code";
import { Button } from "@gecko/ui/components/button";
import { ColorPicker } from "@gecko/ui/components/color-picker";
import { Field, FieldError, FieldLabel } from "@gecko/ui/components/field";

export function ColorPickerPage() {
  const [controlledColour, setControlledColour] = React.useState("#6366F1");
  const importSnippet = `import { ColorPicker } from "@gecko/ui/components/color-picker"`;

  const basicSnippet = `<Field>
  <FieldLabel htmlFor="brand-colour">Brand colour</FieldLabel>
  <ColorPicker
    id="brand-colour"
    name="brand-colour"
    placeholder="#6366F1"
  />
</Field>`;

  const sizeSmallSnippet = `<Field>
  <FieldLabel htmlFor="account-colour-small">Account colour</FieldLabel>
  <ColorPicker
    id="account-colour-small"
    name="account-colour"
    size="sm"
    defaultValue="#0EA5E9"
  />
</Field>`;

  const sizeMediumSnippet = `<Field>
  <FieldLabel htmlFor="account-colour-medium">Account colour</FieldLabel>
  <ColorPicker
    id="account-colour-medium"
    name="account-colour"
    defaultValue="#6366F1"
  />
</Field>`;

  const sizeLargeSnippet = `<Field>
  <FieldLabel htmlFor="account-colour-large">Account colour</FieldLabel>
  <ColorPicker
    id="account-colour-large"
    name="account-colour"
    size="lg"
    defaultValue="#22C55E"
  />
</Field>`;

  const defaultValueSnippet = `<Field>
  <FieldLabel htmlFor="heading-colour">Heading colour</FieldLabel>
  <ColorPicker
    id="heading-colour"
    name="heading-colour"
    defaultValue="#EF4444"
  />
</Field>`;

  const controlledSnippet = `const [colour, setColour] = React.useState("#6366F1")

<Field>
  <FieldLabel htmlFor="widget-colour">Widget colour</FieldLabel>
  <ColorPicker
    id="widget-colour"
    name="widget-colour"
    value={colour}
    onValueChange={setColour}
  />
</Field>`;

  const hexInputSnippet = `<Field>
  <FieldLabel htmlFor="button-colour">Button colour</FieldLabel>
  <ColorPicker
    id="button-colour"
    name="button-colour"
    defaultValue="#6366F1"
  />
</Field>`;

  const disabledSnippet = `<Field data-disabled>
  <FieldLabel htmlFor="color-picker-states-disabled">
    Accent colour
  </FieldLabel>
  <ColorPicker
    id="color-picker-states-disabled"
    name="color-picker-states-disabled"
    defaultValue="#6366F1"
    disabled
  />
</Field>`;

  const errorSnippet = `<Field data-invalid>
  <FieldLabel htmlFor="color-picker-states-error">
    Accent colour
  </FieldLabel>
  <ColorPicker
    id="color-picker-states-error"
    name="color-picker-states-error"
    defaultValue="#GGGGGG"
    aria-invalid
    aria-describedby="color-picker-states-error-msg"
  />
  <FieldError id="color-picker-states-error-msg">
    Use a six-character hex colour, such as #6366F1.
  </FieldError>
</Field>`;

  const withinFormSnippet = `<form onSubmit={handleSubmit}>
  <Field>
    <FieldLabel htmlFor="form-accent-colour">Accent colour</FieldLabel>
    <ColorPicker
      id="form-accent-colour"
      name="accentColour"
      defaultValue="#6366F1"
    />
  </Field>
  <Button type="submit">Save colour</Button>
</form>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Colour field"
          description="The Colour field is a text input with a colour swatch. People can type a hex value or open a picker."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use a Colour field for brand elements — account colour, heading
              colour, widget colour, and similar settings. The swatch shows the
              current value; the field holds the hex.
              <br />
              <br />
              Avoid using it for a fixed palette of a few named options; use a{" "}
              <DocsPageLink to="/components/select">Select</DocsPageLink> or a
              set of swatches instead. Do not use it as a general text field.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import ColorPicker to add a colour field."
        />
        <ComponentExample>
          <Code
            variant="block"
            language="tsx"
            code={importSnippet}
            showCopyButton
            copyLabel="Copy import"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="basic-example" label="Basic example">
        <PageSectionHeader
          title="Basic example"
          description={
            <>
              An empty field with a <Code>placeholder</Code>. Use this when the
              person is choosing a colour for the first time. The neutral swatch
              shows that no valid colour is selected yet.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="brand-colour">Brand colour</FieldLabel>
              <ColorPicker
                id="brand-colour"
                name="brand-colour"
                placeholder="#6366F1"
              />
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
      </PageSection>

      <PageSection id="sizing" label="Sizing">
        <PageSectionHeader
          title="Sizing"
          description={
            <>
              Sets the field size using the <Code>size</Code> prop. Default is{" "}
              <Code>md</Code>. Use the size that matches the form around it.
            </>
          }
        />

        <PageSubsectionHeader
          id="sizing-small"
          title="Small"
          description={
            <>
              A compact field using <Code>size=&quot;sm&quot;</Code>. Use this
              when space is tight.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="account-colour-small">
                Account colour
              </FieldLabel>
              <ColorPicker
                id="account-colour-small"
                name="account-colour-small"
                size="sm"
                defaultValue="#0EA5E9"
              />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={sizeSmallSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="sizing-medium"
          title="Medium"
          description={
            <>
              The default size using <Code>size=&quot;md&quot;</Code>. Use this
              in a standard form.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="account-colour-medium">
                Account colour
              </FieldLabel>
              <ColorPicker
                id="account-colour-medium"
                name="account-colour-medium"
                defaultValue="#6366F1"
              />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={sizeMediumSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="sizing-large"
          title="Large"
          description={
            <>
              A larger field using <Code>size=&quot;lg&quot;</Code>. Use this
              when the colour is a primary choice on the page.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="account-colour-large">
                Account colour
              </FieldLabel>
              <ColorPicker
                id="account-colour-large"
                name="account-colour-large"
                size="lg"
                defaultValue="#22C55E"
              />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={sizeLargeSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="with-default-value" label="With default value">
        <PageSectionHeader
          title="With default value"
          description={
            <>
              Starts with a colour using <Code>defaultValue</Code>. Use this
              when the field should already have a colour chosen.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="heading-colour">Heading colour</FieldLabel>
              <ColorPicker
                id="heading-colour"
                name="heading-colour"
                defaultValue="#EF4444"
              />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={defaultValueSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="controlled-value" label="Controlled value">
        <PageSectionHeader
          title="Controlled value"
          description={
            <>
              Use <Code>value</Code> and <Code>onValueChange</Code> when product
              state owns the colour. The callback receives typed and picker
              changes through one interface.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="widget-colour">Widget colour</FieldLabel>
              <ColorPicker
                id="widget-colour"
                name="widget-colour"
                value={controlledColour}
                onValueChange={setControlledColour}
              />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={controlledSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="direct-hex-input" label="Direct HEX input">
        <PageSectionHeader
          title="Direct HEX input"
          description={
            <>
              The field accepts a typed <Code>#RRGGBB</Code> value as well as a
              picker. Use this when people already know the hex, or want to
              confirm what they picked.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field>
              <FieldLabel htmlFor="button-colour">Button colour</FieldLabel>
              <ColorPicker
                id="button-colour"
                name="button-colour"
                defaultValue="#6366F1"
              />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={hexInputSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="states" label="States">
        <PageSectionHeader
          title="States"
          description="The field can be unavailable or invalid. Use the state that matches whether the person can choose, and whether the colour is valid."
        />

        <PageSubsectionHeader
          id="states-disabled"
          title="Disabled"
          description={
            <>
              Blocks the field and the picker using the <Code>disabled</Code>{" "}
              prop. Use this when the colour cannot be changed yet.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Field data-disabled>
              <FieldLabel htmlFor="color-picker-states-disabled">
                Accent colour
              </FieldLabel>
              <ColorPicker
                id="color-picker-states-disabled"
                name="color-picker-states-disabled"
                defaultValue="#6366F1"
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

        <PageSubsectionHeader
          id="states-error"
          title="Error"
          description={
            <>
              Shows a validation error using <Code>aria-invalid</Code> on the
              field and <Code>data-invalid</Code> on the wrapper. Use this when
              the value is not a valid hex colour.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field data-invalid>
              <FieldLabel htmlFor="color-picker-states-error">
                Accent colour
              </FieldLabel>
              <ColorPicker
                id="color-picker-states-error"
                name="color-picker-states-error"
                defaultValue="#GGGGGG"
                aria-invalid
                aria-describedby="color-picker-states-error-msg"
              />
              <FieldError id="color-picker-states-error-msg">
                Use a six-character hex colour, such as #6366F1.
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
      </PageSection>

      <PageSection id="within-form" label="Within form">
        <PageSectionHeader
          title="Within form"
          description="Use Colour field as a named form control with a visible label and a separate submit action."
        />
        <ComponentExample>
          <div className="space-y-6">
            <form
              className="space-y-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <Field>
                <FieldLabel htmlFor="form-accent-colour">
                  Accent colour
                </FieldLabel>
                <ColorPicker
                  id="form-accent-colour"
                  name="accentColour"
                  defaultValue="#6366F1"
                />
              </Field>
              <Button type="submit">Save colour</Button>
            </form>
            <Code
              variant="block"
              language="tsx"
              code={withinFormSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Use the Colour field’s value, size, and states consistently."
        />
        <DocsDoDont
          doItems={[
            <>
              Use a six-character hex value such as <Code>#6366F1</Code>.
            </>,
            <>
              Use <Code>defaultValue</Code> when a colour is already chosen.
            </>,
            <>
              Use <Code>value</Code> with <Code>onValueChange</Code> for
              controlled state.
            </>,
            <>
              Set <Code>size</Code> to match the surrounding fields.
            </>,
            <>Pair an invalid field with a clear error message.</>,
          ]}
          dontItems={[
            <>
              Don’t use values outside the <Code>#RRGGBB</Code> format.
            </>,
            <>
              Don’t use <Code>disabled</Code> for a colour that can still be
              changed.
            </>,
            <>
              Don’t mix field sizes in the same form without a layout reason.
            </>,
            <>
              Don’t rely on the error colour without explaining how to fix the
              value.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Colour field."
        />
        <DocsApiTable
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              defaultValue: '"md"',
              description: "Sets the input and swatch size.",
            },
            {
              name: "value",
              type: "string",
              description:
                "Controlled field value. Valid complete values use uppercase #RRGGBB.",
            },
            {
              name: "defaultValue",
              type: "string",
              description: "Initial hex value for an uncontrolled field.",
            },
            {
              name: "onValueChange",
              type: "(value: string) => void",
              description:
                "Reports typed and picker changes. Complete valid values are uppercase.",
            },
            {
              name: "name",
              type: "string",
              description:
                "Native form field name applied to the visible input.",
            },
            {
              name: "placeholder",
              type: "string",
              description:
                "Format example for an empty field, such as #6366F1.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Prevents typing and opening the colour picker.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-reference"
          className="mt-6"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://github.com/omgovich/react-colorful/blob/master/README.md">
                react-colorful documentation
              </DocsExternalLink>{" "}
              for the underlying picker API.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use these components for text entry and form structure."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/input">Input field</DocsPageLink> —
            for text values that are not colours.
          </li>
          <li>
            <DocsPageLink to="/components/field">Field</DocsPageLink> — for the
            label, description, and validation message around a Colour field.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
