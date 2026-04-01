"use client"

import * as React from "react"
import { CirclePlus, SendHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { getDefaultReplyBoxItems } from "./reply-box-actions"
import { useReplyBox } from "./reply-box-context"
import type { ReplyBoxActionId, ReplyBoxChannelType } from "./reply-box-actions"
import { ReplyBoxButtonTray } from "./reply-box-button-tray"

export type ReplyBoxFooterProps = React.ComponentProps<"div"> & {
  channelType?: ReplyBoxChannelType
  items?: ReplyBoxActionId[]
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
        <Button type="button" size="icon-xs" aria-label="Send">
          {resolvedNoteMode ? (
            <CirclePlus className="size-4" aria-hidden />
          ) : (
            <SendHorizontal className="size-4" aria-hidden />
          )}
        </Button>
      ) : null}
    </div>
  )
}

