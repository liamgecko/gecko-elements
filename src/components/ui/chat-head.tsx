"use client"

import * as React from "react"
import { Check, LockOpen, Trash2 } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type RelativeTimeInput = Date | string | number

function toDate(value: RelativeTimeInput): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function formatRelativeTime(value: RelativeTimeInput, nowDate = new Date()): string {
  const date = toDate(value)
  if (!date) return "now"

  const diffMs = Math.max(0, nowDate.getTime() - date.getTime())
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const year = 365 * day

  if (diffMs < minute) return "now"
  if (diffMs < hour) return `${Math.floor(diffMs / minute)}m`
  if (diffMs < day) return `${Math.floor(diffMs / hour)}h`
  if (diffMs < week) return `${Math.floor(diffMs / day)}d`
  if (diffMs < year) return `${Math.floor(diffMs / week)}w`
  return `${Math.floor(diffMs / year)}y`
}

type ChatHeadAvatar = {
  src?: string
  alt?: string
  fallback?: string
}

export type ChatHeadProps = React.ComponentProps<"div"> & {
  closed?: boolean
}

export type ChatHeadItemProps = Omit<React.ComponentProps<"div">, "children"> & {
  name: string
  messageSnippet: string
  timestamp: Date
  avatar?: ChatHeadAvatar
  isOnline?: boolean
  isAgent?: boolean
  isActive?: boolean
  closed?: boolean
  isUnread?: boolean
}

export const ChatHead = React.forwardRef<HTMLDivElement, ChatHeadProps>(
  ({ className, children, closed, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="chat-head"
        className={cn("space-y-px", className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement<ChatHeadItemProps>(child)) {
            return React.cloneElement(child, {
              closed: child.props.closed ?? closed,
            })
          }
          return child
        })}
      </div>
    )
  }
)

export const ChatHeadItem = React.forwardRef<HTMLDivElement, ChatHeadItemProps>(
  (
    {
      className,
      name,
      messageSnippet,
      timestamp,
      avatar,
      isOnline = false,
      isAgent = false,
      isActive = false,
      closed = false,
      isUnread = false,
      ...props
    },
    ref
  ) => {
    const relativeTime = React.useMemo(() => formatRelativeTime(timestamp), [timestamp])
    const avatarFallback = avatar?.fallback ?? name.slice(0, 2).toUpperCase()
    const preview = isAgent ? messageSnippet : `You: ${messageSnippet}`

    return (
      <div
        ref={ref}
        data-slot="chat-head-item"
        data-active={isActive ? "true" : undefined}
        className={cn(
          "group flex cursor-pointer items-center gap-3 rounded py-3 pl-2 pr-3 transition-colors hover:bg-gray-100",
          isActive && "bg-gray-50 hover:bg-gray-100",
          className
        )}
        {...props}
      >
        <Avatar
          size="lg"
          status={isOnline ? "online" : "offline"}
          notification={isUnread}
        >
          {avatar?.src ? <AvatarImage src={avatar.src} alt={avatar.alt || name} /> : null}
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{name}</p>
          <p className="truncate text-xs text-muted-foreground">{preview}</p>
        </div>

        <div className="relative flex shrink-0 items-center">
          <p className="whitespace-nowrap text-xs font-medium text-muted-foreground transition-opacity duration-200 group-hover:opacity-0">
            {relativeTime}
          </p>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1.5 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
            {closed ? (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button type="button" variant="outline" size="icon-xs" className="size-6">
                          <LockOpen className="size-3" strokeWidth={2.2} />
                          <span className="sr-only">Re-open conversation</span>
                        </Button>
                      }
                    />
                    <TooltipContent side="bottom">
                      <p>Re-open this conversation</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        <Button type="button" variant="outline" size="icon-xs" className="size-6">
                          <Trash2 className="size-3" strokeWidth={2.2} />
                          <span className="sr-only">Delete conversation</span>
                        </Button>
                      }
                    />
                    <TooltipContent side="bottom">
                      <p>Permanently delete this conversation</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button type="button" variant="outline" size="icon-xs" className="size-6">
                        <Check className="size-3" strokeWidth={2.2} />
                        <span className="sr-only">Close conversation</span>
                      </Button>
                    }
                  />
                  <TooltipContent side="bottom">
                    <p>Mark this conversation as closed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    )
  }
)

ChatHead.displayName = "ChatHead"
ChatHeadItem.displayName = "ChatHeadItem"

