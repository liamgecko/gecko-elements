"use client"

import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"
import { ComponentExample } from "@/components/layout/component-example"
import { InlineEdit } from "@/components/ui/inline-edit"
import * as React from "react"
import { Code } from "@/components/ui/code"

export function InlineEditPage() {
  const [sm, setSm] = React.useState("Click to edit")
  const [md, setMd] = React.useState("Click to edit")
  const [lg, setLg] = React.useState("Click to edit")
  const [basic, setBasic] = React.useState("Click to edit")

  return (
    <div className="flex gap-5.5">
      <div className="min-w-0 flex-1 space-y-10 border-r-0 pr-0 lg:border-r lg:border-border lg:pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Inline edit</h1>
          <p className="text-sm text-muted-foreground">
            Inline edit keeps text in-place and switches to an input when editing,
            with inline save and cancel actions.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Click the value to edit it inline. Use Enter to save or Escape to
            cancel.
          </p>
          <ComponentExample>
            <div className="min-w-0 w-full">
              <InlineEdit value={basic} onSave={setBasic} />
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="sizing" label="Sizing">
          <h2 className="text-lg font-semibold">Sizes</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Use{" "}
            <Code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
              size
            </Code>{" "}
            to control control height and typography.
          </p>

          <h3 id="sizing-small" className="mb-3 text-base font-semibold">
            Small
          </h3>
          <ComponentExample className="mb-8">
            <div className="min-w-0 w-full">
              <InlineEdit value={sm} onSave={setSm} size="sm" />
            </div>
          </ComponentExample>

          <h3 id="sizing-medium" className="mb-3 text-base font-semibold">
            Medium
          </h3>
          <ComponentExample className="mb-8">
            <div className="min-w-0 w-full">
              <InlineEdit value={md} onSave={setMd} size="md" />
            </div>
          </ComponentExample>

          <h3 id="sizing-large" className="mb-3 text-base font-semibold">
            Large
          </h3>
          <ComponentExample>
            <div className="min-w-0 w-full">
              <InlineEdit value={lg} onSave={setLg} size="lg" />
            </div>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}

