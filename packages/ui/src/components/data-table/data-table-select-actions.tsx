import * as React from "react"
import { Cog } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu"
import { cn } from "@gecko/ui/lib/utils"

import { useDataTableContext } from "./data-table-context"

export type DataTableSelectActionsProps = {
  className?: string
  /** Local override to hide the control. @default true */
  enabled?: boolean
  /** @default "Actions on selected" */
  triggerLabel?: string
  /** Only used when `selectActions` on the provider is omitted or empty — custom menu body. */
  children?: React.ReactNode
}

/** Bulk actions on the current selection; menu items come from `selectActions` on the provider. */
export function DataTableSelectActions({
  className,
  enabled = true,
  triggerLabel = "Actions on selected",
  children,
}: DataTableSelectActionsProps) {
  const { table, selectActions, onSelectAction } = useDataTableContext<unknown>()
  const selectedRows = table.getSelectedRowModel().rows
  const selectedCount = selectedRows.length

  const fromProvider = selectActions.length > 0

  if (!enabled || selectedCount === 0) {
    return null
  }

  if (!fromProvider && !children) {
    return null
  }

  return (
    <div
      data-slot="data-table-select-actions"
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="sm" type="button">
              <Cog aria-hidden className="shrink-0" />
              {triggerLabel}
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-max min-w-max">
          <DropdownMenuGroup>
            {fromProvider
              ? selectActions.map((action, index) => (
                  <React.Fragment key={action.id}>
                    {action.separatorBefore && index > 0 ? (
                      <DropdownMenuSeparator />
                    ) : null}
                    <DropdownMenuItem
                      variant={action.variant ?? "default"}
                      onClick={() =>
                        onSelectAction?.(action.id, { selectedRows })
                      }
                    >
                      {action.label}
                    </DropdownMenuItem>
                  </React.Fragment>
                ))
              : children}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
