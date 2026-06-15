const MS_HOUR = 60 * 60 * 1000
const MS_DAY = 24 * MS_HOUR

const CLICK_LINKS = [
  "Webinar registration button",
  "Course page in message",
  "Funding information",
  "Student portal link",
] as const

const FAILURE_REASON_KEYS = [
  "Invalid number",
  "Missing consent",
  "WhatsApp unavailable",
  "Provider error",
  "Blocked",
] as const

const OPT_OUT_HOURS = [0, 1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24] as const

function seeded(seed: number, campaignSeed = 0) {
  const x = Math.sin((seed + campaignSeed * 1000) * 12_989.989) * 43_758.545
  return x - Math.floor(x)
}

function startOfDay(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function startOfHour(date: Date) {
  const d = new Date(date)
  d.setMinutes(0, 0, 0)
  return d
}

export type CampaignStatsDailyRecord = {
  date: Date
  sent: number
  delivered: number
  undelivered: number
  failed: number
  uniqueOpens: number
  engagedRecipients: number
  uniqueLinkClicks: number
  conversions: number
  accountAverageConversions: number
  failureReasons: Record<(typeof FAILURE_REASON_KEYS)[number], number>
  clicks: Record<
    (typeof CLICK_LINKS)[number],
    { uniqueClicks: number; totalClicks: number }
  >
  optOutsByHour: Record<number, { campaign: number; accountAverage: number }>
}

export type CampaignStatsHourlyRecord = {
  date: Date
  delivered: number
  undelivered: number
  failed: number
  readOpen: number
  uniqueClick: number
  reply: number
  conversions: number
  accountAverageConversions: number
}

function buildOptOutsByHour(dayIndex: number, campaignSeed: number) {
  const buckets: CampaignStatsDailyRecord["optOutsByHour"] = {}
  for (const hour of OPT_OUT_HOURS) {
    const seed = dayIndex * 100 + hour
    buckets[hour] = {
      campaign: Math.round(1 + seeded(seed, campaignSeed) * 6),
      accountAverage: Math.round(2 + seeded(seed + 0.3, campaignSeed) * 5),
    }
  }
  return buckets
}

function buildFailureReasons(dayIndex: number, campaignSeed: number) {
  const buckets = {} as CampaignStatsDailyRecord["failureReasons"]
  for (const [i, reason] of FAILURE_REASON_KEYS.entries()) {
    buckets[reason] = Math.round(8 + seeded(dayIndex * 17 + i, campaignSeed) * 28)
  }
  return buckets
}

function buildClicks(dayIndex: number, campaignSeed: number) {
  const buckets = {} as CampaignStatsDailyRecord["clicks"]
  for (const [i, link] of CLICK_LINKS.entries()) {
    const unique = Math.round(12 + seeded(dayIndex * 31 + i, campaignSeed) * 48)
    const total = Math.round(
      unique * (1.25 + seeded(dayIndex * 41 + i, campaignSeed) * 0.45),
    )
    buckets[link] = { uniqueClicks: unique, totalClicks: total }
  }
  return buckets
}

function buildDailyRecord(
  date: Date,
  dayIndex: number,
  campaignSeed: number,
): CampaignStatsDailyRecord {
  const sent = Math.round(520 + seeded(dayIndex, campaignSeed) * 280)
  const failed = Math.round(sent * (0.04 + seeded(dayIndex + 1, campaignSeed) * 0.03))
  const undelivered = Math.round(
    sent * (0.03 + seeded(dayIndex + 2, campaignSeed) * 0.025),
  )
  const delivered = sent - failed - undelivered
  const uniqueOpens = Math.round(
    delivered * (0.62 + seeded(dayIndex + 3, campaignSeed) * 0.18),
  )
  const engagedRecipients = Math.round(
    delivered * (0.18 + seeded(dayIndex + 4, campaignSeed) * 0.14),
  )
  const uniqueLinkClicks = Math.round(
    delivered * (0.06 + seeded(dayIndex + 5, campaignSeed) * 0.08),
  )
  const conversions = Math.round(
    delivered * (0.03 + seeded(dayIndex + 6, campaignSeed) * 0.04),
  )
  const accountAverageConversions = Math.round(
    conversions * (0.9 + seeded(dayIndex + 7, campaignSeed) * 0.25),
  )

  return {
    date,
    sent,
    delivered,
    undelivered,
    failed,
    uniqueOpens,
    engagedRecipients,
    uniqueLinkClicks,
    conversions,
    accountAverageConversions,
    failureReasons: buildFailureReasons(dayIndex, campaignSeed),
    clicks: buildClicks(dayIndex, campaignSeed),
    optOutsByHour: buildOptOutsByHour(dayIndex, campaignSeed),
  }
}

export function buildHourlyRecord(
  date: Date,
  hourIndex: number,
  campaignSeed = 0,
): CampaignStatsHourlyRecord {
  const seed = hourIndex + date.getTime() / MS_HOUR
  const delivered = Math.round(18 + seeded(seed, campaignSeed) * 42)
  const failed = Math.round(delivered * (0.04 + seeded(seed + 1, campaignSeed) * 0.04))
  const undelivered = Math.round(
    delivered * (0.03 + seeded(seed + 2, campaignSeed) * 0.03),
  )

  return {
    date,
    delivered,
    undelivered,
    failed,
    readOpen: Math.round(38 + seeded(seed + 3, campaignSeed) * 28),
    uniqueClick: Math.round(18 + seeded(seed + 4, campaignSeed) * 18),
    reply: Math.round(6 + seeded(seed + 5, campaignSeed) * 12),
    conversions: Math.round(4 + seeded(seed + 6, campaignSeed) * 14),
    accountAverageConversions: Math.round(5 + seeded(seed + 7, campaignSeed) * 12),
  }
}

export type CampaignStatsDataset = {
  daily: CampaignStatsDailyRecord[]
  hourly: CampaignStatsHourlyRecord[]
  start: Date
  end: Date
  campaignSeed?: number
}

export function generateMockDataset(campaignSeed = 0): CampaignStatsDataset {
  const end = startOfDay(new Date())
  const start = new Date(end)
  start.setMonth(start.getMonth() - 3)

  const daily: CampaignStatsDailyRecord[] = []
  let dayIndex = 0
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    daily.push(buildDailyRecord(new Date(d), dayIndex, campaignSeed))
    dayIndex += 1
  }

  const hourly: CampaignStatsHourlyRecord[] = []
  const now = new Date()
  const todayStart = startOfDay(now)
  const todayDayIndex = daily.length - 1

  for (let hour = 0; hour < 24; hour += 1) {
    const date = new Date(todayStart)
    date.setHours(hour, 0, 0, 0)
    hourly.push(buildHourlyRecord(date, todayDayIndex * 24 + hour, campaignSeed))
  }

  for (let h = 71; h >= 0; h -= 1) {
    const date = startOfHour(new Date(now.getTime() - h * MS_HOUR))
    const exists = hourly.some((row) => row.date.getTime() === date.getTime())
    if (!exists) {
      hourly.push(buildHourlyRecord(date, 71 - h, campaignSeed))
    }
  }

  hourly.sort((a, b) => a.date.getTime() - b.date.getTime())

  return { daily, hourly, end, start, campaignSeed }
}

export const campaignStatsMockDataset = generateMockDataset(0)

export const CAMPAIGN_STATS_DATA_START = campaignStatsMockDataset.start
export const CAMPAIGN_STATS_DATA_END = campaignStatsMockDataset.end
