import { Columns3Cog } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@gecko/ui/components/tooltip"
import { cn } from "@gecko/ui/lib/utils"

import { getDataTableColumnToggleLabel } from "./data-table-column-meta"
import { useDataTableContext } from "./data-table-context"

export type DataTableColumnToggleProps = {
  className?: string
  /** Accessible name for the icon-only trigger. @default "Customise table view" */
  triggerLabel?: string
}

export function DataTableColumnToggle({
  className,
  triggerLabel = "Customise table view",
}: DataTableColumnToggleProps) {
  const { table } = useDataTableContext<unknown>()

  return (
    <div className="inline-flex shrink-0 items-center">
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className={cn("shrink-0", className)}
                    type="button"
                    aria-label={triggerLabel}
                  >
                    <Columns3Cog />
                  </Button>
                }
              />
            }
          />
          <TooltipContent side="top">
            <p>{triggerLabel}</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuGroup>
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="text-left"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {getDataTableColumnToggleLabel(
                    column.id,
                    column.columnDef.meta
                  )}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
