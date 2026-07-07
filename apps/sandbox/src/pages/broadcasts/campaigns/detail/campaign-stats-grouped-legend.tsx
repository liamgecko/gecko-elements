import { ChartLegendGroupedContent } from "@gecko/ui/components/chart"

type LegendPayloadItem = {
  value: string
  dataKey: string
  type: "line" | "square"
  color: string
}

export function createLegendPayload(
  keys: readonly string[],
  type: "line" | "square" = "square"
): LegendPayloadItem[] {
  return keys.map((key) => ({
    value: key,
    dataKey: key,
    type,
    color: `var(--color-${key})`,
  }))
}

type CampaignStatsGroupedLegendProps = {
  primaryTitle: string
  compareTitle: string
  primaryPayload: LegendPayloadItem[]
  comparePayload: LegendPayloadItem[]
}

export function CampaignStatsGroupedLegend({
  primaryTitle,
  compareTitle,
  primaryPayload,
  comparePayload,
}: CampaignStatsGroupedLegendProps) {
  return (
    <ChartLegendGroupedContent
      groups={[
        { title: primaryTitle, payload: primaryPayload },
        { title: compareTitle, payload: comparePayload },
      ]}
    />
  )
}
