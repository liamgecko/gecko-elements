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
  CampaignStatsEngagementPoint,
  CampaignStatsTimeSeriesAxis,
} from "./campaign-stats-types"

const primaryLegendKeys = ["readOpen", "uniqueClick", "reply"] as const
const compareLegendKeys = [
  "compareReadOpen",
  "compareUniqueClick",
  "compareReply",
] as const

type EngagementOverTimeChartProps = {
  data: CampaignStatsEngagementPoint[]
  engagementRate: string
  engagementDetail: string
  campaignName: string
  xAxis?: CampaignStatsTimeSeriesAxis
  comparison?: CampaignStatsComparison
}

export function EngagementOverTimeChart({
  data,
  engagementRate,
  engagementDetail,
  campaignName,
  xAxis,
  comparison,
}: EngagementOverTimeChartProps) {
  const chartConfig = React.useMemo(() => {
    const config = {
      readOpen: {
        label: "Read/open rate",
        color: "var(--chart-1)",
      },
      uniqueClick: {
        label: "Unique click rate",
        color: "var(--chart-2)",
      },
      reply: {
        label: "Reply rate",
        color: "var(--chart-3)",
      },
    } satisfies ChartConfig

    if (!comparison) return config

    return {
      ...config,
      compareReadOpen: {
        label: "Read/open rate",
        color: "var(--chart-4)",
      },
      compareUniqueClick: {
        label: "Unique click rate",
        color: "var(--chart-5)",
      },
      compareReply: {
        label: "Reply rate",
        color: "var(--chart-3)",
      },
    } satisfies ChartConfig
  }, [comparison])

  const legendPayload = React.useMemo(
    () => createLegendPayload(primaryLegendKeys, "line"),
    []
  )

  return (
    <Card>
      <CardHeader className="border-b-0 px-5 pt-5 pb-0">
        <div className="flex items-center gap-1 text-sm font-medium text-foreground">
          <span className="truncate">Engagement over time</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 group-data-[size=sm]/card:p-4 px-5 pb-5 pt-2">
        <ChartMetric value={engagementRate} label="engagement rate">
          <p className="text-muted-foreground text-pretty">{engagementDetail}</p>
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
                comparison ? (
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
              dataKey="readOpen"
              type="monotone"
              stroke="var(--color-readOpen)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="uniqueClick"
              type="monotone"
              stroke="var(--color-uniqueClick)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="reply"
              type="monotone"
              stroke="var(--color-reply)"
              strokeWidth={2}
              dot={false}
            />
            {comparison ? (
              <>
                <Line
                  dataKey="compareReadOpen"
                  type="monotone"
                  stroke="var(--color-compareReadOpen)"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  dot={false}
                />
                <Line
                  dataKey="compareUniqueClick"
                  type="monotone"
                  stroke="var(--color-compareUniqueClick)"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  dot={false}
                />
                <Line
                  dataKey="compareReply"
                  type="monotone"
                  stroke="var(--color-compareReply)"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  dot={false}
                />
              </>
            ) : null}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
