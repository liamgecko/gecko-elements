"use client"

import * as React from "react"
import type { Row, Table } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu"
import { Button } from "@gecko/ui/components/button"

import type { DataTableRowAction, DataTableRowActionContext } from "./data-table"

const RowActionsTrigger = React.forwardRef<
  HTMLButtonElement,
  Omit<React.ComponentProps<typeof Button>, "children">
>(({ ...props }, ref) => {
  return (
    <Button
      ref={ref}
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label="Open menu"
      {...props}
    >
      <MoreHorizontal />
    </Button>
  )
})
RowActionsTrigger.displayName = "RowActionsTrigger"

type DataTableMeta<TData> = {
  getRowActions?: (original: TData) => DataTableRowAction[]
  onRowAction?: (actionId: string, context: DataTableRowActionContext<TData>) => void
}

function getMeta<TData>(table: Table<TData>): DataTableMeta<TData> {
  return (table.options.meta ?? {}) as DataTableMeta<TData>
}

type DataTableRowActionsMenuProps<TData> = {
  row: Row<TData>
  table: Table<TData>
}

export function DataTableRowActionsMenu<TData>({
  row,
  table,
}: DataTableRowActionsMenuProps<TData>) {
  const { getRowActions, onRowAction } = getMeta(table)
  const actions = getRowActions?.(row.original) ?? []

  if (actions.length === 0) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<RowActionsTrigger aria-label={`Open actions for row ${row.index + 1}`} />}
      />
      <DropdownMenuContent align="end" className="w-max min-w-max">
        <DropdownMenuGroup>
          {actions.map((action, index) => (
            <React.Fragment key={action.id}>
              {action.separatorBefore && index > 0 ? <DropdownMenuSeparator /> : null}
              <DropdownMenuItem
                variant={action.variant ?? "default"}
                onClick={() => onRowAction?.(action.id, { row, original: row.original })}
              >
                {action.label}
              </DropdownMenuItem>
            </React.Fragment>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
