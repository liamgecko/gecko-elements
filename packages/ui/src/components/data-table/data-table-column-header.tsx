"use client"

import type { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown, CircleHelp } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@gecko/ui/components/tooltip"
import { cn } from "@gecko/ui/lib/utils"

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
  const nextSortOrder = column.getNextSortingOrder()
  const sortLabel =
    nextSortOrder === "asc"
      ? `Sort ${title} ascending`
      : nextSortOrder === "desc"
        ? `Sort ${title} descending`
        : `Clear sorting for ${title}`

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <span>{title}</span>

      <div className="flex items-center">
        {helpText ? (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Help: ${title}`}
                />
              }
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
            size="icon-xs"
            onClick={column.getToggleSortingHandler()}
            aria-label={sortLabel}
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
