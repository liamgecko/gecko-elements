"use client"

import * as React from "react"
import { CirclePlus, SendHorizontal, Square } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"
import { cn } from "@gecko/ui/lib/utils"

import {
  getReplyBoxAction,
  getReplyBoxTrayItemKey,
  isReplyBoxTrayBuiltin,
  replyBoxActionIconProps,
} from "./reply-box-actions"
import { useReplyBox } from "./reply-box-context"
import type { ReplyBoxTrayItem } from "./reply-box-actions"

export type ReplyBoxContentProps = {
  placeholder?: string
  /** Only used when variant is `basic`. */
  items?: ReplyBoxTrayItem[]
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
  const { variant, expanded, noteMode, stopEnabled, onSend, onStop, sendIcon } =
    useReplyBox()
  const resolvedPlaceholder =
    placeholder ?? (noteMode ? "Type your note…" : "Type your message…")
  const accessibleLabel = noteMode ? "Internal note" : "Message"

  const inputClassName =
    inputProps && "className" in inputProps
      ? (inputProps.className as string | undefined)
      : undefined

  if (variant === "basic") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- used for merge order
    const { className: _ignored, ...restInputProps } = inputProps ?? {}

    const showStop = !noteMode && Boolean(stopEnabled && onStop)
    const SendIcon = sendIcon ?? SendHorizontal

    return (
      <div
        data-slot="reply-box-content"
        className={cn("relative flex items-center gap-2 p-2", className)}
      >
        <input
          data-slot="reply-box-input"
          aria-label={accessibleLabel}
          placeholder={resolvedPlaceholder}
          className={cn(
            "appearance-none w-full min-w-0 bg-transparent border-0 px-2 py-0 text-sm outline-none ring-0 shadow-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground",
            inputClassName
          )}
          {...restInputProps}
        />

        {items?.length ? (
          <div className="flex items-center gap-1">
            {items.map((item) => {
              const key = getReplyBoxTrayItemKey(item)

              if (!isReplyBoxTrayBuiltin(item) && item.render) {
                return <React.Fragment key={key}>{item.render}</React.Fragment>
              }

              if (isReplyBoxTrayBuiltin(item)) {
                const action = getReplyBoxAction(item)
                const Icon = action.icon
                return (
                  <TooltipProvider key={key}>
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
              }

              const Icon = item.icon
              return (
                <TooltipProvider key={key}>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          onClick={item.onClick}
                        >
                          <Icon {...replyBoxActionIconProps} />
                          <span className="sr-only">{item.label}</span>
                        </Button>
                      }
                    />
                    <TooltipContent side="top">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </div>
        ) : null}

        {showSend ? (
          <Button
            type="button"
            size="icon-xs"
            aria-label={noteMode ? "Add note" : showStop ? "Stop" : "Send"}
            onClick={() => {
              if (showStop) {
                onStop?.()
                return
              }
              onSend?.()
            }}
          >
            {noteMode ? (
              <CirclePlus className="size-4" aria-hidden />
            ) : showStop ? (
              <Square
                className="size-4"
                fill="currentColor"
                strokeWidth={0}
                aria-hidden
              />
            ) : (
              <SendIcon className="size-4" aria-hidden />
            )}
          </Button>
        ) : null}
      </div>
    )
  }

  const { className: textareaClassFromProps, ...restTextareaProps } =
    textareaProps ?? {}

  return (
    <div
      data-slot="reply-box-content"
      className={cn("bg-transparent", className)}
    >
      <textarea
        data-slot="reply-box-textarea"
        aria-label={accessibleLabel}
        placeholder={resolvedPlaceholder}
        className={cn(
          "appearance-none w-full min-w-0 resize-none bg-transparent border-0 text-sm outline-none ring-0 shadow-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground p-4",
          expanded ? "min-h-56 h-full" : "min-h-28",
          noteMode && "bg-transparent",
          textareaClassFromProps
        )}
        {...restTextareaProps}
      />
    </div>
  )
}
