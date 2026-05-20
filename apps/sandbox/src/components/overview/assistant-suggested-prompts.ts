export type SuggestedPrompt = {
  id: string
  heading: string
  prompt: string
}

export const SUGGESTED_PROMPT_DISPLAY_COUNT = 3

export const ASSISTANT_SUGGESTED_PROMPT_POOL: SuggestedPrompt[] = [
  // Forms
  {
    id: "forms-1",
    heading: "Most popular form",
    prompt: "What has been our most popular form this week?",
  },
  {
    id: "forms-2",
    heading: "Response volume",
    prompt: "How has our response volume changed, month-on-month?",
  },
  {
    id: "forms-3",
    heading: "Drop-off rate",
    prompt: "What was the average drop-off rate this week?",
  },
  {
    id: "forms-4",
    heading: "New forms",
    prompt: "Can you give me an overview of newly created forms I might have missed?",
  },
  {
    id: "forms-5",
    heading: "Country responses",
    prompt: "Which country has submitted the most responses? Can you give me the top 10?",
  },
  {
    id: "forms-6",
    heading: "Stale forms",
    prompt:
      "Are there any forms that haven't received a response in the past 12 months that might be safe to delete?",
  },
  // Events
  {
    id: "events-1",
    heading: "Most popular event",
    prompt: "Which event has seen the most sign-ups this week?",
  },
  {
    id: "events-2",
    heading: "New event registrations",
    prompt: "How many new event registrations have come in over the past week?",
  },
  {
    id: "events-3",
    heading: "Biggest upcoming event",
    prompt: "Which is the biggest upcoming event by attendees (in the next 3 months)?",
  },
  {
    id: "events-4",
    heading: "Largest event by attendees",
    prompt: "What has been our largest event by attendees in the last 3 months?",
  },
  {
    id: "events-5",
    heading: "No-show rate",
    prompt: "What was the no-show rate for our last event?",
  },
  {
    id: "events-6",
    heading: "New events",
    prompt: "Can you give me an overview of newly created events I might have missed?",
  },
  // Calls
  {
    id: "calls-1",
    heading: "Average call length",
    prompt: "What was the average call length over the last two weeks?",
  },
  {
    id: "calls-2",
    heading: "Most popular call outcome",
    prompt: "Which call outcome was most popular?",
  },
  {
    id: "calls-3",
    heading: "Best times to call",
    prompt: "What times of day should we be making calls based on call data?",
  },
  {
    id: "calls-4",
    heading: "Most calls made by agent",
    prompt: "Which agent made the most calls over the past 4 weeks?",
  },
  {
    id: "calls-5",
    heading: "Busiest call campaign",
    prompt: "Which was the busiest call campaign?",
  },
  // Broadcasts
  {
    id: "broadcasts-1",
    heading: "New broadcasts",
    prompt: "Can you give me an overview of newly created broadcasts?",
  },
  {
    id: "broadcasts-2",
    heading: "Email volume",
    prompt: "How many emails have we sent over the past 6 months?",
  },
  {
    id: "broadcasts-3",
    heading: "Text volume",
    prompt: "How many texts have we sent over the past 6 months?",
  },
  {
    id: "broadcasts-4",
    heading: "Most active user",
    prompt: "Which user has created the most broadcasts?",
  },
  {
    id: "broadcasts-5",
    heading: "Average follow-up comms",
    prompt: "How many workflows/follow-up comms does a typical broadcast have?",
  },
  // Conversations
  {
    id: "conversations-1",
    heading: "Conversation volume",
    prompt: "How many conversations were started in the past 2 weeks? Is this trending up?",
  },
  {
    id: "conversations-2",
    heading: "AI conversation volume",
    prompt: "What % of conversations were handled end-to-end by our AI?",
  },
  {
    id: "conversations-3",
    heading: "Most active agent",
    prompt:
      "Which human agent was involved in the most conversations over the past 3 months?",
  },
  {
    id: "conversations-4",
    heading: "Most active channel",
    prompt: "What is our most active channel?",
  },
  {
    id: "conversations-5",
    heading: "Top messaging URLs",
    prompt: "What are the top 5 URLs users are messaging us from?",
  },
  {
    id: "conversations-6",
    heading: "Most frequently sourced pages",
    prompt:
      "What are the most frequently sourced pages our AI bot uses to generate answers?",
  },
  {
    id: "conversations-7",
    heading: "Conversation ratings",
    prompt: "Can you give me a breakdown of conversation ratings over the last month?",
  },
  // Misc
  {
    id: "misc-1",
    heading: "User logins",
    prompt: "How many users have logged in over the past 6 months?",
  },
  {
    id: "misc-2",
    heading: "Exports",
    prompt: "How many exports ran in the past 3 weeks?",
  },
  {
    id: "misc-3",
    heading: "Recent imports",
    prompt: "What was the most recent import into the platform and who ran it?",
  },
  {
    id: "misc-4",
    heading: "Active integrations",
    prompt: "What active integrations do we have setup?",
  },
  {
    id: "misc-5",
    heading: "Gecko client duration",
    prompt: "How long have we been a Gecko client for?",
  },
  {
    id: "misc-6",
    heading: "Most active creator",
    prompt: "Which user has created the most message templates?",
  },
  {
    id: "misc-7",
    heading: "Recent message templates",
    prompt:
      "Give me a list of the 20 most recently created message templates and who made them",
  },
  {
    id: "misc-8",
    heading: "Inactive users",
    prompt: "Are there any users that haven't logged in over the past 18 months?",
  },
  {
    id: "misc-9",
    heading: "Stale templates",
    prompt:
      "Are there any email or SMS templates that haven't been sent in the past 12 months that might be safe to delete?",
  },
]

function shuffle<T>(items: T[]): T[] {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

/** Random subset of prompts; call once per page load. */
export function pickSuggestedPrompts(count = SUGGESTED_PROMPT_DISPLAY_COUNT): SuggestedPrompt[] {
  return shuffle(ASSISTANT_SUGGESTED_PROMPT_POOL).slice(0, count)
}
