"use client"

import type { LucideIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@gecko/ui/lib/utils"
import { useControllableState } from "@gecko/ui/hooks/use-controllable-state"
import type {
  ReplyBoxActionId,
  ReplyBoxChannel,
  ReplyBoxChannelType,
  ReplyBoxTrayCustomAction,
  ReplyBoxTrayItem,
} from "./reply-box-actions"
import { ReplyBoxContext } from "./reply-box-context"
import { ReplyBoxFooter } from "./reply-box-footer"

export type ReplyBoxVariant = "chat" | "textarea" | "basic"

export type ReplyBoxProps = React.ComponentProps<"div"> & {
  variant?: ReplyBoxVariant
  channel?: ReplyBoxChannel
  items?: ReplyBoxTrayItem[]
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  defaultNoteMode?: boolean
  noteMode?: boolean
  onNoteModeChange?: (noteMode: boolean) => void
  onSend?: () => void
  sendIcon?: LucideIcon
  stopEnabled?: boolean
  onStop?: () => void
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
  onSend,
  sendIcon,
  stopEnabled,
  onStop,
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

  const toggleExpanded = React.useCallback(
    () => setExpanded((v) => !v),
    [setExpanded]
  )
  const toggleNoteMode = React.useCallback(
    () => setNoteMode((v) => !v),
    [setNoteMode]
  )

  const [internalChannel, setInternalChannel] = React.useState<ReplyBoxChannel>(
    () => {
      return channel ?? { type: "live-chat", label: "Select a channel" }
    }
  )

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- channel data is synchronized by the integrating application
    if (channel) setInternalChannel(channel)
  }, [channel])

  const setChannel = React.useCallback((next: ReplyBoxChannel) => {
    setInternalChannel(next)
  }, [])

  const resolvedChannel = internalChannel

  const useWrappedLayout = variant === "chat"

  const containerClassName = cn(
    "border border-border flex flex-col",
    useWrappedLayout
      ? "bg-muted rounded-xl shadow-lg"
      : "bg-background rounded-md",
    variant === "textarea" && "bg-background",
    variant === "basic" &&
      "shadow-md transition-[border-color] has-[[data-slot=reply-box-input]:focus]:border-ring",
    expanded && "h-full",
    className
  )

  const childArray = React.Children.toArray(children)
  const footerIndex = useWrappedLayout
    ? childArray.findIndex(
        (child) => React.isValidElement(child) && child.type === ReplyBoxFooter
      )
    : -1
  const wrappedMain =
    footerIndex >= 0
      ? childArray.filter((_, index) => index !== footerIndex)
      : childArray
  const wrappedFooter = footerIndex >= 0 ? childArray[footerIndex] : null

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
        onSend,
        sendIcon,
        stopEnabled,
        onStop,
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
                noteMode ? "bg-warning-muted" : "bg-background"
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

export type {
  ReplyBoxActionId,
  ReplyBoxChannel,
  ReplyBoxChannelType,
  ReplyBoxTrayCustomAction,
  ReplyBoxTrayItem,
}
