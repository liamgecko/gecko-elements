import { ComponentExample } from "@/components/layout/component-example"

import { Code } from "@/components/ui/code"
import { PageSection } from "@/components/layout/page-section"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

export function NativeSelectPage() {
  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Native select</h1>
          <p className="text-sm text-muted-foreground">
            Placeholder for Native Select component examples.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>NativeSelect</Code> with{" "}
            <Code>NativeSelectOption</Code> for a native select dropdown.
          </p>
          <ComponentExample>
            <NativeSelect>
              <NativeSelectOption value="">Select a fruit</NativeSelectOption>
              <NativeSelectOption value="apple">Apple</NativeSelectOption>
              <NativeSelectOption value="banana">Banana</NativeSelectOption>
              <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
              <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
            </NativeSelect>
          </ComponentExample>
        </PageSection>

        <PageSection id="groups" label="Groups">
          <h2 className="text-lg font-semibold">Groups</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>NativeSelectOptGroup</Code> with{" "}
            <Code>label</Code> to group options.
          </p>
          <ComponentExample>
            <NativeSelect>
              <NativeSelectOption value="">Select department</NativeSelectOption>
              <NativeSelectOptGroup label="Engineering">
                <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
                <NativeSelectOption value="backend">Backend</NativeSelectOption>
                <NativeSelectOption value="devops">DevOps</NativeSelectOption>
              </NativeSelectOptGroup>
              <NativeSelectOptGroup label="Sales">
                <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
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
          </ComponentExample>
        </PageSection>

        <PageSection id="multiple" label="Multiple select">
          <h2 className="text-lg font-semibold">Multiple select</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Pass the native <Code>multiple</Code>{" "}
            attribute to enable selecting more than one option. In a controlled example, read values from{" "}
            <Code>selectedOptions</Code>.
          </p>
          <ComponentExample>
            <NativeSelect
              multiple
              className="w-full"
            >
              <NativeSelectOption value="">Select a fruit</NativeSelectOption>
              <NativeSelectOption value="apple">Apple</NativeSelectOption>
              <NativeSelectOption value="banana">Banana</NativeSelectOption>
              <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
              <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
            </NativeSelect>
          </ComponentExample>
        </PageSection>

        <PageSection id="within-form" label="Within form">
          <h2 className="text-lg font-semibold">Within form</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>FieldLabel</Code> inside{" "}
            <Code>Field</Code> to pair a label with the select.
          </p>
          <ComponentExample>
            <Field>
              <FieldLabel htmlFor="native-select-fruit">Fruit</FieldLabel>
              <NativeSelect id="native-select-fruit">
                <NativeSelectOption value="">Select a fruit</NativeSelectOption>
                <NativeSelectOption value="apple">Apple</NativeSelectOption>
                <NativeSelectOption value="banana">Banana</NativeSelectOption>
                <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
                <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
              </NativeSelect>
            </Field>
          </ComponentExample>
        </PageSection>

        <PageSection id="sizing" label="Sizing">
          <h2 className="text-lg font-semibold">Sizing</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code>size</Code> prop to match the Input component:{" "}
            <Code>sm</Code>,{" "}
            <Code>md</Code>, or{" "}
            <Code>lg</Code>. Default is <Code>md</Code>.
          </p>

          <h3 id="sizing-small" className="mb-3 text-base font-semibold">Small</h3>
          <ComponentExample className="mb-6">
            <NativeSelect size="sm">
              <NativeSelectOption value="">Select a fruit</NativeSelectOption>
              <NativeSelectOption value="apple">Apple</NativeSelectOption>
              <NativeSelectOption value="banana">Banana</NativeSelectOption>
              <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
            </NativeSelect>
          </ComponentExample>

          <h3 id="sizing-medium" className="mb-3 text-base font-semibold">Medium</h3>
          <ComponentExample className="mb-6">
            <NativeSelect size="md">
              <NativeSelectOption value="">Select a fruit</NativeSelectOption>
              <NativeSelectOption value="apple">Apple</NativeSelectOption>
              <NativeSelectOption value="banana">Banana</NativeSelectOption>
              <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
            </NativeSelect>
          </ComponentExample>

          <h3 id="sizing-large" className="mb-3 text-base font-semibold">Large</h3>
          <ComponentExample>
            <NativeSelect size="lg">
              <NativeSelectOption value="">Select a fruit</NativeSelectOption>
              <NativeSelectOption value="apple">Apple</NativeSelectOption>
              <NativeSelectOption value="banana">Banana</NativeSelectOption>
              <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
            </NativeSelect>
          </ComponentExample>
        </PageSection>

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the <Code>disabled</Code> prop or{" "}
            <Code>aria-invalid</Code> to show disabled and validation states.
          </p>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">Disabled</h3>
          <ComponentExample className="mb-6">
            <NativeSelect disabled>
              <NativeSelectOption value="">Select a fruit</NativeSelectOption>
              <NativeSelectOption value="apple">Apple</NativeSelectOption>
              <NativeSelectOption value="banana">Banana</NativeSelectOption>
              <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
            </NativeSelect>
          </ComponentExample>

          <h3 id="states-invalid" className="mb-3 text-base font-semibold">Invalid</h3>
          <ComponentExample>
            <NativeSelect aria-invalid>
              <NativeSelectOption value="">Select a fruit</NativeSelectOption>
              <NativeSelectOption value="apple">Apple</NativeSelectOption>
              <NativeSelectOption value="banana">Banana</NativeSelectOption>
              <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
            </NativeSelect>
          </ComponentExample>
        </PageSection>
    </div>
  )
}
