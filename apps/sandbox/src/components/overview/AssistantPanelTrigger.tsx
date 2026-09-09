import { PanelRightClose, PanelRightOpen } from "lucide-react"

import { Button } from "@geckolabs/elements/components/button"
import { useSidebar } from "@geckolabs/elements/components/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@geckolabs/elements/components/tooltip"
import { cn } from "@geckolabs/elements/lib/utils"

export type AssistantPanelTriggerProps = {
  className?: string
}

export function AssistantPanelTrigger({ className }: AssistantPanelTriggerProps) {
  const { toggleSidebar, state } = useSidebar()
  const expanded = state === "expanded"
  const Icon = expanded ? PanelRightClose : PanelRightOpen
  const label = expanded ? "Collapse sidebar" : "Expand sidebar"

  const button = (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      className={cn(
        "shrink-0 aria-expanded:bg-transparent aria-expanded:hover:bg-muted aria-expanded:text-foreground",
        className
      )}
      aria-label={label}
      aria-expanded={expanded}
      onClick={toggleSidebar}
    >
      <Icon aria-hidden />
    </Button>
  )

  return (
    <Tooltip>
      <TooltipTrigger render={button} />
      <TooltipContent side="bottom" align="center">
        {label}
      </TooltipContent>
    </Tooltip>
  )
}
