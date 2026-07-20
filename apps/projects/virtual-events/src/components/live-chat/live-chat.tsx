import { useEffect, useRef } from "react"

import { ScrollArea } from "@gecko/ui/components/scroll-area"
import { cn } from "@gecko/ui/lib/utils"

import { useVirtualEvents } from "@/context/virtual-events-context"

import { LiveChatMessageItem } from "./live-chat-message-item"
import {
  MOCK_LIVE_CHAT_MESSAGES,
  type LiveChatMessage,
} from "./live-chat-messages"

type LiveChatProps = {
  messages?: LiveChatMessage[]
  className?: string
  onReact?: (messageId: string, emoji: string) => void
  onReply?: (messageId: string) => void
}

function getScrollViewport(root: HTMLElement | null) {
  return root?.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]') ?? null
}

export function LiveChat({
  messages = MOCK_LIVE_CHAT_MESSAGES,
  className,
  onReact,
  onReply,
}: LiveChatProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const previousMessageCountRef = useRef(messages.length)
  const seenMessageIdsRef = useRef<Set<string> | null>(null)
  const { scrollToMessageId, highlightedMessageId, clearMessageNavigation, sidebarTab } =
    useVirtualEvents()

  if (seenMessageIdsRef.current === null) {
    seenMessageIdsRef.current = new Set(messages.map((message) => message.id))
  }

  useEffect(() => {
    const seenMessageIds = seenMessageIdsRef.current
    if (!seenMessageIds) {
      return
    }

    for (const message of messages) {
      seenMessageIds.add(message.id)
    }
  }, [messages])

  useEffect(() => {
    const viewport = getScrollViewport(scrollAreaRef.current)
    if (!viewport) {
      return
    }

    const messageCountChanged = messages.length !== previousMessageCountRef.current
    previousMessageCountRef.current = messages.length

    if (messageCountChanged) {
      viewport.scrollTop = viewport.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (!scrollToMessageId || sidebarTab !== "chat") {
      return
    }

    let frameId = 0
    let attempts = 0

    const scrollToTarget = () => {
      if (attempts >= 10) {
        clearMessageNavigation()
        return
      }

      attempts += 1

      const messageElement = scrollAreaRef.current?.querySelector<HTMLElement>(
        `[data-message-id="${scrollToMessageId}"]`,
      )

      if (!messageElement) {
        frameId = window.requestAnimationFrame(scrollToTarget)
        return
      }

      messageElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
      clearMessageNavigation()
    }

    frameId = window.requestAnimationFrame(scrollToTarget)

    return () => window.cancelAnimationFrame(frameId)
  }, [scrollToMessageId, sidebarTab, clearMessageNavigation])

  return (
    <div ref={scrollAreaRef} className={cn("min-h-0 flex-1", className)}>
      <ScrollArea className="h-full">
        <div className="flex flex-col gap-5 p-4">
          {messages.map((message) => (
            <LiveChatMessageItem
              key={message.id}
              message={message}
              highlighted={highlightedMessageId === message.id}
              animateEntry={!seenMessageIdsRef.current?.has(message.id)}
              onReact={onReact}
              onReply={onReply}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
