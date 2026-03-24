"use client"

import * as React from "react"
import { Check, CheckCheck, CircleAlert, Info } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type RelativeTimeInput = Date | string | number
type ChatBubbleContextValue = {
  agent: boolean
  variant: ChatBubbleVariant
}

const ChatBubbleContext = React.createContext<ChatBubbleContextValue | null>(null)

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

export type ChatBubbleProps = React.ComponentProps<"div"> & {
  agent?: boolean
  variant?: ChatBubbleVariant
}

export type ChatBubbleVariant = "default" | "note"

export function ChatBubble({
  className,
  children,
  agent,
  variant = "default",
  ...props
}: ChatBubbleProps) {
  const resolvedAgent = agent ?? (variant === "note")

  return (
    <ChatBubbleContext.Provider value={{ agent: resolvedAgent, variant }}>
      <div
        data-slot="chat-bubble"
        data-agent={resolvedAgent ? "true" : undefined}
        data-variant={variant}
        className={cn(
          "group/chat-bubble flex items-end gap-2 mb-4",
          resolvedAgent ? "flex-row-reverse" : "flex-row",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ChatBubbleContext.Provider>
  )
}

export type ChatBubbleAvatarProps = {
  avatarSrc?: string
  avatarAlt?: string
  avatarFallback?: React.ReactNode
  src?: string
  alt?: string
  fallback?: React.ReactNode
  className?: string
}

export function ChatBubbleAvatar({
  avatarSrc,
  avatarAlt,
  avatarFallback,
  src,
  alt,
  fallback,
  className,
}: ChatBubbleAvatarProps) {
  const resolvedSrc = src ?? avatarSrc
  const resolvedAlt = alt ?? avatarAlt
  const resolvedFallback = fallback ?? avatarFallback ?? "U"
  return (
    <Avatar
      size="md"
      className={cn(
        "bg-muted relative group-has-[[data-slot=chat-bubble-message][data-status=failed]]/chat-bubble:-top-5",
        className
      )}
    >
      {resolvedSrc ? (
        <AvatarImage src={resolvedSrc} alt={resolvedAlt ?? "Message sender avatar"} />
      ) : null}
      <AvatarFallback className="text-muted-foreground">
        {resolvedFallback}
      </AvatarFallback>
    </Avatar>
  )
}

export type ChatBubbleMessageStatus = "sent" | "delivered" | "read" | "failed"

export type ChatBubbleMessageProps = React.ComponentProps<"div"> & {
  timestamp: Date
  status?: ChatBubbleMessageStatus
  info?: React.ReactNode
}

export function ChatBubbleMessage({
  className,
  children,
  timestamp,
  status,
  info,
  ...props
}: ChatBubbleMessageProps) {
  const context = React.useContext(ChatBubbleContext)

  if (!context) {
    throw new Error("ChatBubbleMessage must be used within ChatBubble.")
  }

  const relativeTime = React.useMemo(() => formatRelativeTime(timestamp), [timestamp])

  const statusIndicator = React.useMemo(() => {
    if (!context.agent || !status || context.variant === "note") return null

    const config = {
      sent: {
        icon: <Check className="text-muted-foreground size-3" aria-hidden strokeWidth={2.2} />,
        label: "This message has been sent",
      },
      delivered: {
        icon: <CheckCheck className="text-muted-foreground size-3" aria-hidden strokeWidth={2.2} />,
        label: "This message has been delivered",
      },
      read: {
        icon: <CheckCheck className="text-blue-600 size-3" aria-hidden strokeWidth={2.2} />,
        label: "This message has been read",
      },
      failed: {
        icon: <CircleAlert className="text-red-700 size-3" aria-hidden strokeWidth={2.2} />,
        label: "This message failed to send because 'X'",
      },
    } as const

    const statusConfig = config[status]

    return (
      <Tooltip>
        <TooltipTrigger className="flex">
          <span className="inline-flex" aria-label={`${status} status`}>
            {statusConfig.icon}
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{statusConfig.label}</p>
        </TooltipContent>
      </Tooltip>
    )
  }, [context.agent, context.variant, status])

  return (
    <div
      data-slot="chat-bubble-message"
      data-status={status}
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      <div
        className={cn(
          "bg-muted rounded px-4 py-2 text-sm wrap-break-word",
          context.agent && "bg-blue-50",
          context.variant === "note" && "bg-yellow-100 text-yellow-950",
          status === "failed" && "bg-red-50 text-red-700"
        )}
      >
        <div className="flex flex-col gap-1">
          <p>{children}</p>
          <div
            className={cn(
              "flex items-center gap-2",
              context.agent ? "justify-end" : "justify-start"
            )}
          >
            {context.agent ? (
              <>
                {statusIndicator}
                <p className="text-muted-foreground text-xs">{relativeTime}</p>
                {info}
              </>
            ) : (
              <>
                {info}
                <p className="text-muted-foreground text-xs">{relativeTime}</p>
              </>
            )}
          </div>
        </div>
      </div>
      {context.agent && status === "failed" && context.variant !== "note" ? (
        <p className="text-red-700 text-xs">
          This message failed to send -{" "}
          <a href="#" className="underline hover:text-red-800">
            Resend message
          </a>
        </p>
      ) : null}
    </div>
  )
}

type ChatBubbleReference = {
  title: string
  url: string
}

type ChatBubbleSourceInfo = {
  source: string
  references?: ChatBubbleReference[]
}

export type ChatBubbleUserMessageInfo = {
  channel?: string
  page?: {
    title: string
    url: string
  }
  receivedAt?: string
  sentTo?: string | string[]
  cc?: string | string[]
}

export type ChatBubbleAgentMessageInfo = {
  source?: ChatBubbleSourceInfo
  channel?: string
  receivedAt?: string
}

export type ChatBubbleInfoProps = {
  userInfo?: ChatBubbleUserMessageInfo
  agentInfo?: ChatBubbleAgentMessageInfo
  className?: string
}

function ChatBubbleInfoRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <>
      <span className="font-medium text-muted-foreground">{label}:</span>
      <div>{children}</div>
    </>
  )
}

function renderEmailList(value: string | string[] | undefined) {
  if (!value) return null

  const emails = Array.isArray(value) ? value : [value]

  return (
    <div className="flex flex-col gap-0.5">
      {emails.map((email) => (
        <a
          key={email}
          href={`mailto:${email}`}
          className="text-blue-700 hover:underline"
        >
          {email}
        </a>
      ))}
    </div>
  )
}

function renderSourceInfo(source: ChatBubbleSourceInfo | undefined) {
  if (!source) return null

  return (
    <div className="flex flex-col gap-0.5">
      <span>{source.source}</span>
      {source.references?.map((ref) => (
        <a
          key={ref.url}
          href={ref.url}
          className="text-blue-700 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {ref.title}
        </a>
      ))}
    </div>
  )
}

export function ChatBubbleInfo({
  userInfo,
  agentInfo,
  className,
}: ChatBubbleInfoProps) {
  const context = React.useContext(ChatBubbleContext)
  if (!context) {
    throw new Error("ChatBubbleInfo must be used within ChatBubble.")
  }

  const isAgent = context.agent
  const hasUserInfo = !!(
    userInfo?.channel ||
    userInfo?.page ||
    userInfo?.receivedAt ||
    userInfo?.sentTo ||
    userInfo?.cc
  )
  const hasAgentInfo = !!(
    agentInfo?.source ||
    agentInfo?.channel ||
    agentInfo?.receivedAt
  )

  const shouldRender = isAgent ? hasAgentInfo : hasUserInfo
  if (!shouldRender) return null

  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            className={cn(
              "inline-flex items-center text-muted-foreground hover:text-foreground",
              className
            )}
            aria-label="Message information"
          >
            <Info className="size-3" strokeWidth={2.2} />
          </button>
        }
      />
      <PopoverContent className="w-auto p-4">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-xs text-foreground">
          {isAgent ? (
            <>
              <ChatBubbleInfoRow label="Source">
                {renderSourceInfo(agentInfo?.source)}
              </ChatBubbleInfoRow>
              <ChatBubbleInfoRow label="Channel">
                {agentInfo?.channel}
              </ChatBubbleInfoRow>
              <ChatBubbleInfoRow label="Sent">
                {agentInfo?.receivedAt}
              </ChatBubbleInfoRow>
            </>
          ) : (
            <>
              <ChatBubbleInfoRow label="Channel">
                {userInfo?.channel}
              </ChatBubbleInfoRow>
              <ChatBubbleInfoRow label="Page">
                {userInfo?.page ? (
                  <a
                    href={userInfo.page.url}
                    className="text-blue-700 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userInfo.page.title}
                  </a>
                ) : null}
              </ChatBubbleInfoRow>
              <ChatBubbleInfoRow label="Received">
                {userInfo?.receivedAt}
              </ChatBubbleInfoRow>
              <ChatBubbleInfoRow label="Sent to">
                {renderEmailList(userInfo?.sentTo)}
              </ChatBubbleInfoRow>
              <ChatBubbleInfoRow label="CC">
                {renderEmailList(userInfo?.cc)}
              </ChatBubbleInfoRow>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

