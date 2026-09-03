import { useState } from "react";

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
import { Search } from "@gecko/ui/components/search";
import { Code } from "@gecko/ui/components/code";

export function SearchPage() {
  const [value, setValue] = useState("");

  const importSnippet = `import { Search } from "@gecko/ui/components/search"`;

  const basicExampleSnippet = `<Search placeholder="Search…" />`;

  const withClearSnippet = `<Search
  placeholder="Search…"
  showClear
  value={value}
  onValueChange={setValue}
/>`;

  const sizesSnippet = `<Search size="sm|md|lg" placeholder="Search…" />`;

  const disabledSnippet = `<Search placeholder="Search…" disabled />`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Search"
          description="Search lets people enter a query to filter or find content in a list, table, dashboard, or page."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Search when someone enters a query and the results appear
              elsewhere in the interface. For toolbar filtering with multiple
              categories and sorting, use{" "}
              <DocsPageLink to="/components/filters">Filters</DocsPageLink>.
              <br />
              <br />
              Avoid using it for general text entry — use an{" "}
              <DocsPageLink to="/components/input">
                Input field
              </DocsPageLink>{" "}
              instead.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import Search to add a product search control."
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
          description="A search input with a placeholder. Use this when the surrounding layout already names the search area."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Search placeholder="Search…" />
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

      <PageSection id="with-clear" label="With clear">
        <PageSectionHeader
          title="With clear"
          description="Shows a contextual action that clears the current query and returns focus to Search."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Search
              placeholder="Search…"
              showClear
              value={value}
              onValueChange={setValue}
            />
            <Code
              variant="block"
              language="tsx"
              code={withClearSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="sizing" label="Sizing">
        <PageSectionHeader
          title="Sizing"
          description="Choose the size that matches the density and prominence of the surrounding interface."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Small</p>
                <Search size="sm" placeholder="Search…" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Medium</p>
                <Search size="md" placeholder="Search…" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Large</p>
                <Search size="lg" placeholder="Search…" />
              </div>
            </div>
            <Code
              variant="block"
              language="tsx"
              code={sizesSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="disabled" label="Disabled">
        <PageSectionHeader
          title="Disabled"
          description="Use the unavailable state only when searching cannot currently be performed."
        />
        <ComponentExample>
          <div className="space-y-6">
            <Search placeholder="Search…" disabled />
            <Code
              variant="block"
              language="tsx"
              code={disabledSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Use Search for queries that filter or find content elsewhere."
        />
        <DocsDoDont
          doItems={[
            <>Use a concise placeholder that describes what can be searched.</>,
            <>Provide a clear action for searches people are likely to reset.</>,
            <>Match its size to the surrounding toolbar or interface.</>,
            <>
              Use a specific accessible name when several searches appear on
              the same page.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use Search for ordinary text entry. Use an{" "}
              <DocsPageLink to="/components/input">Input field</DocsPageLink>.
            </>,
            <>Don’t show a clear control before the field contains a query.</>,
            <>Don’t mix field sizes in the same group of controls.</>,
            <>
              Don’t present result-loading or request failures as input
              validation errors.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Search."
        />
        <DocsApiTable
          rows={[
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              defaultValue: '"md"',
              description: "Sets the control and search icon size.",
            },
            {
              name: "showClear",
              type: "boolean",
              defaultValue: "false",
              description:
                "Shows a clear button while the field contains a value.",
            },
            {
              name: "value",
              type: "string",
              description: "Controls the current query.",
            },
            {
              name: "defaultValue",
              type: "string",
              description: "Sets the initial uncontrolled query.",
            },
            {
              name: "onValueChange",
              type: "(value: string) => void",
              description: "Reports each query change, including clearing.",
            },
            {
              name: "aria-label",
              type: "string",
              defaultValue: '"Search"',
              description: "Provides the accessible purpose of the control.",
            },
          ]}
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use the control that matches how the query affects the interface."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/input">Input field</DocsPageLink> — for
            general text entry.
          </li>
          <li>
            <DocsPageLink to="/components/data-table">Data table</DocsPageLink>{" "}
            — for searchable tabular data.
          </li>
          <li>
            <DocsPageLink to="/components/filters">Filters</DocsPageLink> — for
            compound filtering and sorting.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
