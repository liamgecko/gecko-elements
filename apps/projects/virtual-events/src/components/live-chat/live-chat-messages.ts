export type LiveChatMessageRole = "user" | "host" | "admin" | "speaker"

export type LiveChatReaction = {
  emoji: string
  count: number
}

export type LiveChatMessage = {
  id: string
  name: string
  text: string
  timestamp: string
  role: LiveChatMessageRole
  reactions?: LiveChatReaction[]
}

export const MOCK_LIVE_CHAT_MESSAGES: LiveChatMessage[] = [
  {
    id: "chat-1",
    name: "Karsten Winegeart",
    text: "Welcome everyone to Gecko's New Video Platform Event. We'll be starting shortly.",
    timestamp: "08:01",
    role: "host",
  },
  {
    id: "chat-2",
    name: "Liam Gallagher",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    timestamp: "08:02",
    role: "user",
    reactions: [{ emoji: "👍", count: 2 }, { emoji: "❤️", count: 1 }],
  },
  {
    id: "chat-3",
    name: "Toshi",
    text: "Thanks for having us. Really excited to see the new platform in action.",
    timestamp: "08:02",
    role: "speaker",
  },
  {
    id: "chat-4",
    name: "Sarah Chen",
    text: "Will there be a recording available after the session?",
    timestamp: "08:03",
    role: "user",
  },
  {
    id: "chat-5",
    name: "Event Admin",
    text: "Yes, a recording will be shared with all registered attendees within 24 hours.",
    timestamp: "08:03",
    role: "admin",
  },
  {
    id: "chat-6",
    name: "James Wright",
    text: "Brilliant, thank you!",
    timestamp: "08:04",
    role: "user",
  },
]

export function isStaffMessage(role: LiveChatMessageRole) {
  return role === "host" || role === "admin" || role === "speaker"
}

export const MOCK_USER_REPLIES: Array<Pick<LiveChatMessage, "name" | "text">> = [
  {
    name: "Sarah Chen",
    text: "Good question — I was wondering the same thing.",
  },
  {
    name: "James Wright",
    text: "Same here, thanks for sharing that.",
  },
  {
    name: "Liam Gallagher",
    text: "Really helpful, appreciate the context.",
  },
  {
    name: "Emma Brooks",
    text: "This is exactly what I needed to hear.",
  },
]

export const MOCK_USER_REPLY_DELAY_MS = 1200

