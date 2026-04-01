"use client"

import * as React from "react"
import { CirclePlus, SendHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import { getReplyBoxAction, replyBoxActionIconProps } from "./reply-box-actions"
import { useReplyBox } from "./reply-box-context"
import type { ReplyBoxActionId } from "./reply-box-actions"

export type ReplyBoxContentProps = {
  placeholder?: string
  /** Only used when variant is `basic`. */
  items?: ReplyBoxActionId[]
  /** Only used when variant is `basic`. */
  showSend?: boolean
  textareaProps?: React.ComponentProps<"textarea">
  inputProps?: React.ComponentProps<"input">
  className?: string
}

export function ReplyBoxContent({
  placeholder,
  items,
  showSend = true,
  textareaProps,
  inputProps,
  className,
}: ReplyBoxContentProps) {
  const { variant, expanded, noteMode } = useReplyBox()
  const resolvedPlaceholder =
    placeholder ?? (noteMode ? "Type your note..." : "Type your message...")

  if (variant === "basic") {
    return (
      <div
        data-slot="reply-box-content"
        className={cn("relative flex items-center gap-2 p-2", className)}
      >
        <input
          data-slot="reply-box-input"
          placeholder={resolvedPlaceholder}
          className="appearance-none w-full min-w-0 bg-transparent border-0 px-2 py-0 text-sm outline-none ring-0 shadow-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground"
          {...inputProps}
        />

        {items?.length ? (
          <div className="flex items-center gap-1">
            {items.map((id) => {
              const action = getReplyBoxAction(id)
              const Icon = action.icon
              return (
                <TooltipProvider key={id}>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button type="button" variant="ghost" size="icon-xs">
                          <Icon {...replyBoxActionIconProps} />
                          <span className="sr-only">{action.label}</span>
                        </Button>
                      }
                    />
                    <TooltipContent side="top">
                      <p>{action.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </div>
        ) : null}

        {showSend ? (
          <Button type="button" size="icon-xs" aria-label="Send">
            {noteMode ? (
              <CirclePlus className="size-4" aria-hidden />
            ) : (
              <SendHorizontal className="size-4" aria-hidden />
            )}
          </Button>
        ) : null}
      </div>
    )
  }

  return (
    <div
      data-slot="reply-box-content"
      className={cn("bg-transparent", className)}
    >
      <textarea
        data-slot="reply-box-textarea"
        placeholder={resolvedPlaceholder}
        className={cn(
          "appearance-none w-full min-w-0 resize-none bg-transparent border-0 text-sm outline-none ring-0 shadow-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground p-4",
          expanded ? "min-h-56 h-full" : "min-h-28",
          noteMode && "bg-transparent"
        )}
        {...textareaProps}
      />
    </div>
  )
}

