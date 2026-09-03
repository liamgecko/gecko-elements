import { cn } from "@gecko/ui/lib/utils"

import { getPersonInitials, type LiveChatPerson } from "./live-chat-people"

type LiveChatMentionListProps = {
  people: LiveChatPerson[]
  highlightedIndex: number
  onHighlight: (index: number) => void
  onSelect: (person: LiveChatPerson) => void
}

export function LiveChatMentionList({
  people,
  highlightedIndex,
  onHighlight,
  onSelect,
}: LiveChatMentionListProps) {
  return (
    <div
      role="listbox"
      aria-label="Mention someone"
      data-mention-list
      className="bg-popover text-popover-foreground ring-foreground/10 absolute bottom-full left-0 z-50 mb-2 max-h-60 w-full overflow-y-auto rounded-md p-1 shadow-md ring-1"
    >
      {people.length === 0 ? (
        <div className="text-muted-foreground px-2 py-2 text-sm">No people found</div>
      ) : (
        people.map((person, index) => (
          <button
            key={person.id}
            type="button"
            role="option"
            aria-selected={index === highlightedIndex}
            className={cn(
              "hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none",
              index === highlightedIndex && "bg-accent text-accent-foreground",
            )}
            onMouseDown={(event) => {
              event.preventDefault()
              onSelect(person)
            }}
            onMouseEnter={() => onHighlight(index)}
          >
            <span
              aria-hidden
              className="bg-muted text-muted-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-4xs font-medium"
            >
              {getPersonInitials(person.name)}
            </span>
            <span className="truncate">{person.name}</span>
          </button>
        ))
      )}
    </div>
  )
}
