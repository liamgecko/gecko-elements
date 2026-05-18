import * as React from "react"

import { Container } from "@gecko/ui/components/container"
import {
  ChatBubble,
  ChatBubbleMessage,
} from "@gecko/ui/components/chat-bubble"
import { ReplyBox, ReplyBoxContent, ReplyBoxFooter } from "@gecko/ui/components/reply-box"
import { Forward, Loader } from "lucide-react"
import { cn } from "@gecko/ui/lib/utils"

import { AssistantOverviewShell } from "../../components/overview/AssistantOverviewShell"
import {
  DEMO_ASSISTANT_CONVERSATIONS,
  type AssistantConversation,
} from "../../components/overview/assistant-conversations"
import { getDemoConversationMessages } from "../../components/overview/assistant-conversation-mocks"
import {
  AgentStreamingReply,
  formatAgentMessageText,
} from "../../components/overview/format-agent-message"
import {
  SUGGESTED_PROMPT_FADE_MS,
  SuggestedPrompts,
} from "../../components/overview/SuggestedPrompts"
import { useAssistantReplyBoxTrayItems } from "../../components/overview/useAssistantReplyBoxTrayItems"

type ChatMessage = {
  id: string
  role: "user" | "agent"
  text: string
  ts: Date
  /** Rich body for agent demo; falls back to `text` when absent. */
  content?: React.ReactNode
  /** Plain-text streaming progress for agent demo; omitted once streaming finishes. */
  agentStreamChars?: number
}

/** Plain copy aligned with `AgentDemoReply`; streamed then replaced by rich markup when done. */
const AGENT_REPLY_PLAIN = `Absolutely I can Liam. Over the past 24 hours you have had 14 new registrations for your May 2026 Open Day event.

However you have also had 2 registrants cancel their registration over the same period.

Your current numbers are:

• 149 attendees
• 12 cancelled

If you need any further information please let me know.`

const STREAM_CHUNK_CHARS = 3
const STREAM_INTERVAL_MS = 14

function getTimeOfDay(date = new Date()) {
  const hour = date.getHours()
  if (hour < 12) return "morning"
  if (hour < 18) return "afternoon"
  return "evening"
}

function firstNameFromFullName(fullName: string) {
  const first = fullName.trim().split(/\s+/)[0]
  return first || fullName
}

export default function OverviewPage() {
  const userFullName = "Liam Young"
  const firstName = firstNameFromFullName(userFullName)
  const timeOfDay = getTimeOfDay()

  const [composerValue, setComposerValue] = React.useState("")
  const [phase, setPhase] = React.useState<"idle" | "thinking" | "streaming" | "answered">("idle")
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [showSuggestedPrompts, setShowSuggestedPrompts] = React.useState(true)
  const [suggestedPromptsRemoved, setSuggestedPromptsRemoved] = React.useState(false)
  const [conversations, setConversations] = React.useState<AssistantConversation[]>(
    DEMO_ASSISTANT_CONVERSATIONS
  )
  const [activeConversationId, setActiveConversationId] = React.useState<string | null>(null)
  const [showWelcomeScreen, setShowWelcomeScreen] = React.useState(true)
  const { trayItems } = useAssistantReplyBoxTrayItems()

  const hasMessages = messages.length > 0
  const isChatView = !showWelcomeScreen
  const messagesScrollRef = React.useRef<HTMLDivElement | null>(null)
  const shouldStickToBottomRef = React.useRef(true)
  const thinkingTimeoutRef = React.useRef<number | null>(null)
  const dismissSuggestedPromptsPendingRef = React.useRef(false)

  const lastMessage = messages[messages.length - 1]
  const agentStreamTick =
    lastMessage?.role === "agent" && typeof lastMessage.agentStreamChars === "number"
      ? lastMessage.agentStreamChars
      : null

  React.useEffect(() => {
    if (phase !== "thinking") return

    const t = window.setTimeout(() => {
      thinkingTimeoutRef.current = null
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reduced) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "agent",
            text: "",
            ts: new Date(),
            content: formatAgentMessageText(AGENT_REPLY_PLAIN),
          },
        ])
        setPhase("answered")
        return
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "agent",
          text: "",
          ts: new Date(),
          agentStreamChars: 0,
        },
      ])
      setPhase("streaming")
    }, 3000)

    thinkingTimeoutRef.current = t
    return () => {
      window.clearTimeout(t)
      thinkingTimeoutRef.current = null
    }
  }, [phase])

  const cancelThinking = React.useCallback(() => {
    if (phase !== "thinking") return
    const id = thinkingTimeoutRef.current
    if (id !== null) {
      window.clearTimeout(id)
      thinkingTimeoutRef.current = null
    }
    setPhase("answered")
  }, [phase])

  const clearChatSession = React.useCallback(() => {
    const id = thinkingTimeoutRef.current
    if (id !== null) {
      window.clearTimeout(id)
      thinkingTimeoutRef.current = null
    }
    setMessages([])
    setPhase("idle")
    setComposerValue("")
  }, [])

  const startNewChat = React.useCallback(() => {
    setActiveConversationId(null)
    clearChatSession()
    setShowWelcomeScreen(false)
    setShowSuggestedPrompts(false)
    setSuggestedPromptsRemoved(true)
    dismissSuggestedPromptsPendingRef.current = false
  }, [clearChatSession])

  const selectConversation = React.useCallback(
    (id: string) => {
      const thinkingId = thinkingTimeoutRef.current
      if (thinkingId !== null) {
        window.clearTimeout(thinkingId)
        thinkingTimeoutRef.current = null
      }

      setActiveConversationId(id)
      setShowWelcomeScreen(false)
      setComposerValue("")
      setShowSuggestedPrompts(false)
      setSuggestedPromptsRemoved(true)
      dismissSuggestedPromptsPendingRef.current = false

      const thread = getDemoConversationMessages(id)
      if (!thread) {
        setMessages([])
        setPhase("idle")
        return
      }

      const baseTime = Date.now()
      setMessages(
        thread.map((message, index) => ({
          id: `${id}-${index}`,
          role: message.role,
          text: message.text,
          content:
            message.role === "agent" ? formatAgentMessageText(message.text) : undefined,
          ts: new Date(baseTime - (thread.length - index) * 1000 * 60 * 4),
        }))
      )
      setPhase("answered")
    },
    []
  )

  const deleteConversation = React.useCallback(
    (id: string) => {
      setConversations((prev) => prev.filter((c) => c.id !== id))
      if (activeConversationId === id) {
        startNewChat()
      }
    },
    [activeConversationId, startNewChat]
  )

  const pinConversation = React.useCallback((id: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c))
    )
  }, [])

  const dismissSuggestedPrompts = React.useCallback(() => {
    dismissSuggestedPromptsPendingRef.current = true
    setShowSuggestedPrompts(false)
  }, [])

  React.useEffect(() => {
    if (showSuggestedPrompts || !dismissSuggestedPromptsPendingRef.current) return

    const t = window.setTimeout(() => {
      dismissSuggestedPromptsPendingRef.current = false
      setSuggestedPromptsRemoved(true)
    }, SUGGESTED_PROMPT_FADE_MS)

    return () => window.clearTimeout(t)
  }, [showSuggestedPrompts])

  React.useEffect(() => {
    const last = messages[messages.length - 1]
    if (!last || last.role !== "agent") return
    if (last.agentStreamChars === undefined) return

    const len = AGENT_REPLY_PLAIN.length
    if (last.agentStreamChars >= len) {
      setMessages((prev) => {
        const cur = prev[prev.length - 1]
        if (!cur || cur.role !== "agent" || cur.agentStreamChars === undefined || cur.agentStreamChars < len) {
          return prev
        }
        const { agentStreamChars: _c, ...rest } = cur
        return [...prev.slice(0, -1), { ...rest, content: formatAgentMessageText(AGENT_REPLY_PLAIN) }]
      })
      setPhase("answered")
      return
    }

    const id = window.setTimeout(() => {
      setMessages((prev) => {
        const cur = prev[prev.length - 1]
        if (!cur || cur.role !== "agent" || cur.agentStreamChars === undefined) return prev
        return [
          ...prev.slice(0, -1),
          {
            ...cur,
            agentStreamChars: Math.min(len, cur.agentStreamChars + STREAM_CHUNK_CHARS),
          },
        ]
      })
    }, STREAM_INTERVAL_MS)

    return () => window.clearTimeout(id)
  }, [messages])

  const completeSubmit = React.useCallback((text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    setComposerValue("")
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text: trimmed, ts: new Date() },
    ])
    setPhase("thinking")
  }, [])

  const submit = React.useCallback(() => {
    if (phase === "thinking" || phase === "streaming") return

    const text = composerValue.trim()
    if (!text) return

    if (showWelcomeScreen) {
      setShowWelcomeScreen(false)
      setSuggestedPromptsRemoved(true)
    } else if (!hasMessages && !suggestedPromptsRemoved) {
      setSuggestedPromptsRemoved(true)
    }

    completeSubmit(text)
  }, [composerValue, phase, showWelcomeScreen, hasMessages, suggestedPromptsRemoved, completeSubmit])

  React.useEffect(() => {
    if (!hasMessages) return

    const el = messagesScrollRef.current
    if (!el) return

    const onScroll = () => {
      const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
      shouldStickToBottomRef.current = distanceFromBottom < 24
    }

    onScroll()
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [hasMessages])

  React.useLayoutEffect(() => {
    if (!hasMessages) return

    const el = messagesScrollRef.current
    if (!el) return

    const last = messages[messages.length - 1]
    const isStreamingAgent = last?.role === "agent" && last.agentStreamChars !== undefined
    if (!isStreamingAgent && !shouldStickToBottomRef.current) return

    const pin = () => {
      el.scrollTop = el.scrollHeight - el.clientHeight
    }
    pin()
    const raf = window.requestAnimationFrame(pin)
    return () => window.cancelAnimationFrame(raf)
  }, [hasMessages, messages.length, agentStreamTick])

  return (
    <Container className="h-[calc(100dvh-var(--header-height))] min-h-0 p-0 flex flex-col bg-background overflow-hidden">
      <AssistantOverviewShell
        className="min-h-0 flex-1"
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={selectConversation}
        onNewChat={startNewChat}
        onDeleteConversation={deleteConversation}
        onPinConversation={pinConversation}
      >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-8">
        {isChatView ? (
          <div
            ref={messagesScrollRef}
            className="min-h-0 flex-1 overflow-auto"
            role="log"
            aria-label="Conversation"
            aria-busy={phase === "streaming"}
            aria-relevant="additions text"
          >
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 pt-6 pb-6">
              {messages.map((m) => (
                <div key={m.id} className="animate-in fade-in-0 slide-in-from-bottom-1 duration-200">
                  <ChatBubble
                    className="mb-0"
                    agent={m.role === "agent"}
                    variant={m.role === "agent" ? "ai-agent" : "default"}
                  >
                    <ChatBubbleMessage timestamp={m.ts}>
                      {m.role === "agent" && m.agentStreamChars !== undefined ? (
                        <AgentStreamingReply text={AGENT_REPLY_PLAIN} charCount={m.agentStreamChars} />
                      ) : (
                        m.content ?? m.text
                      )}
                    </ChatBubbleMessage>
                  </ChatBubble>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div
          className={cn(
            "mx-auto w-full max-w-2xl shrink-0 pb-6",
            isChatView ? "mt-auto pt-6" : "flex min-h-0 flex-1 flex-col justify-center"
          )}
          aria-busy={isChatView && (phase === "thinking" || phase === "streaming")}
        >
          {showWelcomeScreen ? (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">
                  Good {timeOfDay} {firstName}!
                </h1>
                <p className="text-muted-foreground">What can I help you with today?</p>
              </div>

              <div className="h-6 shrink-0" aria-hidden />
            </>
          ) : null}

          <div
            className={cn(
              "px-1 transition-[opacity,transform,height] duration-200 ease-out",
              isChatView && phase === "thinking"
                ? "h-auto translate-y-0 opacity-100"
                : "pointer-events-none h-0 translate-y-1 overflow-hidden opacity-0"
            )}
            aria-live="polite"
          >
            <div className="mb-2 flex items-center gap-2">
              <Loader
                aria-hidden
                className="size-3.5 shrink-0 animate-[spin_1.25s_linear_infinite] text-muted-foreground motion-reduce:animate-none"
              />
              <p className="text-xs text-muted-foreground">Thinking…</p>
            </div>
          </div>

          <ReplyBox
            variant="chat"
            items={trayItems}
            sendIcon={Forward}
            onSend={submit}
            stopEnabled={phase === "thinking"}
            onStop={cancelThinking}
          >
            <ReplyBoxContent
              placeholder="Ask Gecko…"
              textareaProps={{
                value: composerValue,
                disabled: phase === "thinking" || phase === "streaming",
                className: cn(
                  "transition-[min-height] duration-300 ease-out",
                  isChatView ? "min-h-8" : undefined
                ),
                onChange: (e) => setComposerValue(e.currentTarget.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    submit()
                  }
                },
              }}
            />
            <ReplyBoxFooter showTray items={trayItems} />
          </ReplyBox>

          {showWelcomeScreen && !suggestedPromptsRemoved ? (
            <SuggestedPrompts
              visible={showSuggestedPrompts}
              onSelect={setComposerValue}
              onDismiss={dismissSuggestedPrompts}
            />
          ) : null}
        </div>
      </div>
      </AssistantOverviewShell>
    </Container>
  )
}
