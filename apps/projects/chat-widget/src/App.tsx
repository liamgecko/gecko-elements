import * as React from "react"

import { Label } from "@gecko/ui/components/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@gecko/ui/components/select"
import { Widget } from "@/components/widget"
import type { AgentType } from "@/lib/types"

export default function App() {
  const [agentType, setAgentType] = React.useState<AgentType>("ai")

  return (
    <main className="relative min-h-svh overflow-hidden bg-muted/40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.95_0.02_250),_transparent_55%)]" />
      <div className="relative mx-auto flex min-h-svh max-w-3xl flex-col justify-center gap-8 px-6 py-16">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">
            Prototype host
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-balance">
            Chat widget
          </h1>
          <p className="max-w-xl text-muted-foreground text-pretty">
            Open the launcher to complete the pre-chat form, then chat in place:
            new messages append into available space, AI streams below without
            yanking the viewport, and the jump button appears when content
            continues offscreen. AI replies stream; chat-agent replies arrive
            in full after a short delay.
          </p>
        </div>

        <div className="flex max-w-xs flex-col gap-2">
          <Label htmlFor="agent-type">Demo agent type</Label>
          <Select
            value={agentType}
            onValueChange={(value) => {
              if (value === "ai" || value === "agent") {
                setAgentType(value)
              }
            }}
          >
            <SelectTrigger id="agent-type" className="w-full bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ai">AI agent (streaming)</SelectItem>
              <SelectItem value="agent">Chat agent (no stream)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Host-only control for now — visitor selection comes later. Changing
            type resets the in-widget conversation after you re-submit the form.
          </p>
        </div>
      </div>

      <Widget key={agentType} agentType={agentType} />
    </main>
  )
}
