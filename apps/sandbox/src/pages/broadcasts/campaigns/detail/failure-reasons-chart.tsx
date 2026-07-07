import * as React from "react"

import {
  ChartContainer,
  ChartLegend,
  ChartMetric,
  ChartTooltip,
  ChartTooltipContent,
  ChartTooltipGroupedContent,
  ChartXAxisTickLabel,
  type ChartConfig,
} from "@gecko/ui/components/chart"
import { Card, CardContent, CardHeader } from "@gecko/ui/components/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  CampaignStatsGroupedLegend,
  createLegendPayload,
} from "./campaign-stats-grouped-legend"
import type {
  CampaignStatsComparison,
  CampaignStatsFailureReason,
} from "./campaign-stats-types"

type FailureReasonsChartProps = {
  data: CampaignStatsFailureReason[]
  total: number
  percentOfSent: string
  campaignName: string
  comparison?: CampaignStatsComparison
}

export function FailureReasonsChart({
  data,
  total,
  percentOfSent,
  campaignName,
  comparison,
}: FailureReasonsChartProps) {
  const chartConfig = React.useMemo(() => {
    const config = {
      count: {
        label: "Messages",
        color: "var(--chart-1)",
      },
    } satisfies ChartConfig

    if (!comparison) return config

    return {
      ...config,
      compareCount: {
        label: "Messages",
        color: "var(--chart-2)",
      },
    } satisfies ChartConfig
  }, [comparison])

  return (
    <Card>
      <CardHeader className="border-b-0 px-5 pt-5 pb-0">
        <div className="flex items-center gap-1 text-sm font-medium text-foreground">
          <span className="truncate">Failure reasons</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 group-data-[size=sm]/card:p-4 px-5 pb-5 pt-2">
        <ChartMetric
          value={total.toLocaleString()}
          label="failed or undelivered"
        >
          <p className="text-muted-foreground text-pretty">
            {percentOfSent} of sent messages
          </p>
        </ChartMetric>

        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[260px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="reason"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              interval={0}
              height={54}
              tick={(tickProps) => (
                <ChartXAxisTickLabel
                  {...tickProps}
                  maxLines={2}
                  maxCharsPerLine={12}
                  lineHeight={13}
                />
              )}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
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
            {comparison ? (
              <ChartLegend
                content={() => (
                  <CampaignStatsGroupedLegend
                    primaryTitle={campaignName}
                    compareTitle={comparison.campaignName}
                    primaryPayload={createLegendPayload(["count"])}
                    comparePayload={createLegendPayload(["compareCount"])}
                  />
                )}
              />
            ) : null}
            <Bar
              dataKey="count"
              fill="var(--color-count)"
              radius={[4, 4, 0, 0]}
            />
            {comparison ? (
              <Bar
                dataKey="compareCount"
                fill="var(--color-compareCount)"
                radius={[4, 4, 0, 0]}
              />
            ) : null}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
