export type AssistantConversation = {
  id: string
  title: string
  updatedAt: Date
  pinned?: boolean
}

export const DEMO_ASSISTANT_CONVERSATIONS: AssistantConversation[] = [
  {
    id: "open-day-stats",
    title: "Open day registration stats",
    updatedAt: new Date(Date.now() - 1000 * 60 * 12),
    pinned: true,
  },
  {
    id: "may-cancellations",
    title: "May 2026 cancellations",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: "attendance-overview",
    title: "Attendance overview",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 26),
  },
  {
    id: "event-comparison",
    title: "Compare upcoming event capacity",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: "waitlist-summary",
    title: "Waitlist summary for spring open days",
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
  },
]
