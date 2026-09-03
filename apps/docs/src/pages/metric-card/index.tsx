import { ComponentExample } from "@/components/layout/component-example"
import { DocsApiTable } from "@/components/layout/docs-api-table"
import { DocsDoDont } from "@/components/layout/docs-do-dont"
import { DocsExternalLink } from "@/components/layout/docs-external-link"
import { DocsPageLink } from "@/components/layout/docs-page-link"
import { PageSection } from "@/components/layout/page-section"
import {
  PageOverviewHeader,
  PageSectionHeader,
  PageSubsectionHeader,
} from "@/components/layout/page-section-header"
import { Code } from "@gecko/ui/components/code"
import { MetricCard } from "@gecko/ui/components/metric-card"

export function MetricCardPage() {
  const baseTitle = "Median first response time"
  const baseValue = "1m 28s"
  const baseSeconds = 88

  const formatSeconds = (seconds: number) => {
    const s = Math.max(0, Math.round(seconds))
    const m = Math.floor(s / 60)
    const rem = s % 60
    return `${m}m ${String(rem).padStart(2, "0")}s`
  }

  const ordinal = (day: number) => {
    const mod100 = day % 100
    if (mod100 >= 11 && mod100 <= 13) return `${day}th`
    const mod10 = day % 10
    if (mod10 === 1) return `${day}st`
    if (mod10 === 2) return `${day}nd`
    if (mod10 === 3) return `${day}rd`
    return `${day}th`
  }

  const formatLongDate = (x: string | number) => {
    const iso = typeof x === "string" ? x : String(x)
    const d = new Date(`${iso}T00:00:00`)
    // Example: "Monday, 30th March"
    const weekday = d.toLocaleDateString("en-GB", { weekday: "long" })
    const day = ordinal(d.getDate())
    const month = d.toLocaleDateString("en-GB", { month: "long" })
    return `${weekday}, ${day} ${month}`
  }

  // Week starting Monday 30th March 2026
  const week = [
    "2026-03-30",
    "2026-03-31",
    "2026-04-01",
    "2026-04-02",
    "2026-04-03",
    "2026-04-04",
    "2026-04-05",
  ] as const

  const importSnippet = `import { MetricCard } from "@gecko/ui/components/metric-card"`

  const basicSnippet = `<MetricCard title="Median first response time" value="1m 28s" />`

  const trendSnippet = `<MetricCard
  title="Median first response time"
  value="1m 28s"
  trend={{
    direction: "up|down|neutral",
    sentiment: "positive|negative|neutral",
    label: "3s",
    compareTo: "vs last week",
  }}
/>`

  const sparklineSnippet = `<MetricCard
  title="Median first response time"
  value="1m 28s"
  sparkline={{
    sentiment: "positive|negative|neutral",
    formatLabel: formatLongDate,
    formatValue: formatSeconds,
    data: [
      { x: "2026-03-30", y: 95 },
      { x: "2026-03-31", y: 92 },
      { x: "2026-04-01", y: 85 },
      { x: "2026-04-02", y: 88 },
      { x: "2026-04-03", y: 84 },
      { x: "2026-04-04", y: 74 },
      { x: "2026-04-05", y: 79 },
    ],
  }}
/>`

  const menuSnippet = `<MetricCard
  title="Median first response time"
  value="1m 28s"
  menuItems={[
    { id: "view", label: "View details" },
    { id: "export", label: "Export" },
  ]}
/>`

  const helpSnippet = `<MetricCard
  title="Median first response time"
  value="1m 28s"
  helpText="The median time from the first inbound message to the first agent response in new conversations."
/>`

  const detailSnippet = `<MetricCard
  title="Open rate"
  value="74%"
  detail="123 unique opens"
  description="% of delivered recipients who opened the message."
/>`

  const descriptionSnippet = `<MetricCard
  title="Median first response time"
  value="1m 28s"
  description="The median time of your first response in new conversations, from the first inbound message to the first agent response."
/>`

  return (
    <div className="space-y-12">
      <PageSection id="overview" label="Overview">
        <PageOverviewHeader
          title="Metric card"
          description="The Metric card shows a single headline number with optional trend, sparkline, help text, and actions. Use it on dashboards and summary views where one KPI needs quick context."
        />
      </PageSection>

      <PageSection id="usage" label="Usage">
        <PageSectionHeader
          title="Usage"
          description={
            <>
              Use Metric card for a single KPI on dashboards, reporting, or an
              individual product screen (for example an event’s success
              metrics). Lay metric cards out in <strong>rows of three</strong>{" "}
              inside{" "}
              <DocsPageLink to="/structure/container">
                Page container
              </DocsPageLink>
              . Add a trend,{" "}
              <DocsPageLink to="/components/charts">Charts</DocsPageLink>{" "}
              sparkline, or help when people need comparison or definition.
              <br />
              <br />
              Avoid packing unrelated metrics into one card, or using Metric
              card for detailed analysis — use a full chart or{" "}
              <DocsPageLink to="/components/table">Table</DocsPageLink> instead.
            </>
          }
        />
        <PageSubsectionHeader
          id="usage-import"
          title="Import"
          description="Import MetricCard to add a KPI summary card."
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

      <PageSection id="basic" label="Basic">
        <PageSectionHeader
          title="Basic"
          description="Title and value only. Use this when the number speaks for itself and no trend or extra context is needed."
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="max-w-sm">
              <MetricCard title={baseTitle} value={baseValue} />
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

      <PageSection id="trend" label="Trend">
        <PageSectionHeader
          title="Trend"
          description={
            <>
              Adds a directional indicator and comparison label using the{" "}
              <Code>trend</Code> prop. Set <Code>direction</Code>,{" "}
              <Code>sentiment</Code>, and <Code>label</Code> to show whether the
              change is good or bad for this metric.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
              <MetricCard
                title={baseTitle}
                value={baseValue}
                trend={{
                  direction: "down",
                  sentiment: "positive",
                  label: "3s",
                  compareTo: "vs last week",
                }}
              />
              <MetricCard
                title={baseTitle}
                value={baseValue}
                trend={{
                  direction: "up",
                  sentiment: "negative",
                  label: "3s",
                  compareTo: "vs last week",
                }}
              />
              <MetricCard
                title={baseTitle}
                value={baseValue}
                trend={{
                  direction: "neutral",
                  sentiment: "neutral",
                  label: "same as last week",
                }}
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={trendSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="sparkline" label="Sparkline">
        <PageSectionHeader
          title="Sparkline"
          description={
            <>
              Adds a small area chart using the <Code>sparkline</Code> prop.
              Pass daily or periodic <Code>data</Code> points and optional{" "}
              <Code>formatLabel</Code> / <Code>formatValue</Code> formatters for
              the chart tooltip.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
              <MetricCard
                title={baseTitle}
                value={baseValue}
                sparkline={{
                  sentiment: "positive",
                  formatLabel: formatLongDate,
                  formatValue: formatSeconds,
                  data: [
                    // 7 daily reference points (seconds)
                    { x: week[0], y: 95 },
                    { x: week[1], y: 92 },
                    { x: week[2], y: 85 },
                    { x: week[3], y: baseSeconds },
                    { x: week[4], y: 84 },
                    { x: week[5], y: 74 },
                    { x: week[6], y: 79 },
                  ],
                }}
              />
              <MetricCard
                title={baseTitle}
                value={baseValue}
                sparkline={{
                  sentiment: "negative",
                  formatLabel: formatLongDate,
                  formatValue: formatSeconds,
                  data: [
                    // 7 daily reference points (seconds)
                    { x: week[0], y: 78 },
                    { x: week[1], y: 50 },
                    { x: week[2], y: 83 },
                    { x: week[3], y: baseSeconds },
                    { x: week[4], y: 74 },
                    { x: week[5], y: 96 },
                    { x: week[6], y: 105 },
                  ],
                }}
              />
              <MetricCard
                title={baseTitle}
                value={baseValue}
                sparkline={{
                  sentiment: "neutral",
                  formatLabel: formatLongDate,
                  formatValue: formatSeconds,
                  data: [
                    // 7 daily reference points (seconds)
                    { x: week[0], y: 87 },
                    { x: week[1], y: 89 },
                    { x: week[2], y: 86 },
                    { x: week[3], y: baseSeconds },
                    { x: week[4], y: 90 },
                    { x: week[5], y: 88 },
                    { x: week[6], y: 87 },
                  ],
                }}
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={sparklineSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="menu" label="Options menu">
        <PageSectionHeader
          title="Options menu"
          description={
            <>
              Adds a kebab menu using <Code>menuItems</Code>. Use this when
              people need secondary actions such as export or drill-down without
              leaving the dashboard.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="max-w-sm">
              <MetricCard
                title={baseTitle}
                value={baseValue}
                menuItems={[
                  { id: "view", label: "View details" },
                  { id: "export", label: "Export" },
                ]}
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={menuSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="help" label="Help tooltip">
        <PageSectionHeader
          title="Help tooltip"
          description={
            <>
              Adds a help icon with a <Code>helpText</Code> tooltip. Use this
              when the metric name alone may not explain how it is calculated.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="max-w-sm">
              <MetricCard
                title={baseTitle}
                value={baseValue}
                helpText="The median time from the first inbound message to the first agent response in new conversations."
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={helpSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="detail" label="Detail">
        <PageSectionHeader
          title="Detail"
          description={
            <>
              Adds supporting text beside the value using <Code>detail</Code>.
              Use this for counts, units, or a secondary figure that sits next
              to the headline number.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="max-w-sm">
              <MetricCard
                title="Open rate"
                value="74%"
                detail="123 unique opens"
                description="% of delivered recipients who opened the message."
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={detailSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="description" label="Description">
        <PageSectionHeader
          title="Description"
          description={
            <>
              Adds supporting text below the value using{" "}
              <Code>description</Code>. Use this when the metric needs a short
              explanation under the number.
            </>
          }
        />
        <ComponentExample>
          <div className="space-y-6">
            <div className="max-w-sm">
              <MetricCard
                title={baseTitle}
                value={baseValue}
                description="The median time of your first response in new conversations, from the first inbound message to the first agent response."
              />
            </div>
            <Code
              variant="block"
              language="tsx"
              code={descriptionSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </PageSection>

      <PageSection id="do-dont" label="Do and don’t">
        <PageSectionHeader
          title="Do and don’t"
          description="Keep each card focused on one metric and only add context that helps interpret it."
        />
        <DocsDoDont
          doItems={[
            <>Lay Metric cards in rows of three on dashboards and reporting.</>,
            <>
              Give every card a clear <Code>title</Code> and readable{" "}
              <Code>value</Code>.
            </>,
            <>
              Use <Code>trend</Code> when the direction and comparison period
              matter.
            </>,
            <>
              Use <Code>sparkline</Code> for a compact view of change over time.
            </>,
            <>
              Add <Code>helpText</Code> when the metric’s calculation needs
              explanation.
            </>,
          ]}
          dontItems={[
            <>Don’t combine unrelated metrics in one card.</>,
            <>
              Don’t infer positive or negative sentiment from direction alone.
            </>,
            <>
              Don’t use a sparkline when people need detailed chart analysis.
            </>,
            <>
              Don’t repeat the same supporting text in <Code>detail</Code> and{" "}
              <Code>description</Code>.
            </>,
            <>Don’t hide the primary metric action inside the options menu.</>,
          ]}
        />
      </PageSection>

      <PageSection id="api" label="API">
        <PageSectionHeader
          title="API"
          description="Behaviour props on Metric card."
        />
        <DocsApiTable
          rows={[
            {
              name: "title",
              type: "React.ReactNode",
              description: "Names the metric shown in the card.",
            },
            {
              name: "value",
              type: "React.ReactNode",
              description: "The headline metric value.",
            },
            {
              name: "detail",
              type: "React.ReactNode",
              description: "Supporting label shown beside the headline value.",
            },
            {
              name: "description",
              type: "React.ReactNode",
              description: "Short supporting text shown below the value.",
            },
            {
              name: "helpText",
              type: "React.ReactNode",
              description:
                "Adds a help icon that shows the metric definition in a tooltip.",
            },
            {
              name: "helpLabel",
              type: "string",
              defaultValue: '"Help for {title}"',
              description:
                "Overrides the accessible name of the help button when the title is not a string.",
            },
            {
              name: "trend",
              type: "MetricCardTrend",
              description:
                "Shows direction, sentiment, a change label, and optional comparison.",
            },
            {
              name: "sparkline",
              type: "MetricCardSparkline",
              description:
                "Shows a compact area chart with optional tooltip formatting.",
            },
            {
              name: "menuItems",
              type: "MetricCardMenuItem[]",
              description: "Adds an options menu containing secondary actions.",
            },
            {
              name: "menuLabel",
              type: "string",
              defaultValue: '"Options for {title}"',
              description:
                "Overrides the accessible name of the options button when the title is not a string.",
            },
            {
              name: "trend.direction",
              type: '"up" | "down" | "neutral"',
              description: "Describes the direction of the metric change.",
            },
            {
              name: "trend.sentiment",
              type: '"positive" | "negative" | "neutral"',
              description:
                "Describes whether the change is beneficial, harmful, or neither.",
            },
            {
              name: "trend.label",
              type: "React.ReactNode",
              description: "Displays the amount or summary of the change.",
            },
            {
              name: "trend.compareTo",
              type: "React.ReactNode",
              description: "Names the comparison period or baseline.",
            },
            {
              name: "sparkline.data",
              type: "MetricCardSparklineDatum[]",
              description: "Provides the ordered x and y values for the chart.",
            },
            {
              name: "sparkline.sentiment",
              type: '"positive" | "negative" | "neutral"',
              description: "Sets the semantic chart colour.",
            },
            {
              name: "sparkline.ariaLabel",
              type: "string",
              defaultValue: '"{title} trend"',
              description:
                "Overrides the chart name when the metric title is not a string.",
            },
            {
              name: "sparkline.showTooltip",
              type: "boolean",
              defaultValue: "true",
              description: "Shows exact values while navigating the sparkline.",
            },
            {
              name: "sparkline.tooltipLabel",
              type: "React.ReactNode",
              description: "Provides a fixed label inside the chart tooltip.",
            },
            {
              name: "sparkline.formatLabel",
              type: "(x) => React.ReactNode",
              description: "Formats each x value for the chart tooltip.",
            },
            {
              name: "sparkline.formatValue",
              type: "(value: number) => React.ReactNode",
              description: "Formats each y value for the chart tooltip.",
            },
            {
              name: "menuItems[].id",
              type: "string",
              description: "Provides the stable key for a menu action.",
            },
            {
              name: "menuItems[].label",
              type: "React.ReactNode",
              description: "Labels the menu action.",
            },
            {
              name: "menuItems[].onSelect",
              type: "() => void",
              description: "Runs when the menu action is selected.",
            },
            {
              name: "menuItems[].disabled",
              type: "boolean",
              defaultValue: "false",
              description: "Makes the menu action unavailable.",
            },
          ]}
        />
        <PageSubsectionHeader
          id="api-reference"
          className="mt-6"
          title="API reference"
          description={
            <>
              Metric card uses Recharts for its optional sparkline. See the{" "}
              <DocsExternalLink href="https://recharts.github.io/en-US/api/AreaChart/">
                Recharts AreaChart API
              </DocsExternalLink>{" "}
              for the underlying chart behaviour. Extend it through the Gecko
              component rather than importing Recharts into application code.
            </>
          }
        />
      </PageSection>

      <PageSection id="related" label="Related">
        <PageSectionHeader
          title="Related"
          description="Use a related component when the content needs a different level of detail."
        />
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/card">Card</DocsPageLink> — for
            content that is not a single headline metric.
          </li>
          <li>
            <DocsPageLink to="/components/charts">Charts</DocsPageLink> — for
            detailed trends, comparisons, and analysis.
          </li>
        </ul>
      </PageSection>
    </div>
  )
}
