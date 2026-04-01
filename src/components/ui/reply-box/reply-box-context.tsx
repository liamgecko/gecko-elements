"use client"

import * as React from "react"

import type { ReplyBoxActionId, ReplyBoxChannel } from "./reply-box-actions"
import type { ReplyBoxVariant } from "./reply-box"

export const ReplyBoxContext = React.createContext<{
  variant: ReplyBoxVariant
  channel: ReplyBoxChannel
  setChannel: (channel: ReplyBoxChannel) => void
  expanded: boolean
  toggleExpanded: () => void
  itemsOverride?: ReplyBoxActionId[]
  noteMode: boolean
  toggleNoteMode: () => void
} | null>(null)

export function useReplyBox() {
  const ctx = React.useContext(ReplyBoxContext)
  if (!ctx) {
    throw new Error("ReplyBox subcomponents must be used within ReplyBox.")
  }
  return ctx
}

