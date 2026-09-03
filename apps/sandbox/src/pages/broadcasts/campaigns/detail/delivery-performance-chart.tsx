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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  CampaignStatsGroupedLegend,
  createLegendPayload,
} from "./campaign-stats-grouped-legend"
import type {
  CampaignStatsComparison,
  CampaignStatsDeliveryPoint,
  CampaignStatsTimeSeriesAxis,
} from "./campaign-stats-types"

const primaryLegendKeys = ["delivered", "undelivered", "failed"] as const
const compareLegendKeys = [
  "compareDelivered",
  "compareUndelivered",
  "compareFailed",
] as const

type DeliveryPerformanceChartProps = {
  data: CampaignStatsDeliveryPoint[]
  deliveryRate: string
  deliveryDetail: string
  campaignName: string
  yMax: number
  xAxis?: CampaignStatsTimeSeriesAxis
  comparison?: CampaignStatsComparison
}

export function DeliveryPerformanceChart({
  data,
  deliveryRate,
  deliveryDetail,
  campaignName,
  yMax,
  xAxis,
  comparison,
}: DeliveryPerformanceChartProps) {
  const chartConfig = React.useMemo(() => {
    const config = {
      delivered: {
        label: "Delivered",
        color: "var(--chart-1)",
      },
      undelivered: {
        label: "Undelivered",
        color: "var(--chart-2)",
      },
      failed: {
        label: "Failed",
        color: "var(--chart-3)",
      },
    } satisfies ChartConfig

    if (!comparison) return config

    return {
      ...config,
      compareDelivered: {
        label: "Delivered",
        color: "var(--chart-4)",
      },
      compareUndelivered: {
        label: "Undelivered",
        color: "var(--chart-5)",
      },
      compareFailed: {
        label: "Failed",
        color: "var(--chart-3)",
      },
    } satisfies ChartConfig
  }, [comparison])

  const legendPayload = React.useMemo(
    () => createLegendPayload(primaryLegendKeys),
    []
  )

  return (
    <Card>
      <CardHeader className="border-b-0 px-5 pt-5 pb-0">
        <div className="flex items-center gap-1 text-sm font-medium text-foreground">
          <span className="truncate">Delivery performance</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 group-data-[size=sm]/card:p-4 px-5 pb-5 pt-2">
        <ChartMetric
          value={deliveryRate}
          label={`delivery rate · ${deliveryDetail}`}
        />

        <ChartContainer
          title="Delivery performance"
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
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, yMax]}
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
                    primaryPayload={createLegendPayload(primaryLegendKeys)}
                    comparePayload={createLegendPayload(compareLegendKeys)}
                  />
                ) : (
                  <ChartLegendContent payload={legendPayload} />
                )
              }
            />
            <Bar
              dataKey="delivered"
              stackId="primary"
              fill="var(--color-delivered)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="undelivered"
              stackId="primary"
              fill="var(--color-undelivered)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="failed"
              stackId="primary"
              fill="var(--color-failed)"
              radius={[4, 4, 0, 0]}
            />
            {comparison ? (
              <>
                <Bar
                  dataKey="compareDelivered"
                  stackId="compare"
                  fill="var(--color-compareDelivered)"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="compareUndelivered"
                  stackId="compare"
                  fill="var(--color-compareUndelivered)"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="compareFailed"
                  stackId="compare"
                  fill="var(--color-compareFailed)"
                  radius={[4, 4, 0, 0]}
                />
              </>
            ) : null}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
