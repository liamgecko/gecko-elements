"use client"

import * as React from "react"
import { Maximize2, Minimize2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { useReplyBox } from "./reply-box-context"
import type { ReplyBoxChannel, ReplyBoxChannelType } from "./reply-box-actions"

export type ReplyBoxHeaderProps = React.ComponentProps<"div"> & {
  showChannelSwitcher?: boolean
  showExpand?: boolean
  channels?: { type: ReplyBoxChannelType; label: string }[]
  channel?: ReplyBoxChannel
}

export function ReplyBoxHeader({
  showChannelSwitcher = false,
  showExpand = false,
  channels,
  channel: channelProp,
  className,
  ...props
}: ReplyBoxHeaderProps) {
  const ctx = useReplyBox()
  const channel = channelProp ?? ctx.channel
  const expanded = ctx.expanded
  const toggleExpanded = ctx.toggleExpanded

  const [open, setOpen] = React.useState(false)

  const options = React.useMemo(
    () =>
      channels ??
      ([
        { type: "live-chat", label: "Live chat" },
        { type: "email", label: "Email" },
        { type: "live-chat", label: "WhatsApp" },
      ] as const),
    [channels]
  )

  const selectedKey = `${channel.type}:${channel.label}`

  return (
    <div
      data-slot="reply-box-header"
      className={[
        "flex items-center justify-between gap-2 px-2 py-2 border-b border-border",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {showChannelSwitcher ? (
        <DropdownMenu
          searchable
          searchPlaceholder="Search channels..."
          open={open}
          onOpenChange={setOpen}
        >
          <DropdownMenuTrigger
            render={
              <Button type="button" variant="ghost" size="sm" dropdown className="px-1.5">
                <span className="truncate">{channel.label || "Select a channel"}</span>
              </Button>
            }
          />
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuRadioGroup
                value={selectedKey}
                onValueChange={(value) => {
                  const next = options.find((c) => `${c.type}:${c.label}` === value)
                  if (next) ctx.setChannel(next)
                  setOpen(false)
                }}
              >
                {options.map((c) => (
                  <DropdownMenuRadioItem
                    key={`${c.type}:${c.label}`}
                    value={`${c.type}:${c.label}`}
                  >
                    {c.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div />
      )}

      {showExpand ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={expanded ? "Contract reply box" : "Expand reply box"}
                  onClick={toggleExpanded}
                >
                  {expanded ? (
                    <Minimize2 className="size-3.5" strokeWidth={2.2} />
                  ) : (
                    <Maximize2 className="size-3.5" strokeWidth={2.2} />
                  )}
                </Button>
              }
            />
            <TooltipContent side="top">
              <p>{expanded ? "Return to default view" : "Maximize reply box"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : null}
    </div>
  )
}

