"use client"

import * as React from "react"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartMetric,
  ChartTooltip,
  ChartTooltipContent,
  ChartTooltipGroupedContent,
  type ChartConfig,
} from "@gecko/ui/components/chart"
import { Card, CardContent, CardHeader } from "@gecko/ui/components/card"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  CampaignStatsGroupedLegend,
  createLegendPayload,
} from "./campaign-stats-grouped-legend"
import type {
  CampaignStatsComparison,
  CampaignStatsRatePoint,
  CampaignStatsTimeSeriesAxis,
} from "./campaign-stats-types"

const primaryLegendKeys = ["rate"] as const
const compareLegendKeys = ["compareRate"] as const

type RechartsTooltipPayloadItem = {
  dataKey?: string | number
  value?: number
  payload?: unknown
}

type RechartsTooltipContentProps = {
  active?: boolean
  payload?: RechartsTooltipPayloadItem[]
  label?: unknown
}

type RateOverTimeChartProps = {
  title: string
  metricLabel: string
  value: string
  detail: string
  data: CampaignStatsRatePoint[]
  campaignName: string
  xAxis?: CampaignStatsTimeSeriesAxis
  comparison?: CampaignStatsComparison
  primaryColor?: string
  compareColor?: string
  showClickBreakdown?: boolean
}

function ClickThroughTooltipContent({
  active,
  payload,
  label,
  campaignName,
  compareName,
  metricLabel,
}: RechartsTooltipContentProps & {
  campaignName: string
  compareName?: string
  metricLabel: string
}) {
  if (!active || !payload?.length) return null

  const primaryItem = payload.find((p) => String(p.dataKey) === "rate")
  const compareItem = payload.find((p) => String(p.dataKey) === "compareRate")

  const point = (primaryItem?.payload ?? {}) as CampaignStatsRatePoint
  const breakdown = point.breakdown ?? []

  const compareBreakdown = compareItem
    ? (breakdown.map((b) => ({
        url: b.url,
        clicks: b.compareClicks ?? 0,
      })) ?? [])
    : []

  const isComparing = Boolean(compareItem && compareName)

  return (
    <div className="grid min-w-52 items-start gap-2 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
      <div className="border-b border-border pb-1.5 font-medium">
        {typeof label === "string" ? label : String(label ?? "")}
      </div>

      <div className="grid gap-2">
        <div className="grid gap-1">
          {isComparing ? (
            <p className="truncate font-medium text-foreground">{campaignName}</p>
          ) : null}
          <div className="grid gap-1.5">
            {breakdown.slice(0, 4).map((item) => (
              <div key={item.url} className="flex items-center justify-between gap-4">
                <span className="min-w-0 flex-1 truncate text-muted-foreground">
                  {item.url}
                </span>
                <span className="shrink-0 font-mono font-medium text-foreground tabular-nums">
                  {item.clicks.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {isComparing ? (
          <div className="grid gap-1">
            <p className="truncate font-medium text-foreground">{compareName}</p>
            <div className="grid gap-1.5">
              {compareBreakdown.slice(0, 4).map((item) => (
                <div key={item.url} className="flex items-center justify-between gap-4">
                  <span className="min-w-0 flex-1 truncate text-muted-foreground">
                    {item.url}
                  </span>
                  <span className="shrink-0 font-mono font-medium text-foreground tabular-nums">
                    {item.clicks.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function RateOverTimeChart({
  title,
  metricLabel,
  value,
  detail,
  data,
  campaignName,
  xAxis,
  comparison,
  primaryColor = "var(--chart-1)",
  compareColor = "var(--chart-4)",
  showClickBreakdown = false,
}: RateOverTimeChartProps) {
  const chartConfig = React.useMemo(() => {
    const config = {
      rate: {
        label: metricLabel,
        color: primaryColor,
      },
    } satisfies ChartConfig

    if (!comparison) return config

    return {
      ...config,
      compareRate: {
        label: metricLabel,
        color: compareColor,
      },
    } satisfies ChartConfig
  }, [comparison, metricLabel, primaryColor, compareColor])

  const legendPayload = React.useMemo(
    () => createLegendPayload(primaryLegendKeys, "line"),
    []
  )

  return (
    <Card>
      <CardHeader className="border-b-0 px-5 pt-5 pb-0">
        <div className="flex items-center gap-1 text-sm font-medium text-foreground">
          <span className="truncate">{title}</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 group-data-[size=sm]/card:p-4 px-5 pb-5 pt-2">
        <ChartMetric value={value} label={metricLabel}>
          <p className="text-muted-foreground text-pretty">{detail}</p>
        </ChartMetric>

        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[260px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              interval={xAxis ? 0 : "preserveStartEnd"}
              angle={xAxis?.angle}
              textAnchor={xAxis ? "end" : undefined}
              height={xAxis?.height}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 100]}
            />
            <ChartTooltip
              content={
                showClickBreakdown ? (
                  <ClickThroughTooltipContent
                    campaignName={campaignName}
                    compareName={comparison?.campaignName}
                    metricLabel={metricLabel}
                  />
                ) : comparison ? (
                  <ChartTooltipGroupedContent
                    primaryTitle={campaignName}
                    compareTitle={comparison.campaignName}
                  />
                ) : (
                  <ChartTooltipContent />
                )
              }
            />
            <ChartLegend
              content={() =>
                comparison ? (
                  <CampaignStatsGroupedLegend
                    primaryTitle={campaignName}
                    compareTitle={comparison.campaignName}
                    primaryPayload={createLegendPayload(primaryLegendKeys, "line")}
                    comparePayload={createLegendPayload(compareLegendKeys, "line")}
                  />
                ) : (
                  <ChartLegendContent payload={legendPayload} />
                )
              }
            />

            <Line
              dataKey="rate"
              type="monotone"
              stroke="var(--color-rate)"
              strokeWidth={2}
              dot={false}
            />
            {comparison ? (
              <Line
                dataKey="compareRate"
                type="monotone"
                stroke="var(--color-compareRate)"
                strokeWidth={2}
                strokeDasharray="6 4"
                dot={false}
              />
            ) : null}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

