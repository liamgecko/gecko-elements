import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CalendarPlus,
  ChevronLeftIcon,
  ChevronRightIcon,
  ListTodo,
  MailCheck,
  MailPlus,
  MessageSquareCheck,
  MessageSquareText,
  MonitorCog,
  PhoneForwarded,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@gecko/ui/components/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@gecko/ui/components/pagination";
import { cn } from "@gecko/ui/lib/utils";

export type ActivityFeedType =
  | "conversation-started"
  | "conversation-closed"
  | "form-submission"
  | "email-sent"
  | "sms-sent"
  | "added-to-campaign"
  | "call-made"
  | "added-to-event"
  | "system-alert";

export type ActivityFeedEntry = {
  id: string;
  type: ActivityFeedType;
  label: React.ReactNode;
  meta: React.ReactNode;
};

export type ActivityFeedPagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

const ACTIVITY_FEED_ICONS: Record<ActivityFeedType, LucideIcon> = {
  "conversation-started": MessageSquareText,
  "conversation-closed": MessageSquareCheck,
  "form-submission": ListTodo,
  "email-sent": MailCheck,
  "sms-sent": Smartphone,
  "added-to-campaign": MailPlus,
  "call-made": PhoneForwarded,
  "added-to-event": CalendarPlus,
  "system-alert": MonitorCog,
};

const activityFeedVariants = cva(
  [
    "relative m-0 list-none p-0",
    "before:pointer-events-none before:absolute before:z-0 before:w-0",
    "before:-translate-x-1/2 before:border-l before:border-border before:content-['']",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "before:left-[calc(2.25rem/2)] before:top-[calc(2.25rem/2)] before:bottom-[calc(2.25rem/2)]",
        condensed:
          "before:left-[calc(2rem/2)] before:top-[calc(2rem/2)] before:bottom-[calc(2rem/2)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const activityFeedItemVariants = cva("flex first:pt-0 last:pb-0", {
  variants: {
    variant: {
      default: "gap-3 py-4",
      condensed: "gap-2 py-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const activityFeedIconVariants = cva(
  "relative z-10 flex shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground ring-background",
  {
    variants: {
      variant: {
        default: "size-9 ring-8",
        condensed: "size-8 ring-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const activityFeedGlyphVariants = cva("", {
  variants: {
    variant: {
      default: "size-4",
      condensed: "size-3.5",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const activityFeedContentVariants = cva("min-w-0 flex-1", {
  variants: {
    variant: {
      default: "pt-0.5",
      condensed: "pt-px",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const activityFeedLabelVariants = cva(
  "text-foreground [&_a]:font-medium [&_a]:text-foreground [&_a]:underline-offset-2 [&_a]:hover:underline",
  {
    variants: {
      variant: {
        default: "text-sm",
        condensed: "text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const activityFeedMetaVariants = cva("text-muted-foreground", {
  variants: {
    variant: {
      default: "mt-0.5 text-xs",
      condensed: "mt-px text-[11px] leading-snug",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type ActivityFeedVariant = NonNullable<
  VariantProps<typeof activityFeedVariants>["variant"]
>;

export type ActivityFeedProps = Omit<React.ComponentProps<"ul">, "children"> &
  VariantProps<typeof activityFeedVariants> & {
    items: readonly ActivityFeedEntry[];
    pagination?: ActivityFeedPagination;
  };

function ActivityFeed({
  className,
  items,
  variant = "default",
  pagination,
  ...props
}: ActivityFeedProps) {
  const resolvedVariant = variant ?? "default";
  const pageSize = Math.max(1, pagination?.pageSize ?? items.length);
  const totalItems = Math.max(0, pagination?.totalItems ?? items.length);
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(Math.max(1, pagination?.page ?? 1), totalPages);

  return (
    <div className="space-y-4">
      <ul
        data-slot="activity-feed"
        data-variant={resolvedVariant}
        role="list"
        className={cn(
          activityFeedVariants({ variant: resolvedVariant }),
          className,
        )}
        {...props}
      >
        {items.map((item) => {
          const Icon = ACTIVITY_FEED_ICONS[item.type];

          return (
            <li
              key={item.id}
              data-slot="activity-feed-item"
              data-activity-type={item.type}
              className={activityFeedItemVariants({
                variant: resolvedVariant,
              })}
            >
              <span
                data-slot="activity-feed-icon"
                className={activityFeedIconVariants({
                  variant: resolvedVariant,
                })}
                aria-hidden="true"
              >
                <Icon
                  className={activityFeedGlyphVariants({
                    variant: resolvedVariant,
                  })}
                  aria-hidden="true"
                />
              </span>
              <div
                data-slot="activity-feed-content"
                className={activityFeedContentVariants({
                  variant: resolvedVariant,
                })}
              >
                <div
                  data-slot="activity-feed-label"
                  className={activityFeedLabelVariants({
                    variant: resolvedVariant,
                  })}
                >
                  {item.label}
                </div>
                <div
                  data-slot="activity-feed-meta"
                  className={activityFeedMetaVariants({
                    variant: resolvedVariant,
                  })}
                >
                  {item.meta}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {pagination && totalPages > 1 ? (
        <Pagination aria-label="Activity feed pagination" className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <Button
                type="button"
                size="icon"
                variant="outline"
                aria-label="Previous activity page"
                disabled={currentPage === 1}
                onClick={() => pagination.onPageChange(currentPage - 1)}
              >
                <ChevronLeftIcon className="rtl:rotate-180" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                type="button"
                size="icon"
                variant="outline"
                aria-label="Next activity page"
                disabled={currentPage === totalPages}
                onClick={() => pagination.onPageChange(currentPage + 1)}
              >
                <ChevronRightIcon className="rtl:rotate-180" />
              </Button>
            </PaginationItem>
          </PaginationContent>
          <span
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            Page {currentPage} of {totalPages}
          </span>
        </Pagination>
      ) : null}
    </div>
  );
}

export { ActivityFeed };

// eslint-disable-next-line react-refresh/only-export-components -- cva styles are intentionally exported from this module.
export { activityFeedVariants };
