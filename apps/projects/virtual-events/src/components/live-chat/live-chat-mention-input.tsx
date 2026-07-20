import { cn } from "@gecko/ui/lib/utils"
import { forwardRef, useMemo, type ComponentProps } from "react"

import { getDraftTextParts } from "./live-chat-mentions"

type LiveChatMentionInputProps = Omit<ComponentProps<"input">, "className"> & {
  className?: string
}

export const LiveChatMentionInput = forwardRef<
  HTMLInputElement,
  LiveChatMentionInputProps
>(function LiveChatMentionInput({ className, value = "", ...props }, ref) {
  const text = String(value)
  const parts = useMemo(() => getDraftTextParts(text), [text])

  return (
    <div className="relative min-w-0 flex-1">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden px-2 text-sm leading-normal"
      >
        <span className="whitespace-pre">
          {parts.map((part, index) =>
            part.type === "mention" ? (
              <span key={index} className="text-foreground font-medium">
                {part.value}
              </span>
            ) : (
              <span key={index} className="text-foreground">
                {part.value}
              </span>
            ),
          )}
        </span>
      </div>

      <input
        ref={ref}
        data-slot="reply-box-input"
        className={cn(
          "text-foreground caret-foreground relative z-10 appearance-none w-full min-w-0 border-0 bg-transparent px-2 py-0 text-sm leading-normal text-transparent shadow-none outline-none ring-0 placeholder:text-muted-foreground focus:outline-none focus:ring-0",
          className,
        )}
        value={value}
        {...props}
      />
    </div>
  )
})
