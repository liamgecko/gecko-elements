"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import type { ReplyBoxActionId, ReplyBoxChannel, ReplyBoxChannelType } from "./reply-box-actions"
import { ReplyBoxContext } from "./reply-box-context"

export type ReplyBoxVariant = "chat" | "textarea" | "basic"

type ControllableStateOptions<T> = {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}

function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: ControllableStateOptions<T>) {
  const [uncontrolled, setUncontrolled] = React.useState<T>(defaultValue)
  const isControlled = value !== undefined
  const resolved = isControlled ? (value as T) : uncontrolled
  const setValue = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      const computed =
        typeof next === "function" ? (next as (prev: T) => T)(resolved) : next
      if (!isControlled) setUncontrolled(computed)
      onChange?.(computed)
    },
    [isControlled, onChange, resolved]
  )
  return [resolved, setValue] as const
}

export type ReplyBoxProps = React.ComponentProps<"div"> & {
  variant?: ReplyBoxVariant
  channel?: ReplyBoxChannel
  items?: ReplyBoxActionId[]
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  defaultNoteMode?: boolean
  noteMode?: boolean
  onNoteModeChange?: (noteMode: boolean) => void
}

export type ReplyBoxHeaderProps = {
  channel?: ReplyBoxChannel
  showChannelSwitcher?: boolean
  showExpand?: boolean
}

export type ReplyBoxFooterProps = {
  channelType?: ReplyBoxChannelType
  showTray?: boolean
  items?: ReplyBoxActionId[]
  showSend?: boolean
}

export function ReplyBox({
  className,
  variant = "chat",
  channel,
  items,
  defaultExpanded = false,
  expanded: expandedProp,
  onExpandedChange,
  defaultNoteMode = false,
  noteMode: noteModeProp,
  onNoteModeChange,
  children,
  ...props
}: ReplyBoxProps) {
  const [expanded, setExpanded] = useControllableState<boolean>({
    value: expandedProp,
    defaultValue: defaultExpanded,
    onChange: onExpandedChange,
  })
  const [noteMode, setNoteMode] = useControllableState<boolean>({
    value: noteModeProp,
    defaultValue: defaultNoteMode,
    onChange: onNoteModeChange,
  })

  const toggleExpanded = React.useCallback(() => setExpanded((v) => !v), [setExpanded])
  const toggleNoteMode = React.useCallback(() => setNoteMode((v) => !v), [setNoteMode])

  const [internalChannel, setInternalChannel] = React.useState<ReplyBoxChannel>(() => {
    return channel ?? { type: "live-chat", label: "Select a channel" }
  })

  React.useEffect(() => {
    if (channel) setInternalChannel(channel)
  }, [channel])

  const setChannel = React.useCallback((next: ReplyBoxChannel) => {
    setInternalChannel(next)
  }, [])

  const resolvedChannel = internalChannel

  const useWrappedLayout = variant === "chat"

  const containerClassName = cn(
    "border border-border flex flex-col",
    useWrappedLayout ? "bg-gray-50 rounded-xl shadow-lg" : "bg-white rounded-md",
    variant === "textarea" && "bg-white",
    variant === "basic" && "shadow-md",
    expanded && "h-full",
    className
  )

  const childArray = React.Children.toArray(children)
  const wrappedMain =
    useWrappedLayout && childArray.length > 0
      ? childArray.slice(0, Math.max(1, childArray.length - 1))
      : childArray
  const wrappedFooter =
    useWrappedLayout && childArray.length > 1
      ? childArray[childArray.length - 1]
      : null

  return (
    <ReplyBoxContext.Provider
      value={{
        variant,
        channel: resolvedChannel,
        setChannel,
        expanded,
        toggleExpanded,
        itemsOverride: items,
        noteMode,
        toggleNoteMode,
      }}
    >
      <div
        data-slot="reply-box"
        data-variant={variant}
        data-expanded={expanded ? "true" : undefined}
        data-note={noteMode ? "true" : undefined}
        className={containerClassName}
        {...props}
      >
        {useWrappedLayout ? (
          <>
            <div
              data-slot="reply-box-panel"
              className={cn(
                "border border-border -mt-px -mx-px rounded-xl",
                noteMode ? "bg-yellow-50" : "bg-white"
              )}
            >
              {wrappedMain}
            </div>
            {wrappedFooter}
          </>
        ) : (
          children
        )}
      </div>
    </ReplyBoxContext.Provider>
  )
}

export type { ReplyBoxActionId, ReplyBoxChannel, ReplyBoxChannelType }

