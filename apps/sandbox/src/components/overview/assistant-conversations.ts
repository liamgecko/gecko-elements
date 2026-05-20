/** Sidebar title for conversations started from the reply box. */
export const ASSISTANT_REPLY_BOX_CONVERSATION_TITLE = "Event registration stats"

export type AssistantConversation = {
  id: string
  title: string
  updatedAt: Date
  pinned?: boolean
  /** Sidebar animates the title letter-by-letter until complete. */
  isGeneratingTitle?: boolean
}

export const DEMO_ASSISTANT_CONVERSATIONS: AssistantConversation[] = [
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
