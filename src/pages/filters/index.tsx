import * as React from "react"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Code } from "@/components/ui/code"
import { Filter, Sort } from "@/components/ui/filters"
import type { FilterCategory } from "@/components/ui/filters"

const actionOptions = [
  "Message sent",
  "Message received",
  "Status changed",
  "Conversation reopened",
  "Conversation closed",
]

const triggerOptions = [
  "Manual",
  "Rule based",
  "Automation",
  "Webhook",
]

const channelOptions = [
  "Admissions live chat",
  "WhatsApp",
  "Email",
  "Instagram",
  "Facebook Messenger",
]

const chatbotOptions = [
  "Admissions assistant",
  "International support bot",
  "Scholarships bot",
]

const labelOptions = [
  "Priority",
  "Refund",
  "Offer holder",
  "International",
  "Technical issue",
]

const agentTeamOptions = ["Alice Morgan", "Ben Taylor", "Care Team"]

function toOptions(items: string[]) {
  return items.map((item) => ({ value: item, label: item }))
}

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
]

export function FiltersPage() {
  const [sortValue, setSortValue] = React.useState("newest")
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ]

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Filters</h1>
          <p className="text-sm text-muted-foreground">
            A filter dropdown built from the same primitives as{" "}
            <Code>DropdownMenu</Code>: category submenus, optional per-submenu
            search, and <Code>DropdownMenuCheckboxItem</Code> for multi-select.
            When you select values, it also renders active filter chips with an
            operator dropdown and an in-place value picker.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Pass your category definitions into <Code>Filter</Code> and it handles
            the trigger dropdown, searchable submenus, and checkbox selections.
          </p>
          <ComponentExample>
            <Filter categories={filterCategories} />
          </ComponentExample>
        </PageSection>

        <PageSection id="sort" label="Sort">
          <h2 className="text-lg font-semibold">Sort</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>Sort</Code> when you want a sorting dropdown (single select)
            that doesn’t render chips or results.
          </p>
          <ComponentExample>
            <Sort
              options={sortOptions}
              value={sortValue}
              onValueChange={setSortValue}
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="condensed" label="Condensed">
          <h2 className="text-lg font-semibold">Condensed</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use <Code>variant=&quot;condensed&quot;</Code> to hide the active chips and
            show a counter on the trigger instead.
          </p>
          <ComponentExample>
            <Filter categories={filterCategories} variant="condensed" />
          </ComponentExample>
        </PageSection>

        <PageSection id="trigger" label="Trigger">
          <h2 className="text-lg font-semibold">Trigger</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Customise the trigger’s label, icon, or render an icon-only trigger.
          </p>

          <h3 id="trigger-label" className="mb-3 text-base font-semibold">
            Trigger label
          </h3>
          <ComponentExample className="mb-8">
            <Filter categories={filterCategories} triggerLabel="Contact filters" />
          </ComponentExample>

          <h3 id="trigger-icon" className="mb-3 text-base font-semibold">
            Trigger icon
          </h3>
          <ComponentExample className="mb-8">
            <Filter categories={filterCategories} triggerIcon="funnel" />
          </ComponentExample>

          <h3 id="trigger-icon-only" className="mb-3 text-base font-semibold">
            Icon only trigger
          </h3>
          <ComponentExample>
            <Filter
              categories={filterCategories}
              trigger="icon"
              triggerIcon="funnel"
              triggerLabel="Filter"
              variant="condensed"
            />
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}

