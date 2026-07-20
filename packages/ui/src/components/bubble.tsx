import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@gecko/ui/lib/utils"

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="bubble-group"
      className={cn("flex min-w-0 flex-col gap-2", className)}
      {...props}
    />
  )
}

const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-[80%] min-w-0 items-center gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full",
  {
    variants: {
      variant: {
        default:
          "*:data-[slot=bubble-content]:bg-blue-50 *:data-[slot=bubble-content]:text-foreground dark:*:data-[slot=bubble-content]:bg-gray-800 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-blue-100 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-gray-700",
        secondary:
          "*:data-[slot=bubble-content]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[color-mix(in_oklch,var(--muted),var(--foreground)_5%)]",
        outline:
          "*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:bg-background [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-input/30",
        ghost:
          "border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted [&>[data-slot=bubble-content]:is(button,a):hover]:text-foreground dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-muted/50",
        destructive:
          "*:data-[slot=bubble-content]:bg-destructive/10 *:data-[slot=bubble-content]:text-destructive dark:*:data-[slot=bubble-content]:bg-destructive/20 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/20 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/30",
        note:
          "*:data-[slot=bubble-content]:bg-yellow-100 *:data-[slot=bubble-content]:text-yellow-950 dark:*:data-[slot=bubble-content]:bg-yellow-950 dark:*:data-[slot=bubble-content]:text-yellow-100 [&>[data-slot=bubble-content]:is(button,a):hover]:bg-yellow-200 dark:[&>[data-slot=bubble-content]:is(button,a):hover]:bg-yellow-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof bubbleVariants> & {
    align?: "start" | "end"
  }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  )
}

function BubbleContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          "w-fit max-w-full min-w-0 overflow-hidden rounded-lg border border-transparent px-3 py-2.5 text-sm leading-snug wrap-break-word group-data-[align=end]/bubble:self-end [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:border-ring [button,a]:focus-visible:ring-3 [button,a]:focus-visible:ring-ring/30",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: "bubble-content",
    },
  })
}

const bubbleReactionsVariants = cva(
  "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-sm ring-3 ring-card has-[button]:p-0 [&>button]:rounded-full bottom-0 translate-y-3/4",
  {
    variants: {
      align: {
        start: "left-3",
        end: "right-3",
      },
    },
  }
)

function BubbleReactions({
  align,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "end"
}) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side="bottom"
      className={cn(
        bubbleReactionsVariants({ align }),
        // By default, follow the parent bubble's alignment. An explicit `align`
        // prop overrides this.
        align == null &&
          "group-data-[align=start]/bubble:left-3 group-data-[align=end]/bubble:right-3",
        className
      )}
      {...props}
    />
  )
}

const bubbleActionsVariants = cva(
  [
    "flex shrink-0 items-center gap-0.5 text-muted-foreground opacity-0 transition-opacity",
    "group-hover/bubble:opacity-100 group-focus-within/bubble:opacity-100",
    "has-[[data-state=open]]:opacity-100 has-[[data-open]]:opacity-100 has-[[aria-expanded=true]]:opacity-100",
  ].join(" "),
  {
    variants: {
      side: {
        start: "order-first",
        end: "order-last",
      },
    },
  }
)

function BubbleActions({
  side,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  /**
   * Which side of the content the actions sit on.
   * Defaults to the outside of the message flow:
   * after content for `align="start"`, before content for `align="end"`.
   */
  side?: "start" | "end"
}) {
  return (
    <div
      data-slot="bubble-actions"
      data-side={side}
      className={cn(
        bubbleActionsVariants({ side }),
        // Mirror Messenger/WhatsApp: actions sit outside the bubble.
        side == null && "group-data-[align=end]/bubble:order-first",
        className
      )}
      {...props}
    />
  )
}

export {
  BubbleGroup,
  Bubble,
  BubbleContent,
  BubbleActions,
  BubbleReactions,
}
