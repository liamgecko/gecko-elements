import { withRef } from "@gecko/ui/lib/with-ref";
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
  onCloseConversation?: (item: ChatHeadItem) => void;
  onReopenConversation?: (item: ChatHeadItem) => void;
  onDeleteConversation?: (item: ChatHeadItem) => void;
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

function ChatHeadActions({
  item,
  onCloseConversation,
  onReopenConversation,
  onDeleteConversation,
}: Pick<
  ChatHeadProps,
  "onCloseConversation" | "onReopenConversation" | "onDeleteConversation"
> & { item: ChatHeadItem }) {
  const actions =
    item.state === "closed"
      ? [
          {
            label: "Re-open conversation",
            icon: LockOpen,
            onAction: onReopenConversation,
            variant: "outline" as const,
          },
          {
            label: "Delete conversation",
            icon: Trash2,
            onAction: onDeleteConversation,
            variant: "outline-destructive" as const,
          },
        ]
      : [
          {
            label: "Close conversation",
            icon: Check,
            onAction: onCloseConversation,
            variant: "outline" as const,
          },
        ];

  return (
    <div className="pointer-events-none absolute inset-y-0 end-3 z-10 flex items-center gap-1.5 opacity-0 transition-opacity duration-200 group-hover/chat-head-item:pointer-events-auto group-hover/chat-head-item:opacity-100 group-focus-within/chat-head-item:pointer-events-auto group-focus-within/chat-head-item:opacity-100">
      {actions.map((action) => (
        <Tooltip key={action.label}>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant={action.variant}
                size="icon-xs"
                onClick={() => action.onAction?.(item)}
              >
                <HugeiconsIcon icon={action.icon} aria-hidden="true" />
                <span className="sr-only">{action.label}</span>
              </Button>
            }
          />
          <TooltipContent side="bottom">
            <p>{action.label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

const ChatHead = /* @__PURE__ */ withRef(function ChatHead({
  className,
  items,
  selectedId,
  onSelect,
  onCloseConversation,
  onReopenConversation,
  onDeleteConversation,
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

              <ChatHeadActions
                item={item}
                onCloseConversation={onCloseConversation}
                onReopenConversation={onReopenConversation}
                onDeleteConversation={onDeleteConversation}
              />
            </li>
          );
        })}
      </ul>
    </TooltipProvider>
  );
});

export { ChatHead };
