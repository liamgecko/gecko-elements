"use client"

import * as React from "react"

import { cn } from "@gecko/ui/lib/utils"

export type DataTableMultiLineCellProps = {
  primary: React.ReactNode
  secondary?: React.ReactNode
  className?: string
  primaryClassName?: string
  secondaryClassName?: string
}

export function DataTableMultiLineCell({
  primary,
  secondary,
  className,
  primaryClassName,
  secondaryClassName,
}: DataTableMultiLineCellProps) {
  return (
    <div className={cn("grid min-w-0 gap-0.5 whitespace-normal", className)}>
      <div className={cn("leading-snug", primaryClassName)}>
        {primary}
      </div>
      {secondary != null && secondary !== "" ? (
        <div
          className={cn(
            "min-w-0 text-xs leading-snug text-muted-foreground",
            secondaryClassName
          )}
        >
          {secondary}
        </div>
      ) : null}
    </div>
  )
}

