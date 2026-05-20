export type DemoConversationMessageSeed = {
  role: "user" | "agent"
  text: string
}

export const DEMO_CONVERSATION_THREADS: Record<string, DemoConversationMessageSeed[]> = {
  "may-cancellations": [
    {
      role: "user",
      text: "Show me cancellations for May 2026 events, broken down by event.",
    },
    {
      role: "agent",
      text: `Here is a summary of cancellations for May 2026:

• May Open Day — 12 cancelled (8 in the last 7 days)
• Campus tour — 3 cancelled
• Applicant workshop — 1 cancelled

The open day accounts for most of the recent churn. Would you like a list of cancellation reasons?`,
    },
    {
      role: "user",
      text: "Yes, mainly for the open day.",
    },
    {
      role: "agent",
      text: `For the May Open Day, the top reasons were schedule conflict (5), no longer applying (4), and transport (3). I can export the full list if helpful.`,
    },
  ],
  "attendance-overview": [
    {
      role: "user",
      text: "Give me an attendance overview across all events this term.",
    },
    {
      role: "agent",
      text: `Term-to-date attendance across your events:

• Registered: 1,842
• Checked in: 1,506 (82%)
• No-show: 336 (18%)

Open days have the highest check-in rate at 91%. Evening webinars are lowest at 71%.`,
    },
  ],
  "event-comparison": [
    {
      role: "user",
      text: "Compare capacity for our upcoming events in June.",
    },
    {
      role: "agent",
      text: `June capacity snapshot:

• 12 Jun — Open Day: 180 / 200 (90% full)
• 18 Jun — Campus tour: 42 / 60 (70% full)
• 25 Jun — Subject taster: 28 / 40 (70% full)

Only the open day is within 20 seats of capacity. I can flag when any event hits 95%.`,
    },
    {
      role: "user",
      text: "Set that up for the open day only.",
    },
    {
      role: "agent",
      text: "Done — you will get a notification when the 12 June Open Day reaches 95% capacity (190 seats).",
    },
  ],
  "waitlist-summary": [
    {
      role: "user",
      text: "Summarise the waitlist for spring open days.",
    },
    {
      role: "agent",
      text: `Spring open day waitlists:

• March — 0 waiting (event passed)
• April — 14 waiting, 6 offered, 4 accepted
• May — 23 waiting, 9 offered, 7 accepted

There are 9 people still waiting on the May list who have not been offered a place.`,
    },
  ],
}

export function getDemoConversationMessages(conversationId: string) {
  return DEMO_CONVERSATION_THREADS[conversationId] ?? null
}
