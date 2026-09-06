"use client";

import * as React from "react";
import Check from "@hugeicons/core-free-icons/CheckIcon";
import CheckCheck from "@hugeicons/core-free-icons/CheckCheckIcon";
import CircleAlert from "@hugeicons/core-free-icons/AlertCircleIcon";
import Copy from "@hugeicons/core-free-icons/Copy01Icon";
import Info from "@hugeicons/core-free-icons/InfoIcon";
import Share from "@hugeicons/core-free-icons/Upload06Icon";
import ThumbsDown from "@hugeicons/core-free-icons/ThumbsDownIcon";
import ThumbsUp from "@hugeicons/core-free-icons/ThumbsUpIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

import { Button } from "@gecko/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@gecko/ui/components/popover";
import { Toggle } from "@gecko/ui/components/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip";
import {
  MessageContext,
  getDefaultAlign,
  getMessageBubbleVariant,
  useMessageContext,
  type MessageVariant,
} from "@gecko/ui/components/message-context";
import { cn } from "@gecko/ui/lib/utils";

type MessageStatus = "sent" | "delivered" | "read" | "failed";
type RelativeTimeInput = Date | string | number;

function toDate(value: RelativeTimeInput): Date | null {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatRelativeTime(
  value: RelativeTimeInput,
  nowDate = new Date(),
): string {
  const date = toDate(value);
  if (!date) return "now";

  const diffMs = Math.max(0, nowDate.getTime() - date.getTime());
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const year = 365 * day;

  if (diffMs < minute) return "now";
  if (diffMs < hour) return `${Math.floor(diffMs / minute)}m`;
  if (diffMs < day) return `${Math.floor(diffMs / hour)}h`;
  if (diffMs < week) return `${Math.floor(diffMs / day)}d`;
  if (diffMs < year) return `${Math.floor(diffMs / week)}w`;
  return `${Math.floor(diffMs / year)}y`;
}

function MessageGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-group"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props}
    />
  );
}

function Message({
  className,
  variant = "user",
  align,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: MessageVariant;
  align?: "start" | "end";
}) {
  const resolvedAlign = align ?? getDefaultAlign(variant);

  return (
    <MessageContext.Provider value={{ variant, align: resolvedAlign }}>
      <div
        data-slot="message"
        data-variant={variant}
        data-align={resolvedAlign}
        className={cn(
          "group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse",
          // Note styling lives on Message, applied to nested bubble content.
          "data-[variant=note]:[&_[data-slot=bubble-content]]:bg-yellow-100 data-[variant=note]:[&_[data-slot=bubble-content]]:text-yellow-950",
          "dark:data-[variant=note]:[&_[data-slot=bubble-content]]:bg-yellow-950 dark:data-[variant=note]:[&_[data-slot=bubble-content]]:text-yellow-100",
          className,
        )}
        {...props}
      />
    </MessageContext.Provider>
  );
}

function MessageAvatar({ className, ...props }: React.ComponentProps<"div">) {
  const context = React.useContext(MessageContext);
  if (context?.variant === "ai") {
    return null;
  }

  return (
    <div
      data-slot="message-avatar"
      className={cn(
        // Layout slot only — visual styling comes from Avatar.
        // Empty spacer matches Avatar size="md" (size-6) for grouped messages.
        "flex shrink-0 self-end empty:size-6 group-has-data-[slot=message-footer]/message:-translate-y-8",
        className,
      )}
      {...props}
    />
  );
}

function MessageContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-content"
      className={cn(
        "flex w-full min-w-0 flex-col gap-1 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end",
        className,
      )}
      {...props}
    />
  );
}

function MessageHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-header"
      className={cn(
        "flex max-w-full min-w-0 items-center px-3 text-2xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0",
        className,
      )}
      {...props}
    />
  );
}

function MessageFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-footer"
      className={cn(
        "flex max-w-full min-w-0 items-center px-3 text-2xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function MessageStatusIndicator({
  status,
  className,
}: {
  status: MessageStatus;
  className?: string;
}) {
  const config = {
    sent: {
      icon: (
        <HugeiconsIcon
          icon={Check}
          className="text-muted-foreground size-3"
          aria-hidden
          strokeWidth={2.2}
        />
      ),
      label: "This message has been sent",
    },
    delivered: {
      icon: (
        <HugeiconsIcon
          icon={CheckCheck}
          className="text-muted-foreground size-3"
          aria-hidden
          strokeWidth={2.2}
        />
      ),
      label: "This message has been delivered",
    },
    read: {
      icon: (
        <HugeiconsIcon
          icon={CheckCheck}
          className="size-3 text-blue-600 dark:text-teal-500"
          aria-hidden
          strokeWidth={2.2}
        />
      ),
      label: "This message has been read",
    },
    failed: {
      icon: (
        <HugeiconsIcon
          icon={CircleAlert}
          className="size-3 text-red-700 dark:text-rose-200"
          aria-hidden
          strokeWidth={2.2}
        />
      ),
      label: "This message failed to send",
    },
  } as const;

  const statusConfig = config[status];

  return (
    <Tooltip>
      <TooltipTrigger
        className={cn("flex", className)}
        aria-label={statusConfig.label}
      >
        <span className="inline-flex">{statusConfig.icon}</span>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{statusConfig.label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

type MessageMetaProps = React.ComponentProps<"div"> & {
  timestamp: RelativeTimeInput;
  status?: MessageStatus;
  info?: React.ReactNode;
  /** Optional actions row (e.g. MessageAiActions) shown beside the timestamp. */
  actions?: React.ReactNode;
};

/**
 * In-bubble meta row: status, relative time, and optional info popover.
 * Place inside BubbleContent. Failed resend copy belongs in MessageFooter.
 */
function MessageMeta({
  className,
  timestamp,
  status,
  info,
  actions,
  ...props
}: MessageMetaProps) {
  const { variant, align } = useMessageContext("MessageMeta");
  const relativeTime = React.useMemo(
    () => formatRelativeTime(timestamp),
    [timestamp],
  );
  const showStatus = Boolean(status) && variant === "agent";

  return (
    <div
      data-slot="message-meta"
      data-status={status}
      className={cn(
        "flex items-center gap-2 text-2xs text-muted-foreground",
        align === "end" ? "justify-end" : "justify-start",
        variant === "note" && "dark:text-yellow-100",
        status === "failed" && "dark:text-rose-200",
        actions && "h-6",
        className,
      )}
      {...props}
    >
      {align === "end" ? (
        <>
          {showStatus && status ? (
            <MessageStatusIndicator status={status} />
          ) : null}
          {actions}
          <span className={cn(actions && "leading-none")}>{relativeTime}</span>
          {info}
        </>
      ) : (
        <>
          {info}
          {actions}
          <span className={cn(actions && "leading-none")}>{relativeTime}</span>
          {showStatus && status ? (
            <MessageStatusIndicator status={status} />
          ) : null}
        </>
      )}
    </div>
  );
}

type MessageAiActionsProps = {
  copyText?: string;
  onCopyResponse?: () => void;
  onGoodResponse?: () => void;
  onBadResponse?: () => void;
  onShareResponse?: () => void;
  /** Optional ref to the message body for fallback copy-from-DOM. */
  bodyRef?: React.RefObject<HTMLElement | null>;
};

async function copyMessageText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute("readonly", "");
  el.style.position = "fixed";
  el.style.top = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}

const COPY_FEEDBACK_VISIBLE_MS = 1800;

function MessageAiActions({
  copyText,
  onCopyResponse,
  onGoodResponse,
  onBadResponse,
  onShareResponse,
  bodyRef,
}: MessageAiActionsProps) {
  const [feedback, setFeedback] = React.useState<"good" | "bad" | null>(null);
  const [copiedIconVisible, setCopiedIconVisible] = React.useState(false);
  const copyFeedbackTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (copyFeedbackTimeoutRef.current !== null) {
        window.clearTimeout(copyFeedbackTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = React.useCallback(async (): Promise<boolean> => {
    if (onCopyResponse) {
      onCopyResponse();
      return true;
    }

    const text = copyText?.trim() || bodyRef?.current?.innerText.trim() || "";
    if (!text) return false;

    try {
      await copyMessageText(text);
      return true;
    } catch {
      return false;
    }
  }, [bodyRef, copyText, onCopyResponse]);

  const handleCopyClick = React.useCallback(async () => {
    const result = await handleCopy();
    if (result === false) return;

    if (copyFeedbackTimeoutRef.current !== null) {
      window.clearTimeout(copyFeedbackTimeoutRef.current);
    }

    setCopiedIconVisible(false);
    window.requestAnimationFrame(() => setCopiedIconVisible(true));

    copyFeedbackTimeoutRef.current = window.setTimeout(() => {
      setCopiedIconVisible(false);
    }, COPY_FEEDBACK_VISIBLE_MS);
  }, [handleCopy]);

  const feedbackToggles: {
    key: "good" | "bad";
    label: string;
    icon: typeof ThumbsUp;
    onPressed: () => void;
  }[] = [
    {
      key: "good",
      label: "Good response",
      icon: ThumbsUp,
      onPressed: () => onGoodResponse?.(),
    },
    {
      key: "bad",
      label: "Bad response",
      icon: ThumbsDown,
      onPressed: () => onBadResponse?.(),
    },
  ];

  return (
    <TooltipProvider delay={0}>
      <div
        className="inline-flex h-6 items-center gap-0.5"
        role="group"
        aria-label="Message actions"
      >
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={copiedIconVisible ? "Copied" : "Copy response"}
                onClick={() => void handleCopyClick()}
              >
                <span className="relative inline-flex size-3 items-center justify-center">
                  <HugeiconsIcon
                    icon={Copy}
                    aria-hidden
                    strokeWidth={2}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-150 motion-reduce:transition-none",
                      copiedIconVisible ? "opacity-0" : "opacity-100",
                    )}
                  />
                  <HugeiconsIcon
                    icon={Check}
                    aria-hidden
                    strokeWidth={2}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-150 motion-reduce:transition-none",
                      copiedIconVisible ? "opacity-100" : "opacity-0",
                    )}
                  />
                </span>
              </Button>
            }
          />
          <TooltipContent side="bottom">
            <p>{copiedIconVisible ? "Copied" : "Copy response"}</p>
          </TooltipContent>
        </Tooltip>

        {feedbackToggles.map(({ key, label, icon: Icon, onPressed }) => {
          const pressed = feedback === key;
          return (
            <Tooltip key={key}>
              <TooltipTrigger
                render={
                  <Toggle
                    variant="default"
                    size="icon-xs"
                    aria-label={label}
                    pressed={pressed}
                    onPressedChange={(next) => {
                      setFeedback(next ? key : null);
                      if (next) onPressed();
                    }}
                  >
                    <HugeiconsIcon icon={Icon} aria-hidden strokeWidth={2} />
                  </Toggle>
                }
              />
              <TooltipContent side="bottom">
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label="Share response"
                onClick={() => onShareResponse?.()}
              >
                <HugeiconsIcon icon={Share} aria-hidden strokeWidth={2} />
              </Button>
            }
          />
          <TooltipContent side="bottom">
            <p>Share response</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

type MessageReference = {
  title: string;
  url: string;
};

type MessageSourceInfo = {
  source: string;
  references?: MessageReference[];
};

type MessageUserInfo = {
  channel?: string;
  page?: {
    title: string;
    url: string;
  };
  receivedAt?: string;
  sentTo?: string | string[];
  cc?: string | string[];
};

type MessageAgentInfo = {
  source?: MessageSourceInfo;
  channel?: string;
  receivedAt?: string;
};

type MessageInfoProps = {
  userInfo?: MessageUserInfo;
  agentInfo?: MessageAgentInfo;
  className?: string;
};

function MessageInfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  if (!children) return null;

  return (
    <>
      <span className="font-medium text-muted-foreground">{label}:</span>
      <div>{children}</div>
    </>
  );
}

function renderEmailList(value: string | string[] | undefined) {
  if (!value) return null;

  const emails = Array.isArray(value) ? value : [value];

  return (
    <div className="flex flex-col gap-0.5">
      {emails.map((email) => (
        <a
          key={email}
          href={`mailto:${email}`}
          className="text-blue-700 hover:underline dark:text-blue-500"
        >
          {email}
        </a>
      ))}
    </div>
  );
}

function renderSourceInfo(source: MessageSourceInfo | undefined) {
  if (!source) return null;

  return (
    <div className="flex flex-col gap-0.5">
      <span>{source.source}</span>
      {source.references?.map((ref) => (
        <a
          key={ref.url}
          href={ref.url}
          className="text-blue-700 hover:underline dark:text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          {ref.title}
        </a>
      ))}
    </div>
  );
}

function MessageInfo({ userInfo, agentInfo, className }: MessageInfoProps) {
  const { variant } = useMessageContext("MessageInfo");
  const isAgentSide =
    variant === "agent" || variant === "ai" || variant === "note";

  const hasUserInfo = !!(
    userInfo?.channel ||
    userInfo?.page ||
    userInfo?.receivedAt ||
    userInfo?.sentTo ||
    userInfo?.cc
  );
  const hasAgentInfo = !!(
    agentInfo?.source ||
    agentInfo?.channel ||
    agentInfo?.receivedAt
  );

  if (isAgentSide ? !hasAgentInfo : !hasUserInfo) return null;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            className={cn(
              "inline-flex items-center text-muted-foreground hover:text-foreground",
              className,
            )}
            aria-label="Message information"
          >
            <HugeiconsIcon
              icon={Info}
              aria-hidden
              className="size-3"
              strokeWidth={2.2}
            />
          </button>
        }
      />
      <PopoverContent className="w-auto p-4">
        <div className="text-foreground grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-2xs">
          {isAgentSide ? (
            <>
              <MessageInfoRow label="Source">
                {renderSourceInfo(agentInfo?.source)}
              </MessageInfoRow>
              <MessageInfoRow label="Channel">
                {agentInfo?.channel}
              </MessageInfoRow>
              <MessageInfoRow label="Sent">
                {agentInfo?.receivedAt}
              </MessageInfoRow>
            </>
          ) : (
            <>
              <MessageInfoRow label="Channel">
                {userInfo?.channel}
              </MessageInfoRow>
              <MessageInfoRow label="Page">
                {userInfo?.page ? (
                  <a
                    href={userInfo.page.url}
                    className="text-blue-700 hover:underline dark:text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userInfo.page.title}
                  </a>
                ) : null}
              </MessageInfoRow>
              <MessageInfoRow label="Received">
                {userInfo?.receivedAt}
              </MessageInfoRow>
              <MessageInfoRow label="Sent to">
                {renderEmailList(userInfo?.sentTo)}
              </MessageInfoRow>
              <MessageInfoRow label="CC">
                {renderEmailList(userInfo?.cc)}
              </MessageInfoRow>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
  MessageMeta,
  MessageInfo,
  MessageAiActions,
  MessageStatusIndicator,
  // eslint-disable-next-line react-refresh/only-export-components -- message-to-bubble mapping is part of the public Message interface.
  getMessageBubbleVariant,
  // eslint-disable-next-line react-refresh/only-export-components -- compact relative-time formatting is part of the public Message interface.
  formatRelativeTime,
  type MessageVariant,
  type MessageStatus,
  type MessageUserInfo,
  type MessageAgentInfo,
  type MessageInfoProps,
  type MessageAiActionsProps,
};
