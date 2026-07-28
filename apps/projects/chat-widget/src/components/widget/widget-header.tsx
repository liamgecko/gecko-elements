import { Minus, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@gecko/ui/components/avatar"
import { Button } from "@gecko/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"
import type { AgentProfile, WidgetPhase } from "@/lib/types"

type WidgetHeaderProps = {
  phase: WidgetPhase
  agent: AgentProfile
  onMinimize: () => void
  onClose: () => void
}

export function WidgetHeader({
  phase,
  agent,
  onMinimize,
  onClose,
}: WidgetHeaderProps) {
  if (phase === "conversation") {
    return (
      <header className="relative bg-gray-950 px-6 pt-6 pb-10 text-white">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar size="2xl" className="ring-1 ring-gray-200">
              {agent.avatarSrc ? (
                <AvatarImage src={agent.avatarSrc} alt={agent.name} />
              ) : null}
              <AvatarFallback>{agent.avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-xs text-gray-400">You are speaking with</p>
              <p className="-mt-0.5 truncate text-sm font-medium text-white">
                {agent.name}
              </p>
            </div>
          </div>

          <TooltipProvider>
            <div className="flex shrink-0">
              <HeaderIconButton label="Minimize chat" onClick={onMinimize}>
                <Minus className="size-5" />
              </HeaderIconButton>
              <HeaderIconButton label="Close chat" onClick={onClose}>
                <X className="size-5" />
              </HeaderIconButton>
            </div>
          </TooltipProvider>
        </div>
      </header>
    )
  }

  return (
    <header className="relative bg-gray-950 px-6 pt-6 pb-12 text-white">
      <div className="flex items-start justify-between">
        <img
          src="/gecko.svg"
          alt="Gecko"
          width={48}
          height={36}
          className="mb-6"
        />
        <TooltipProvider>
          <HeaderIconButton label="Minimize chat" onClick={onMinimize}>
            <Minus className="size-5" />
          </HeaderIconButton>
        </TooltipProvider>
      </div>
      <p className="text-sm text-pretty text-white">
        Get quick help with any questions you have. Let us guide you through all
        your inquiries and give you the answers you need.
      </p>
    </header>
  )
}

function HeaderIconButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClick}
            aria-label={label}
            className="text-white hover:bg-white/10 hover:text-white"
          >
            {children}
          </Button>
        }
      />
      <TooltipContent side="bottom">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )
}
