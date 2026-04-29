import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import type { LucideIcon } from "lucide-react"
import {
  CalendarPlus,
  ListTodo,
  MailCheck,
  MailPlus,
  MessageSquareCheck,
  MessageSquareText,
  MonitorCog,
  PhoneForwarded,
  Smartphone,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export type ActivityFeedType =
  | "conversation-started"
  | "conversation-closed"
  | "form-submission"
  | "email-sent"
  | "sms-sent"
  | "added-to-campaign"
  | "call-made"
  | "added-to-event"
  | "system-alert"

/** One row of activity data for the convenience `items` API */
export type ActivityFeedEntry = {
  id: string
  type: ActivityFeedType
  label: React.ReactNode
  meta: React.ReactNode
}

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
}

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
  }
)

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
})

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
  }
)

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
})

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
})

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
  }
)

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
})

export type ActivityFeedVariant = NonNullable<
  VariantProps<typeof activityFeedVariants>["variant"]
>

type ActivityFeedContextValue = {
  variant: ActivityFeedVariant
}

const ActivityFeedContext = React.createContext<ActivityFeedContextValue | null>(
  null
)

function useActivityFeed() {
  const ctx = React.useContext(ActivityFeedContext)
  if (ctx == null) {
    throw new Error(
      "Activity feed components must be used within ActivityFeed."
    )
  }
  return ctx
}

export type ActivityFeedRootProps = React.ComponentProps<"ul"> &
  VariantProps<typeof activityFeedVariants>

function ActivityFeedRoot({
  className,
  variant = "default",
  ...props
}: ActivityFeedRootProps) {
  const value = React.useMemo(
    () => ({ variant: (variant ?? "default") as ActivityFeedVariant }),
    [variant]
  )

  return (
    <ActivityFeedContext.Provider value={value}>
      <ul
        data-slot="activity-feed"
        data-variant={variant}
        role="list"
        className={cn(activityFeedVariants({ variant }), className)}
        {...props}
      />
    </ActivityFeedContext.Provider>
  )
}

type ActivityFeedItemProps = React.ComponentProps<"li"> &
  VariantProps<typeof activityFeedItemVariants>

function ActivityFeedItem({
  className,
  variant: variantProp,
  ...props
}: ActivityFeedItemProps) {
  const { variant: contextVariant } = useActivityFeed()
  return (
    <li
      data-slot="activity-feed-item"
      className={cn(
        activityFeedItemVariants({
          variant: variantProp ?? contextVariant,
        }),
        className
      )}
      {...props}
    />
  )
}

type ActivityFeedIconProps = Omit<React.ComponentProps<"span">, "children"> & {
  type: ActivityFeedType
}

function ActivityFeedIcon({ type, className, ...props }: ActivityFeedIconProps) {
  const { variant } = useActivityFeed()
  const Icon = ACTIVITY_FEED_ICONS[type]
  return (
    <span
      data-slot="activity-feed-icon"
      className={cn(activityFeedIconVariants({ variant }), className)}
      aria-hidden="true"
      {...props}
    >
      <Icon
        className={activityFeedGlyphVariants({ variant })}
        aria-hidden="true"
      />
    </span>
  )
}

function ActivityFeedContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { variant } = useActivityFeed()
  return (
    <div
      data-slot="activity-feed-content"
      className={cn(activityFeedContentVariants({ variant }), className)}
      {...props}
    />
  )
}

function ActivityFeedLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { variant } = useActivityFeed()
  return (
    <div
      data-slot="activity-feed-label"
      className={cn(activityFeedLabelVariants({ variant }), className)}
      {...props}
    />
  )
}

function ActivityFeedMeta({ className, ...props }: React.ComponentProps<"div">) {
  const { variant } = useActivityFeed()
  return (
    <div
      data-slot="activity-feed-meta"
      className={cn(activityFeedMetaVariants({ variant }), className)}
      {...props}
    />
  )
}

export type ActivityFeedProps = Omit<
  React.ComponentProps<"ul">,
  never
> &
  VariantProps<typeof activityFeedVariants> & {
    pagination?: boolean | { perPage?: number }
  }

function ActivityFeed({ children, pagination, ...props }: ActivityFeedProps) {
  const perPage =
    typeof pagination === "object" && pagination?.perPage != null
      ? pagination.perPage
      : 5
  const shouldPaginate = Boolean(pagination)

  const allChildren = React.useMemo(() => React.Children.toArray(children), [children])
  const [page, setPage] = React.useState(0)
  const totalPages = shouldPaginate
    ? Math.max(1, Math.ceil(allChildren.length / perPage))
    : 1

  React.useEffect(() => {
    if (!shouldPaginate) return
    setPage((prev) => Math.min(prev, totalPages - 1))
  }, [shouldPaginate, totalPages])

  const visibleChildren = React.useMemo(() => {
    if (!shouldPaginate) return allChildren
    const start = page * perPage
    return allChildren.slice(start, start + perPage)
  }, [allChildren, page, perPage, shouldPaginate])

  return (
    <div className="space-y-4">
      <ActivityFeedRoot {...props}>{visibleChildren}</ActivityFeedRoot>

      {shouldPaginate && totalPages > 1 ? (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                iconOnly
                variant="outline"
                aria-disabled={page === 0}
                tabIndex={page === 0 ? -1 : 0}
                className={cn(page === 0 && "pointer-events-none opacity-50")}
                onClick={(event) => {
                  event.preventDefault()
                  setPage((p) => Math.max(0, p - 1))
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                iconOnly
                variant="outline"
                aria-disabled={page >= totalPages - 1}
                tabIndex={page >= totalPages - 1 ? -1 : 0}
                className={cn(
                  page >= totalPages - 1 && "pointer-events-none opacity-50"
                )}
                onClick={(event) => {
                  event.preventDefault()
                  setPage((p) => Math.min(totalPages - 1, p + 1))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  )
}

export type ActivityFeedItemsProps = Omit<ActivityFeedRootProps, "children"> & {
  items: ActivityFeedEntry[]
  pagination?: boolean | { perPage?: number }
}

function ActivityFeedItems({
  className,
  items,
  variant = "default",
  pagination,
  ...props
}: ActivityFeedItemsProps) {
  const perPage =
    typeof pagination === "object" && pagination?.perPage != null
      ? pagination.perPage
      : 5
  const shouldPaginate = Boolean(pagination)

  const [page, setPage] = React.useState(0)
  const totalPages = shouldPaginate
    ? Math.max(1, Math.ceil(items.length / perPage))
    : 1

  React.useEffect(() => {
    if (!shouldPaginate) return
    setPage((prev) => Math.min(prev, totalPages - 1))
  }, [shouldPaginate, totalPages])

  const visibleItems = React.useMemo(() => {
    if (!shouldPaginate) return items
    const start = page * perPage
    return items.slice(start, start + perPage)
  }, [items, page, perPage, shouldPaginate])

  return (
    <div className="space-y-4">
      <ActivityFeedRoot
        className={className}
        variant={variant}
        {...props}
      >
        {visibleItems.map((item) => (
          <ActivityFeedItem key={item.id} data-activity-type={item.type}>
            <ActivityFeedIcon type={item.type} />
            <ActivityFeedContent>
              <ActivityFeedLabel>{item.label}</ActivityFeedLabel>
              <ActivityFeedMeta>{item.meta}</ActivityFeedMeta>
            </ActivityFeedContent>
          </ActivityFeedItem>
        ))}
      </ActivityFeedRoot>

      {shouldPaginate && totalPages > 1 ? (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                iconOnly
                variant="outline"
                aria-disabled={page === 0}
                tabIndex={page === 0 ? -1 : 0}
                className={cn(page === 0 && "pointer-events-none opacity-50")}
                onClick={(event) => {
                  event.preventDefault()
                  setPage((p) => Math.max(0, p - 1))
                }}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                iconOnly
                variant="outline"
                aria-disabled={page >= totalPages - 1}
                tabIndex={page >= totalPages - 1 ? -1 : 0}
                className={cn(
                  page >= totalPages - 1 && "pointer-events-none opacity-50"
                )}
                onClick={(event) => {
                  event.preventDefault()
                  setPage((p) => Math.min(totalPages - 1, p + 1))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  )
}

export {
  ActivityFeed,
  ActivityFeedItems,
  ActivityFeedContent,
  ActivityFeedIcon,
  ActivityFeedItem,
  ActivityFeedLabel,
  ActivityFeedMeta,
  ACTIVITY_FEED_ICONS,
}

// eslint-disable-next-line react-refresh/only-export-components -- cva styles (see button.tsx)
export { activityFeedVariants }
