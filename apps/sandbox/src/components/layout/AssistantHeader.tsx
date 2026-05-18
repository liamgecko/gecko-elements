"use client"

import * as React from "react"
import { Archive, BotMessageSquare, Pin } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"
import { cn } from "@gecko/ui/lib/utils"

export type AssistantHeaderProps = React.ComponentProps<"header"> & {
  onNewChat?: () => void
  onPreviousConversations?: () => void
  onPinConversation?: () => void
}

export function AssistantHeader({
  className,
  onNewChat,
  onPreviousConversations,
  onPinConversation,
  ...props
}: AssistantHeaderProps) {
  return (
    <TooltipProvider delay={300}>
      <header
        data-slot="assistant-header"
        className={cn(
          "flex h-[49px] shrink-0 items-center justify-end gap-2 border-b border-border bg-background px-4",
          className
        )}
        {...props}
      >
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Previous conversations"
                onClick={onPreviousConversations}
              >
                <Archive className="size-4" aria-hidden />
              </Button>
            }
          />
          <TooltipContent side="bottom">
            Previous conversations
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Pin conversation"
                onClick={onPinConversation}
              >
                <Pin className="size-4" aria-hidden />
              </Button>
            }
          />
          <TooltipContent side="bottom">
            Pin conversation
          </TooltipContent>
        </Tooltip>

        <Button
          type="button"
          variant="default"
          onClick={onNewChat}
        >
          <BotMessageSquare />
          New chat
        </Button>
      </header>
    </TooltipProvider>
  )
}
