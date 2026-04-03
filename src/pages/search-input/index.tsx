"use client"

import { useState } from "react"
import { SearchField } from "@/components/ui/search-field"
import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { Code } from "@/components/ui/code"

export function SearchInputPage() {
  const [value, setValue] = useState("")

  return (
    <div className="flex gap-5.5">
      <div className="flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Search field</h1>
          <p className="text-sm text-muted-foreground">
            A search input with a left-aligned search icon and optional clear
            button. Built with the design system&apos;s input group components.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              SearchField
            </Code>{" "}
            component for search inputs with a search icon on the left.
          </p>
          <ComponentExample>
            <SearchField placeholder="Search…" />
          </ComponentExample>
        </PageSection>

        <PageSection id="with-clear" label="With clear">
          <h2 className="text-lg font-semibold">With clear</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              showClear
            </Code>{" "}
            prop to show a clear button when the input has content.
          </p>
          <ComponentExample>
            <SearchField
              placeholder="Search…"
              showClear
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="sizing" label="Sizing">
          <h2 className="text-lg font-semibold">Sizing</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              size
            </Code>{" "}
            prop for{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              sm
            </Code>
            ,{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              md
            </Code>
            , or{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              lg
            </Code>
            . Default is{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              md
            </Code>
            .
          </p>

          <h3 id="sizing-small" className="mb-3 text-base font-semibold">
            Small
          </h3>
          <ComponentExample className="mb-6">
            <SearchField size="sm" placeholder="Search…" />
          </ComponentExample>

          <h3 id="sizing-medium" className="mb-3 text-base font-semibold">
            Medium
          </h3>
          <ComponentExample className="mb-6">
            <SearchField size="md" placeholder="Search…" />
          </ComponentExample>

          <h3 id="sizing-large" className="mb-3 text-base font-semibold">
            Large
          </h3>
          <ComponentExample>
            <SearchField size="lg" placeholder="Search…" />
          </ComponentExample>
        </PageSection>

        <PageSection id="states" label="States">
          <h2 className="text-lg font-semibold">States</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Use the{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              disabled
            </Code>{" "}
            prop or{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              aria-invalid
            </Code>{" "}
            to show disabled and validation states.
          </p>

          <h3 id="states-disabled" className="mb-3 text-base font-semibold">
            Disabled
          </h3>
          <ComponentExample className="mb-6">
            <SearchField placeholder="Search…" disabled />
          </ComponentExample>

          <h3 id="states-invalid" className="mb-3 text-base font-semibold">
            Invalid
          </h3>
          <ComponentExample>
            <SearchField placeholder="Search…" aria-invalid />
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}
