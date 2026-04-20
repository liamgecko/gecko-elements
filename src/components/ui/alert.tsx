import * as React from "react"
import {
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
} from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

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

function Alert({
  className,
  variant,
  icon = true,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    icon?: boolean | React.ReactNode
  }) {
  const resolvedIcon =
    icon === false
      ? null
      : icon === true
        ? defaultIcons[variant ?? "default"]
        : icon
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {resolvedIcon}
      {children}
    </div>
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

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2.5 end-3", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
