import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { PageSectionNav } from "@/components/layout/page-section-nav"

import { Code } from "@/components/ui/code"
import { MetricCard } from "@/components/ui/metric-card"

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

  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-10 border-r border-border pr-8">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">
            Metric card
          </h1>
          <p className="text-sm text-muted-foreground text-pretty">
            A compact card for displaying a metric with optional trend indicators,
            sparkline chart, helper tooltip, and an options menu.
          </p>
        </PageSection>

        <PageSection id="basic" label="Basic">
          <h2 className="text-lg font-semibold">Basic</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Title + value only.
          </p>

          <ComponentExample>
            <div className="max-w-sm">
              <MetricCard title={baseTitle} value={baseValue} />
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="trend" label="Trend">
          <h2 className="text-lg font-semibold">Trend</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Show a directional indicator and comparison text (e.g.{" "}
            <Code>vs last week</Code>).
          </p>

          <ComponentExample>
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
          </ComponentExample>
        </PageSection>

        <PageSection id="sparkline" label="Sparkline">
          <h2 className="text-lg font-semibold">Sparkline</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Add a lightweight trend chart using Recharts.
          </p>

          <ComponentExample>
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
          </ComponentExample>
        </PageSection>

        <PageSection id="menu" label="Options menu">
          <h2 className="text-lg font-semibold">Options menu</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Add a ghost kebab trigger for additional actions.
          </p>

          <ComponentExample>
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
          </ComponentExample>
        </PageSection>

        <PageSection id="help" label="Help tooltip">
          <h2 className="text-lg font-semibold">Help tooltip</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Provide more context about the metric via a tooltip.
          </p>

          <ComponentExample>
            <div className="max-w-sm">
              <MetricCard
                title={baseTitle}
                value={baseValue}
                helpText="The median time from the first inbound message to the first agent response in new conversations."
              />
            </div>
          </ComponentExample>
        </PageSection>

        <PageSection id="description" label="Description">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Add supporting text below the value.
          </p>

          <ComponentExample>
            <div className="max-w-sm">
              <MetricCard
                title={baseTitle}
                value={baseValue}
                description="The median time of your first response in new conversations, from the first inbound message to the first agent response."
              />
            </div>
          </ComponentExample>
        </PageSection>
      </div>
      <PageSectionNav />
    </div>
  )
}

