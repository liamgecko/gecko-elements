import type { ComponentProps } from "react"
import { motion, useReducedMotion, type Variants } from "motion/react"

import { Avatar, AvatarFallback, AvatarImage } from "@gecko/ui/components/avatar"
import { Bubble, BubbleContent } from "@gecko/ui/components/bubble"
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@gecko/ui/components/message"
import {
  MESSAGE_ANIMATIONS,
  type MessageAnimationPreset,
} from "@gecko/ui/lib/message-animations"
import { MessageScrollerItem } from "@gecko/ui/components/message-scroller"
import type { AgentProfile, ChatMessage } from "@/lib/types"

const MotionMessageScrollerItem = motion.create(MessageScrollerItem)

type ConversationMessageProps = Omit<
  ComponentProps<typeof MotionMessageScrollerItem>,
  "animate" | "children" | "exit" | "initial" | "messageId" | "variants"
> & {
  message: ChatMessage
  agent: AgentProfile
  animationPreset?: MessageAnimationPreset
}

function popVariantsForAlign(align: "start" | "end"): Variants {
  const base = MESSAGE_ANIMATIONS.pop.variants
  const initial = typeof base.initial === "object" ? base.initial : {}

  return {
    ...base,
    initial: {
      ...initial,
      // Pop from the bubble's aligned corner — end for user, start for agent/AI.
      originX: align === "end" ? 1 : 0,
      originY: 1,
    },
  }
}

export function ConversationMessage({
  message,
  agent,
  animationPreset = MESSAGE_ANIMATIONS.pop,
  ...props
}: ConversationMessageProps) {
  const shouldReduceMotion = useReducedMotion()
  const isUser = message.role === "user"
  const align = isUser ? "end" : "start"
  const paragraphs = message.text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  const variants =
    animationPreset.id === "pop"
      ? popVariantsForAlign(align)
      : animationPreset.variants

  return (
    <MotionMessageScrollerItem
      messageId={message.id}
      variants={variants}
      initial={shouldReduceMotion ? false : "initial"}
      animate="animate"
      exit={shouldReduceMotion ? undefined : "exit"}
      {...props}
    >
      <Message variant={isUser ? "user" : agent.type} align={align}>
        {!isUser ? (
          <MessageAvatar>
            <Avatar size="default">
              {agent.avatarSrc ? (
                <AvatarImage src={agent.avatarSrc} alt={agent.name} />
              ) : null}
              <AvatarFallback>{agent.avatarFallback}</AvatarFallback>
            </Avatar>
          </MessageAvatar>
        ) : null}
        <MessageContent>
          <Bubble>
            <BubbleContent>
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => (
                  <p key={`${message.id}-${index}`}>{paragraph}</p>
                ))
              ) : (
                <p className="text-muted-foreground">…</p>
              )}
            </BubbleContent>
          </Bubble>
        </MessageContent>
      </Message>
    </MotionMessageScrollerItem>
  )
}
