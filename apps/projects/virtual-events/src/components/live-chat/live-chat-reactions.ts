import type { LiveChatMessage, LiveChatReaction } from "./live-chat-messages"

export const QUICK_REACTIONS = ["👍", "❤️", "😂", "😮", "😢", "👏"] as const

export type QuickReaction = (typeof QUICK_REACTIONS)[number]

export function addReactionToMessage(
  message: LiveChatMessage,
  emoji: string,
): LiveChatMessage {
  const reactions = message.reactions ?? []
  const existing = reactions.find((reaction) => reaction.emoji === emoji)

  if (existing) {
    return {
      ...message,
      reactions: reactions.map((reaction) =>
        reaction.emoji === emoji ? { ...reaction, count: reaction.count + 1 } : reaction,
      ),
    }
  }

  return {
    ...message,
    reactions: [...reactions, { emoji, count: 1 }],
  }
}

export function formatReactionLabel(reactions: LiveChatReaction[]) {
  return reactions.map((reaction) => reaction.emoji).join(", ")
}
