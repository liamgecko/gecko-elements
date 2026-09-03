import * as React from "react";

import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import { PageSection } from "@/components/layout/page-section";
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header";
import { InlineEdit } from "@gecko/ui/components/inline-edit";
import { Code } from "@gecko/ui/components/code";

export function InlineEditPage() {
  const [sm, setSm] = React.useState("Registration form");
  const [md, setMd] = React.useState("Registration form");
  const [lg, setLg] = React.useState("Registration form");
  const [basic, setBasic] = React.useState("Registration form");

  const importSnippet = `import { InlineEdit } from "@gecko/ui/components/inline-edit"`;

  const basicExampleSnippet = `<InlineEdit
  aria-label="Form title"
  value={value}
  onSave={setValue}
/>`;

  const sizeSmallSnippet = `<InlineEdit
  aria-label="Form title"
  value={value}
  onSave={setValue}
  size="sm"
/>`;

  const sizeMediumSnippet = `<InlineEdit
  aria-label="Form title"
  value={value}
  onSave={setValue}
  size="md"
/>`;

  const sizeLargeSnippet = `<InlineEdit
  aria-label="Form title"
  value={value}
  onSave={setValue}
  size="lg"
/>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Inline edit"
          description="Inline edit changes a short text value in place without moving to a separate form."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Inline edit for editable headers, short single-line
              descriptions, and values in table rows. Keep the surrounding
              heading, paragraph, or table-cell semantics.
              <br />
              <br />
              Use Enter to save and Escape to cancel. Avoid using it for more
              than one line — that is a{" "}
              <DocsPageLink to="/components/textarea">
                Textarea field
              </DocsPageLink>
              . If the value needs a label, help text, or validation, use an{" "}
              <DocsPageLink to="/components/field">Field</DocsPageLink> with an{" "}
              <DocsPageLink to="/components/input">Input field</DocsPageLink>{" "}
              instead.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import InlineEdit to add in-place editing."
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
              A controlled value using <Code>value</Code>, <Code>onSave</Code>,
              and an accessible name. Selecting the value opens the editor and
              moves focus to its input.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="min-w-0 w-full">
              <InlineEdit
                aria-label="Form title"
                value={basic}
                onSave={setBasic}
              />
            </div>
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
          description={
            <>
              Sets the control height and text size using the <Code>size</Code>{" "}
              prop. Default is <Code>md</Code>. Use the size that matches the
              surrounding text.
            </>
          }
        />
        <PageSubsectionHeader
          id="sizing-small"
          title="Small"
          description={
            <>
              A compact control using <Code>size=&quot;sm&quot;</Code>. Use this
              when the value sits in a dense layout.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="min-w-0 w-full">
              <InlineEdit
                aria-label="Form title"
                value={sm}
                onSave={setSm}
                size="sm"
              />
            </div>
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
              in a standard row or card.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="min-w-0 w-full">
              <InlineEdit
                aria-label="Form title"
                value={md}
                onSave={setMd}
                size="md"
              />
            </div>
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
              A larger control using <Code>size=&quot;lg&quot;</Code>. Use this
              when the value is the main focus of the row.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="min-w-0 w-full">
              <InlineEdit
                aria-label="Form title"
                value={lg}
                onSave={setLg}
                size="lg"
              />
            </div>
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

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Use Inline edit for one short value that can be changed in place."
        />
        <DocsDoDont
          doItems={[
            <>
              Keep <Code>value</Code> controlled and persist the next value in{" "}
              <Code>onSave</Code>.
            </>,
            <>
              Use it for headers, short single-line descriptions, and editable
              table-row values.
            </>,
            <>
              Set <Code>size</Code> to match the surrounding row or card.
            </>,
            <>
              Provide a concise <Code>placeholder</Code> when an empty value is
              valid, and a specific <Code>aria-label</Code> in every usage.
            </>,
          ]}
          dontItems={[
            <>Don’t use Inline edit for multiline or long-form content.</>,
            <>
              Don’t use it when the value needs a visible label, help text, or
              validation. Use a{" "}
              <DocsPageLink to="/components/field">Field</DocsPageLink>.
            </>,
            <>Don’t discard the value received by the save callback.</>,
            <>Don’t use a larger size to create visual emphasis.</>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Inline edit."
        />
        <DocsApiTable
          rows={[
            {
              name: "aria-label",
              type: "string",
              description:
                "Required accessible name for the editable value and its controls.",
            },
            {
              name: "value",
              type: "string",
              description:
                "The text shown in view mode and loaded into the editor.",
            },
            {
              name: "onSave",
              type: "(next: string) => void",
              description: "Runs with the edited text when someone saves.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              defaultValue: '"md"',
              description: "Sets the control height and text size.",
            },
            {
              name: "placeholder",
              type: "string",
              defaultValue: '""',
              description:
                "Text shown in display and input modes when the value is empty.",
            },
          ]}
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use a form control when editing needs more context."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/input">Input field</DocsPageLink> —
            for a standard single-line form control.
          </li>
          <li>
            <DocsPageLink to="/components/field">Field</DocsPageLink> — when the
            value needs a label, help text, or validation.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
