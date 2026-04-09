import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Code } from "@/components/ui/code"
import { ColorPicker } from "@/components/ui/color-picker"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"

export function ColorPickerPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Color picker</h1>
          <p className="text-sm text-muted-foreground">
            A text input with a popover color picker trigger. Type a HEX value
            directly or pick a color visually.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>ColorPicker</Code> for a standard input with a droplet
            trigger that opens a color picker.
          </p>
          <ComponentExample>
            <ColorPicker placeholder="#6366F1" />
          </ComponentExample>
        </PageSection>

        <PageSection id="sizing" label="Sizing">
          <h2 className="text-lg font-semibold">Sizing</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code>size</Code> prop for <Code>sm</Code>, <Code>md</Code>,
            {" "}
            or <Code>lg</Code>. Default is <Code>md</Code>.
          </p>

          <h3 id="sizing-small" className="mb-3 text-base font-semibold">Small</h3>
          <ComponentExample className="mb-6">
            <ColorPicker size="sm" defaultValue="#0EA5E9" />
          </ComponentExample>

          <h3 id="sizing-medium" className="mb-3 text-base font-semibold">Medium</h3>
          <ComponentExample className="mb-6">
            <ColorPicker size="md" defaultValue="#6366F1" />
          </ComponentExample>

          <h3 id="sizing-large" className="mb-3 text-base font-semibold">Large</h3>
          <ComponentExample>
            <ColorPicker size="lg" defaultValue="#22C55E" />
          </ComponentExample>
        </PageSection>

        <PageSection id="with-default-value" label="With default value">
          <h2 className="text-lg font-semibold">With default value</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Set <Code>defaultValue</Code> to initialize both the input and
            droplet color.
          </p>
          <ComponentExample>
            <ColorPicker defaultValue="#EF4444" />
          </ComponentExample>
        </PageSection>

        <PageSection id="direct-hex-input" label="Direct HEX input">
          <h2 className="text-lg font-semibold">Direct HEX input</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Type a valid <Code>#RRGGBB</Code> value directly in the input to
            update the droplet without opening the picker.
          </p>
          <ComponentExample>
            <ColorPicker defaultValue="#6366F1" />
          </ComponentExample>
        </PageSection>

        <PageSection id="disabled" label="Disabled">
          <h2 className="text-lg font-semibold">Disabled</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>disabled</Code> to disable direct input and popover
            interactions.
          </p>
          <ComponentExample>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="color-picker-disabled">Brand color</FieldLabel>
                  <ColorPicker
                    id="color-picker-disabled"
                    defaultValue="#6366F1"
                    disabled
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </ComponentExample>
        </PageSection>
    </div>
  )
}

