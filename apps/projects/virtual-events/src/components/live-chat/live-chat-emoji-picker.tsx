import { EmojiPicker } from "frimousse"
import { Children, isValidElement, type CSSProperties, type ReactNode } from "react"

import { cn } from "@gecko/ui/lib/utils"

import "./live-chat-emoji-picker.css"

const EMOJI_COLUMNS = 9

type LiveChatEmojiPickerProps = {
  onSelect: (emoji: string) => void
  className?: string
}

function hasVisibleEmojis(children: ReactNode) {
  return Children.toArray(children).some(
    (child) =>
      isValidElement<{ emoji?: { emoji?: string } }>(child) &&
      Boolean(child.props.emoji?.emoji),
  )
}

function getRowStyle(style?: CSSProperties): CSSProperties {
  return {
    ...style,
    display: "grid",
    gridTemplateColumns: `repeat(${EMOJI_COLUMNS}, minmax(0, 1fr))`,
    alignItems: "center",
    gap: 0,
  }
}

export function LiveChatEmojiPicker({ onSelect, className }: LiveChatEmojiPickerProps) {
  return (
    <EmojiPicker.Root
      className={cn("live-chat-emoji-picker flex h-[300px] w-[352px] flex-col bg-popover", className)}
      columns={EMOJI_COLUMNS}
      sticky={false}
      onEmojiSelect={({ emoji }) => onSelect(emoji)}
    >
      <div className="border-border border-b px-3 py-2">
        <EmojiPicker.Search
          placeholder="Search for an emoji...."
          className="border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-sm border px-2.5 py-1.5 text-sm outline-none focus-visible:ring-3"
        />
      </div>

      <EmojiPicker.Viewport className="min-h-0 flex-1 overflow-y-auto outline-none">
        <EmojiPicker.Loading className="text-muted-foreground flex items-center justify-center p-6 text-sm">
          Loading…
        </EmojiPicker.Loading>
        <EmojiPicker.Empty className="text-muted-foreground flex items-center justify-center p-6 text-sm">
          No emoji found.
        </EmojiPicker.Empty>
        <EmojiPicker.List
          className="select-none"
          components={{
            CategoryHeader: ({ category, className: categoryClassName, style, ...props }) => (
              <div
                {...props}
                className={cn(
                  "bg-popover text-foreground flex items-center px-3 py-1 text-xs font-semibold capitalize",
                  categoryClassName,
                )}
                style={{ ...style, height: "auto" }}
              >
                {category.label}
              </div>
            ),
            Row: ({ children, className: rowClassName, style, ...props }) => {
              if (!hasVisibleEmojis(children)) {
                return null
              }

              return (
                <div
                  {...props}
                  className={cn("px-1", rowClassName)}
                  style={getRowStyle(style)}
                >
                  {children}
                </div>
              )
            },
            Emoji: ({ emoji, className: emojiClassName, ...props }) => (
              <button
                type="button"
                className={cn(
                  "hover:bg-muted data-[active=true]:bg-muted mx-auto flex size-7 items-center justify-center rounded-sm text-lg leading-none",
                  emojiClassName,
                )}
                data-active={emoji.isActive || undefined}
                {...props}
              >
                {emoji.emoji}
              </button>
            ),
          }}
        />
      </EmojiPicker.Viewport>

      <div className="border-border flex min-h-11 items-center justify-between gap-3 border-t px-3 py-2">
        <EmojiPicker.ActiveEmoji>
          {({ emoji }) =>
            emoji ? (
              <div className="flex min-w-0 items-center gap-2">
                <span className="text-2xl leading-none">{emoji.emoji}</span>
                <span className="text-muted-foreground truncate text-xs capitalize">
                  {emoji.label}
                </span>
              </div>
            ) : (
              <span className="text-muted-foreground text-xs">Select an emoji</span>
            )
          }
        </EmojiPicker.ActiveEmoji>

        <div className="hover:bg-muted flex shrink-0 items-center gap-1.5 rounded-sm px-2 py-1">
          <EmojiPicker.SkinToneSelector
            className="text-muted-foreground flex items-center justify-center p-0 text-lg hover:bg-transparent"
            aria-label="Skin tone"
          />
          <span className="text-muted-foreground text-xs">Skin tone</span>
        </div>
      </div>
    </EmojiPicker.Root>
  )
}
