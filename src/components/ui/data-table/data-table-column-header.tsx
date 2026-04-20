"use client"

import type { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown, CircleHelp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export type DataTableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>
  title: string
  helpText?: React.ReactNode
  className?: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  helpText,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const canSort = column.getCanSort()

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span>{title}</span>

      <div className="flex items-center">
        {helpText ? (
          <Tooltip>
            <TooltipTrigger
              aria-label={`Help: ${title}`}
              className="inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <CircleHelp className="size-3 shrink-0" />
            </TooltipTrigger>
            <TooltipContent side="top" align="start">
              {helpText}
            </TooltipContent>
          </Tooltip>
        ) : null}

        {canSort ? (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            aria-label={`Sort by ${title}`}
          >
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="size-3 shrink-0" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="size-3 shrink-0" />
            ) : (
              <ChevronsUpDown className="size-3 shrink-0" />
            )}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
