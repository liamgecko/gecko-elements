import * as React from "react"

import { cn } from "@gecko/ui/lib/utils"

const TITLE_CHAR_INTERVAL_MS = 32

export type TypingConversationTitleProps = {
  text: string
  active: boolean
  onComplete: () => void
  className?: string
}

export function TypingConversationTitle({
  text,
  active,
  onComplete,
  className,
}: TypingConversationTitleProps) {
  const [visibleLength, setVisibleLength] = React.useState(active ? 0 : text.length)
  const completedRef = React.useRef(false)

  React.useEffect(() => {
    completedRef.current = false
    setVisibleLength(active ? 0 : text.length)
  }, [text, active])

  React.useEffect(() => {
    if (!active) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced || text.length === 0) {
      setVisibleLength(text.length)
      if (!completedRef.current) {
        completedRef.current = true
        onComplete()
      }
      return
    }

    if (visibleLength >= text.length) {
      if (!completedRef.current) {
        completedRef.current = true
        onComplete()
      }
      return
    }

    const timeoutId = window.setTimeout(() => {
      setVisibleLength((current) => Math.min(text.length, current + 1))
    }, TITLE_CHAR_INTERVAL_MS)

    return () => window.clearTimeout(timeoutId)
  }, [active, onComplete, text, visibleLength])

  const display = text.slice(0, visibleLength)
  const isTyping = active && visibleLength < text.length

  return (
    <span className={cn("truncate", className)}>
      {display}
      {isTyping ? (
        <span
          className="ms-px inline-block w-2 animate-pulse text-muted-foreground motion-reduce:hidden"
          aria-hidden
        >
          |
        </span>
      ) : null}
    </span>
  )
}
