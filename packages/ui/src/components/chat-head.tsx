import * as React from "react";
import Check from "@hugeicons/core-free-icons/CheckIcon";
import LockOpen from "@hugeicons/core-free-icons/LockOpenIcon";
import Trash2 from "@hugeicons/core-free-icons/Delete02Icon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

import { Avatar, AvatarImage } from "@gecko/ui/components/avatar";
import { Button } from "@gecko/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip";
import { cn } from "@gecko/ui/lib/utils";

export type ChatHeadPresence = "online" | "unavailable" | "offline";
export type ChatHeadMessageSender = "contact" | "agent";
export type ChatHeadState = "open" | "closed";

export type ChatHeadItem = {
  id: string;
  name: string;
  messageSnippet: string;
  timestamp: Date;
  avatarSrc?: string;
  presence?: ChatHeadPresence;
  lastMessageSender?: ChatHeadMessageSender;
  state?: ChatHeadState;
  unread?: boolean;
};

export type ChatHeadProps = Omit<
  React.ComponentProps<"ul">,
  "children" | "onSelect"
> & {
  items: readonly ChatHeadItem[];
  selectedId?: string;
  onSelect: (item: ChatHeadItem) => void;
};

function formatRelativeTime(timestamp: Date, now: Date): string {
  const diffMs = Math.max(0, now.getTime() - timestamp.getTime());
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const year = 365 * day;

  if (!Number.isFinite(diffMs) || diffMs < minute) return "now";
  if (diffMs < hour) return `${Math.floor(diffMs / minute)}m`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)}h`;
  if (diffMs < week) return `${Math.floor(diffMs / day)}d`;
  if (diffMs < year) return `${Math.floor(diffMs / week)}w`;
  return `${Math.floor(diffMs / year)}y`;
}

function ChatHeadActions({ state }: { state: ChatHeadState }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 end-3 z-10 flex items-center gap-1.5 opacity-0 transition-opacity duration-200 group-hover/chat-head-item:pointer-events-auto group-hover/chat-head-item:opacity-100 group-focus-within/chat-head-item:pointer-events-auto group-focus-within/chat-head-item:opacity-100">
      {state === "closed" ? (
        <>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button type="button" variant="outline" size="icon-xs">
                  <HugeiconsIcon icon={LockOpen} aria-hidden="true" />
                  <span className="sr-only">Re-open conversation</span>
                </Button>
              }
            />
            <TooltipContent side="bottom">
              <p>Re-open this conversation</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  variant="outline-destructive"
                  size="icon-xs"
                >
                  <HugeiconsIcon icon={Trash2} aria-hidden="true" />
                  <span className="sr-only">Delete conversation</span>
                </Button>
              }
            />
            <TooltipContent side="bottom">
              <p>Permanently delete this conversation</p>
            </TooltipContent>
          </Tooltip>
        </>
      ) : (
        <Tooltip>
          <TooltipTrigger
            render={
              <Button type="button" variant="outline" size="icon-xs">
                <HugeiconsIcon icon={Check} aria-hidden="true" />
                <span className="sr-only">Close conversation</span>
              </Button>
            }
          />
          <TooltipContent side="bottom">
            <p>Mark this conversation as closed</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

function ChatHead({
  className,
  items,
  selectedId,
  onSelect,
  ...props
}: ChatHeadProps) {
  const [now, setNow] = React.useState(() => new Date());
  const selectionRefs = React.useRef(new Map<string, HTMLButtonElement>());

  React.useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const moveFocus = (index: number) => {
    const item = items[index];
    if (!item) return;

    selectionRefs.current.get(item.id)?.focus();
  };

  const handleSelectionKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | undefined;

    switch (event.key) {
      case "ArrowDown":
        nextIndex = Math.min(index + 1, items.length - 1);
        break;
      case "ArrowUp":
        nextIndex = Math.max(index - 1, 0);
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    moveFocus(nextIndex);
  };

  return (
    <TooltipProvider>
      <ul
        data-slot="chat-head"
        className={cn("space-y-px", className)}
        {...props}
      >
        {items.map((item, index) => {
          const isSelected = item.id === selectedId;
          const state = item.state ?? "open";
          const preview =
            item.lastMessageSender === "agent"
              ? `You: ${item.messageSnippet}`
              : item.messageSnippet;

          return (
            <li
              key={item.id}
              data-slot="chat-head-item"
              data-active={isSelected ? "true" : undefined}
              className={cn(
                "group/chat-head-item relative rounded-sm transition-colors hover:bg-muted",
                isSelected && "bg-muted/60 hover:bg-muted",
              )}
            >
              <button
                ref={(element) => {
                  if (element) selectionRefs.current.set(item.id, element);
                  else selectionRefs.current.delete(item.id);
                }}
                type="button"
                aria-current={isSelected ? "true" : undefined}
                onClick={() => onSelect(item)}
                onKeyDown={(event) => handleSelectionKeyDown(event, index)}
                className="flex w-full items-center gap-3 rounded-sm border border-transparent py-3 pe-3 ps-2 text-start outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Avatar
                  name={item.name}
                  size="lg"
                  status={item.presence}
                  notification={item.unread}
                  aria-hidden="true"
                >
                  {item.avatarSrc ? <AvatarImage src={item.avatarSrc} /> : null}
                </Avatar>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">
                    {item.name}
                  </span>
                  <span className="block truncate text-2xs text-muted-foreground">
                    {preview}
                  </span>
                  {(item.unread || item.presence) && (
                    <span className="sr-only">
                      {item.unread ? "Unread conversation. " : null}
                      {item.presence ? `Status: ${item.presence}.` : null}
                    </span>
                  )}
                </span>

                <time
                  dateTime={item.timestamp.toISOString()}
                  title={item.timestamp.toLocaleString()}
                  className="shrink-0 whitespace-nowrap text-2xs font-medium text-muted-foreground transition-opacity duration-200 group-hover/chat-head-item:opacity-0 group-focus-within/chat-head-item:opacity-0"
                >
                  {formatRelativeTime(item.timestamp, now)}
                </time>
              </button>

              <ChatHeadActions state={state} />
            </li>
          );
        })}
      </ul>
    </TooltipProvider>
  );
}

export { ChatHead };
