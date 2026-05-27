"use client"

import * as React from "react"

import {
  ChartContainer,
  ChartLegend,
  ChartMetric,
  ChartTooltip,
  ChartTooltipContent,
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
  CampaignStatsOptOutPoint,
} from "./campaign-stats-types"

type OptOutsAfterSendChartProps = {
  data: CampaignStatsOptOutPoint[]
  total: number
  percentOfDelivered: string
  campaignName: string
  comparison?: CampaignStatsComparison
}

export function OptOutsAfterSendChart({
  data,
  total,
  percentOfDelivered,
  campaignName,
  comparison,
}: OptOutsAfterSendChartProps) {
  const chartConfig = React.useMemo(() => {
    const config = {
      optOuts: {
        label: "Opt-outs",
        color: "var(--chart-1)",
      },
    } satisfies ChartConfig

    if (!comparison) return config

    return {
      ...config,
      compareOptOuts: {
        label: "Opt-outs",
        color: "var(--chart-2)",
      },
    } satisfies ChartConfig
  }, [comparison])

  return (
    <Card>
      <CardHeader className="border-b-0 px-5 pt-5 pb-0">
        <div className="flex items-center gap-1 text-sm font-medium text-foreground">
          <span className="truncate">Opt-outs after send</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 group-data-[size=sm]/card:p-4 px-5 pb-5 pt-2">
        <ChartMetric value={total.toLocaleString()} label="opt-outs within 24h">
          <p className="text-muted-foreground text-pretty">
            {percentOfDelivered} of delivered recipients
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
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(v) => `${v}h`}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {comparison ? (
              <ChartLegend
                content={() => (
                  <CampaignStatsGroupedLegend
                    primaryTitle={campaignName}
                    compareTitle={comparison.campaignName}
                    primaryPayload={createLegendPayload(["optOuts"])}
                    comparePayload={createLegendPayload(["compareOptOuts"])}
                  />
                )}
              />
            ) : null}
            <Bar
              dataKey="optOuts"
              fill="var(--color-optOuts)"
              radius={4}
            />
            {comparison ? (
              <Bar
                dataKey="compareOptOuts"
                fill="var(--color-compareOptOuts)"
                radius={4}
              />
            ) : null}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
