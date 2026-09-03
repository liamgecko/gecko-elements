import * as React from "react"

import {
  ChartContainer,
  ChartLegend,
  ChartMetric,
  ChartTooltip,
  ChartTooltipContent,
  ChartTooltipGroupedContent,
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
  CampaignStatsConversionPoint,
  CampaignStatsTimeSeriesAxis,
} from "./campaign-stats-types"

type ConversionOverTimeChartProps = {
  data: CampaignStatsConversionPoint[]
  total: number
  conversionRate: string
  campaignName: string
  xAxis?: CampaignStatsTimeSeriesAxis
  comparison?: CampaignStatsComparison
}

export function ConversionOverTimeChart({
  data,
  total,
  conversionRate,
  campaignName,
  xAxis,
  comparison,
}: ConversionOverTimeChartProps) {
  const chartConfig = React.useMemo(() => {
    const config = {
      conversions: {
        label: "Conversions",
        color: "var(--chart-1)",
      },
    } satisfies ChartConfig

    if (!comparison) return config

    return {
      ...config,
      compareConversions: {
        label: "Conversions",
        color: "var(--chart-2)",
      },
    } satisfies ChartConfig
  }, [comparison])

  return (
    <Card>
      <CardHeader className="border-b-0 px-5 pt-5 pb-0">
        <div className="flex items-center gap-1 text-sm font-medium text-foreground">
          <span className="truncate">Conversion over time</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 group-data-[size=sm]/card:p-4 px-5 pb-5 pt-2">
        <ChartMetric
          value={total.toLocaleString()}
          label={`conversions · ${conversionRate} conversion rate`}
        />

        <ChartContainer
          title="Conversions over time"
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
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              interval={xAxis ? 0 : "preserveStartEnd"}
              angle={xAxis?.angle}
              textAnchor={xAxis ? "end" : undefined}
              height={xAxis?.height}
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
                    primaryPayload={createLegendPayload(["conversions"])}
                    comparePayload={createLegendPayload(["compareConversions"])}
                  />
                )}
              />
            ) : null}
            <Bar
              dataKey="conversions"
              fill="var(--color-conversions)"
              radius={4}
            />
            {comparison ? (
              <Bar
                dataKey="compareConversions"
                fill="var(--color-compareConversions)"
                radius={4}
              />
            ) : null}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
