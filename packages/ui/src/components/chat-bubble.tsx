import * as React from "react";
import {
  Check,
  CheckCheck,
  CircleAlert,
  Copy,
  Info,
  Share,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import { Avatar, AvatarImage } from "@gecko/ui/components/avatar";
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
import { cn } from "@gecko/ui/lib/utils";

type RelativeTimeInput = Date | string | number;
type ChatBubbleContextValue = {
  agent: boolean;
  variant: ChatBubbleVariant;
};

const ChatBubbleContext = React.createContext<ChatBubbleContextValue | null>(
  null,
);

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

export type ChatBubbleProps = React.ComponentProps<"div"> & {
  agent?: boolean;
  variant?: ChatBubbleVariant;
};

/** @deprecated Use MessageVariant instead. */
export type ChatBubbleVariant = "default" | "note" | "ai-agent";

/**
 * @deprecated Use `Message` + `Bubble` instead. Kept for docs reference only.
 * @see Message from `@gecko/ui/components/message`
 * @see Bubble from `@gecko/ui/components/bubble`
 */
export function ChatBubble({
  className,
  children,
  agent,
  variant = "default",
  ...props
}: ChatBubbleProps) {
  const resolvedAgent = agent ?? variant === "note";

  // Notes stay end-aligned (reverse). User messages use reverse (right). Agent/assistant uses row (left).
  const flexDirection =
    variant === "note"
      ? "flex-row-reverse"
      : resolvedAgent
        ? "flex-row"
        : "flex-row-reverse";

  return (
    <ChatBubbleContext.Provider value={{ agent: resolvedAgent, variant }}>
      <div
        data-slot="chat-bubble"
        data-agent={resolvedAgent ? "true" : undefined}
        data-variant={variant}
        className={cn(
          "group/chat-bubble flex items-end gap-2 mb-4",
          flexDirection,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ChatBubbleContext.Provider>
  );
}

export type ChatBubbleAvatarProps = {
  avatarSrc?: string;
  avatarAlt?: string;
  avatarFallback?: React.ReactNode;
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  className?: string;
};

/** @deprecated Use MessageAvatar with Avatar instead. */
export function ChatBubbleAvatar({
  avatarSrc,
  avatarAlt,
  avatarFallback,
  src,
  alt,
  fallback,
  className,
}: ChatBubbleAvatarProps) {
  const context = React.useContext(ChatBubbleContext);
  if (context?.variant === "ai-agent") {
    return null;
  }

  const resolvedSrc = src ?? avatarSrc;
  const resolvedAlt = alt ?? avatarAlt;
  const resolvedFallback = fallback ?? avatarFallback ?? "U";
  const resolvedName =
    resolvedAlt ??
    (typeof resolvedFallback === "string"
      ? resolvedFallback
      : "Message sender");
  return (
    <Avatar
      name={resolvedName}
      size="md"
      className={cn(
        "bg-muted relative group-has-[[data-slot=chat-bubble-message][data-status=failed]]/chat-bubble:-top-5",
        className,
      )}
    >
      {resolvedSrc ? <AvatarImage src={resolvedSrc} /> : null}
    </Avatar>
  );
}

export type ChatBubbleMessageStatus = "sent" | "delivered" | "read" | "failed";

export type ChatBubbleAiAgentActionHandlers = {
  copyText?: string;
  onCopyResponse?: () => void;
  onGoodResponse?: () => void;
  onBadResponse?: () => void;
  onShareResponse?: () => void;
};

export type ChatBubbleMessageProps = React.ComponentProps<"div"> & {
  timestamp: Date;
  status?: ChatBubbleMessageStatus;
  info?: React.ReactNode;
  /** Overrides default meta (timestamp) text color; merged after variant/status styles. */
  metaClassName?: string;
  /** Shown by default on `ai-agent` messages; pass `false` to hide. */
  aiAgentActions?: boolean | ChatBubbleAiAgentActionHandlers;
} & ChatBubbleAiAgentActionHandlers;

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

function ChatBubbleAiAgentMetaActions({
  onCopy,
  onGoodResponse,
  onBadResponse,
  onShareResponse,
}: {
  onCopy: () => void | Promise<void | boolean>;
} & Omit<ChatBubbleAiAgentActionHandlers, "copyText" | "onCopyResponse">) {
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

  const handleCopyClick = React.useCallback(async () => {
    const result = await Promise.resolve(onCopy());
    if (result === false) return;

    if (copyFeedbackTimeoutRef.current !== null) {
      window.clearTimeout(copyFeedbackTimeoutRef.current);
    }

    setCopiedIconVisible(false);
    window.requestAnimationFrame(() => setCopiedIconVisible(true));

    copyFeedbackTimeoutRef.current = window.setTimeout(() => {
      setCopiedIconVisible(false);
    }, COPY_FEEDBACK_VISIBLE_MS);
  }, [onCopy]);

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
                  <Copy
                    aria-hidden
                    strokeWidth={2}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-150 motion-reduce:transition-none",
                      copiedIconVisible ? "opacity-0" : "opacity-100",
                    )}
                  />
                  <Check
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
                    size="icon-xs"
                    aria-label={label}
                    pressed={pressed}
                    onPressedChange={(next) => {
                      setFeedback(next ? key : null);
                      if (next) onPressed();
                    }}
                  >
                    <Icon aria-hidden strokeWidth={2} />
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
                <Share aria-hidden strokeWidth={2} />
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

/** @deprecated Use Message + Bubble + MessageMeta instead. */
export function ChatBubbleMessage({
  className,
  children,
  timestamp,
  status,
  info,
  metaClassName,
  aiAgentActions,
  copyText,
  onCopyResponse,
  onGoodResponse,
  onBadResponse,
  onShareResponse,
  ...props
}: ChatBubbleMessageProps) {
  const context = React.useContext(ChatBubbleContext);

  if (!context) {
    throw new Error("ChatBubbleMessage must be used within ChatBubble.");
  }

  const relativeTime = React.useMemo(
    () => formatRelativeTime(timestamp),
    [timestamp],
  );

  const metaTimeClassName = cn(
    "text-2xs",
    context.variant === "note"
      ? "text-muted-foreground dark:text-yellow-100"
      : context.variant === "ai-agent"
        ? "text-muted-foreground"
        : status === "failed"
          ? "text-muted-foreground dark:text-rose-200"
          : "text-muted-foreground",
    metaClassName,
  );

  const statusIndicator = React.useMemo(() => {
    if (
      !context.agent ||
      !status ||
      context.variant === "note" ||
      context.variant === "ai-agent"
    )
      return null;

    const config = {
      sent: {
        icon: (
          <Check
            className="text-muted-foreground size-3"
            aria-hidden
            strokeWidth={2.2}
          />
        ),
        label: "This message has been sent",
      },
      delivered: {
        icon: (
          <CheckCheck
            className="text-muted-foreground size-3"
            aria-hidden
            strokeWidth={2.2}
          />
        ),
        label: "This message has been delivered",
      },
      read: {
        icon: (
          <CheckCheck
            className="text-blue-600 dark:text-teal-500 size-3"
            aria-hidden
            strokeWidth={2.2}
          />
        ),
        label: "This message has been read",
      },
      failed: {
        icon: (
          <CircleAlert
            className="text-red-700 dark:text-rose-200 size-3"
            aria-hidden
            strokeWidth={2.2}
          />
        ),
        label: "This message failed to send because 'X'",
      },
    } as const;

    const statusConfig = config[status];

    return (
      <Tooltip>
        <TooltipTrigger className="flex">
          <span className="inline-flex" aria-label={`${status} status`}>
            {statusConfig.icon}
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{statusConfig.label}</p>
        </TooltipContent>
      </Tooltip>
    );
  }, [context.agent, context.variant, status]);

  const isAiAgent = context.variant === "ai-agent";

  const showAiAgentActions =
    isAiAgent && context.agent && aiAgentActions !== false;
  const messageBodyRef = React.useRef<HTMLDivElement>(null);
  const resolvedCopyText =
    typeof aiAgentActions === "object" ? aiAgentActions.copyText : copyText;
  const resolvedOnCopyResponse =
    typeof aiAgentActions === "object"
      ? aiAgentActions.onCopyResponse
      : onCopyResponse;

  const handleCopy = React.useCallback(async (): Promise<boolean> => {
    if (resolvedOnCopyResponse) {
      resolvedOnCopyResponse();
      return true;
    }

    const text =
      resolvedCopyText?.trim() ||
      messageBodyRef.current?.innerText.trim() ||
      "";
    if (!text) return false;

    try {
      await copyMessageText(text);
      return true;
    } catch {
      return false;
    }
  }, [resolvedCopyText, resolvedOnCopyResponse]);

  const aiAgentActionHandlers =
    typeof aiAgentActions === "object"
      ? aiAgentActions
      : {
          onGoodResponse,
          onBadResponse,
          onShareResponse,
        };

  return (
    <div
      data-slot="chat-bubble-message"
      data-status={status}
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      <div
        className={cn(
          "text-sm wrap-break-word",
          isAiAgent && "bg-transparent p-0 rounded-none shadow-none ring-0",
          !isAiAgent && "rounded px-4 py-2",
          !isAiAgent &&
            context.variant === "note" &&
            "bg-yellow-100 dark:bg-yellow-950 text-yellow-950 dark:text-yellow-100",
          !isAiAgent &&
            context.variant !== "note" &&
            context.agent &&
            "bg-blue-50 dark:bg-gray-800",
          !isAiAgent &&
            context.variant !== "note" &&
            !context.agent &&
            "bg-muted",
          !isAiAgent &&
            status === "failed" &&
            "bg-red-50 dark:bg-rose-950 text-red-700 dark:text-rose-200",
        )}
      >
        <div className="flex flex-col gap-2">
          {isAiAgent ? (
            <div ref={messageBodyRef}>{children}</div>
          ) : (
            <p>{children}</p>
          )}
          <div
            className={cn(
              "flex items-center gap-2",
              isAiAgent && showAiAgentActions && "h-6",
              context.agent ? "justify-start" : "justify-end",
            )}
          >
            {context.agent ? (
              <>
                {!isAiAgent ? statusIndicator : null}
                {showAiAgentActions ? (
                  <ChatBubbleAiAgentMetaActions
                    {...aiAgentActionHandlers}
                    onCopy={handleCopy}
                  />
                ) : null}
                {isAiAgent && showAiAgentActions ? (
                  <span className={cn(metaTimeClassName, "leading-none")}>
                    {relativeTime}
                  </span>
                ) : (
                  <p className={metaTimeClassName}>{relativeTime}</p>
                )}
                {info}
              </>
            ) : (
              <>
                {info}
                <p className={metaTimeClassName}>{relativeTime}</p>
              </>
            )}
          </div>
        </div>
      </div>
      {context.agent &&
      status === "failed" &&
      context.variant !== "note" &&
      context.variant !== "ai-agent" ? (
        <p className="text-red-700 dark:text-rose-200 text-2xs">
          This message failed to send -{" "}
          <a
            href="#"
            className="underline hover:text-red-800 dark:hover:text-rose-300"
          >
            Resend message
          </a>
        </p>
      ) : null}
    </div>
  );
}

type ChatBubbleReference = {
  title: string;
  url: string;
};

type ChatBubbleSourceInfo = {
  source: string;
  references?: ChatBubbleReference[];
};

export type ChatBubbleUserMessageInfo = {
  channel?: string;
  page?: {
    title: string;
    url: string;
  };
  receivedAt?: string;
  sentTo?: string | string[];
  cc?: string | string[];
};

export type ChatBubbleAgentMessageInfo = {
  source?: ChatBubbleSourceInfo;
  channel?: string;
  receivedAt?: string;
};

export type ChatBubbleInfoProps = {
  userInfo?: ChatBubbleUserMessageInfo;
  agentInfo?: ChatBubbleAgentMessageInfo;
  className?: string;
};

function ChatBubbleInfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
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
          className="text-blue-700 dark:text-blue-500 hover:underline"
        >
          {email}
        </a>
      ))}
    </div>
  );
}

function renderSourceInfo(source: ChatBubbleSourceInfo | undefined) {
  if (!source) return null;

  return (
    <div className="flex flex-col gap-0.5">
      <span>{source.source}</span>
      {source.references?.map((ref) => (
        <a
          key={ref.url}
          href={ref.url}
          className="text-blue-700 dark:text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {ref.title}
        </a>
      ))}
    </div>
  );
}

/** @deprecated Use MessageInfo instead. */
export function ChatBubbleInfo({
  userInfo,
  agentInfo,
  className,
}: ChatBubbleInfoProps) {
  const context = React.useContext(ChatBubbleContext);
  if (!context) {
    throw new Error("ChatBubbleInfo must be used within ChatBubble.");
  }

  const isAgent = context.agent;
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

  const shouldRender = isAgent ? hasAgentInfo : hasUserInfo;
  if (!shouldRender) return null;

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
            <Info className="size-3" strokeWidth={2.2} />
          </button>
        }
      />
      <PopoverContent className="w-auto p-4">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-2xs text-foreground">
          {isAgent ? (
            <>
              <ChatBubbleInfoRow label="Source">
                {renderSourceInfo(agentInfo?.source)}
              </ChatBubbleInfoRow>
              <ChatBubbleInfoRow label="Channel">
                {agentInfo?.channel}
              </ChatBubbleInfoRow>
              <ChatBubbleInfoRow label="Sent">
                {agentInfo?.receivedAt}
              </ChatBubbleInfoRow>
            </>
          ) : (
            <>
              <ChatBubbleInfoRow label="Channel">
                {userInfo?.channel}
              </ChatBubbleInfoRow>
              <ChatBubbleInfoRow label="Page">
                {userInfo?.page ? (
                  <a
                    href={userInfo.page.url}
                    className="text-blue-700 dark:text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {userInfo.page.title}
                  </a>
                ) : null}
              </ChatBubbleInfoRow>
              <ChatBubbleInfoRow label="Received">
                {userInfo?.receivedAt}
              </ChatBubbleInfoRow>
              <ChatBubbleInfoRow label="Sent to">
                {renderEmailList(userInfo?.sentTo)}
              </ChatBubbleInfoRow>
              <ChatBubbleInfoRow label="CC">
                {renderEmailList(userInfo?.cc)}
              </ChatBubbleInfoRow>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
