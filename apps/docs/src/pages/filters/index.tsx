import * as React from "react";
import { Funnel } from "lucide-react";

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
import { DateRangeFilter, Filter, Sort } from "@gecko/ui/components/filters";
import type { FilterCategory } from "@gecko/ui/components/filters";
import type { DateRange } from "react-day-picker";

const actionOptions = [
  "Message sent",
  "Message received",
  "Status changed",
  "Conversation reopened",
  "Conversation closed",
];

const triggerOptions = ["Manual", "Rule based", "Automation", "Webhook"];

const channelOptions = [
  "Admissions live chat",
  "WhatsApp",
  "Email",
  "Instagram",
  "Facebook Messenger",
];

const chatbotOptions = [
  "Admissions assistant",
  "International support bot",
  "Scholarships bot",
];

const labelOptions = [
  "Priority",
  "Refund",
  "Offer holder",
  "International",
  "Technical issue",
];

const agentTeamOptions = ["Alice Morgan", "Ben Taylor", "Care Team"];

function toOptions(items: string[]) {
  return items.map((item) => ({ value: item, label: item }));
}

/** Short lists: disable search so submenus stay compact. */
const filterCategoriesWithoutSearch: FilterCategory[] = [
  {
    id: "priority",
    label: "Priority",
    searchable: false,
    options: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
    ],
  },
  {
    id: "status",
    label: "Status",
    searchable: false,
    options: [
      { value: "open", label: "Open" },
      { value: "pending", label: "Pending" },
      { value: "closed", label: "Closed" },
    ],
  },
];

const filterCategories: FilterCategory[] = [
  {
    id: "actionType",
    label: "Action type",
    options: toOptions(actionOptions),
    searchPlaceholder: "Search action types",
  },
  {
    id: "triggerType",
    label: "Trigger type",
    options: toOptions(triggerOptions),
  },
  {
    id: "channel",
    label: "Channel",
    options: toOptions(channelOptions),
    searchPlaceholder: "Search channels",
  },
  {
    id: "agentsAndTeams",
    label: "Agents and teams",
    options: toOptions(agentTeamOptions),
    searchPlaceholder: "Search agents and teams",
  },
  {
    id: "chatbots",
    label: "Chatbots",
    options: toOptions(chatbotOptions),
    searchPlaceholder: "Search chatbots",
  },
  {
    id: "labels",
    label: "Labels",
    options: toOptions(labelOptions),
    searchPlaceholder: "Search labels",
  },
];

export function FiltersPage() {
  const [sortValue, setSortValue] = React.useState("newest");
  const [dateRange, setDateRange] = React.useState<DateRange>();
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ];

  const importSnippet = `import {
  DateRangeFilter,
  Filter,
  Sort,
} from "@gecko/ui/components/filters"`;

  const basicExampleSnippet = `<Filter categories={categories} onChange={handleFiltersChange} />`;

  const searchSnippet = `<Filter categories={categories} />`;

  const sortSnippet = `<Sort
  options={sortOptions}
  value={sortValue}
  onValueChange={setSortValue}
/>`;

  const dateRangeSnippet = `<DateRangeFilter
  value={dateRange}
  onChange={setDateRange}
/>`;

  const condensedSnippet = `<Filter categories={categories} variant="condensed" />`;

  const triggerLabelSnippet = `<Filter categories={categories} triggerLabel="Contact filters" />`;

  const triggerIconSnippet = `<Filter categories={categories} triggerIcon={Funnel} />`;

  const triggerIconOnlySnippet = `<Filter
  categories={categories}
  trigger="icon"
  triggerIcon={Funnel}
  triggerLabel="Filter"
  variant="condensed"
/>`;

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Filters"
          description="Filters narrow or order a dataset. Filter handles categorical multi-select, Sort chooses one ordering, and DateRangeFilter limits results by date."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Filters with{" "}
              <DocsPageLink to="/components/data-table">
                Data table
              </DocsPageLink>{" "}
              product lists, or independently on dashboards and reporting
              interfaces. Data table composes Filter as{" "}
              <Code>DataTableFilters</Code> through <Code>toolbar.filters</Code>
              .
              <br />
              <br />
              Inbox and conversation filtering is a separate product pattern —
              do not reuse this Filters + Data table composition there. Avoid
              using Filter for a single choice — that is a{" "}
              <DocsPageLink to="/components/select">Select</DocsPageLink>.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import the filtering control required by the interface."
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
              A filter menu using the <Code>categories</Code> prop. Each
              category has an <Code>id</Code>, <Code>label</Code>, and{" "}
              <Code>options</Code>. Use this when people can select more than
              one value per category.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Filter categories={filterCategories} />
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

      <PageSection id="search" label="Search">
        <PageSectionHeader
          title="Search"
          description={
            <>
              Hides search fields in submenus using{" "}
              <Code>searchable: false</Code> on a category. Use this when the
              option list is short and search would add noise.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Filter categories={filterCategoriesWithoutSearch} />
            <Code
              variant="block"
              language="tsx"
              code={searchSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="sort" label="Sort">
        <PageSectionHeader
          title="Sort"
          description={
            <>
              A single-select ordering control using <Code>Sort</Code> with{" "}
              <Code>options</Code>, <Code>value</Code>, and{" "}
              <Code>onValueChange</Code>. Use this when people pick one sort
              order and no filter chips are needed.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Sort
              options={sortOptions}
              value={sortValue}
              onValueChange={setSortValue}
            />
            <Code
              variant="block"
              language="tsx"
              code={sortSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="date-range" label="Date range">
        <PageSectionHeader
          title="Date range"
          description="DateRangeFilter offers approved relative periods and a custom calendar range. The product owns the selected range and applies it to its dataset or query."
        />
        <ComponentExample>
          <div className="space-y-6">
            <DateRangeFilter value={dateRange} onChange={setDateRange} />
            <Code
              variant="block"
              language="tsx"
              code={dateRangeSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="condensed" label="Condensed">
        <PageSectionHeader
          title="Condensed"
          description={
            <>
              Hides active chips using{" "}
              <Code>variant=&quot;condensed&quot;</Code>. A{" "}
              <DocsPageLink to="/components/counter">Counter</DocsPageLink> on
              the trigger shows how many values are selected. Use this when
              horizontal space is limited.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Filter categories={filterCategories} variant="condensed" />
            <Code
              variant="block"
              language="tsx"
              code={condensedSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="trigger" label="Trigger">
        <PageSectionHeader
          title="Trigger"
          description="The filter trigger can show a custom label, a custom icon, or an icon alone. Use the option that fits the toolbar around it."
        />

        <PageSubsectionHeader
          id="trigger-label"
          title="Trigger label"
          description={
            <>
              Changes the button text using <Code>triggerLabel</Code>. Use this
              when &quot;Filter&quot; is not specific enough.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Filter
              categories={filterCategories}
              triggerLabel="Contact filters"
            />
            <Code
              variant="block"
              language="tsx"
              code={triggerLabelSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="trigger-icon"
          title="Trigger icon"
          description={
            <>
              Swaps the default icon using <Code>triggerIcon</Code>. Use this
              when the trigger should match nearby controls.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Filter categories={filterCategories} triggerIcon={Funnel} />
            <Code
              variant="block"
              language="tsx"
              code={triggerIconSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="trigger-icon-only"
          title="Icon only trigger"
          description={
            <>
              Shows only an icon using <Code>trigger=&quot;icon&quot;</Code>.
              Pair with <Code>triggerLabel</Code> for the accessible name. Use
              this when the toolbar is tight.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Filter
              categories={filterCategories}
              trigger="icon"
              triggerIcon={Funnel}
              triggerLabel="Filter"
              variant="condensed"
            />
            <Code
              variant="block"
              language="tsx"
              code={triggerIconOnlySnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Match the control to whether people are narrowing or ordering results."
        />
        <DocsDoDont
          doItems={[
            <>
              Pair Filters with Data table for product lists, or use them
              independently with a dashboard or report dataset.
            </>,
            <>
              Use <Code>Filter</Code> when people can select values across
              several categories.
            </>,
            <>
              Use <Code>Sort</Code> when exactly one ordering option is active.
            </>,
            <>
              Set <Code>searchable: false</Code> for short category option
              lists.
            </>,
            <>
              Apply values received by <Code>onChange</Code> to the product
              dataset, URL state, or remote query.
            </>,
            <>
              Use <Code>variant=&quot;condensed&quot;</Code> when active chips
              would not fit.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use Filters + Data table for Inbox conversation filters —
              that is a separate pattern.
            </>,
            <>Don’t use Filter for a single-choice field.</>,
            <>
              Don’t hide useful active-filter context just to save a small
              amount of space.
            </>,
            <>Don’t add search to a category with only a few options.</>,
            <>Don’t use Sort for options that can be active together.</>,
            <>
              Don’t expect Filter to fetch, transform, or filter product data by
              itself.
            </>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Filters."
        />
        <DocsApiTable
          rows={[
            {
              name: "Filter.categories",
              type: "readonly FilterCategory[]",
              description:
                "Categories and options people can use to narrow the results.",
            },
            {
              name: "Filter.triggerLabel",
              type: "string",
              defaultValue: '"Filter"',
              description:
                "Visible trigger text and the accessible name for an icon trigger.",
            },
            {
              name: "Filter.trigger",
              type: '"default" | "icon"',
              defaultValue: '"default"',
              description:
                "Shows an icon with a label or an icon-only trigger.",
            },
            {
              name: "Filter.triggerIcon",
              type: "string | LucideIcon",
              description: "Changes the icon shown in the filter trigger.",
            },
            {
              name: "Filter.onChange",
              type: "(values, operators) => void",
              description:
                "Runs when selected values or category operators change.",
            },
            {
              name: "Filter.values",
              type: "Record<string, string[]>",
              description:
                "Controlled selections keyed by category id. Use with onChange.",
            },
            {
              name: "Filter.operators",
              type: "Record<string, FilterOperator>",
              description:
                "Controlled operators keyed by category id. Use with onChange.",
            },
            {
              name: "Filter.defaultValues",
              type: "Record<string, string[]>",
              description:
                "Initial uncontrolled selections keyed by category id.",
            },
            {
              name: "Filter.defaultOperators",
              type: "Record<string, FilterOperator>",
              description:
                "Initial uncontrolled operators keyed by category id.",
            },
            {
              name: "Filter.variant",
              type: '"default" | "condensed"',
              defaultValue: '"default"',
              description:
                "Shows active chips or replaces them with a selection counter.",
            },
            {
              name: "FilterCategory.searchable",
              type: "boolean",
              defaultValue: "true",
              description:
                "Shows search when the option list benefits from it.",
            },
            {
              name: "FilterCategory.searchPlaceholder",
              type: "string",
              description: "Overrides the generated category search prompt.",
            },
            {
              name: "Sort.options",
              type: "readonly SortOption[]",
              description: "Single-choice ordering options shown in the menu.",
            },
            {
              name: "Sort.value",
              type: "string",
              description: "The currently selected sort option.",
            },
            {
              name: "Sort.onValueChange",
              type: "(value: string) => void",
              description: "Runs when someone chooses a sort option.",
            },
            {
              name: "DateRangeFilter.value",
              type: "DateRange | undefined",
              description: "Controlled selected date range.",
            },
            {
              name: "DateRangeFilter.onChange",
              type: "(range: DateRange | undefined) => void",
              description:
                "Runs after a preset, complete custom range, or clear action.",
            },
            {
              name: "DateRangeFilter.presets",
              type: "readonly DateRangeFilterPreset[]",
              description: "Overrides the approved relative date choices.",
            },
            {
              name: "DateRangeFilter.closeOnSelect",
              type: "boolean",
              defaultValue: "true",
              description:
                "Closes after a preset or complete custom range is selected.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-reference"
          className="mt-6"
          title="API reference"
          description={
            <>
              Filters composes Gecko Dropdown menu, Popover, and Calendar. See
              the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/dropdown-menu">
                Shadcn Dropdown menu documentation
              </DocsExternalLink>
              ,{" "}
              <DocsExternalLink href="https://base-ui.com/react/components/menu">
                Base UI Menu API
              </DocsExternalLink>
              ,{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/popover">
                Shadcn Popover documentation
              </DocsExternalLink>
              , and the{" "}
              <DocsExternalLink href="https://daypicker.dev/api">
                React DayPicker API
              </DocsExternalLink>{" "}
              for the underlying behaviour.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use these components around filtered and sorted collections."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/data-table">Data table</DocsPageLink>{" "}
            — to present rows that people can filter or sort.
          </li>
          <li>
            <DocsPageLink to="/components/dropdown-menu">
              Dropdown menu
            </DocsPageLink>{" "}
            — for a menu of actions rather than filter criteria.
          </li>
        </ul>
      </PageSection>
    </div>
  );
}
