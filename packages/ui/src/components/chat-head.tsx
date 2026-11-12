import { withRef } from "@geckolabs/elements/lib/with-ref";
import * as React from "react";
import Check from "@hugeicons/core-free-icons/CheckIcon";
import LockOpen from "@hugeicons/core-free-icons/LockOpenIcon";
import Trash2 from "@hugeicons/core-free-icons/Delete02Icon";
import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";

import { Avatar, AvatarImage } from "@geckolabs/elements/components/avatar";
import { Button } from "@geckolabs/elements/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@geckolabs/elements/components/tooltip";
import { cn } from "@geckolabs/elements/lib/utils";

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
  React.ComponentProps<"li">,
  "children" | "onSelect"
> & {
  item: ChatHeadItem;
  selected?: boolean;
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
    <div className="pointer-events-none absolute inset-y-0 end-3 z-10 flex items-center gap-1.5 opacity-0 transition-opacity duration-200 group-hover/chat-head-item:pointer-events-auto group-hover/chat-head-item:opacity-100 group-focus-within/chat-head-item:pointer-events-auto group-focus-within/chat-head-item:opacity-100 motion-reduce:transition-none">
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

/** One conversation row. Compose multiple ChatHeads inside a native ul or ol. */
const ChatHead = /* @__PURE__ */ withRef(function ChatHead({
  className,
  item,
  selected = false,
  onSelect,
  onCloseConversation,
  onReopenConversation,
  onDeleteConversation,
  ...props
}: ChatHeadProps) {
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const preview =
    item.lastMessageSender === "agent"
      ? `You: ${item.messageSnippet}`
      : item.messageSnippet;

  return (
    <TooltipProvider>
      <li
        data-slot="chat-head"
        data-active={selected ? "true" : undefined}
        className={cn(
          "group/chat-head-item relative rounded-sm transition-colors hover:bg-muted motion-reduce:transition-none",
          selected && "bg-muted/60 hover:bg-muted",
          className,
        )}
        {...props}
      >
        <button
          type="button"
          aria-current={selected ? "true" : undefined}
          onClick={() => onSelect(item)}
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
            className="shrink-0 whitespace-nowrap text-2xs font-medium text-muted-foreground transition-opacity duration-200 group-hover/chat-head-item:opacity-0 group-focus-within/chat-head-item:opacity-0 motion-reduce:transition-none"
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
    </TooltipProvider>
  );
});

export { ChatHead };
