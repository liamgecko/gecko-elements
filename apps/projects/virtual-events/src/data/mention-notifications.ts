export type MentionNotification = {
  id: string
  messageId: string
  authorName: string
  timestamp: string
  read: boolean
}

export const MOCK_MENTION_NOTIFICATIONS: MentionNotification[] = [
  {
    id: "mention-1",
    messageId: "chat-2",
    authorName: "Liam Young",
    timestamp: "2m ago",
    read: false,
  },
  {
    id: "mention-2",
    messageId: "chat-4",
    authorName: "Sarah Chen",
    timestamp: "8m ago",
    read: false,
  },
  {
    id: "mention-3",
    messageId: "chat-5",
    authorName: "Event Admin",
    timestamp: "12m ago",
    read: true,
  },
]
