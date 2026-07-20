import { Bubble, BubbleActions, BubbleContent, BubbleReactions } from "@gecko/ui/components/bubble"
import { Button } from "@gecko/ui/components/button"
import { Message, MessageContent } from "@gecko/ui/components/message"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@gecko/ui/components/popover"
import { MESSAGE_ANIMATIONS } from "@gecko/ui/lib/message-animations"
import { cn } from "@gecko/ui/lib/utils"
import { Reply, SmilePlus } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { useRef, useState } from "react"

import { LiveChatReactionTray } from "./live-chat-reaction-tray"
import { formatReactionLabel } from "./live-chat-reactions"
import { LiveChatMessageBody } from "./live-chat-message-body"
import {
  isStaffMessage,
  type LiveChatMessage,
} from "./live-chat-messages"

type LiveChatMessageItemProps = {
  message: LiveChatMessage
  highlighted?: boolean
  animateEntry?: boolean
  onReact?: (messageId: string, emoji: string) => void
  onReply?: (messageId: string) => void
}

export function LiveChatMessageItem({
  message,
  highlighted = false,
  animateEntry = false,
  onReact,
  onReply,
}: LiveChatMessageItemProps) {
  const shouldReduceMotion = useReducedMotion()
  const [reactionOpen, setReactionOpen] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [suppressActions, setSuppressActions] = useState(false)
  const ignoreEnterRef = useRef(false)
  const isStaff = isStaffMessage(message.role)
  const hasReactions = Boolean(message.reactions?.length)
  const hasActions = Boolean(onReact || onReply)
  const shouldAnimateEntry = animateEntry && !shouldReduceMotion

  function handleReactionOpenChange(open: boolean) {
    setReactionOpen(open)
    if (open) {
      setSuppressActions(false)
      return
    }
    setPickerOpen(false)
  }

  function handleReact(emoji: string) {
    onReact?.(message.id, emoji)
    ignoreEnterRef.current = true
    setSuppressActions(true)
    setPickerOpen(false)
    handleReactionOpenChange(false)
    window.setTimeout(() => {
      ignoreEnterRef.current = false
    }, 150)
  }

  return (
    <motion.div
      data-message-id={message.id}
      className={cn(
        "min-w-0 shrink-0 pb-0 transition-[padding-bottom] duration-200 ease-out motion-reduce:transition-none",
        hasReactions && "pb-2",
      )}
      variants={MESSAGE_ANIMATIONS.pop.variants}
      initial={shouldAnimateEntry ? "initial" : false}
      animate="animate"
      exit={shouldAnimateEntry ? "exit" : undefined}
    >
      <Message>
        <MessageContent className="max-w-full">
          <Bubble
            variant={isStaff ? "default" : "secondary"}
            className="max-w-full"
            onPointerEnter={() => {
              if (ignoreEnterRef.current) return
              setSuppressActions(false)
            }}
            onPointerLeave={() => setSuppressActions(false)}
          >
            <BubbleContent
              className={cn(
                "flex min-w-0 flex-col gap-1.5 text-[13px] transition-shadow duration-200 ease-out motion-reduce:transition-none",
                highlighted && "ring-primary/40 ring-2",
              )}
            >
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="text-foreground font-semibold">{message.name}</span>
                <time
                  dateTime={message.timestamp}
                  className="text-muted-foreground shrink-0 text-2xs font-medium"
                >
                  {message.timestamp}
                </time>
              </div>
              <LiveChatMessageBody text={message.text} />
            </BubbleContent>

            {hasActions ? (
              <BubbleActions
                className={cn(
                  reactionOpen && !suppressActions && "opacity-100",
                  suppressActions &&
                    "pointer-events-none !opacity-0 group-hover/bubble:!opacity-0 group-focus-within/bubble:!opacity-0",
                )}
                aria-label="Message actions"
              >
                {onReply ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground"
                    aria-label="Reply to message"
                    onClick={() => onReply(message.id)}
                  >
                    <Reply strokeWidth={2.25} />
                  </Button>
                ) : null}

                {onReact ? (
                  <Popover open={reactionOpen} onOpenChange={handleReactionOpenChange}>
                    <PopoverTrigger
                      render={
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="text-muted-foreground"
                          aria-label="Add reaction"
                          aria-expanded={reactionOpen}
                        >
                          <SmilePlus strokeWidth={2.25} />
                        </Button>
                      }
                    />
                    <PopoverContent
                      side="top"
                      align="end"
                      sideOffset={8}
                      finalFocus={false}
                      className="w-auto gap-0 overflow-hidden rounded-full p-0"
                    >
                      <LiveChatReactionTray
                        onSelect={handleReact}
                        pickerOpen={pickerOpen}
                        onPickerOpenChange={setPickerOpen}
                      />
                    </PopoverContent>
                  </Popover>
                ) : null}
              </BubbleActions>
            ) : null}

            {hasReactions ? (
              <BubbleReactions
                align="start"
                role="img"
                aria-label={`Reactions: ${formatReactionLabel(message.reactions!)}`}
              >
                {message.reactions!.map((reaction) => (
                  <span key={reaction.emoji} className="inline-flex items-center">
                    {reaction.emoji}
                    {reaction.count > 1 ? (
                      <span className="text-foreground text-2xs ms-0.5">
                        {reaction.count}
                      </span>
                    ) : null}
                  </span>
                ))}
              </BubbleReactions>
            ) : null}
          </Bubble>
        </MessageContent>
      </Message>
    </motion.div>
  )
}
