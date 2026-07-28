import { AnimatePresence, motion } from "motion/react"

import { Conversation } from "./conversation"
import { PreChatForm } from "./pre-chat-form"
import { WidgetHeader } from "./widget-header"
import type { AgentProfile, Visitor, WidgetPhase } from "@/lib/types"

type WidgetPanelProps = {
  isOpen: boolean
  phase: WidgetPhase
  agent: AgentProfile
  visitor: Visitor | null
  onMinimize: () => void
  onClose: () => void
  onFormSubmit: (visitor: Visitor) => void
}

export function WidgetPanel({
  isOpen,
  phase,
  agent,
  visitor,
  onMinimize,
  onClose,
  onFormSubmit,
}: WidgetPanelProps) {
  // Keep the panel mounted while a conversation is active so minimize
  // only hides it — unmounting would wipe the transcript.
  const shouldRender = isOpen || phase === "conversation"

  return (
    <AnimatePresence>
      {shouldRender ? (
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={
            isOpen
              ? { opacity: 1, scale: 1, y: 0, pointerEvents: "auto" }
              : { opacity: 0, scale: 0.92, y: 16, pointerEvents: "none" }
          }
          exit={{ opacity: 0, scale: 0.92, y: 16, pointerEvents: "none" }}
          transition={{
            duration: 0.28,
            ease: [0.4, 0, 0.2, 1],
          }}
          aria-hidden={!isOpen}
          inert={!isOpen ? true : undefined}
          className="absolute right-0 bottom-20 flex h-[calc(100vh-104px-24px)] w-[min(500px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl bg-background shadow-[0_0_20px_rgba(0,0,0,0.1)]"
        >
          <WidgetHeader
            phase={phase}
            agent={agent}
            onMinimize={onMinimize}
            onClose={onClose}
          />
          <div className="relative -mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-2xl bg-background">
            {phase === "form" || !visitor ? (
              <div className="overflow-y-auto">
                <PreChatForm onSubmit={onFormSubmit} />
              </div>
            ) : (
              <Conversation
                key={`${agent.type}-${visitor.email}`}
                agent={agent}
                visitor={visitor}
              />
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
