import { formatJoinFromTime } from "@/lib/format-event-time"

export type EventScheduleSession = {
  id: string
  title: string
  startsAt: Date
  excerpt: string
}

function minutesFromNow(minutes: number) {
  return new Date(Date.now() + minutes * 60_000)
}

export const MOCK_EVENT_SCHEDULE: EventScheduleSession[] = [
  {
    id: "session-1",
    title: "Welcome & opening remarks",
    startsAt: minutesFromNow(-20),
    excerpt: "Kick-off with the hosts and a quick overview of today's agenda.",
  },
  {
    id: "session-2",
    title: "Platform walkthrough",
    startsAt: minutesFromNow(25),
    excerpt: "A live demo of streaming, chat, and attendee tools in action.",
  },
  {
    id: "session-3",
    title: "Customer stories",
    startsAt: minutesFromNow(55),
    excerpt: "How early adopters are running events on the new platform.",
  },
  {
    id: "session-4",
    title: "Live Q&A",
    startsAt: minutesFromNow(85),
    excerpt: "Ask the product team anything before we wrap up.",
  },
]

export function getSessionJoinState(session: EventScheduleSession, now = new Date()) {
  if (now >= session.startsAt) {
    return {
      label: "Join now",
      disabled: false,
    }
  }

  return {
    label: `Join from ${formatJoinFromTime(session.startsAt)}`,
    disabled: true,
  }
}
