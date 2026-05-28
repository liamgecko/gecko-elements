export type CampaignStatsPresetId =
  | "today"
  | "past-7-days"
  | "past-4-weeks"
  | "past-12-weeks"
  | "custom"

export type CampaignStatsSummaryMetric = {
  title: string
  value: string
  detail: string
  description: string
}

export type CampaignStatsComparison = {
  campaignId: string
  campaignName: string
}

export type CampaignStatsDeliveryPoint = {
  day: string
  delivered: number
  undelivered: number
  failed: number
  compareDelivered?: number
  compareUndelivered?: number
  compareFailed?: number
}

export type CampaignStatsEngagementPoint = {
  day: string
  readOpen: number
  uniqueClick: number
  reply: number
  compareReadOpen?: number
  compareUniqueClick?: number
  compareReply?: number
}

export type CampaignStatsRatePoint = {
  day: string
  rate: number
  compareRate?: number
  breakdown?: {
    url: string
    clicks: number
    compareClicks?: number
  }[]
}

export type CampaignStatsConversionPoint = {
  day: string
  conversions: number
  compareConversions?: number
}

export type CampaignStatsFailureReason = {
  reason: string
  count: number
  compareCount?: number
}

export type CampaignStatsClickRow = {
  link: string
  uniqueClicks: number
  totalClicks: number
}

export type CampaignStatsOptOutPoint = {
  hour: number
  optOuts: number
  compareOptOuts?: number
}

export type CampaignStatsTimeSeriesAxis = {
  angle: number
  height: number
}

export type CampaignStatsView = {
  summary: CampaignStatsSummaryMetric[]
  comparison?: CampaignStatsComparison
  timeSeriesAxis?: CampaignStatsTimeSeriesAxis
  openRate: {
    rate: string
    detail: string
    data: CampaignStatsRatePoint[]
  }
  engagementRate: {
    rate: string
    detail: string
    data: CampaignStatsRatePoint[]
  }
  clickThroughRate: {
    rate: string
    detail: string
    data: CampaignStatsRatePoint[]
  }
  delivery: {
    rate: string
    detail: string
    data: CampaignStatsDeliveryPoint[]
    yMax: number
  }
  failureReasons: {
    total: number
    percentOfSent: string
    data: CampaignStatsFailureReason[]
  }
  engagement: {
    rate: string
    detail: string
    data: CampaignStatsEngagementPoint[]
  }
  clickPerformance: {
    uniqueClicks: number
    totalClicks: number
    rows: CampaignStatsClickRow[]
  }
  optOuts: {
    total: number
    percentOfDelivered: string
    data: CampaignStatsOptOutPoint[]
  }
  conversion: {
    total: number
    rate: string
    data: CampaignStatsConversionPoint[]
  }
}
