import * as React from "react"
import {
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  XCircle,
} from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const alertVariants = cva("grid gap-0.5 rounded-lg border px-4 py-3 text-start text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pe-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4 w-full relative group/alert", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground border-border",
      destructive:
        "border-destructive dark:border-destructive-muted-border bg-destructive-muted text-destructive dark:text-destructive-muted-foreground *:data-[slot=alert-description]:text-destructive *:[svg]:text-destructive dark:*:data-[slot=alert-description]:text-destructive-muted-foreground dark:*:[svg]:text-destructive-muted-foreground",
      info: "border-info dark:border-info-muted-border bg-info-muted text-info dark:text-info-muted-foreground *:data-[slot=alert-description]:text-info *:[svg]:text-info dark:*:data-[slot=alert-description]:text-info-muted-foreground dark:*:[svg]:text-info-muted-foreground",
      success:
        "border-success dark:border-success-muted-border bg-success-muted text-success dark:text-success-muted-foreground *:data-[slot=alert-description]:text-success *:[svg]:text-success dark:*:data-[slot=alert-description]:text-success-muted-foreground dark:*:[svg]:text-success-muted-foreground",
      warning:
        "border-warning dark:border-warning-muted-border bg-warning-muted text-warning dark:text-warning-muted-foreground *:data-[slot=alert-description]:text-warning *:[svg]:text-warning dark:*:data-[slot=alert-description]:text-warning-muted-foreground dark:*:[svg]:text-warning-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

type AlertVariant = NonNullable<VariantProps<typeof alertVariants>["variant"]>
const AlertVariantContext = React.createContext<AlertVariant>("default")

const defaultIcons: Record<
  NonNullable<VariantProps<typeof alertVariants>["variant"]>,
  React.ReactNode
> = {
  default: <Info aria-hidden className="size-4 shrink-0" />,
  destructive: <XCircle aria-hidden className="size-4 shrink-0" />,
  info: <Info aria-hidden className="size-4 shrink-0" />,
  success: <CheckCircle aria-hidden className="size-4 shrink-0" />,
  warning: <AlertTriangle aria-hidden className="size-4 shrink-0" />,
}

function normalizeAlertIcon(icon: React.ReactNode) {
  if (!React.isValidElement(icon)) return icon

  const el = icon as React.ReactElement<{ className?: string; "aria-hidden"?: boolean }>

  const existingClassName =
    typeof el.props.className === "string" ? el.props.className : undefined
  const hasSizeClass = Boolean(existingClassName?.includes("size-"))
  const ariaHidden =
    typeof el.props["aria-hidden"] === "boolean"
      ? el.props["aria-hidden"]
      : true

  return React.cloneElement(el, {
    "aria-hidden": ariaHidden,
    className: cn(existingClassName, !hasSizeClass && "size-4", "shrink-0"),
  })
}

function normalizeAlertActionIcon(icon: React.ReactNode) {
  if (!React.isValidElement(icon)) return icon

  const el = icon as React.ReactElement<{ className?: string; "aria-hidden"?: boolean }>
  const existingClassName =
    typeof el.props.className === "string" ? el.props.className : undefined
  const hasSizeClass = Boolean(existingClassName?.includes("size-"))
  const ariaHidden =
    typeof el.props["aria-hidden"] === "boolean"
      ? el.props["aria-hidden"]
      : true

  return React.cloneElement(el, {
    "aria-hidden": ariaHidden,
    className: cn(existingClassName, !hasSizeClass && "size-3.5", "shrink-0"),
  })
}

type AlertDismissibleProp =
  | boolean
  | {
      label?: string
      ariaLabel?: string
      onDismiss?: () => void
    }

function Alert({
  className,
  variant,
  icon = false,
  dismissible = false,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    icon?: boolean | React.ReactNode
    dismissible?: AlertDismissibleProp
  }) {
  const [isDismissing, setIsDismissing] = React.useState(false)
  const [isDismissed, setIsDismissed] = React.useState(false)

  const dismissibleConfig =
    typeof dismissible === "object" ? dismissible : undefined
  const isDismissible = Boolean(dismissible)

  const hasActionChild = React.useMemo(() => {
    if (!isDismissible) return false
    return React.Children.toArray(children).some((child) => {
      if (!React.isValidElement(child)) return false
      if (child.type === AlertAction) return true
      return false
    })
  }, [children, isDismissible])

  const resolvedIcon =
    icon === false
      ? null
      : icon === true
        ? defaultIcons[variant ?? "default"]
        : normalizeAlertIcon(icon)

  React.useEffect(() => {
    if (!isDismissing) return

    const timeoutId = window.setTimeout(() => {
      setIsDismissed(true)
    }, 200)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isDismissing])

  if (isDismissible && isDismissed) return null

  return (
    <AlertVariantContext.Provider value={variant ?? "default"}>
      <div
        data-slot="alert"
        role="alert"
        data-state={isDismissing ? "closed" : "open"}
        className={cn(
          alertVariants({ variant }),
          isDismissible && "transition-all duration-200",
          isDismissible &&
            (isDismissing
              ? "opacity-0 -translate-y-0.5 scale-95"
              : "opacity-100 scale-100"),
          className
        )}
        {...props}
      >
        {resolvedIcon}
        {children}
        {isDismissible && !hasActionChild ? (
          <AlertAction
            label={dismissibleConfig?.label ?? "Dismiss"}
            ariaLabel={
              dismissibleConfig?.ariaLabel ??
              dismissibleConfig?.label ??
              "Dismiss alert"
            }
            iconOnly
            icon={<X />}
            onClick={() => {
              dismissibleConfig?.onDismiss?.()
              setIsDismissing(true)
            }}
          />
        ) : null}
      </div>
    </AlertVariantContext.Provider>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:hover:text-foreground [&_a]:underline [&_a]:underline-offset-3",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground text-xs text-balance md:text-pretty [&_p:not(:last-child)]:mb-4 [&_a]:hover:text-foreground [&_a]:underline [&_a]:underline-offset-3",
        className
      )}
      {...props}
    />
  )
}

type AlertActionProps = Omit<
  React.ComponentProps<typeof Button>,
  "variant" | "size" | "children"
> & {
  label?: string
  ariaLabel?: string
  icon?: React.ReactNode
  iconOnly?: boolean
  children?: React.ReactNode
}

function AlertAction({
  className,
  label,
  ariaLabel,
  icon,
  iconOnly = false,
  children,
  ...props
}: AlertActionProps) {
  const variant = React.useContext(AlertVariantContext)

  const actionButtonClassNameByVariant: Partial<Record<AlertVariant, string>> =
    {
      destructive:
        [
          "hover:bg-red-900/5 hover:text-destructive",
          "focus-visible:bg-destructive-muted focus-visible:text-destructive focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
          "dark:hover:bg-rose-50/10 dark:hover:text-rose-300",
          "dark:focus-visible:bg-rose-50/10 dark:focus-visible:border-rose-50/50 dark:focus-visible:ring-rose-50/30 dark:focus-visible:text-rose-300",
        ].join(" "),
      info: [
        "hover:bg-blue-900/5 hover:text-info",
        "focus-visible:bg-info-muted focus-visible:text-info focus-visible:border-info/40 focus-visible:ring-info/20",
        "dark:hover:bg-blue-50/10 dark:hover:text-blue-300",
        "dark:focus-visible:bg-blue-900/10 dark:focus-visible:border-blue-50/50 dark:focus-visible:ring-blue-50/30 dark:focus-visible:text-blue-300",
      ].join(" "),
      success:
        [
          "hover:bg-emerald-900/5 hover:text-success",
          "focus-visible:bg-success-muted focus-visible:text-success focus-visible:border-success/40 focus-visible:ring-success/20",
          "dark:hover:bg-teal-50/10 dark:hover:text-teal-300",
          "dark:focus-visible:bg-teal-900/10 dark:focus-visible:border-teal-50/50 dark:focus-visible:ring-teal-50/30 dark:focus-visible:text-teal-300",
        ].join(" "),
      warning:
        [
          "hover:bg-yellow-900/5 hover:text-warning",
          "focus-visible:bg-warning-muted focus-visible:text-warning focus-visible:border-warning/40 focus-visible:ring-warning/20",
          "dark:hover:bg-yellow-50/10 dark:hover:text-yellow-300",
          "dark:focus-visible:bg-yellow-900/10 dark:focus-visible:border-yellow-50/50 dark:focus-visible:ring-yellow-50/30 dark:focus-visible:text-yellow-300",
        ].join(" "),
    }

  if (children) {
    return (
      <div
        data-slot="alert-action"
        className={cn("absolute top-1/2 -translate-y-1/2 end-3", className)}
      >
        {children}
      </div>
    )
  }

  const hasVisibleLabel =
    !iconOnly && typeof label === "string" && label.length > 0
  const resolvedIcon = icon ? normalizeAlertActionIcon(icon) : null
  const buttonSize = hasVisibleLabel ? "sm" : "icon-sm"

  return (
    <div
      data-slot="alert-action"
      className="absolute top-1/2 -translate-y-1/2 end-3"
    >
      <Button
        variant="ghost"
        size={buttonSize}
        className={cn(
          variant !== "default" ? actionButtonClassNameByVariant[variant] : null,
          className
        )}
        aria-label={ariaLabel ?? label}
        {...props}
      >
        {resolvedIcon}
        {hasVisibleLabel ? (
          label
        ) : (
          <span className="sr-only">{label ?? "Action"}</span>
        )}
      </Button>
    </div>
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
