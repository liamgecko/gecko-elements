"use client"

import * as React from "react"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { Avatar } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "relative inline-flex items-center gap-1.5 border font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 [&>svg]:pointer-events-none shrink-0 overflow-visible group/badge",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        info: "bg-info-muted text-info dark:bg-info-muted/80 dark:text-info",
        warning:
          "bg-warning-muted text-warning dark:bg-warning-muted/80 dark:text-warning",
        destructive:
          "bg-destructive-muted text-destructive dark:bg-destructive-muted/80 dark:text-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        success:
          "bg-success-muted text-success dark:bg-success-muted/80 dark:text-success",
        light:
          "bg-white text-foreground dark:bg-white dark:text-gray-800 border-border",
      },
      size: {
        xs: "px-1.5 py-0.5 text-2xs leading-3 gap-1",
        sm: "px-2 py-0.5 text-xs leading-4 gap-1",
        md: "px-2.5 py-1 text-sm leading-4",
        lg: "px-3 py-1.5 text-base leading-5 gap-2",
        xl: "px-4 py-2 text-lg leading-6 gap-2",
      },
      bordered: {
        true: "",
        false: "border-transparent",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded",
      },
    },
    compoundVariants: [
      { bordered: true, variant: "primary", className: "border-primary" },
      { bordered: true, variant: "secondary", className: "border-gray-300" },
      { bordered: true, variant: "info", className: "border-blue-300" },
      { bordered: true, variant: "warning", className: "border-yellow-400" },
      { bordered: true, variant: "destructive", className: "border-red-300" },
      { bordered: true, variant: "success", className: "border-emerald-300" },
      { bordered: true, variant: "light", className: "border-border" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "sm",
      bordered: false,
      rounded: false,
    },
  }
)

const iconSizeMap = {
  xs: "size-2.5",
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4",
  xl: "size-5",
} as const

const avatarSizeMap = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
} as const

type BadgeSize = keyof typeof iconSizeMap

export interface BadgeBaseProps extends VariantProps<typeof badgeVariants> {
  dismiss?: boolean
  onDismiss?: () => void
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

interface BadgeDivProps
  extends BadgeBaseProps,
    React.HTMLAttributes<HTMLDivElement> {
  asButton?: false
}

interface BadgeButtonProps
  extends BadgeBaseProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  asButton: true
}

type BadgeProps = BadgeDivProps | BadgeButtonProps

const hoverClassByVariant: Record<
  NonNullable<VariantProps<typeof badgeVariants>["variant"]>,
  string
> = {
  primary: "hover:bg-primary/80",
  secondary: "hover:bg-secondary/80",
  info: "hover:bg-info-muted/80 dark:hover:bg-info-muted/60",
  warning: "hover:bg-warning-muted/80 dark:hover:bg-warning-muted/60",
  destructive: "hover:bg-destructive/20 dark:hover:bg-destructive/30",
  success: "hover:bg-success-muted/80 dark:hover:bg-success-muted/60",
  light: "hover:bg-gray-100 dark:hover:bg-gray-100",
}

function renderIcon(icon: React.ReactNode, size: BadgeSize) {
  if (!icon) return null
  const el = icon as React.ReactElement<{ className?: string }>
  return React.isValidElement(el)
    ? React.cloneElement(el, {
        className: cn(iconSizeMap[size], el.props.className),
      })
    : icon
}

function processChildren(
  children: React.ReactNode,
  size: BadgeSize
): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child
    const element = child as React.ReactElement<{ size?: string; className?: string }>
    if (element.type === Avatar) {
      return React.cloneElement(element, {
        size: avatarSizeMap[size],
        className: cn(element.props.className),
      })
    }
    return child
  })
}

function Badge({
  className,
  variant = "primary",
  size = "sm",
  bordered = false,
  rounded = false,
  dismiss,
  onDismiss,
  asButton,
  leftIcon,
  rightIcon,
  children,
  ...props
}: BadgeProps) {
  const isButton = asButton === true
  const baseClassName = cn(
    badgeVariants({ variant, size, bordered, rounded }),
    isButton && variant && hoverClassByVariant[variant],
    className
  )

  const handleDismissKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onDismiss?.()
    }
  }

  const dismissControl = dismiss && onDismiss && (
    isButton ? (
      <span
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation()
          onDismiss()
        }}
        onKeyDown={(e) => {
          handleDismissKeyDown(e)
          e.stopPropagation()
        }}
        className="ml-1 rounded p-0.5 hover:bg-gray-950/5 hover:text-current"
        aria-label="Dismiss"
      >
        <X className={iconSizeMap[size ?? "sm"]} strokeWidth={3} />
      </span>
    ) : (
      <button
        type="button"
        onClick={onDismiss}
        className="ml-1 rounded p-0.5 hover:bg-gray-950/5 hover:text-current"
        aria-label="Dismiss"
      >
        <X className={iconSizeMap[size ?? "sm"]} strokeWidth={3} />
      </button>
    )
  )

  const content = (
    <>
      {renderIcon(leftIcon, size ?? "sm")}
      {processChildren(children, size ?? "sm")}
      {renderIcon(rightIcon, size ?? "sm")}
      {dismissControl}
    </>
  )

  const baseProps = {
    className: baseClassName,
    "data-slot": "badge",
    children: content,
  }

  if (isButton) {
    return useRender({
      defaultTagName: "button",
      props: mergeProps<"button">(
        { type: "button", ...baseProps },
        props as React.ButtonHTMLAttributes<HTMLButtonElement>
      ),
      state: { slot: "badge", variant, size, bordered, rounded },
    })
  }

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(baseProps, props as React.HTMLAttributes<HTMLDivElement>),
    state: { slot: "badge", variant, size, bordered, rounded },
  })
}

interface NotificationCountProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number
}

const NotificationCount = React.forwardRef<
  HTMLDivElement,
  NotificationCountProps
>(({ className, count, ...props }, ref) => {
  const displayCount = count >= 10 ? "9+" : count
  return (
    <div
      ref={ref}
      className={cn(
        "absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full border-0 bg-red-600 text-[10px] font-medium tracking-tighter text-white",
        className
      )}
      {...props}
    >
      {displayCount}
    </div>
  )
})
NotificationCount.displayName = "NotificationCount"

export { Badge, badgeVariants, NotificationCount }
