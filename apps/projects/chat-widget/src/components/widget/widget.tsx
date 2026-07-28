import * as React from "react"

import { AGENT_PROFILES } from "@/lib/replies"
import type { AgentType, Visitor, WidgetPhase } from "@/lib/types"
import { WidgetPanel } from "./widget-panel"
import { WidgetTrigger } from "./widget-trigger"

export type WidgetProps = {
  /** Deferred product decision — for now pass from the host demo page. */
  agentType?: AgentType
}

export function Widget({ agentType = "ai" }: WidgetProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [phase, setPhase] = React.useState<WidgetPhase>("form")
  const [visitor, setVisitor] = React.useState<Visitor | null>(null)
  const agent = AGENT_PROFILES[agentType]

  function handleMinimize() {
    setIsOpen(false)
  }

  function handleClose() {
    setIsOpen(false)
    setPhase("form")
    setVisitor(null)
  }

  function handleFormSubmit(nextVisitor: Visitor) {
    setVisitor(nextVisitor)
    setPhase("conversation")
  }

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <WidgetPanel
        isOpen={isOpen}
        phase={phase}
        agent={agent}
        visitor={visitor}
        onMinimize={handleMinimize}
        onClose={handleClose}
        onFormSubmit={handleFormSubmit}
      />
      <WidgetTrigger
        isOpen={isOpen}
        onToggle={() => setIsOpen((open) => !open)}
      />
    </div>
  )
}
