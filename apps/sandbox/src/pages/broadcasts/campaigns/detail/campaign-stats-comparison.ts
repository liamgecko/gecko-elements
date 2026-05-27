import type { CampaignStatsView } from "./campaign-stats-types"

function seeded(seed: number) {
  const x = Math.sin(seed * 12_989.989) * 43_758.545
  return x - Math.floor(x)
}

export function campaignComparisonSeed(campaignId: string) {
  return campaignId.split("").reduce((acc, char, index) => {
    return acc + char.charCodeAt(0) * (index + 1) * 31
  }, 0)
}

function scaleComparisonValue(value: number, index: number, seed: number) {
  if (value <= 0) return 0
  const factor = 0.55 + seeded(seed + index * 17) * 0.9
  return Math.max(1, Math.round(value * factor))
}

export function applyCampaignComparison(
  stats: CampaignStatsView,
  compareCampaignId: string,
  compareCampaignName: string
): CampaignStatsView {
  const seed = campaignComparisonSeed(compareCampaignId)

  const deliveryData = stats.delivery.data.map((point, index) => ({
    ...point,
    compareDelivered: scaleComparisonValue(point.delivered, index, seed),
    compareUndelivered: scaleComparisonValue(point.undelivered, index, seed + 1),
    compareFailed: scaleComparisonValue(point.failed, index, seed + 2),
  }))

  const deliveryYMax = Math.max(
    0,
    ...deliveryData.map(
      (point) =>
        Math.max(
          point.delivered + point.undelivered + point.failed,
          (point.compareDelivered ?? 0) +
            (point.compareUndelivered ?? 0) +
            (point.compareFailed ?? 0)
        )
    )
  )

  return {
    ...stats,
    comparison: {
      campaignId: compareCampaignId,
      campaignName: compareCampaignName,
    },
    delivery: {
      ...stats.delivery,
      data: deliveryData,
      yMax: Math.ceil(deliveryYMax / 50) * 50 || 50,
    },
    failureReasons: {
      ...stats.failureReasons,
      data: stats.failureReasons.data.map((point, index) => ({
        ...point,
        compareCount: scaleComparisonValue(point.count, index, seed + 10),
      })),
    },
    engagement: {
      ...stats.engagement,
      data: stats.engagement.data.map((point, index) => ({
        ...point,
        compareReadOpen: Math.min(
          100,
          scaleComparisonValue(point.readOpen, index, seed + 20)
        ),
        compareUniqueClick: Math.min(
          100,
          scaleComparisonValue(point.uniqueClick, index, seed + 21)
        ),
        compareReply: Math.min(
          100,
          scaleComparisonValue(point.reply, index, seed + 22)
        ),
      })),
    },
    optOuts: {
      ...stats.optOuts,
      data: stats.optOuts.data.map((point, index) => ({
        ...point,
        compareOptOuts: scaleComparisonValue(point.optOuts, index, seed + 30),
      })),
    },
    conversion: {
      ...stats.conversion,
      data: stats.conversion.data.map((point, index) => ({
        ...point,
        compareConversions: scaleComparisonValue(
          point.conversions,
          index,
          seed + 40
        ),
      })),
    },
  }
}
