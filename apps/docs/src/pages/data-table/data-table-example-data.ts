import type { DataTableRowAction } from "@gecko/ui/components/data-table"

export type DemoEventSyncStatus = "synced" | "failed" | "syncing" | "none"
export type DemoEventIntegration = "dynamics" | "salesforce" | "none"
export type DemoEventChronology = "upcoming" | "past"

export type DemoEvent = {
  id: string
  eventName: string
  /** ISO string (UTC) */
  startsAt: string
  timezone: string
  attendees: number
  waitlisted: number
  integration: DemoEventIntegration
  syncStatus: DemoEventSyncStatus
  /** Used for filtering; may be hidden from the grid. */
  category: string
  /** Used for filtering; may be hidden from the grid. */
  chronology: DemoEventChronology
}

const baseEvents = [
  "Undergraduate Open Day",
  "Offer Holder Day",
  "Campus Tour",
  "Accommodation Tour",
  "Applicant Interview Day",
  "Clearing Information Session",
  "Parents’ Evening",
  "Virtual Q&A: Applying to University",
  "International Student Briefing",
  "Mature Student Workshop",
] as const

const timezones = [
  "Europe/London",
  "Europe/Dublin",
  "Europe/Paris",
  "America/New_York",
  "America/Los_Angeles",
  "Asia/Dubai",
  "Asia/Singapore",
  "Australia/Sydney",
] as const

const categories = [
  "Open day",
  "Tours",
  "Interviews",
  "Information session",
  "International",
  "Clearing",
] as const

function pick<T>(arr: readonly T[], index: number) {
  return arr[index % arr.length]
}

function isoDaysFromNow(days: number, hour24: number, minute: number) {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() + days)
  d.setUTCHours(hour24, minute, 0, 0)
  return d.toISOString()
}

function chronologyFromStartsAt(startsAtIso: string): DemoEventChronology {
  return new Date(startsAtIso).getTime() >= Date.now() ? "upcoming" : "past"
}

function integrationFromIndex(i: number): DemoEventIntegration {
  if (i % 6 === 0) return "none"
  if (i % 2 === 0) return "dynamics"
  return "salesforce"
}

function syncStatusFromIndex(i: number, integration: DemoEventIntegration): DemoEventSyncStatus {
  if (integration === "none") return "none"
  if (i % 7 === 0) return "failed"
  if (i % 5 === 0) return "syncing"
  return "synced"
}

export const demoEvents: DemoEvent[] = Array.from({ length: 18 }).map((_, i) => {
  const startsAt = isoDaysFromNow(i - 8, 9 + (i % 6), i % 2 === 0 ? 0 : 30)
  const integration = integrationFromIndex(i)
  return {
    id: `evt-${String(i + 1).padStart(3, "0")}`,
    eventName: pick(baseEvents, i),
    startsAt,
    timezone: pick(timezones, i),
    attendees: 40 + ((i * 13) % 260),
    waitlisted: (i * 7) % 48,
    integration,
    syncStatus: syncStatusFromIndex(i, integration),
    category: pick(categories, i + 2),
    chronology: chronologyFromStartsAt(startsAt),
  }
})

export const demoRowActions: DataTableRowAction[] = [
  { id: "export-attendees", label: "Export attendees" },
  { id: "clone-event", label: "Clone event" },
  { id: "repeat-event", label: "Repeat event" },
  { id: "timetravel-event", label: "Timetravel event" },
  { id: "delete-event", label: "Delete event", variant: "destructive" },
]

export const demoSelectedActions: DataTableRowAction[] = [
  { id: "export", label: "Export selected" },
  { id: "remove", label: "Remove selected", variant: "destructive" },
]

export const eventFilterCategories = [
  {
    id: "chronology",
    label: "Event chronology",
    options: [
      { value: "upcoming", label: "Upcoming events" },
      { value: "past", label: "Past events" },
    ],
  },
  {
    id: "integration",
    label: "Syncs with",
    options: [
      { value: "dynamics", label: "Dynamics" },
      { value: "salesforce", label: "Salesforce" },
      { value: "none", label: "No integration" },
    ],
  },
  {
    id: "syncStatus",
    label: "Sync status",
    options: [
      { value: "synced", label: "Synced" },
      { value: "failed", label: "Failed" },
      { value: "syncing", label: "Syncing" },
      { value: "none", label: "No integration" },
    ],
  },
  {
    id: "category",
    label: "Category",
    options: categories.map((c) => ({ value: c, label: c })),
  },
]

/** Sample child rows for expandable / nested table demos. */
export type DemoEventSession = {
  id: string
  sessionDate: string
  sessionTime: string
  attendees: number
  waitlisted: number
}

export function demoSessionsForEvent(eventId: string): DemoEventSession[] {
  const n = Number.parseInt(eventId.replace(/\D/g, ""), 10) || 1
  const count = 2 + (n % 3)
  return Array.from({ length: count }, (_, i) => {
    const day = 12 + i + (n % 4)
    return {
      id: `${eventId}-s${i}`,
      sessionDate: `May ${day}, 2026`,
      sessionTime: `${9 + (i % 4)}:${i % 2 === 0 ? "00" : "30"}${i % 2 === 0 ? "am" : "pm"}`,
      attendees: 20 + ((n * 3 + i * 7) % 80),
      waitlisted: (i * n) % 12,
    }
  })
}
