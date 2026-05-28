import type { DateRange } from "react-day-picker"

import {
  buildHourlyRecord,
  campaignStatsMockDataset,
  type CampaignStatsDailyRecord,
  type CampaignStatsHourlyRecord,
} from "./campaign-stats-mock-data"
import type {
  CampaignStatsPresetId,
  CampaignStatsView,
} from "./campaign-stats-types"

type TimeSeriesLabelMode = "weekday" | "clock" | "short-date"

const MS_HOUR = 60 * 60 * 1000
const MS_DAY = 24 * MS_HOUR

function formatDayLabel(date: Date) {
  const weekday = date.toLocaleDateString(undefined, { weekday: "short" })
  const day = String(date.getDate()).padStart(2, "0")
  return `${weekday} ${day}`
}

function startOfDay(date: Date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function formatHourLabel(date: Date) {
  const hour = date.getHours() + 1
  return `${String(hour).padStart(2, "0")}:00`
}

function formatShortDateLabel(date: Date) {
  const day = date.getDate()
  const month = date.toLocaleDateString(undefined, { month: "short" })
  return `${day} ${month}`
}

function formatTimeSeriesLabel(date: Date, mode: TimeSeriesLabelMode) {
  if (mode === "clock") return formatHourLabel(date)
  if (mode === "short-date") return formatShortDateLabel(date)
  return formatDayLabel(date)
}

function isTodayView(from: Date, to: Date) {
  const todayStart = startOfDay(to)
  return (
    from.getTime() === todayStart.getTime() &&
    from.toDateString() === to.toDateString()
  )
}

function getTodayHourlyRows(): CampaignStatsHourlyRecord[] {
  const todayStart = startOfDay(new Date())
  const rowsByTime = new Map(
    campaignStatsMockDataset.hourly
      .filter((row) => row.date.getTime() >= todayStart.getTime())
      .map((row) => [row.date.getTime(), row] as const)
  )

  const todayDayIndex = campaignStatsMockDataset.daily.length - 1

  return Array.from({ length: 24 }, (_, hour) => {
    const date = new Date(todayStart)
    date.setHours(hour, 0, 0, 0)
    return (
      rowsByTime.get(date.getTime()) ??
      buildHourlyRecord(date, todayDayIndex * 24 + hour)
    )
  })
}

function formatPercent(value: number) {
  return `${Math.round(value)}%`
}

function formatNumber(value: number) {
  return value.toLocaleString()
}

function inRange(date: Date, from: Date, to: Date) {
  return date.getTime() >= from.getTime() && date.getTime() <= to.getTime()
}

function filterDaily(from: Date, to: Date) {
  return campaignStatsMockDataset.daily.filter((row) =>
    inRange(row.date, from, to)
  )
}

function weekStart(date: Date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

function aggregateDailyToWeekly(
  rows: CampaignStatsDailyRecord[]
): CampaignStatsDailyRecord[] {
  const groups = new Map<string, CampaignStatsDailyRecord[]>()

  for (const row of rows) {
    const key = weekStart(row.date).toISOString()
    const group = groups.get(key) ?? []
    group.push(row)
    groups.set(key, group)
  }

  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, group]) => {
      const merged = mergeDailyRecords(group)
      merged.date = weekStart(group[0]!.date)
      return merged
    })
}

const PAST_12_WEEKS = 12

function getPast12WeeksRows(from: Date, to: Date): CampaignStatsDailyRecord[] {
  const weekly = aggregateDailyToWeekly(filterDaily(from, to))
  return weekly.slice(-PAST_12_WEEKS)
}

function mergeDailyRecords(
  rows: CampaignStatsDailyRecord[]
): CampaignStatsDailyRecord {
  const first = rows[0]!
  const merged: CampaignStatsDailyRecord = {
    date: first.date,
    sent: 0,
    delivered: 0,
    undelivered: 0,
    failed: 0,
    uniqueOpens: 0,
    engagedRecipients: 0,
    uniqueLinkClicks: 0,
    conversions: 0,
    accountAverageConversions: 0,
    failureReasons: { ...first.failureReasons },
    clicks: { ...first.clicks },
    optOutsByHour: {},
  }

  for (const key of Object.keys(merged.failureReasons)) {
    merged.failureReasons[key as keyof typeof merged.failureReasons] = 0
  }
  for (const key of Object.keys(merged.clicks)) {
    merged.clicks[key as keyof typeof merged.clicks] = {
      uniqueClicks: 0,
      totalClicks: 0,
    }
  }

  for (const row of rows) {
    merged.sent += row.sent
    merged.delivered += row.delivered
    merged.undelivered += row.undelivered
    merged.failed += row.failed
    merged.uniqueOpens += row.uniqueOpens
    merged.engagedRecipients += row.engagedRecipients
    merged.uniqueLinkClicks += row.uniqueLinkClicks
    merged.conversions += row.conversions
    merged.accountAverageConversions += row.accountAverageConversions

    for (const [reason, count] of Object.entries(row.failureReasons)) {
      merged.failureReasons[reason as keyof typeof merged.failureReasons] +=
        count
    }

    for (const [link, counts] of Object.entries(row.clicks)) {
      merged.clicks[link as keyof typeof merged.clicks].uniqueClicks +=
        counts.uniqueClicks
      merged.clicks[link as keyof typeof merged.clicks].totalClicks +=
        counts.totalClicks
    }

    for (const [hour, counts] of Object.entries(row.optOutsByHour)) {
      const h = Number(hour)
      if (!merged.optOutsByHour[h]) {
        merged.optOutsByHour[h] = { campaign: 0, accountAverage: 0 }
      }
      merged.optOutsByHour[h].campaign += counts.campaign
      merged.optOutsByHour[h].accountAverage += counts.accountAverage
    }
  }

  return merged
}

function sumHourly(rows: CampaignStatsHourlyRecord[]) {
  return rows.reduce(
    (acc, row) => {
      const sent = row.delivered + row.undelivered + row.failed
      return {
        sent: acc.sent + sent,
        delivered: acc.delivered + row.delivered,
        undelivered: acc.undelivered + row.undelivered,
        failed: acc.failed + row.failed,
        uniqueOpens:
          acc.uniqueOpens + Math.round((row.delivered * row.readOpen) / 100),
        engagedRecipients:
          acc.engagedRecipients +
          Math.round((row.delivered * (row.uniqueClick + row.reply)) / 200),
        uniqueLinkClicks:
          acc.uniqueLinkClicks +
          Math.round((row.delivered * row.uniqueClick) / 100),
        conversions: acc.conversions + row.conversions,
        accountAverageConversions:
          acc.accountAverageConversions + row.accountAverageConversions,
      }
    },
    {
      sent: 0,
      delivered: 0,
      undelivered: 0,
      failed: 0,
      uniqueOpens: 0,
      engagedRecipients: 0,
      uniqueLinkClicks: 0,
      conversions: 0,
      accountAverageConversions: 0,
    }
  )
}

function sumDaily(rows: CampaignStatsDailyRecord[]) {
  return rows.reduce(
    (acc, row) => ({
      sent: acc.sent + row.sent,
      delivered: acc.delivered + row.delivered,
      undelivered: acc.undelivered + row.undelivered,
      failed: acc.failed + row.failed,
      uniqueOpens: acc.uniqueOpens + row.uniqueOpens,
      engagedRecipients: acc.engagedRecipients + row.engagedRecipients,
      uniqueLinkClicks: acc.uniqueLinkClicks + row.uniqueLinkClicks,
      conversions: acc.conversions + row.conversions,
      accountAverageConversions:
        acc.accountAverageConversions + row.accountAverageConversions,
    }),
    {
      sent: 0,
      delivered: 0,
      undelivered: 0,
      failed: 0,
      uniqueOpens: 0,
      engagedRecipients: 0,
      uniqueLinkClicks: 0,
      conversions: 0,
      accountAverageConversions: 0,
    }
  )
}

function buildSummary(totals: ReturnType<typeof sumDaily>): CampaignStatsView["summary"] {
  const openRate =
    totals.delivered > 0 ? (totals.uniqueOpens / totals.delivered) * 100 : 0
  const engagementRate =
    totals.delivered > 0
      ? (totals.engagedRecipients / totals.delivered) * 100
      : 0
  const clickThroughRate =
    totals.delivered > 0
      ? (totals.uniqueLinkClicks / totals.delivered) * 100
      : 0

  return [
    {
      title: "Open rate",
      value: formatPercent(openRate),
      detail: `${formatNumber(totals.uniqueOpens)} unique opens`,
      description: "% of delivered recipients who opened the message.",
    },
    {
      title: "Engagement rate",
      value: formatPercent(engagementRate),
      detail: `${formatNumber(totals.engagedRecipients)} contacts engaged`,
      description:
        "% of delivered recipients who clicked, replied, or otherwise engaged.",
    },
    {
      title: "Click through rate",
      value: formatPercent(clickThroughRate),
      detail: `${formatNumber(totals.uniqueLinkClicks)} unique clicks`,
      description:
        "% of delivered recipients who clicked at least one tracked link.",
    },
  ]
}

function buildRateSeries(
  rows: CampaignStatsDailyRecord[] | CampaignStatsHourlyRecord[],
  labelMode: TimeSeriesLabelMode,
  getRate: (row: CampaignStatsDailyRecord | CampaignStatsHourlyRecord) => number
) {
  return rows.map((row) => ({
    day: formatTimeSeriesLabel(row.date, labelMode),
    rate: Math.min(100, Math.max(0, Math.round(getRate(row)))),
  }))
}

function seeded(seed: number) {
  const x = Math.sin(seed * 12_989.989) * 43_758.545
  return x - Math.floor(x)
}

const DUMMY_CLICK_URLS = [
  "https://gecko.example/open-day",
  "https://gecko.example/courses",
  "https://gecko.example/apply",
  "https://gecko.example/contact",
] as const

function buildClickBreakdown(totalClicks: number, seed: number) {
  if (totalClicks <= 0) {
    return DUMMY_CLICK_URLS.map((url) => ({ url, clicks: 0 }))
  }

  const weights = DUMMY_CLICK_URLS.map((_, idx) => 0.2 + seeded(seed + idx * 37) * 0.8)
  const weightSum = weights.reduce((a, b) => a + b, 0)
  let remaining = totalClicks

  const clicks = weights.map((w, idx) => {
    if (idx === weights.length - 1) return remaining
    const value = Math.max(0, Math.round((w / weightSum) * totalClicks))
    remaining -= value
    return value
  })

  return DUMMY_CLICK_URLS.map((url, idx) => ({ url, clicks: clicks[idx] ?? 0 }))
}

function buildOpenRateChart(
  rows: CampaignStatsDailyRecord[] | CampaignStatsHourlyRecord[],
  labelMode: TimeSeriesLabelMode,
  totals: ReturnType<typeof sumDaily>
): CampaignStatsView["openRate"] {
  const openRate =
    totals.delivered > 0 ? (totals.uniqueOpens / totals.delivered) * 100 : 0

  return {
    rate: formatPercent(openRate),
    detail: `${formatNumber(totals.uniqueOpens)} unique opens`,
    data: buildRateSeries(rows, labelMode, (row) => {
      if (isHourlyRecord(row)) return row.readOpen
      const delivered = row.delivered || 1
      return (row.uniqueOpens / delivered) * 100
    }),
  }
}

function buildEngagementRateChart(
  rows: CampaignStatsDailyRecord[] | CampaignStatsHourlyRecord[],
  labelMode: TimeSeriesLabelMode,
  totals: ReturnType<typeof sumDaily>
): CampaignStatsView["engagementRate"] {
  const engagementRate =
    totals.delivered > 0
      ? (totals.engagedRecipients / totals.delivered) * 100
      : 0

  return {
    rate: formatPercent(engagementRate),
    detail: `${formatNumber(totals.engagedRecipients)} contacts engaged`,
    data: buildRateSeries(rows, labelMode, (row) => {
      if (isHourlyRecord(row)) return (row.uniqueClick + row.reply) / 2
      const delivered = row.delivered || 1
      return (row.engagedRecipients / delivered) * 100
    }),
  }
}

function buildClickThroughRateChart(
  rows: CampaignStatsDailyRecord[] | CampaignStatsHourlyRecord[],
  labelMode: TimeSeriesLabelMode,
  totals: ReturnType<typeof sumDaily>
): CampaignStatsView["clickThroughRate"] {
  const clickThroughRate =
    totals.delivered > 0
      ? (totals.uniqueLinkClicks / totals.delivered) * 100
      : 0

  return {
    rate: formatPercent(clickThroughRate),
    detail: `${formatNumber(totals.uniqueLinkClicks)} unique clicks`,
    data: rows.map((row, index) => {
      const day = formatTimeSeriesLabel(row.date, labelMode)

      const delivered = row.delivered || 1
      const rate = Math.min(
        100,
        Math.max(
          0,
          Math.round(
            isHourlyRecord(row)
              ? row.uniqueClick
              : (row.uniqueLinkClicks / delivered) * 100
          )
        )
      )

      const totalClicks = isHourlyRecord(row)
        ? Math.round((row.delivered * row.uniqueClick) / 100)
        : row.uniqueLinkClicks

      return {
        day,
        rate,
        breakdown: buildClickBreakdown(totalClicks, index * 97 + row.date.getTime()),
      }
    }),
  }
}

function buildDeliveryChart(
  rows: CampaignStatsDailyRecord[] | CampaignStatsHourlyRecord[],
  labelMode: TimeSeriesLabelMode
): CampaignStatsView["delivery"] {
  const data = rows.map((row) => {
    const label = formatTimeSeriesLabel(row.date, labelMode)
    return {
      label,
      delivered: row.delivered,
      undelivered: row.undelivered,
      failed: row.failed,
    }
  })

  const yMax = Math.max(
    0,
    ...data.map((point) => point.delivered + point.undelivered + point.failed)
  )
  const roundedMax = Math.ceil(yMax / 50) * 50 || 50

  const totals = rows.reduce(
    (acc, row) => ({
      sent: acc.sent + row.delivered + row.undelivered + row.failed,
      delivered: acc.delivered + row.delivered,
    }),
    { sent: 0, delivered: 0 }
  )

  const rate =
    totals.sent > 0 ? (totals.delivered / totals.sent) * 100 : 0

  return {
    rate: formatPercent(rate),
    detail: `${formatNumber(totals.delivered)} messages delivered from ${formatNumber(totals.sent)} sent.`,
    data: data.map((point) => ({
      day: point.label,
      delivered: point.delivered,
      undelivered: point.undelivered,
      failed: point.failed,
    })),
    yMax: roundedMax,
  }
}

function isHourlyRecord(
  row: CampaignStatsDailyRecord | CampaignStatsHourlyRecord
): row is CampaignStatsHourlyRecord {
  return "readOpen" in row
}

function buildEngagementChart(
  rows: CampaignStatsDailyRecord[] | CampaignStatsHourlyRecord[],
  labelMode: TimeSeriesLabelMode,
  totals: ReturnType<typeof sumDaily>
): CampaignStatsView["engagement"] {
  const data = rows.map((row) => {
    const label = formatTimeSeriesLabel(row.date, labelMode)

    if (isHourlyRecord(row)) {
      return {
        label,
        readOpen: row.readOpen,
        uniqueClick: row.uniqueClick,
        reply: row.reply,
      }
    }

    const delivered = row.delivered || 1
    return {
      label,
      readOpen: Math.round((row.uniqueOpens / delivered) * 100),
      uniqueClick: Math.round((row.uniqueLinkClicks / delivered) * 100),
      reply: Math.round((row.engagedRecipients / delivered) * 100 * 0.35),
    }
  })

  const engagementRate =
    totals.delivered > 0
      ? (totals.engagedRecipients / totals.delivered) * 100
      : 0

  return {
    rate: formatPercent(engagementRate),
    detail: `${formatNumber(totals.engagedRecipients)} engaged recipients`,
    data: data.map((point) => ({
      day: point.label,
      readOpen: point.readOpen,
      uniqueClick: point.uniqueClick,
      reply: point.reply,
    })),
  }
}

function buildConversionChart(
  rows: CampaignStatsDailyRecord[] | CampaignStatsHourlyRecord[],
  labelMode: TimeSeriesLabelMode,
  totals: ReturnType<typeof sumDaily>
): CampaignStatsView["conversion"] {
  const data = rows.map((row) => {
    const label = formatTimeSeriesLabel(row.date, labelMode)

    return {
      label,
      conversions: row.conversions,
    }
  })

  const rate =
    totals.delivered > 0 ? (totals.conversions / totals.delivered) * 100 : 0

  return {
    total: totals.conversions,
    rate: formatPercent(rate),
    data: data.map((point) => ({
      day: point.label,
      conversions: point.conversions,
    })),
  }
}

function buildFailureReasons(
  rows: CampaignStatsDailyRecord[],
  totals: ReturnType<typeof sumDaily>
): CampaignStatsView["failureReasons"] {
  const counts = new Map<string, number>()

  for (const row of rows) {
    for (const [reason, count] of Object.entries(row.failureReasons)) {
      counts.set(reason, (counts.get(reason) ?? 0) + count)
    }
  }

  const data = [...counts.entries()]
    .map(([reason, count]) => ({ reason, count }))
    .sort((a, b) => b.count - a.count)

  const total = totals.failed + totals.undelivered
  const percentOfSent =
    totals.sent > 0 ? ((total / totals.sent) * 100).toFixed(1) : "0"

  return {
    total,
    percentOfSent: `${percentOfSent}%`,
    data,
  }
}

function buildClickPerformance(
  rows: CampaignStatsDailyRecord[]
): CampaignStatsView["clickPerformance"] {
  const totals = new Map<string, { uniqueClicks: number; totalClicks: number }>()

  for (const row of rows) {
    for (const [link, counts] of Object.entries(row.clicks)) {
      const current = totals.get(link) ?? { uniqueClicks: 0, totalClicks: 0 }
      totals.set(link, {
        uniqueClicks: current.uniqueClicks + counts.uniqueClicks,
        totalClicks: current.totalClicks + counts.totalClicks,
      })
    }
  }

  const rowsSorted = [...totals.entries()]
    .map(([link, counts]) => ({ link, ...counts }))
    .sort((a, b) => b.uniqueClicks - a.uniqueClicks)

  const uniqueClicks = rowsSorted.reduce((sum, row) => sum + row.uniqueClicks, 0)
  const totalClicks = rowsSorted.reduce((sum, row) => sum + row.totalClicks, 0)

  return { uniqueClicks, totalClicks, rows: rowsSorted }
}

function buildOptOuts(
  rows: CampaignStatsDailyRecord[],
  totals: ReturnType<typeof sumDaily>
): CampaignStatsView["optOuts"] {
  const byHour = new Map<number, number>()

  for (const row of rows) {
    for (const [hour, counts] of Object.entries(row.optOutsByHour)) {
      const h = Number(hour)
      byHour.set(h, (byHour.get(h) ?? 0) + counts.campaign)
    }
  }

  const data = [...byHour.entries()]
    .sort(([a], [b]) => a - b)
    .map(([hour, optOuts]) => ({ hour, optOuts }))

  const total = data.reduce((sum, row) => sum + row.optOuts, 0)
  const percentOfDelivered =
    totals.delivered > 0
      ? ((total / totals.delivered) * 100).toFixed(1)
      : "0"

  return {
    total,
    percentOfDelivered: `${percentOfDelivered}%`,
    data,
  }
}

export function rangeForPreset(
  id: Exclude<import("./campaign-stats-types").CampaignStatsPresetId, "custom">,
  now = new Date()
): DateRange {
  if (id === "today") {
    return { from: startOfDay(now), to: now }
  }
  if (id === "past-7-days") {
    return { from: new Date(now.getTime() - 7 * MS_DAY), to: now }
  }
  if (id === "past-4-weeks") {
    return { from: new Date(now.getTime() - 28 * MS_DAY), to: now }
  }
  return { from: new Date(now.getTime() - PAST_12_WEEKS * 7 * MS_DAY), to: now }
}

export function getCampaignStatsForRange(
  range: DateRange | undefined,
  preset: CampaignStatsPresetId = "past-7-days"
): CampaignStatsView {
  const from = range?.from ?? rangeForPreset("today").from!
  const to = range?.to ?? new Date()
  const useTodayView = preset === "today" || isTodayView(from, to)
  const usePast4WeeksView = preset === "past-4-weeks"
  const usePast12WeeksView = preset === "past-12-weeks"

  const dailyRows = filterDaily(from, to)
  const chartDailyRows = usePast12WeeksView
    ? getPast12WeeksRows(from, to)
    : dailyRows

  const todayHourlyRows = getTodayHourlyRows()
  const todayRowsForTotals = todayHourlyRows.filter((row) => row.date <= to)
  const timeSeriesRows = useTodayView ? todayHourlyRows : chartDailyRows
  const totals = useTodayView
    ? sumHourly(todayRowsForTotals)
    : sumDaily(dailyRows)

  const labelMode: TimeSeriesLabelMode = useTodayView
    ? "clock"
    : usePast4WeeksView || usePast12WeeksView
      ? "short-date"
      : "weekday"

  const detailDailyRows = dailyRows.filter((row) => {
    const dayEnd = new Date(row.date)
    dayEnd.setHours(23, 59, 59, 999)
    return row.date <= to && dayEnd >= from
  })

  return {
    summary: buildSummary(totals),
    timeSeriesAxis:
      useTodayView || usePast4WeeksView || usePast12WeeksView
        ? { angle: -45, height: 56 }
        : undefined,
    openRate: buildOpenRateChart(timeSeriesRows, labelMode, totals),
    engagementRate: buildEngagementRateChart(timeSeriesRows, labelMode, totals),
    clickThroughRate: buildClickThroughRateChart(timeSeriesRows, labelMode, totals),
    delivery: buildDeliveryChart(timeSeriesRows, labelMode),
    failureReasons: buildFailureReasons(detailDailyRows, totals),
    engagement: buildEngagementChart(timeSeriesRows, labelMode, totals),
    clickPerformance: buildClickPerformance(detailDailyRows),
    optOuts: buildOptOuts(detailDailyRows, totals),
    conversion: buildConversionChart(timeSeriesRows, labelMode, totals),
  }
}
