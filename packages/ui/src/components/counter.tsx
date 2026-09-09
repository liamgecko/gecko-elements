import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@geckolabs/elements/lib/utils"

const counterVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium leading-[1.1] shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        info: "bg-info text-info-foreground",
        warning: "bg-warning text-warning-foreground",
        destructive: "bg-destructive-solid text-destructive-solid-foreground",
        success: "bg-success text-success-foreground",
        light: "border border-border bg-background text-foreground",
      },
      size: {
        sm: "h-4 min-w-4 px-1 text-5xs",
        md: "h-5 min-w-5 px-1.5 text-4xs",
        lg: "h-6 min-w-6 px-2 text-2xs",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  }
)

type CounterVariantProps = VariantProps<typeof counterVariants>

export interface CounterProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    CounterVariantProps {
  value: number
  max?: number
}

export function Counter({
  value,
  max,
  variant,
  size,
  className,
  ...props
}: CounterProps) {
  const clamped = Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0
  const flooredMax =
    typeof max === "number" && Number.isFinite(max) ? Math.floor(max) : undefined
  const normalizedMax =
    flooredMax !== undefined && flooredMax > 0 ? flooredMax : undefined
  const display =
    normalizedMax !== undefined && clamped > normalizedMax
      ? `${normalizedMax}+`
      : clamped.toString()

  const resolvedSize: NonNullable<CounterVariantProps["size"]> =
    size ?? "md"

  return (
    <span
      data-slot="counter"
      className={cn(counterVariants({ variant, size: resolvedSize }), className)}
      aria-label={`Count: ${clamped}`}
      {...props}
    >
      {display}
    </span>
  )
}
