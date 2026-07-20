import { Button } from "@gecko/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@gecko/ui/components/popover"
import { cn } from "@gecko/ui/lib/utils"
import { SmilePlus } from "lucide-react"

import { LiveChatEmojiPicker } from "./live-chat-emoji-picker"
import { QUICK_REACTIONS } from "./live-chat-reactions"

type LiveChatReactionTrayProps = {
  onSelect: (emoji: string) => void
  pickerOpen: boolean
  onPickerOpenChange: (open: boolean) => void
  className?: string
}

export function LiveChatReactionTray({
  onSelect,
  pickerOpen,
  onPickerOpenChange,
  className,
}: LiveChatReactionTrayProps) {
  return (
    <div
      role="toolbar"
      aria-label="Quick reactions"
      className={cn("flex items-center p-1", className)}
    >
      {QUICK_REACTIONS.map((emoji) => (
        <Button
          key={emoji}
          type="button"
          variant="ghost"
          size="icon-xs"
          className="hover:bg-muted size-8 text-lg leading-none transition-transform duration-100 ease-out rounded-full"
          aria-label={`React with ${emoji}`}
          onClick={() => onSelect(emoji)}
        >
          <span aria-hidden>{emoji}</span>
        </Button>
      ))}

      <Popover open={pickerOpen} onOpenChange={onPickerOpenChange}>
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={cn(
                "text-muted-foreground size-8 rounded-full",
                pickerOpen && "bg-muted text-foreground",
              )}
              aria-label="Open emoji picker"
              aria-expanded={pickerOpen}
            >
              <SmilePlus strokeWidth={2.25} />
            </Button>
          }
        />
        <PopoverContent
          side="top"
          align="end"
          sideOffset={10}
          finalFocus={false}
          className="w-auto gap-0 overflow-hidden p-0"
        >
          <LiveChatEmojiPicker onSelect={onSelect} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
