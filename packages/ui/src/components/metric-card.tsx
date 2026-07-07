import * as React from "react"
import {
  CircleHelp,
  CircleMinus,
  MoreHorizontal,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  type TooltipContentProps as RechartsTooltipContentProps,
} from "recharts"

import { Button } from "@gecko/ui/components/button"
import { Card, CardAction, CardContent, CardHeader } from "@gecko/ui/components/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@gecko/ui/components/tooltip"
import { cn } from "@gecko/ui/lib/utils"

export type MetricCardSentiment = "positive" | "negative" | "neutral"

export type MetricCardTrend = {
  direction: "up" | "down" | "neutral"
  sentiment: MetricCardSentiment
  label: React.ReactNode
  compareTo?: React.ReactNode
}

export type MetricCardSparklineDatum = {
  x: string | number
  y: number
}

export type MetricCardSparkline = {
  data: MetricCardSparklineDatum[]
  sentiment: MetricCardSentiment
  showTooltip?: boolean
  tooltipLabel?: React.ReactNode
  formatLabel?: (x: MetricCardSparklineDatum["x"]) => React.ReactNode
  formatValue?: (value: number) => React.ReactNode
}

export type MetricCardMenuItem = {
  id: string
  label: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
}

export type MetricCardProps = React.ComponentProps<"div"> & {
  title: React.ReactNode
  value: React.ReactNode
  /** Supporting label beside the value (e.g. "123 unique opens"). */
  detail?: React.ReactNode
  description?: React.ReactNode
  helpText?: React.ReactNode
  trend?: MetricCardTrend
  sparkline?: MetricCardSparkline
  menuItems?: MetricCardMenuItem[]
}

function sentimentTextClass(sentiment: MetricCardSentiment) {
  if (sentiment === "positive") return "text-emerald-600"
  if (sentiment === "negative") return "text-red-600"
  return "text-muted-foreground"
}

function sentimentStroke(sentiment: MetricCardSentiment) {
  if (sentiment === "positive") return "rgb(5 150 105)" // emerald-600
  if (sentiment === "negative") return "rgb(220 38 38)" // red-600
  return "rgb(107 114 128)" // gray-500
}

function MetricCardTitleRow({
  title,
  helpText,
  menuItems,
}: {
  title: React.ReactNode
  helpText?: React.ReactNode
  menuItems?: MetricCardMenuItem[]
}) {
  return (
    <CardHeader className="border-b-0 px-5 pt-5 pb-0">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1 text-sm font-medium text-foreground">
            <span className="truncate">{title}</span>
            {helpText ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Metric help"
                        className="size-5"
                      >
                        <CircleHelp className="size-3" aria-hidden strokeWidth={2.5}/>
                      </Button>
                    }
                  />
                  <TooltipContent side="top" className="max-w-xs">
                    {helpText}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}
          </div>
        </div>

        {menuItems?.length ? (
          <CardAction className="row-span-1">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label="Options"
                  >
                    <MoreHorizontal className="size-4" aria-hidden />
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-48">
                {menuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    disabled={item.disabled}
                    onClick={item.onSelect}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        ) : null}
      </div>
    </CardHeader>
  )
}

const metricCardInlineLabelClassName =
  "flex items-center gap-1.5 text-xs text-muted-foreground"

function MetricCardDetail({ detail }: { detail: React.ReactNode }) {
  return (
    <div className={metricCardInlineLabelClassName}>
      <span>{detail}</span>
    </div>
  )
}

function MetricCardTrendRow({ trend }: { trend: MetricCardTrend }) {
  const sentiment = trend.direction === "neutral" ? "neutral" : trend.sentiment
  const color = sentimentTextClass(sentiment)

  return (
    <div className={cn(metricCardInlineLabelClassName, color)}>
      {trend.direction === "up" ? (
        <TrendingUp className="size-3.5" aria-hidden />
      ) : trend.direction === "down" ? (
        <TrendingDown className="size-3.5" aria-hidden />
      ) : (
        <CircleMinus className="size-3.5" aria-hidden />
      )}
      <span className="font-medium">{trend.label}</span>
      {trend.compareTo ? (
        <span className="text-muted-foreground">{trend.compareTo}</span>
      ) : null}
    </div>
  )
}

function MetricCardSparklineTooltip({
  active,
  payload,
  labelText,
  formatValue,
}: Pick<RechartsTooltipContentProps, "active" | "payload"> & {
  labelText?: React.ReactNode
  formatValue?: (value: number) => React.ReactNode
}) {
  if (!active || !payload?.length) return null
  const v = payload[0]?.value
  if (typeof v !== "number") return null

  return (
    <div className="rounded-md border border-border bg-popover px-2 py-1 text-xs shadow-md text-foreground">
      {labelText ? <div className="text-muted-foreground">{labelText}</div> : null}
      <div className="font-medium tabular-nums">{formatValue ? formatValue(v) : v}</div>
    </div>
  )
}

function MetricCardSparklineChart({ sparkline }: { sparkline: MetricCardSparkline }) {
  const stroke = sentimentStroke(sparkline.sentiment)
  const gradientId = React.useId()
  const showTooltip = sparkline.showTooltip ?? true

  return (
    <div className="h-14 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sparkline.data} margin={{ top: 6, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity={0.22} />
              <stop offset="100%" stopColor={stroke} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showTooltip ? (
            <RechartsTooltip
              content={(p) => (
                <MetricCardSparklineTooltip
                  active={p.active}
                  payload={p.payload}
                  labelText={
                    sparkline.formatLabel
                      ? sparkline.formatLabel((p.payload?.[0]?.payload as MetricCardSparklineDatum | undefined)?.x ?? "")
                      : sparkline.tooltipLabel
                  }
                  formatValue={sparkline.formatValue}
                />
              )}
              cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
            />
          ) : (
            <RechartsTooltip content={() => null} cursor={false} />
          )}
          <Area
            type="monotone"
            dataKey="y"
            stroke={stroke}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            fillOpacity={1}
            dot={false}
            activeDot={
              showTooltip
                ? { r: 5, stroke: "hsl(var(--background))", strokeWidth: 2 }
                : false
            }
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function MetricCard({
  title,
  value,
  detail,
  description,
  helpText,
  trend,
  sparkline,
  menuItems,
  className,
  ...props
}: MetricCardProps) {
  return (
    <Card className={cn("rounded-md", className)} {...props}>
      <MetricCardTitleRow title={title} helpText={helpText} menuItems={menuItems} />

      <CardContent className={cn("px-5 pb-5 pt-2", sparkline && "pb-4")}>
        <div className="grid gap-4">
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-semibold tracking-tight text-foreground">
              {value}
            </div>
            {detail ? <MetricCardDetail detail={detail} /> : null}
            {trend ? <MetricCardTrendRow trend={trend} /> : null}
          </div>
          {description ? (
            <div className="text-xs text-muted-foreground text-pretty">
              {description}
            </div>
          ) : null}
        </div>

        {sparkline ? (
          <div className="mt-3">
            <MetricCardSparklineChart sparkline={sparkline} />
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

