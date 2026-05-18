import * as React from "react"

import { cn } from "@gecko/ui/lib/utils"

export function isBulletListBlock(block: string) {
  const lines = block
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
  return lines.length > 0 && lines.every((l) => l.startsWith("•"))
}

/** Renders agent copy with paragraph breaks and bullet lists. */
export function formatAgentMessageText(text: string) {
  const blocks = text
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter((b) => b.length > 0)

  if (blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const isLast = index === blocks.length - 1
        const spacing = isLast ? "mb-0" : "mb-2"

        if (isBulletListBlock(block)) {
          const bulletLines = block.split("\n").filter((l) => l.trim().startsWith("•"))
          return (
            <ul key={index} className={cn("list-disc pl-5 space-y-1", spacing)}>
              {bulletLines.map((line, j) => (
                <li key={j}>{line.replace(/^\s*•\s*/, "").trim()}</li>
              ))}
            </ul>
          )
        }

        return (
          <p key={index} className={cn("whitespace-pre-wrap", spacing)}>
            {block}
          </p>
        )
      })}
    </>
  )
}

/** Progressive render for streamed agent replies (same block structure as `formatAgentMessageText`). */
export function AgentStreamingReply({
  text,
  charCount,
}: {
  text: string
  charCount: number
}) {
  const slice = text.slice(0, charCount)
  const blocks = slice
    .split(/\n\n+/)
    .map((b) => b.trim())
    .filter((b) => b.length > 0)

  const caret = (
    <span
      className="ms-px inline-block w-2 align-text-bottom animate-pulse text-muted-foreground motion-reduce:animate-none"
      aria-hidden
    >
      ▍
    </span>
  )

  if (blocks.length === 0) {
    return <p className="mb-0">{caret}</p>
  }

  return (
    <>
      {blocks.map((block, index) => {
        const isLast = index === blocks.length - 1
        const spacing = isLast ? "mb-0" : "mb-2"

        if (isBulletListBlock(block)) {
          const bulletLines = block.split("\n").filter((l) => l.trim().startsWith("•"))
          return (
            <React.Fragment key={index}>
              <ul className={cn("list-disc pl-5 space-y-1", spacing)}>
                {bulletLines.map((line, j) => (
                  <li key={j}>{line.replace(/^\s*•\s*/, "").trim()}</li>
                ))}
              </ul>
              {isLast ? caret : null}
            </React.Fragment>
          )
        }

        return (
          <p key={index} className={cn("whitespace-pre-wrap", spacing)}>
            {block}
            {isLast ? caret : null}
          </p>
        )
      })}
    </>
  )
}
