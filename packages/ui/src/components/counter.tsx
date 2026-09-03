import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@gecko/ui/lib/utils"

const counterVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium leading-[1.1] shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        info: "bg-blue-600 text-white dark:bg-blue-700 dark:text-blue-50",
        warning:
          "bg-yellow-500 text-primary dark:bg-yellow-600 dark:text-yellow-950",
        destructive:
          "bg-red-600 text-white dark:bg-rose-700 dark:text-rose-50",
        success:
          "bg-emerald-700 text-white dark:bg-teal-700 dark:text-teal-50",
        light:
          "bg-background text-foreground border border-border",
      },
      size: {
        sm: "h-4 min-w-4 px-1 text-3xs",
        md: "h-5 min-w-5 px-1.5 text-2xs",
        lg: "h-6 min-w-6 px-2 text-xs",
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
