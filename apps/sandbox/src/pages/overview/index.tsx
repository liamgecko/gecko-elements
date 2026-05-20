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
import { AssistantRenameConversationDialog } from "../../components/overview/AssistantRenameConversationDialog"
import { AssistantNegativeFeedbackDialog } from "../../components/overview/AssistantNegativeFeedbackDialog"
import { AssistantShareConversationDialog } from "../../components/overview/AssistantShareConversationDialog"
import {
  ASSISTANT_REPLY_BOX_CONVERSATION_TITLE,
  DEMO_ASSISTANT_CONVERSATIONS,
  type AssistantConversation,
} from "../../components/overview/assistant-conversations"
import { getDemoConversationMessages } from "../../components/overview/assistant-conversation-mocks"
import {
  AGENT_TRENDS_REPLY_COPY,
  AssistantRegistrationTrendsReply,
} from "../../components/overview/assistant-registration-trends-chart"
import { ASSISTANT_OPEN_DAY_STATS_AGENT_REPLY } from "../../components/overview/assistant-open-day-reply"
import { formatAgentMessageText } from "../../components/overview/format-agent-message"
import { getSuggestedPromptAgentReply } from "../../components/overview/assistant-suggested-prompt-replies"
import type { SuggestedPrompt } from "../../components/overview/assistant-suggested-prompts"
import {
  SUGGESTED_PROMPT_FADE_MS,
  SuggestedPrompts,
} from "../../components/overview/SuggestedPrompts"
import { useAssistantReplyBoxTrayItems } from "../../components/overview/useAssistantReplyBoxTrayItems"
import thumbDownSoundUrl from "../../assets/thumb-down.mp3"
import thumbUpSoundUrl from "../../assets/thumb-up.mp3"
import { playFeedbackSound } from "../../lib/play-feedback-sound"

type ChatMessage = {
  id: string
  role: "user" | "agent"
  text: string
  ts: Date
  /** Rich body for agent demo; falls back to `text` when absent. */
  content?: React.ReactNode
}

type PendingAgentReply =
  | { kind: "initial" }
  | { kind: "trends" }
  | { kind: "suggested"; promptId: string }

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
  const [phase, setPhase] = React.useState<"idle" | "thinking" | "answered">("idle")
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [showSuggestedPrompts, setShowSuggestedPrompts] = React.useState(true)
  const [suggestedPromptsRemoved, setSuggestedPromptsRemoved] = React.useState(false)
  const [conversations, setConversations] = React.useState<AssistantConversation[]>(
    DEMO_ASSISTANT_CONVERSATIONS
  )
  const [activeConversationId, setActiveConversationId] = React.useState<string | null>(null)
  const [showWelcomeScreen, setShowWelcomeScreen] = React.useState(true)
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
  const [shareConversationId, setShareConversationId] = React.useState<string | null>(null)
  const [shareEmail, setShareEmail] = React.useState("")
  const [renameDialogOpen, setRenameDialogOpen] = React.useState(false)
  const [renameConversationId, setRenameConversationId] = React.useState<string | null>(null)
  const [renameTitle, setRenameTitle] = React.useState("")
  const [negativeFeedbackDialogOpen, setNegativeFeedbackDialogOpen] = React.useState(false)
  const [negativeFeedback, setNegativeFeedback] = React.useState("")
  const { trayItems } = useAssistantReplyBoxTrayItems()

  const hasMessages = messages.length > 0
  const isChatView = !showWelcomeScreen
  const messagesScrollRef = React.useRef<HTMLDivElement | null>(null)
  const shouldStickToBottomRef = React.useRef(true)
  const thinkingTimeoutRef = React.useRef<number | null>(null)
  const dismissSuggestedPromptsPendingRef = React.useRef(false)
  const pendingAgentReplyRef = React.useRef<PendingAgentReply>({ kind: "initial" })
  const liveConversationThreadsRef = React.useRef<Record<string, ChatMessage[]>>({})

  React.useEffect(() => {
    if (phase !== "thinking") return

    const t = window.setTimeout(() => {
      thinkingTimeoutRef.current = null
      const pending = pendingAgentReplyRef.current

      if (pending.kind === "trends") {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "agent",
            text: AGENT_TRENDS_REPLY_COPY,
            ts: new Date(),
            content: <AssistantRegistrationTrendsReply />,
          },
        ])
      } else if (pending.kind === "suggested") {
        const agentReply = getSuggestedPromptAgentReply(pending.promptId)
        if (agentReply) {
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              role: "agent",
              text: agentReply,
              ts: new Date(),
              content: formatAgentMessageText(agentReply),
            },
          ])
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "agent",
            text: ASSISTANT_OPEN_DAY_STATS_AGENT_REPLY,
            ts: new Date(),
            content: formatAgentMessageText(ASSISTANT_OPEN_DAY_STATS_AGENT_REPLY),
          },
        ])
      }

      setPhase("answered")
    }, 3000)

    thinkingTimeoutRef.current = t
    return () => {
      window.clearTimeout(t)
      thinkingTimeoutRef.current = null
    }
  }, [phase])

  React.useEffect(() => {
    if (!activeConversationId) return
    if (getDemoConversationMessages(activeConversationId)) return
    liveConversationThreadsRef.current[activeConversationId] = messages
  }, [activeConversationId, messages])

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
    pendingAgentReplyRef.current = { kind: "initial" }
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

      const demoThread = getDemoConversationMessages(id)
      if (demoThread) {
        const baseTime = Date.now()
        setMessages(
          demoThread.map((message, index) => ({
            id: `${id}-${index}`,
            role: message.role,
            text: message.text,
            content:
              message.role === "agent" ? formatAgentMessageText(message.text) : undefined,
            ts: new Date(baseTime - (demoThread.length - index) * 1000 * 60 * 4),
          }))
        )
        setPhase("answered")
        return
      }

      const liveThread = liveConversationThreadsRef.current[id]
      if (liveThread?.length) {
        setMessages(liveThread)
        setPhase(liveThread.some((message) => message.role === "agent") ? "answered" : "idle")
        return
      }

      setMessages([])
      setPhase("idle")
    },
    []
  )

  const deleteConversation = React.useCallback(
    (id: string) => {
      delete liveConversationThreadsRef.current[id]
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

  const shareConversation = React.useCallback((id: string) => {
    setShareConversationId(id)
    setShareEmail("")
    setShareDialogOpen(true)
  }, [])

  const submitShareConversation = React.useCallback(() => {
    setShareDialogOpen(false)
    setShareConversationId(null)
    setShareEmail("")
  }, [])

  const shareConversationTitle = React.useMemo(() => {
    if (!shareConversationId) return undefined
    return conversations.find((c) => c.id === shareConversationId)?.title
  }, [conversations, shareConversationId])

  const renameConversation = React.useCallback(
    (id: string) => {
      const conversation = conversations.find((c) => c.id === id)
      setRenameConversationId(id)
      setRenameTitle(conversation?.title ?? "")
      setRenameDialogOpen(true)
    },
    [conversations]
  )

  const submitRenameConversation = React.useCallback(() => {
    const trimmed = renameTitle.trim()
    if (!renameConversationId || !trimmed) return

    setConversations((prev) =>
      prev.map((c) =>
        c.id === renameConversationId ? { ...c, title: trimmed, updatedAt: new Date() } : c
      )
    )
    setRenameDialogOpen(false)
    setRenameConversationId(null)
    setRenameTitle("")
  }, [renameConversationId, renameTitle])

  const openNegativeFeedbackDialog = React.useCallback(() => {
    setNegativeFeedback("")
    setNegativeFeedbackDialogOpen(true)
  }, [])

  const submitNegativeFeedback = React.useCallback(() => {
    if (!negativeFeedback.trim()) return
    setNegativeFeedbackDialogOpen(false)
    setNegativeFeedback("")
  }, [negativeFeedback])

  const dismissSuggestedPrompts = React.useCallback(() => {
    dismissSuggestedPromptsPendingRef.current = true
    setShowSuggestedPrompts(false)
  }, [])

  const handleConversationTitleGenerated = React.useCallback((id: string) => {
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === id
          ? { ...conversation, isGeneratingTitle: false }
          : conversation
      )
    )
  }, [])

  const handleSuggestedPromptSelect = React.useCallback((prompt: SuggestedPrompt) => {
    if (!getSuggestedPromptAgentReply(prompt.id)) return
    if (phase === "thinking") return

    const thinkingId = thinkingTimeoutRef.current
    if (thinkingId !== null) {
      window.clearTimeout(thinkingId)
      thinkingTimeoutRef.current = null
    }

    const conversationId = crypto.randomUUID()
    const now = new Date()

    pendingAgentReplyRef.current = { kind: "suggested", promptId: prompt.id }
    setComposerValue("")
    setShowWelcomeScreen(false)
    setShowSuggestedPrompts(false)
    setSuggestedPromptsRemoved(true)
    dismissSuggestedPromptsPendingRef.current = false
    setActiveConversationId(conversationId)

    setConversations((prev) => [
      {
        id: conversationId,
        title: prompt.heading,
        updatedAt: now,
        isGeneratingTitle: true,
      },
      ...prev,
    ])

    setMessages([
      {
        id: crypto.randomUUID(),
        role: "user",
        text: prompt.prompt,
        ts: new Date(),
      },
    ])
    setPhase("thinking")
  }, [phase])

  React.useEffect(() => {
    if (showSuggestedPrompts || !dismissSuggestedPromptsPendingRef.current) return

    const t = window.setTimeout(() => {
      dismissSuggestedPromptsPendingRef.current = false
      setSuggestedPromptsRemoved(true)
    }, SUGGESTED_PROMPT_FADE_MS)

    return () => window.clearTimeout(t)
  }, [showSuggestedPrompts])

  const completeSubmit = React.useCallback(
    (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      setComposerValue("")

      const existingConversationId = activeConversationId
      if (!existingConversationId) {
        const newConversationId = crypto.randomUUID()
        const now = new Date()
        setActiveConversationId(newConversationId)
        setConversations((prev) => [
          {
            id: newConversationId,
            title: ASSISTANT_REPLY_BOX_CONVERSATION_TITLE,
            updatedAt: now,
            isGeneratingTitle: true,
          },
          ...prev,
        ])
      } else {
        setConversations((prev) =>
          prev.map((conversation) =>
            conversation.id === existingConversationId
              ? { ...conversation, updatedAt: new Date() }
              : conversation
          )
        )
      }

      setMessages((prev) => {
        const nextUserCount = prev.filter((m) => m.role === "user").length + 1
        pendingAgentReplyRef.current =
          nextUserCount >= 2 ? { kind: "trends" } : { kind: "initial" }
        return [
          ...prev,
          { id: crypto.randomUUID(), role: "user", text: trimmed, ts: new Date() },
        ]
      })
      setPhase("thinking")
    },
    [activeConversationId]
  )

  const submit = React.useCallback(() => {
    if (phase === "thinking") return

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

    if (!shouldStickToBottomRef.current) return

    const pin = () => {
      el.scrollTop = el.scrollHeight - el.clientHeight
    }
    pin()
    const raf = window.requestAnimationFrame(pin)
    return () => window.cancelAnimationFrame(raf)
  }, [hasMessages, messages.length])

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
        onShareConversation={shareConversation}
        onRenameConversation={renameConversation}
        onConversationTitleGenerated={handleConversationTitleGenerated}
      >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-8">
        {isChatView ? (
          <div
            ref={messagesScrollRef}
            className="min-h-0 flex-1 overflow-auto"
            role="log"
            aria-label="Conversation"
            aria-busy={phase === "thinking"}
            aria-relevant="additions text"
          >
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 pt-6 pb-6">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "animate-in fade-in-0 fill-mode-both duration-300 motion-reduce:animate-none",
                    m.role === "agent" && "slide-in-from-bottom-1"
                  )}
                >
                  <ChatBubble
                    className="mb-0"
                    agent={m.role === "agent"}
                    variant={m.role === "agent" ? "ai-agent" : "default"}
                  >
                    <ChatBubbleMessage
                      timestamp={m.ts}
                      copyText={m.role === "agent" ? m.text : undefined}
                      onGoodResponse={
                        m.role === "agent"
                          ? () => playFeedbackSound(thumbUpSoundUrl)
                          : undefined
                      }
                      onBadResponse={
                        m.role === "agent"
                          ? () => {
                              playFeedbackSound(thumbDownSoundUrl)
                              openNegativeFeedbackDialog()
                            }
                          : undefined
                      }
                      onShareResponse={
                        m.role === "agent"
                          ? () => {
                              if (activeConversationId) {
                                shareConversation(activeConversationId)
                              } else {
                                setShareConversationId(null)
                                setShareEmail("")
                                setShareDialogOpen(true)
                              }
                            }
                          : undefined
                      }
                    >
                      {m.content ?? m.text}
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
          aria-busy={isChatView && phase === "thinking"}
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
                disabled: phase === "thinking",
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
              onSelect={handleSuggestedPromptSelect}
              onDismiss={dismissSuggestedPrompts}
            />
          ) : null}
        </div>
      </div>
      </AssistantOverviewShell>

      <AssistantShareConversationDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        conversationTitle={shareConversationTitle}
        email={shareEmail}
        onEmailChange={setShareEmail}
        onShare={submitShareConversation}
      />

      <AssistantRenameConversationDialog
        open={renameDialogOpen}
        onOpenChange={(open) => {
          setRenameDialogOpen(open)
          if (!open) {
            setRenameConversationId(null)
            setRenameTitle("")
          }
        }}
        title={renameTitle}
        onTitleChange={setRenameTitle}
        onSave={submitRenameConversation}
      />

      <AssistantNegativeFeedbackDialog
        open={negativeFeedbackDialogOpen}
        onOpenChange={(open) => {
          setNegativeFeedbackDialogOpen(open)
          if (!open) setNegativeFeedback("")
        }}
        feedback={negativeFeedback}
        onFeedbackChange={setNegativeFeedback}
        onSubmit={submitNegativeFeedback}
      />
    </Container>
  )
}
