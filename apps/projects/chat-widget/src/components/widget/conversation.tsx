import * as React from "react"
import { AnimatePresence } from "motion/react"

import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScrollerScrollable,
} from "@gecko/ui/components/message-scroller"
import { ReplyBox, ReplyBoxContent } from "@gecko/ui/components/reply-box"
import { cn } from "@gecko/ui/lib/utils"
import { ConversationMessage } from "./conversation-message"
import {
  THINKING_DELAY_MS,
  THINKING_ENTER_DELAY_MS,
  THINKING_EXIT_MS,
  THINKING_POST_EXIT_DELAY_MS,
  ThinkingMarkerSlot,
} from "./thinking-marker"
import { getGreeting, getReply } from "@/lib/replies"
import { deliverAgentReply, streamText, wait } from "@/lib/reply-delivery"
import type { AgentProfile, ChatMessage, Visitor } from "@/lib/types"

/** Brief pause before the first intro message — no thinking marker. */
const INTRO_DELAY_MS = 1000

type ConversationProps = {
  agent: AgentProfile
  visitor: Visitor
}

export function Conversation({ agent, visitor }: ConversationProps) {
  return (
    <MessageScrollerProvider autoScroll defaultScrollPosition="start">
      <ConversationTranscript agent={agent} visitor={visitor} />
    </MessageScrollerProvider>
  )
}

function ConversationTranscript({ agent, visitor }: ConversationProps) {
  const scrollable = useMessageScrollerScrollable()
  const [messages, setMessages] = React.useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = React.useState("")
  const [isBusy, setIsBusy] = React.useState(false)
  const [isThinking, setIsThinking] = React.useState(false)
  const [userScrolledAway, setUserScrolledAway] = React.useState(false)
  const abortRef = React.useRef<AbortController | null>(null)

  // Jump control is only for deliberate scroll-away — not layout/stream flicker.
  React.useEffect(() => {
    if (!scrollable.end) setUserScrolledAway(false)
  }, [scrollable.end])

  function handleViewportScroll(event: React.UIEvent<HTMLDivElement>) {
    if (event.currentTarget.hasAttribute("data-autoscrolling")) return
    setUserScrolledAway(true)
  }

  const showJumpButton = userScrolledAway && scrollable.end

  async function runThinking(signal: AbortSignal) {
    try {
      await wait(THINKING_ENTER_DELAY_MS, signal)
      setIsThinking(true)
      await wait(THINKING_DELAY_MS, signal)
      setIsThinking(false)
      await wait(THINKING_EXIT_MS, signal)
      await wait(THINKING_POST_EXIT_DELAY_MS, signal)
    } catch (error) {
      setIsThinking(false)
      throw error
    }
  }

  async function deliverAssistantReply(
    reply: string,
    signal: AbortSignal,
    options?: { withThinking?: boolean }
  ) {
    if (options?.withThinking !== false) {
      await runThinking(signal)
      if (signal.aborted) return
    } else {
      await wait(INTRO_DELAY_MS, signal)
      if (signal.aborted) return
    }

    const replyId = crypto.randomUUID()

    if (agent.type === "ai") {
      setMessages((prev) => [
        ...prev,
        { id: replyId, role: "assistant", text: "" },
      ])
      await streamText(
        reply,
        (text) => {
          setMessages((prev) =>
            prev.map((message) =>
              message.id === replyId ? { ...message, text } : message
            )
          )
        },
        { signal }
      )
      return
    }

    await deliverAgentReply(
      reply,
      (text) => {
        setMessages((prev) => [
          ...prev,
          { id: replyId, role: "assistant", text },
        ])
      },
      { delayMs: 0, signal }
    )
  }

  React.useEffect(() => {
    const controller = new AbortController()
    abortRef.current = controller
    const greeting = getGreeting(visitor.name, agent)

    setIsBusy(true)
    setMessages([])

    void deliverAssistantReply(greeting, controller.signal, {
      withThinking: false,
    })
      .catch(() => undefined)
      .finally(() => {
        if (!controller.signal.aborted) setIsBusy(false)
      })

    return () => {
      controller.abort()
      setIsThinking(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- greeting keyed to agent + visitor
  }, [agent, visitor.name])

  async function sendReply(userText: string) {
    const controller = new AbortController()
    abortRef.current?.abort()
    abortRef.current = controller
    setIsBusy(true)

    try {
      await deliverAssistantReply(getReply(userText, agent), controller.signal)
    } catch {
      // Aborted — ignore.
    }

    if (!controller.signal.aborted) setIsBusy(false)
  }

  function handleSend() {
    const text = inputValue.trim()
    if (!text || isBusy) return

    const messageId = crypto.randomUUID()
    setInputValue("")
    setMessages((prev) => [...prev, { id: messageId, role: "user", text }])
    void sendReply(text)
  }

  function handleStop() {
    abortRef.current?.abort()
    setIsThinking(false)
    setIsBusy(false)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-hidden">
        <MessageScroller>
          <MessageScrollerViewport onScroll={handleViewportScroll}>
            <MessageScrollerContent aria-busy={isBusy} className="gap-4 p-4">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <ConversationMessage
                    key={message.id}
                    message={message}
                    agent={agent}
                  />
                ))}
              </AnimatePresence>
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton
            className={cn(
              !showJumpButton &&
                "pointer-events-none opacity-0 translate-y-full scale-95 data-[active=true]:opacity-0 data-[active=true]:translate-y-full data-[active=true]:scale-95"
            )}
          />
        </MessageScroller>
      </div>

      <div className="shrink-0">
        <ThinkingMarkerSlot visible={isThinking} />
        <div className="px-4 pb-4">
          <ReplyBox
            variant="basic"
            onSend={handleSend}
            stopEnabled={isBusy && agent.type === "ai"}
            onStop={handleStop}
          >
            <ReplyBoxContent
              inputProps={{
                value: inputValue,
                onChange: (event) => setInputValue(event.target.value),
                onKeyDown: (event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault()
                    handleSend()
                  }
                },
                disabled: isBusy && messages.every((message) => !message.text),
                "aria-label": "Message",
              }}
            />
          </ReplyBox>
        </div>
      </div>
    </div>
  )
}
