"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const counterVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium leading-[1.1] shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        info: "bg-blue-600 text-white",
        warning:
          "bg-yellow-500 text-primary",
        destructive:
          "bg-red-600 text-white",
        success:
          "bg-emerald-700 text-white",
        light:
          "bg-white text-foreground border border-border",
      },
      size: {
        sm: "h-4 min-w-4 px-1 text-3xs",
        md: "h-5 min-w-5 px-1.5 text-2xs",
        lg: "h-6 min-w-6 px-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
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

const fixedWidthBySize: Record<
  NonNullable<CounterVariantProps["size"]>,
  string
> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
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
  const display =
    typeof max === "number" && Number.isFinite(max) && clamped > max
      ? `${max}+`
      : clamped.toString()

  const resolvedSize: NonNullable<CounterVariantProps["size"]> =
    size ?? "md"
  const fixedWidthClass =
    typeof max === "number" && Number.isFinite(max)
      ? fixedWidthBySize[resolvedSize]
      : undefined

  return (
    <span
      data-slot="counter"
      className={cn(
        counterVariants({ variant, size: resolvedSize }),
        fixedWidthClass,
        className
      )}
      aria-label={`Count: ${display}`}
      {...props}
    >
      {display}
    </span>
  )
}

