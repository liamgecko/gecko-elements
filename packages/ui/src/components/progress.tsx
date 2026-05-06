"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@gecko/ui/lib/utils"

const RING_SIZE_CONFIG = {
  sm: { size: 32, radius: 14, stroke: 3 },
  default: { size: 58, radius: 26, stroke: 6 },
  lg: { size: 90, radius: 41, stroke: 8 },
} as const

const progressTrackSizeVariants = cva("", {
  variants: {
    size: {
      sm: "h-2",
      default: "h-4",
      lg: "h-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function getValueColorBar(value: number | null | undefined): string {
  if (value === undefined || value === null) return "bg-primary"
  if (value <= 25) return "bg-red-500 dark:bg-rose-500"
  if (value <= 50) return "bg-orange-500"
  if (value <= 75) return "bg-yellow-500"
  return "bg-emerald-500 dark:bg-teal-500"
}

function getValueColorRing(value: number | null | undefined): string {
  if (value === undefined || value === null) return "stroke-primary"
  if (value <= 25) return "stroke-red-500 dark:stroke-rose-500"
  if (value <= 50) return "stroke-orange-500"
  if (value <= 75) return "stroke-yellow-500"
  return "stroke-emerald-500 dark:stroke-teal-500"
}

type ProgressSize = "sm" | "default" | "lg"

type ProgressProps = ProgressPrimitive.Root.Props & {
  type?: "default" | "ring"
  size?: ProgressSize
  label?: string
  valueLabel?: string
  showValueColors?: boolean
}

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(function Progress(
  {
    className,
    children,
    value,
    type = "default",
    size,
    label,
    valueLabel,
    showValueColors = false,
    ...props
  },
  ref
) {
  if (type === "ring") {
    const ringSize = size ?? "default"
    const config = RING_SIZE_CONFIG[ringSize]
    const { size: svgSize, radius, stroke } = config
    const center = svgSize / 2
    const normalizedValue = value ?? 0
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset =
      ((100 - normalizedValue) / 100) * circumference
    const strokeClass = showValueColors
      ? getValueColorRing(value)
      : "stroke-primary"

    return (
      <ProgressPrimitive.Root
        ref={ref}
        value={value}
        data-slot="progress"
        data-type="ring"
        className={cn("inline-flex flex-col items-center gap-2", className)}
        {...props}
      >
        <div
          className="relative inline-flex"
          style={{ width: svgSize, height: svgSize }}
        >
          <svg
            height={svgSize}
            width={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="size-full"
          >
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              className="stroke-border"
              strokeWidth={stroke}
            />
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              className={cn(
                "transition-all duration-300 ease-in-out",
                strokeClass
              )}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={circumference}
              style={{ strokeDashoffset }}
              transform={`rotate(-90 ${center} ${center})`}
            />
          </svg>
          {valueLabel != null && (
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center text-foreground font-medium",
                ringSize === "sm"
                  ? "text-[8px]"
                  : ringSize === "lg"
                    ? "text-base"
                    : "text-sm"
              )}
            >
              {valueLabel}
            </span>
          )}
        </div>
        {label != null && (
          <ProgressPrimitive.Label
            data-slot="progress-label"
            className="text-xs font-medium text-muted-foreground leading-none"
          >
            {label}
          </ProgressPrimitive.Label>
        )}
      </ProgressPrimitive.Root>
    )
  }

  const indicatorColorClass =
    showValueColors ? getValueColorBar(value) : undefined

  const hasLabelOrValue = label != null || valueLabel != null

  if (!hasLabelOrValue) {
    return (
      <ProgressPrimitive.Root
        ref={ref}
        value={value}
        data-slot="progress"
        data-type="bar"
        className={cn("flex flex-wrap gap-3 w-full", className)}
        {...props}
      >
        {children}
        <ProgressTrack size={size}>
          <ProgressIndicator className={indicatorColorClass} />
        </ProgressTrack>
      </ProgressPrimitive.Root>
    )
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      value={value}
      data-slot="progress"
      data-type="bar"
      className={cn("flex flex-col gap-1.5 w-full", className)}
      {...props}
    >
      {label != null && (
        <ProgressPrimitive.Label
          data-slot="progress-label"
          className="text-sm font-medium leading-none"
        >
          {label}
        </ProgressPrimitive.Label>
      )}
      <div className="flex items-center gap-2">
        <ProgressTrack size={size} className="flex-1 min-w-0">
          <ProgressIndicator className={indicatorColorClass} />
        </ProgressTrack>
        {valueLabel != null && (
          <span className="text-muted-foreground text-sm tabular-nums shrink-0">
            {valueLabel}
          </span>
        )}
      </div>
      {children}
    </ProgressPrimitive.Root>
  )
})

type ProgressTrackProps = ProgressPrimitive.Track.Props &
  VariantProps<typeof progressTrackSizeVariants>

function ProgressTrack({
  className,
  size: sizeProp,
  ...props
}: ProgressTrackProps) {
  const heightClass = progressTrackSizeVariants({
    size: sizeProp ?? "default",
  })

  return (
    <ProgressPrimitive.Track
      className={cn(
        "bg-muted rounded-full relative flex w-full items-center overflow-x-hidden",
        heightClass,
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("bg-primary h-full transition-all rounded-full", className)}
      {...props}
    />
  )
}

function ProgressLabel({
  className,
  ...props
}: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({
  className,
  ...props
}: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "text-muted-foreground ms-auto text-sm tabular-nums",
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
