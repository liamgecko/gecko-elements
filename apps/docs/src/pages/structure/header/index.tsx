import { ComponentExample } from "@/components/layout/component-example"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"
import { PageSection } from "@/components/layout/page-section"
import { Code } from "@gecko/ui/components/code"
import { Header } from "@gecko/ui/components/header"

const demoBreadcrumbs = {
  items: [
    { label: "Breadcrumb link", href: "#" },
    { label: "Breadcrumb link", href: "#" },
    { label: "Breadcrumb current", current: true },
  ],
} as const

const demoTabs = {
  tabsProps: { defaultValue: "one" },
  items: [
    { value: "one", label: "Label" },
    { value: "two", label: "Label" },
    { value: "three", label: "Label" },
    { value: "four", label: "Label" },
    { value: "five", label: "Label" },
    { value: "six", label: "Label" },
    { value: "seven", label: "Label" },
    { value: "eight", label: "Label" },
    { value: "nine", label: "Label" },
    { value: "ten", label: "Label" },
  ],
} as const

export function StructureHeaderPage() {
  const importSnippet = `import { Header } from "@gecko/ui/components/header"`

  const compositionSnippet = `Header (props)
├── breadcrumbs
├── favourite toggle (always; optional favouriteAction props)
├── title / subheading
├── secondaryActions / primaryAction
└── tabs`

  const exampleSnippet = `<Header
  breadcrumbs={{
    items: [
      { label: "Section", href: "#" },
      { label: "Page", current: true },
    ],
  }}
  title="Heading"
  subheading="Sub heading"
  favouriteAction={{ defaultPressed: true }}
  secondaryActions={[{ label: "Button" }]}
  primaryAction={{ label: "Button" }}
  tabs={{
    tabsProps: { defaultValue: "one" },
    items: [
      { value: "one", label: "Label" },
      { value: "two", label: "Label" },
    ],
  }}
/>`

  const examplesBreadcrumbsOnlySnippet = `<Header
  breadcrumbs={{
    items: [
      { label: "Section", href: "#" },
      { label: "Page", current: true },
    ],
  }}
/>`

  const examplesActionsSnippet = `<Header
  breadcrumbs={{
    items: [
      { label: "Section", href: "#" },
      { label: "Page", current: true },
    ],
  }}
  secondaryActions={[{ label: "Button" }]}
  primaryAction={{ label: "Button" }}
/>`

  const examplesActionsMultipleSnippet = `<Header
  breadcrumbs={{
    items: [
      { label: "Section", href: "#" },
      { label: "Page", current: true },
    ],
  }}
  secondaryActions={[
    { label: "Export" },
    { label: "Share" },
  ]}
  primaryAction={{ label: "Save" }}
/>`

  const examplesHeadingSnippet = `<Header
  breadcrumbs={{
    items: [
      { label: "Section", href: "#" },
      { label: "Page", current: true },
    ],
  }}
  title="Heading"
/>`

  const examplesSubHeadingSnippet = `<Header
  breadcrumbs={{
    items: [
      { label: "Section", href: "#" },
      { label: "Page", current: true },
    ],
  }}
  title="Heading"
  subheading="Sub heading"
/>`

  const examplesTabsSnippet = `<Header
  breadcrumbs={{
    items: [
      { label: "Section", href: "#" },
      { label: "Page", current: true },
    ],
  }}
  tabs={{
    tabsProps: { defaultValue: "one" },
    items: [
      { value: "one", label: "Label" },
      { value: "two", label: "Label" },
    ],
  }}
/>`

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Header"
          description={
            <>
              Headers communicate page purpose and provide a consistent place
              for navigation context, titles, and key actions. Use the{" "}
              <Code>Header</Code> component for top-of-page layout that aligns
              breadcrumbs, headings, buttons, and tabs without hand-building the
              grid each time.
            </>
          }
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use <Code>Header</Code> on detail or settings views where users
              need hierarchy (breadcrumbs), a clear page title, optional
              supporting copy, actions, and in-page navigation tabs. The
              favourite toggle is always shown; pass only the other props you
              need so optional regions are not rendered.
              <br />
              <br />
              When a heading is present, actions align to the heading row. When
              there is no heading, actions align to the breadcrumbs row.
            </>
          }
        />

        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description={
            <>
              Import <Code>Header</Code> from the UI package. It composes
              breadcrumbs, buttons, toggles, and tabs internally from existing
              primitives.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <Code
            variant="block"
            language="tsx"
            code={importSnippet}
            showCopyButton
            copyLabel="Copy import"
          />
        </ComponentExample>

        <PageSubsectionHeader
          id="usage-composition"
          title="Composition"
          description={
            <>
              <Code>Header</Code> is a single component configured through props
              rather than compound children. Breadcrumbs are optional but
              recommended for nested routes. The favourite star is always
              rendered; use <Code>favouriteAction</Code> to control pressed state,
              labels, or icon. Combine <Code>title</Code> and{" "}
              <Code>subheading</Code> for the main label and supporting line,{" "}
              <Code>secondaryActions</Code> and <Code>primaryAction</Code> for
              extra buttons, and <Code>tabs</Code> for line tabs beneath the
              header block.
            </>
          }
        />
        <ComponentExample>
          <Code
            variant="block"
            language="text"
            code={compositionSnippet}
            showCopyButton
            copyLabel="Copy composition"
          />
        </ComponentExample>
      </PageSection>

      <PageSection id="example" label="Example">
        <PageSectionHeader
          title="Example"
          description={
            <>
              A full header with breadcrumbs, title, subheading, favourite
              toggle, secondary and primary actions, and line tabs—typical for a
              record or settings screen.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Header
              breadcrumbs={demoBreadcrumbs}
              title="Heading"
              subheading="Sub heading"
              favouriteAction={{
                defaultPressed: true,
              }}
              secondaryActions={[{ label: "Button" }]}
              primaryAction={{ label: "Button" }}
              tabs={demoTabs}
            />
            <Code
              variant="block"
              language="tsx"
              code={exampleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="variants" label="Variants">
        <PageSectionHeader
          title="Variants"
          description={
            <>
              The <Code>Header</Code> component comes in several variants to suit different page layouts and content structures.
            </>
          }
        />

        <PageSubsectionHeader
          id="examples-breadcrumbs-only"
          title="Breadcrumbs only"
          description={
            <>
              Minimal layout: breadcrumbs and the favourite toggle only—no
              title, extra buttons, or tabs.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Header breadcrumbs={demoBreadcrumbs} />
            <Code
              variant="block"
              language="tsx"
              code={examplesBreadcrumbsOnlySnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="examples-actions"
          title="Actions"
          description={
            <>
              One secondary outline button and a primary button alongside the
              default favourite. With no heading, this row sits beside the
              breadcrumbs.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Header
              breadcrumbs={demoBreadcrumbs}
              secondaryActions={[{ label: "Button" }]}
              primaryAction={{ label: "Button" }}
            />
            <Code
              variant="block"
              language="tsx"
              code={examplesActionsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="examples-actions-multiple"
          title="Multiple actions"
          description={
            <>
              Pass several entries in <Code>secondaryActions</Code> for multiple
              outline buttons before the single <Code>primaryAction</Code>.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Header
              breadcrumbs={demoBreadcrumbs}
              secondaryActions={[{ label: "Export" }, { label: "Share" }]}
              primaryAction={{ label: "Save" }}
            />
            <Code
              variant="block"
              language="tsx"
              code={examplesActionsMultipleSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="examples-heading"
          title="Heading"
          description={
            <>
              Breadcrumbs and favourite with a single page title—no subheading
              or extra buttons.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Header breadcrumbs={demoBreadcrumbs} title="Heading" />
            <Code
              variant="block"
              language="tsx"
              code={examplesHeadingSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="examples-sub-heading"
          title="Sub-heading"
          description={
            <>
              Title with supporting description line under the heading.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <Header
              breadcrumbs={demoBreadcrumbs}
              title="Heading"
              subheading="Sub heading"
            />
            <Code
              variant="block"
              language="tsx"
              code={examplesSubHeadingSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>

        <PageSubsectionHeader
          id="examples-tabs"
          title="Tabs"
          description={
            <>
              Breadcrumbs, favourite, and line tabs with no title—useful when
              the tab label carries the primary context.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <Header breadcrumbs={demoBreadcrumbs} tabs={demoTabs} />
            <Code
              variant="block"
              language="tsx"
              code={examplesTabsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>
    </div>
  )
}
