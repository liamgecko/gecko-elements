import type { DataTableRowAction } from "@gecko/ui/components/data-table/data-table"

export type BroadcastStatus = "active" | "completed" | "paused" | "failed"

export type BroadcastCampaign = {
  id: string
  name: string
  status: BroadcastStatus
  startDate: string
  endDate: string
  lastRefreshedAt: string
  createdBy: {
    name: string
    initials: string
    createdAt: string
  }
}

export function getBroadcastCampaignPath(campaignId: string, tab?: string) {
  const base = `/broadcasts/campaigns/${campaignId}`
  return tab ? `${base}/${tab}` : base
}

export function getBroadcastCampaignById(campaignId: string) {
  return broadcastCampaigns.find((campaign) => campaign.id === campaignId)
}

const statuses: BroadcastStatus[] = [
  "active",
  "completed",
  "paused",
  "failed",
  "active",
  "completed",
  "paused",
  "failed",
  "active",
  "completed",
]

const campaignNames = [
  "Gecko Forum 2026 - UK Invitation",
  "Undergraduate open day invitations",
  "Offer holder welcome series",
  "Clearing 2025 — last places available",
  "UCAS application deadline reminder",
  "International applicant visa briefing",
  "Mature student enquiry follow-up",
  "Campus tour booking confirmations",
  "Scholarship offer notifications",
  "Accommodation deadline reminder",
  "Applicant interview day invites",
  "Incomplete application re-engagement",
  "Parents and supporters evening",
  "Foundation year welcome pack",
  "Postgraduate open day follow-up",
  "Applicant portal login reminder",
  "January intake offer holders",
  "Deferred entry confirmation",
  "Refer a friend — enrolled students",
  "Admissions hotline callback requests",
  "Enrolment checklist — final steps",
] as const

const creators = [
  { name: "Liam Young", initials: "LY" },
  { name: "Sarah Chen", initials: "SC" },
  { name: "James Patel", initials: "JP" },
  { name: "Emma Wilson", initials: "EW" },
  { name: "Noah Brooks", initials: "NB" },
  { name: "Mia Torres", initials: "MT" },
  { name: "Oliver Grant", initials: "OG" },
  { name: "Ava Singh", initials: "AS" },
] as const

function pseudoRandom(index: number, salt: number) {
  return ((index + 1) * 9301 + salt * 49297) % 233280
}

function randomInt(index: number, salt: number, min: number, max: number) {
  const span = max - min + 1
  return min + (pseudoRandom(index, salt) % span)
}

function toIso(year: number, month: number, day: number, hour: number, minute: number) {
  return new Date(year, month, day, hour, minute, 0, 0).toISOString()
}

function broadcastDatesForIndex(index: number) {
  const day = randomInt(index, 1, 1, 28)
  const month = randomInt(index, 2, 8, 11)
  const year = 2025
  const hour = randomInt(index, 3, 8, 18)
  const minute = randomInt(index, 4, 0, 1) === 0 ? 0 : 30

  const startDate = toIso(year, month, day, hour, minute)
  const endDay = Math.min(day + randomInt(index, 5, 1, 14), 28)
  const endMonth = endDay < day ? Math.min(month + 1, 11) : month
  const endDate = toIso(year, endMonth, endDay, hour, minute)

  const createdDay = Math.max(1, day - randomInt(index, 6, 1, 21))
  const createdMonth = createdDay > day ? Math.max(month - 1, 8) : month
  const createdAt = toIso(
    year,
    createdMonth,
    createdDay,
    randomInt(index, 7, 9, 17),
    randomInt(index, 8, 0, 3) * 15
  )
  const lastRefreshedAt = toIso(2026, 4, 21, 10, 0)

  return { startDate, endDate, createdAt, lastRefreshedAt }
}

export const broadcastCampaigns: BroadcastCampaign[] = statuses.map(
  (status, index) => {
    const creator = creators[pseudoRandom(index, 9) % creators.length]
    const name = campaignNames[(index * 7) % campaignNames.length]
    const dates = broadcastDatesForIndex(index)

    return {
      id: `broadcast-${index + 1}`,
      name,
      status,
      startDate: dates.startDate,
      endDate: dates.endDate,
      lastRefreshedAt: dates.lastRefreshedAt,
      createdBy: {
        name: creator.name,
        initials: creator.initials,
        createdAt: dates.createdAt,
      },
    }
  }
)

export const broadcastFilterCategories = [
  {
    id: "status",
    label: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "completed", label: "Completed" },
      { value: "paused", label: "Paused" },
      { value: "failed", label: "Failed" },
    ],
  },
]

export const broadcastCampaignHeaderMenuItems = [
  { label: "Refresh broadcast" },
  { label: "Export broadcast" },
  { label: "Clone broadcast" },
  {
    label: "Delete broadcast",
    variant: "destructive" as const,
    separatorBefore: true,
  },
] as const

export const broadcastRowActions: DataTableRowAction[] = [
  { id: "edit", label: "Edit broadcast" },
  { id: "clone", label: "Clone broadcast" },
  { id: "pause", label: "Pause broadcast" },
  {
    id: "delete",
    label: "Delete broadcast",
    variant: "destructive",
    separatorBefore: true,
  },
]
