import { Button } from "@gecko/ui/components/button"
import { useReplyBox } from "@gecko/ui/components/reply-box"
import { cn } from "@gecko/ui/lib/utils"
import { CirclePlus, SendHorizontal } from "lucide-react"
import type { ComponentProps } from "react"

import { LiveChatMentionInput } from "./live-chat-mention-input"

type LiveChatReplyFieldProps = {
  placeholder?: string
  className?: string
  inputProps?: ComponentProps<typeof LiveChatMentionInput>
}

export function LiveChatReplyField({
  placeholder = "Type your message...",
  className,
  inputProps,
}: LiveChatReplyFieldProps) {
  const { noteMode, stopEnabled, onSend, onStop } = useReplyBox()
  const showStop = !noteMode && Boolean(stopEnabled && onStop)

  return (
    <div
      data-slot="reply-box-content"
      className={cn("relative flex items-center gap-2 p-2", className)}
    >
      <LiveChatMentionInput placeholder={placeholder} {...inputProps} />

      <Button
        type="button"
        size="icon-xs"
        aria-label={noteMode ? "Add note" : showStop ? "Stop" : "Send"}
        onClick={() => {
          if (showStop) {
            onStop?.()
            return
          }
          onSend?.()
        }}
      >
        {noteMode ? (
          <CirclePlus className="size-4" aria-hidden />
        ) : (
          <SendHorizontal className="size-4" aria-hidden />
        )}
      </Button>
    </div>
  )
}
