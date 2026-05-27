"use client"

import { ChartMetric } from "@gecko/ui/components/chart"
import { Card, CardContent, CardHeader } from "@gecko/ui/components/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@gecko/ui/components/table"

import type { CampaignStatsClickRow } from "./campaign-stats-types"

type ClickPerformanceChartProps = {
  rows: CampaignStatsClickRow[]
  uniqueClicks: number
  totalClicks: number
}

export function ClickPerformanceChart({
  rows,
  uniqueClicks,
  totalClicks,
}: ClickPerformanceChartProps) {
  return (
    <Card>
      <CardHeader className="border-b-0 px-5 pt-5 pb-0">
        <div className="flex items-center gap-1 text-sm font-medium text-foreground">
          <span className="truncate">Click performance</span>
        </div>
      </CardHeader>

      <CardContent className="p-4 group-data-[size=sm]/card:p-4 px-5 pb-5 pt-2">
        <ChartMetric
          value={uniqueClicks.toLocaleString()}
          label="unique clicks"
        >
          <p className="text-muted-foreground text-pretty">
            {totalClicks.toLocaleString()} total clicks
          </p>
        </ChartMetric>

        <div className="mt-2 overflow-hidden rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Link</TableHead>
                <TableHead className="w-1 text-end whitespace-nowrap">
                  Unique clicks
                </TableHead>
                <TableHead className="w-1 text-end whitespace-nowrap">
                  Total clicks
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.link}>
                  <TableCell>{row.link}</TableCell>
                  <TableCell className="w-1 text-end font-medium whitespace-nowrap">
                    {row.uniqueClicks.toLocaleString()}
                  </TableCell>
                  <TableCell className="w-1 text-end font-medium whitespace-nowrap">
                    {row.totalClicks.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
