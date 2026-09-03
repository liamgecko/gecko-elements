"use client"

import * as React from "react"
import { CirclePlus, SendHorizontal, Square } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import { cn } from "@gecko/ui/lib/utils"

import { getDefaultReplyBoxItems } from "./reply-box-actions"
import { useReplyBox } from "./reply-box-context"
import type { ReplyBoxChannelType, ReplyBoxTrayItem } from "./reply-box-actions"
import { ReplyBoxButtonTray } from "./reply-box-button-tray"

export type ReplyBoxFooterProps = React.ComponentProps<"div"> & {
  channelType?: ReplyBoxChannelType
  items?: ReplyBoxTrayItem[]
  showTray?: boolean
  showSend?: boolean
}

export function ReplyBoxFooter({
  channelType,
  items,
  showTray = false,
  showSend = true,
  className,
  ...props
}: ReplyBoxFooterProps) {
  const ctx = useReplyBox()

  const resolvedItems = React.useMemo(() => {
    return (
      items ??
      ctx.itemsOverride ??
      getDefaultReplyBoxItems(channelType ?? ctx.channel.type ?? "live-chat")
    )
  }, [channelType, ctx.channel.type, ctx.itemsOverride, items])

  const resolvedNoteMode = ctx.noteMode
  const showStop = !resolvedNoteMode && Boolean(ctx.stopEnabled && ctx.onStop)
  const SendIcon = ctx.sendIcon ?? SendHorizontal

  return (
    <div
      data-slot="reply-box-footer"
      className={cn(
        "flex items-center justify-between gap-3 px-2 py-2",
        ctx.variant === "textarea" && "border-t border-border",
        className
      )}
      {...props}
    >
      {showTray ? (
        <ReplyBoxButtonTray items={resolvedItems} className="min-w-0 flex-1" />
      ) : (
        <div />
      )}

      {showSend ? (
        <Button
          type="button"
          variant={showStop ? "ghost" : "default"}
          size="icon-xs"
          className={cn(
            "transition-colors duration-150 ease-out motion-reduce:transition-none",
            showStop &&
              "bg-background text-foreground hover:bg-muted hover:text-foreground"
          )}
          aria-label={
            resolvedNoteMode ? "Add note" : showStop ? "Stop" : "Send"
          }
          onClick={() => {
            if (showStop) {
              ctx.onStop?.()
              return
            }
            ctx.onSend?.()
          }}
        >
          <span
            className="relative flex size-4 shrink-0 items-center justify-center"
            aria-hidden
          >
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out motion-reduce:transition-none",
                resolvedNoteMode
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              )}
            >
              <CirclePlus className="size-4" />
            </span>
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out motion-reduce:transition-none",
                showStop ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            >
              <Square
                className="size-4 shrink-0"
                fill="currentColor"
                strokeWidth={0}
              />
            </span>
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-out motion-reduce:transition-none",
                !resolvedNoteMode && !showStop
                  ? "opacity-100"
                  : "pointer-events-none opacity-0"
              )}
            >
              <SendIcon className="size-4" />
            </span>
          </span>
        </Button>
      ) : null}
    </div>
  )
}
