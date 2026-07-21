import * as React from "react"

type MessageVariant = "user" | "agent" | "ai" | "note"

type MessageContextValue = {
  variant: MessageVariant
  align: "start" | "end"
}

const MessageContext = React.createContext<MessageContextValue | null>(null)

function useMessageContext(component: string) {
  const context = React.useContext(MessageContext)
  if (!context) {
    throw new Error(`${component} must be used within Message.`)
  }
  return context
}

function useOptionalMessageContext() {
  return React.useContext(MessageContext)
}

function getDefaultAlign(variant: MessageVariant): "start" | "end" {
  // Inbox semantics: customer/user on the left, agent/AI/notes on the right.
  return variant === "user" ? "start" : "end"
}

/** Recommended Bubble variant for a Message variant. */
function getMessageBubbleVariant(
  variant: MessageVariant
): "default" | "secondary" | "ghost" {
  switch (variant) {
    case "agent":
      return "default"
    case "ai":
      return "ghost"
    case "note":
    case "user":
    default:
      return "secondary"
  }
}

export {
  MessageContext,
  useMessageContext,
  useOptionalMessageContext,
  getDefaultAlign,
  getMessageBubbleVariant,
  type MessageVariant,
  type MessageContextValue,
}
