import { PageSection } from "@/components/layout/page-section"
import { ComponentExample } from "@/components/layout/component-example"
import { DocsApiTable } from "@/components/layout/docs-api-table"
import { DocsDoDont } from "@/components/layout/docs-do-dont"
import { DocsPageLink } from "@/components/layout/docs-page-link"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"
import { Counter } from "@gecko/ui/components/counter"
import { Code } from "@gecko/ui/components/code"

export function CounterPage() {
  const importSnippet = `import { Counter } from "@gecko/ui/components/counter"`

  const basicSnippet = `<Counter value={1} />
<Counter value={3} />
<Counter value={7} />
<Counter value={10} />
<Counter value={24} />`

  const sizeSmallSnippet = `<Counter value={1} size="sm" />
<Counter value={3} size="sm" />
<Counter value={9} size="sm" />
<Counter value={12} size="sm" />`

  const sizeMediumSnippet = `<Counter value={1} size="md" />
<Counter value={3} size="md" />
<Counter value={9} size="md" />
<Counter value={12} size="md" />`

  const sizeLargeSnippet = `<Counter value={1} size="lg" />
<Counter value={3} size="lg" />
<Counter value={9} size="lg" />
<Counter value={12} size="lg" />`

  const variantsSnippet = `<Counter value={3} variant="primary" />
<Counter value={3} variant="secondary" />
<Counter value={3} variant="info" />
<Counter value={3} variant="warning" />
<Counter value={3} variant="destructive" />
<Counter value={3} variant="success" />
<Counter value={3} variant="light" />`

  const overflowSnippet = `<Counter value={112} max={9} size="sm" />
<Counter value={112} max={9} />
<Counter value={112} max={9} size="lg" />`

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Counter"
          description="The Counter shows a small number in a pill. It is a number people can scan, not a label."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Counter for compact counts such as notification totals on or
              beside a Badge. Prefer an owning component’s count prop when one
              exists, such as <Code>notificationCount</Code> on Badge.
              <br />
              <br />
              Avoid using it as a status label — that is a{" "}
              <DocsPageLink to="/components/badge">Badge</DocsPageLink>. Do not
              use it as a form control for entering a number.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import Counter to show a compact count."
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

      <PageSection id="basic" label="Basic example">
        <PageSectionHeader
          title="Basic example"
          description={
            <>
              The count using the <Code>value</Code> prop. Use this for a small number that should stay rounded as it grows.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Counter value={1} />
              <Counter value={3} />
              <Counter value={7} />
              <Counter value={10} />
              <Counter value={24} />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={basicSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="sizes" label="Sizes">
        <PageSectionHeader
          title="Sizes"
          description={
            <>
              Sets the pill size using the <Code>size</Code> prop. Default is <Code>md</Code>. Use the size that matches the control it sits on.
            </>
          }
        />

        <PageSubsectionHeader
          id="sizes-small"
          title="Small"
          description={
            <>
              A compact count using <Code>size=&quot;sm&quot;</Code>. Use this on a small icon or a dense list.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Counter value={1} size="sm" />
              <Counter value={3} size="sm" />
              <Counter value={9} size="sm" />
              <Counter value={12} size="sm" />
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
          id="sizes-medium"
          title="Medium"
          description={
            <>
              The default size using <Code>size=&quot;md&quot;</Code>. Use this next to a standard control.
            </>
          }
        />
        <ComponentExample className="mb-6">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Counter value={1} size="md" />
              <Counter value={3} size="md" />
              <Counter value={9} size="md" />
              <Counter value={12} size="md" />
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
          id="sizes-large"
          title="Large"
          description={
            <>
              A larger count using <Code>size=&quot;lg&quot;</Code>. Use this when the number needs to be easier to read.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Counter value={1} size="lg" />
              <Counter value={3} size="lg" />
              <Counter value={9} size="lg" />
              <Counter value={12} size="lg" />
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

      <PageSection id="variants" label="Variants">
        <PageSectionHeader
          title="Variants"
          description={
            <>
              Secondary is the default quiet treatment. Choose another{" "}
              <Code>variant</Code> only when the count has that semantic meaning.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Counter value={3} variant="primary" />
              <Counter value={3} variant="secondary" />
              <Counter value={3} variant="info" />
              <Counter value={3} variant="warning" />
              <Counter value={3} variant="destructive" />
              <Counter value={3} variant="success" />
              <Counter value={3} variant="light" />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={variantsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="overflow" label="Overflow">
        <PageSectionHeader
          title="Overflow"
          description={
            <>
              Caps the displayed number using the <Code>max</Code> prop, and shows a plus when the count is higher. Use this when a large number would not fit, such as <Code>9+</Code>.
              The complete count remains available to assistive technology.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Counter value={112} max={9} size="sm" />
              <Counter value={112} max={9} />
              <Counter value={112} max={9} size="lg" />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={overflowSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Keep counters compact, numeric, and matched to nearby controls."
        />
        <DocsDoDont
          doItems={[
            <>Pass the current count with <Code>value</Code>.</>,
            <>Use <Code>max</Code> when large values need a compact display.</>,
            <>Use the owning component’s count prop when it provides one.</>,
            <>Set <Code>size</Code> to match the control beside the Counter.</>,
            <>Choose a <Code>variant</Code> that reflects the count’s state.</>,
          ]}
          dontItems={[
            <>Don’t use a Counter for a text status.</>,
            <>Don’t shorten a count manually; use <Code>max</Code> for overflow.</>,
            <>Don’t manually position Counter when Badge or another component owns it.</>,
            <>Don’t mix Counter sizes beside controls of the same size.</>,
            <>Don’t use a status variant without that status meaning.</>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader title="API" description="Behaviour props on Counter." />
        <DocsApiTable
          rows={[
            {
              name: "value",
              type: "number",
              description: "Count to display, rounded down and clamped to zero.",
            },
            {
              name: "max",
              type: "number",
              description: "Positive whole-number limit shown before a plus is appended.",
            },
            {
              name: "variant",
              type: '"primary" | "secondary" | "info" | "warning" | "destructive" | "success" | "light"',
              defaultValue: '"secondary"',
              description: "Sets the Counter colour.",
            },
            {
              name: "size",
              type: '"sm" | "md" | "lg"',
              defaultValue: '"md"',
              description: "Sets the Counter height and minimum width.",
            },
            {
              name: "aria-label",
              type: "string",
              defaultValue: '"Count: {value}"',
              description: "Overrides the accessible name with contextual count meaning.",
            },
          ]}
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use Badge when the content is a label rather than a number."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/badge">Badge</DocsPageLink> — for a
            compact text label or status.
          </li>
        </ul>
      </PageSection>
    </div>
  )
}
