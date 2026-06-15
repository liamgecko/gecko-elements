import * as React from "react"
import type { DateRange } from "react-day-picker"
import { useParams } from "react-router-dom"
import { CheckCheck, ListFilterPlus } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import { DatePicker } from "@gecko/ui/components/date-picker"
import { MetricCard } from "@gecko/ui/components/metric-card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu"

import { DeliveryPerformanceChart } from "./delivery-performance-chart"
import { ClickPerformanceChart } from "./click-performance-chart"
import { ConversionOverTimeChart } from "./conversion-over-time-chart"
import { EngagementOverTimeChart } from "./engagement-over-time-chart"
import { FailureReasonsChart } from "./failure-reasons-chart"
import { OptOutsAfterSendChart } from "./opt-outs-after-send-chart"
import { CampaignCompareDropdown } from "./campaign-compare-dropdown"
import {
  getCampaignStatsForRange,
  rangeForPreset,
} from "./campaign-stats-filter"
import { applyCampaignComparison } from "./campaign-stats-comparison"
import { useBroadcastCampaign } from "@/hooks/useBroadcastCampaign"
import { useBroadcastCampaigns } from "@/hooks/useBroadcastCampaigns"
import {
  DataLoadErrorAlert,
  SupabaseSetupNotice,
} from "@/components/supabase-setup-notice"
import type { CampaignStatsPresetId } from "./campaign-stats-types"

const DATE_PRESETS: {
  id: Exclude<CampaignStatsPresetId, "custom">
  label: string
}[] = [
  { id: "today", label: "Today" },
  { id: "past-7-days", label: "Past 7 days" },
  { id: "past-4-weeks", label: "Past 4 weeks" },
  { id: "past-12-weeks", label: "Past 12 weeks" },
]

function labelForPreset(preset: CampaignStatsPresetId) {
  if (preset === "custom") return "Custom date range"
  return DATE_PRESETS.find((option) => option.id === preset)?.label ?? "Filter"
}

function formatDateRange(range: DateRange | undefined) {
  if (!range?.from || !range?.to) return "Select date range"
  const from = range.from.toLocaleDateString()
  const to = range.to.toLocaleDateString()
  return `${from} - ${to}`
}

export default function BroadcastCampaignStatsPage() {
  const { campaignId = "" } = useParams()
  const { campaign, loading, error, configured } = useBroadcastCampaign(campaignId)
  const { campaigns: allCampaigns } = useBroadcastCampaigns()
  const campaignName = campaign?.name ?? "This campaign"

  const [filterOpen, setFilterOpen] = React.useState(false)
  const [preset, setPreset] = React.useState<CampaignStatsPresetId>("past-7-days")
  const [range, setRange] = React.useState<DateRange | undefined>(() =>
    rangeForPreset("past-7-days", new Date())
  )
  const [appliedRange, setAppliedRange] = React.useState<DateRange | undefined>(
    () => rangeForPreset("past-7-days", new Date())
  )
  const [appliedPreset, setAppliedPreset] =
    React.useState<CampaignStatsPresetId>("past-7-days")
  const [hasPendingSelection, setHasPendingSelection] = React.useState(false)
  const [compareCampaignId, setCompareCampaignId] = React.useState<string | null>(
    null
  )

  const stats = React.useMemo(() => {
    if (!campaign) return null

    const primary = getCampaignStatsForRange(
      appliedRange,
      appliedPreset,
      campaign.statsDataset,
    )
    if (!compareCampaignId) return primary

    const compareCampaign = allCampaigns.find(
      (item) => item.id === compareCampaignId,
    )
    if (!compareCampaign) return primary

    return applyCampaignComparison(
      primary,
      compareCampaign.id,
      compareCampaign.name,
    )
  }, [allCampaigns, appliedPreset, appliedRange, campaign, compareCampaignId])

  const filterTriggerLabel = labelForPreset(preset)

  function applyFilter() {
    if (preset === "custom") return
    if (!range?.from || !range?.to) return
    setAppliedRange({ from: range.from, to: range.to })
    setAppliedPreset(preset)
    setHasPendingSelection(false)
  }

  const canApplyFilter = hasPendingSelection && preset !== "custom"

  if (!configured) {
    return <SupabaseSetupNotice />
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading campaign stats…</p>
  }

  if (error) {
    return (
      <DataLoadErrorAlert title="Could not load campaign stats" message={error} />
    )
  }

  if (!stats) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
        <DropdownMenu open={filterOpen} onOpenChange={setFilterOpen}>
          <DropdownMenuTrigger
            nativeButton={false}
            render={
              <Button variant="outline" size="sm">
                <ListFilterPlus aria-hidden />
                {filterTriggerLabel}
              </Button>
            }
          />
          <DropdownMenuContent align="start">
            <DropdownMenuRadioGroup
              value={preset}
              onValueChange={(value) => {
                const nextPreset = value as CampaignStatsPresetId
                setPreset(nextPreset)
                setHasPendingSelection(true)
                if (nextPreset !== "custom") {
                  setRange(rangeForPreset(nextPreset, new Date()))
                }
                setFilterOpen(false)
              }}
            >
              {DATE_PRESETS.map((option) => (
                <DropdownMenuRadioItem key={option.id} value={option.id}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={preset}
              onValueChange={(value) => {
                setPreset(value as CampaignStatsPresetId)
                setHasPendingSelection(true)
                setFilterOpen(false)
              }}
            >
              <DropdownMenuRadioItem value="custom">
                Custom date range
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {preset === "custom" ? (
          <div>
            <DatePicker
              mode="range"
              trigger="button"
              buttonSize="sm"
              buttonFullWidth={false}
              calendarIconPosition="start"
              value={range}
              onChange={setRange}
              numberOfMonths={2}
              placeholder={formatDateRange(range)}
            />
          </div>
        ) : null}

        <Button size="sm" onClick={applyFilter} disabled={!canApplyFilter}>
          <CheckCheck aria-hidden />
          Apply filter
        </Button>
        </div>

        <CampaignCompareDropdown
          value={compareCampaignId}
          onValueChange={setCompareCampaignId}
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        {stats.summary.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            detail={metric.detail}
            description={metric.description}
          />
        ))}
      </div>

      <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2 2xl:grid-cols-3">
        <DeliveryPerformanceChart
          data={stats.delivery.data}
          deliveryRate={stats.delivery.rate}
          deliveryDetail={stats.delivery.detail}
          campaignName={campaignName}
          yMax={stats.delivery.yMax}
          xAxis={stats.timeSeriesAxis}
          comparison={stats.comparison}
        />
        <FailureReasonsChart
          data={stats.failureReasons.data}
          total={stats.failureReasons.total}
          percentOfSent={stats.failureReasons.percentOfSent}
          campaignName={campaignName}
          comparison={stats.comparison}
        />
        <EngagementOverTimeChart
          data={stats.engagement.data}
          engagementRate={stats.engagement.rate}
          engagementDetail={stats.engagement.detail}
          campaignName={campaignName}
          xAxis={stats.timeSeriesAxis}
          comparison={stats.comparison}
        />
        <ClickPerformanceChart
          rows={stats.clickPerformance.rows}
          uniqueClicks={stats.clickPerformance.uniqueClicks}
          totalClicks={stats.clickPerformance.totalClicks}
        />
        <OptOutsAfterSendChart
          data={stats.optOuts.data}
          total={stats.optOuts.total}
          percentOfDelivered={stats.optOuts.percentOfDelivered}
          campaignName={campaignName}
          comparison={stats.comparison}
        />
        <ConversionOverTimeChart
          data={stats.conversion.data}
          total={stats.conversion.total}
          conversionRate={stats.conversion.rate}
          campaignName={campaignName}
          xAxis={stats.timeSeriesAxis}
          comparison={stats.comparison}
        />
      </div>
    </div>
  )
}
