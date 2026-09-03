import { Button } from "@gecko/ui/components/button"
import { Code } from "@gecko/ui/components/code"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@gecko/ui/components/field"
import { SensitiveField } from "@gecko/ui/components/sensitive-field"

import { ComponentExample } from "@/components/layout/component-example"
import { DocsApiTable } from "@/components/layout/docs-api-table"
import { DocsDoDont } from "@/components/layout/docs-do-dont"
import { DocsPageLink } from "@/components/layout/docs-page-link"
import { PageSection } from "@/components/layout/page-section"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"

export function SensitiveFieldPage() {
  const importSnippet = `import { SensitiveField } from "@gecko/ui/components/sensitive-field"`

  const basicExampleSnippet = `<SensitiveField
  aria-label="API key"
  defaultValue="sk_live_example_secret"
/>`

  const sizesSnippet = `<SensitiveField
  aria-label="API key"
  size="sm|md|lg"
  defaultValue="secret"
/>`

  const disabledSnippet = `<Field data-disabled>
  <FieldLabel htmlFor="sensitive-field-disabled">API key</FieldLabel>
  <SensitiveField
    id="sensitive-field-disabled"
    name="apiKey"
    defaultValue="secret"
    disabled
  />
</Field>`

  const errorSnippet = `<Field data-invalid>
  <FieldLabel htmlFor="sensitive-field-error">API key</FieldLabel>
  <SensitiveField
    id="sensitive-field-error"
    name="apiKey"
    defaultValue="secret"
    aria-invalid
    aria-describedby="sensitive-field-error-message"
  />
  <FieldError id="sensitive-field-error-message">
    Check the API key and try again.
  </FieldError>
</Field>`

  const withinFormSnippet = `<form onSubmit={handleSubmit}>
  <Field>
    <FieldLabel htmlFor="api-key">API key</FieldLabel>
    <SensitiveField
      id="api-key"
      name="apiKey"
      defaultValue="sk_live_example_secret"
      autoComplete="off"
      aria-describedby="api-key-description"
    />
    <FieldDescription id="api-key-description">
      Used to authenticate requests from this integration.
    </FieldDescription>
  </Field>
  <Button type="submit">Save API key</Button>
</form>`

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Sensitive field"
          description="Sensitive field keeps a private value concealed until someone deliberately reveals it. The concealed display always uses ten bullets, so it does not disclose the value’s length."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Sensitive field for API keys, secrets, and other private
              values that need to be reviewed or edited in place. Compose it
              with a <DocsPageLink to="/components/field">Field</DocsPageLink>{" "}
              when it needs a visible label, supporting text, or validation.
              <br />
              <br />
              Use a dedicated password input for sign-in and account-password
              flows. For values that do not need concealment, use an{" "}
              <DocsPageLink to="/components/input">Input field</DocsPageLink>.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import SensitiveField to add a revealable concealed input."
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
          description="The value starts concealed. The reveal control makes it visible and editable."
        />
        <ComponentExample>
          <div className="space-y-6">
            <SensitiveField
              aria-label="API key"
              defaultValue="sk_live_example_secret"
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
      </PageSection>

      <PageSection id="sizing" label="Sizing">
        <PageSectionHeader
          title="Sizing"
          description="Match the field height to neighbouring form controls."
        />
        <ComponentExample>
          <div className="space-y-6">
            <SensitiveField
              aria-label="Small API key field"
              size="sm"
              defaultValue="secret"
            />
            <SensitiveField
              aria-label="Default API key field"
              size="md"
              defaultValue="secret"
            />
            <SensitiveField
              aria-label="Large API key field"
              size="lg"
              defaultValue="secret"
            />
            <Code
              variant="block"
              language="tsx"
              code={sizesSnippet}
              showCopyButton
              copyLabel="Copy sizes"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="states" label="States">
        <PageSectionHeader
          title="States"
          description="Communicate when the value is unavailable or needs attention."
        />

        <PageSubsectionHeader
          id="states-disabled"
          title="Disabled"
          description="Use this when the value cannot be revealed or changed yet."
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Field data-disabled>
              <FieldLabel htmlFor="sensitive-field-disabled">
                API key
              </FieldLabel>
              <SensitiveField
                id="sensitive-field-disabled"
                name="apiKey"
                defaultValue="secret"
                disabled
              />
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={disabledSnippet}
              showCopyButton
              copyLabel="Copy disabled example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="states-error"
          title="Error"
          description="Use this when the current value prevents the person from continuing."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Field data-invalid>
              <FieldLabel htmlFor="sensitive-field-error">API key</FieldLabel>
              <SensitiveField
                id="sensitive-field-error"
                name="apiKey"
                defaultValue="secret"
                aria-invalid
                aria-describedby="sensitive-field-error-message"
              />
              <FieldError id="sensitive-field-error-message">
                Check the API key and try again.
              </FieldError>
            </Field>
            <Code
              variant="block"
              language="tsx"
              code={errorSnippet}
              showCopyButton
              copyLabel="Copy error example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="within-form" label="Within form">
        <PageSectionHeader
          title="Within form"
          description="Give the value a submitted name and identify it with a visible field label."
        />
        <ComponentExample>
          <div className="space-y-6">
            <form
              className="space-y-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <Field>
                <FieldLabel htmlFor="api-key">API key</FieldLabel>
                <SensitiveField
                  id="api-key"
                  name="apiKey"
                  defaultValue="sk_live_example_secret"
                  autoComplete="off"
                  aria-describedby="api-key-description"
                />
                <FieldDescription id="api-key-description">
                  Used to authenticate requests from this integration.
                </FieldDescription>
              </Field>
              <Button type="submit">Save API key</Button>
            </form>
            <Code
              variant="block"
              language="tsx"
              code={withinFormSnippet}
              showCopyButton
              copyLabel="Copy form example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Keep private values concealed until someone deliberately reveals them."
        />
        <DocsDoDont
          doItems={[
            <>Use Sensitive field for values that need concealment.</>,
            <>Keep the value concealed by default.</>,
            <>Use a clear label that identifies the private value.</>,
            <>Match its size to neighbouring form controls.</>,
          ]}
          dontItems={[
            <>
              Don’t use it for ordinary text. Use an{" "}
              <DocsPageLink to="/components/input">Input field</DocsPageLink>.
            </>,
            <>Don’t expose the value’s length while it is concealed.</>,
            <>
              Don’t leave a revealed value visible when it is no longer needed.
            </>,
            <>Don’t mix field sizes in the same form row.</>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Sensitive field."
        />
        <DocsApiTable
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              defaultValue: '"md"',
              description: "Sets the field and reveal-control size.",
            },
            {
              name: "defaultVisible",
              type: "boolean",
              defaultValue: "false",
              description:
                "Sets the initial visibility for an uncontrolled field.",
            },
            {
              name: "visible",
              type: "boolean",
              description:
                "Controls whether the value is visible and editable.",
            },
            {
              name: "onVisibleChange",
              type: "(visible: boolean) => void",
              description: "Runs when the reveal control changes visibility.",
            },
            {
              name: "value",
              type: "string | number | readonly string[]",
              description: "Supplies the controlled input value.",
            },
            {
              name: "defaultValue",
              type: "string | number | readonly string[]",
              description: "Sets the initial uncontrolled input value.",
            },
            {
              name: "onChange",
              type: "React.ChangeEventHandler<HTMLInputElement>",
              description: "Runs when someone edits the revealed value.",
            },
            {
              name: "name",
              type: "string",
              description: "Sets the submitted form-field name.",
            },
            {
              name: "disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Prevents revealing and editing the value.",
            },
            {
              name: "autoComplete",
              type: "string",
              defaultValue: '"off"',
              description:
                "Sets the browser autocomplete purpose when one applies.",
            },
            {
              name: "aria-invalid",
              type: 'boolean | "true" | "false"',
              description: "Communicates that the current value is invalid.",
            },
          ]}
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use the surrounding form components to identify and validate the value."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/input">Input field</DocsPageLink> —
            for values that do not need concealment.
          </li>
          <li>
            <DocsPageLink to="/components/field">Field</DocsPageLink> — for a
            visible label, supporting text, and validation.
          </li>
        </ul>
      </PageSection>
    </div>
  )
}
