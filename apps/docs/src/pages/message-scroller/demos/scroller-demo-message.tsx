import type { ComponentProps } from "react"
import { motion, useReducedMotion } from "motion/react"

import { Bubble, BubbleContent } from "@gecko/ui/components/bubble"
import { Message, MessageContent } from "@gecko/ui/components/message"
import {
  MESSAGE_ANIMATIONS,
  type MessageAnimationPreset,
} from "@gecko/ui/lib/message-animations"
import { MessageScrollerItem } from "@gecko/ui/components/message-scroller"

type DemoMessagePart = {
  type: string
  text?: string
}

type DemoMessage = {
  id: string
  role: string
  text?: string
  parts?: ReadonlyArray<DemoMessagePart>
}

const MotionMessageScrollerItem = motion.create(MessageScrollerItem)

/**
 * Docs-only composition for message-scroller demos.
 * Product code should compose Message + Bubble + MessageScrollerItem directly.
 *
 * Chat-widget alignment: user on the end, AI on the start (overrides inbox defaults).
 */
export function ScrollerDemoMessage({
  message,
  animationPreset = MESSAGE_ANIMATIONS.pop,
  scrollAnchor,
  ...props
}: Omit<
  ComponentProps<typeof MotionMessageScrollerItem>,
  "animate" | "children" | "exit" | "initial" | "messageId" | "variants"
> & {
  animationPreset?: MessageAnimationPreset
  message: DemoMessage
}) {
  const shouldReduceMotion = useReducedMotion()
  const isUserMessage = message.role === "user"
  const textParts = getTextParts(message)

  const row = (
    <Message
      variant={isUserMessage ? "user" : "ai"}
      align={isUserMessage ? "end" : "start"}
    >
      <MessageContent>
        {textParts.map((part) => {
          const paragraphs = part.text
            .split(/\n\s*\n/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean)

          return (
            <Bubble key={part.key}>
              <BubbleContent>
                {paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={`${part.key}-${paragraphIndex}`}>{paragraph}</p>
                ))}
              </BubbleContent>
            </Bubble>
          )
        })}
      </MessageContent>
    </Message>
  )

  if (isUserMessage) {
    return (
      <MotionMessageScrollerItem
        messageId={message.id}
        scrollAnchor={scrollAnchor ?? true}
        variants={animationPreset.variants}
        initial={shouldReduceMotion ? false : "initial"}
        animate="animate"
        exit={shouldReduceMotion ? undefined : "exit"}
        {...props}
      >
        {row}
      </MotionMessageScrollerItem>
    )
  }

  return (
    <MotionMessageScrollerItem
      messageId={message.id}
      scrollAnchor={scrollAnchor}
      initial={false}
      {...props}
    >
      {row}
    </MotionMessageScrollerItem>
  )
}

function getTextParts(message: DemoMessage) {
  if (message.parts) {
    return message.parts.flatMap((part, index) => {
      if (part.type !== "text" || typeof part.text !== "string") {
        return []
      }

      return [{ key: `${message.id}-${index}`, text: part.text }]
    })
  }

  return typeof message.text === "string"
    ? [{ key: `${message.id}-text`, text: message.text }]
    : []
}
