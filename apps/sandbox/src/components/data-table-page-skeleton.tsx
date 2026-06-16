import { Skeleton } from "@gecko/ui/components/skeleton"
import {
  DataTableToolbar,
  DataTableToolbarGroup,
  DataTableToolbarSearchRow,
} from "@gecko/ui/components/data-table/data-table-toolbar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@gecko/ui/components/table"
import { cn } from "@gecko/ui/lib/utils"

export type DataTablePageSkeletonProps = {
  /** Visible data columns (excluding selection and actions). @default 3 */
  columnCount?: number
  /** Body rows to render. @default 8 */
  rowCount?: number
  /** Show a checkbox column on the left. @default true */
  rowSelection?: boolean
  /** Show filter + column toggle placeholders in the toolbar. @default true */
  showFilters?: boolean
  /** Show pagination placeholders. @default true */
  showPagination?: boolean
  className?: string
}

export function DataTablePageSkeleton({
  columnCount = 3,
  rowCount = 8,
  rowSelection = true,
  showFilters = true,
  showPagination = true,
  className,
}: DataTablePageSkeletonProps) {
  const columns = Array.from({ length: columnCount }, (_, index) => index)
  const rows = Array.from({ length: rowCount }, (_, index) => index)

  return (
    <div
      data-slot="data-table-page-skeleton"
      className={cn("flex flex-col gap-4", className)}
      aria-busy="true"
      aria-label="Loading table"
    >
      <DataTableToolbar>
        <DataTableToolbarSearchRow>
          <Skeleton className="h-7 w-full max-w-[200px] rounded-sm" />
          {showFilters ? (
            <Skeleton className="h-7 w-19.5 shrink-0 rounded-sm" />
          ) : null}
        </DataTableToolbarSearchRow>
        {showFilters ? (
          <DataTableToolbarGroup>
            <Skeleton className="size-7 shrink-0 rounded-sm" />
          </DataTableToolbarGroup>
        ) : null}
      </DataTableToolbar>

      <div className="data-table rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              {rowSelection ? (
                <TableHead className="w-10">
                  <Skeleton className="size-4 rounded-sm" />
                </TableHead>
              ) : null}
              {columns.map((column) => (
                <TableHead key={column}>
                  <Skeleton className="h-3.5 w-24 max-w-full rounded-sm" />
                </TableHead>
              ))}
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row}>
                {rowSelection ? (
                  <TableCell>
                    <Skeleton className="size-4 rounded-sm" />
                  </TableCell>
                ) : null}
                {columns.map((column) => (
                  <TableCell key={column}>
                    <Skeleton
                      className={cn(
                        "h-3.5 rounded-sm",
                        column === 1 ? "w-26" : "w-18",
                      )}
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex justify-end">
                    <Skeleton className="size-7 rounded-sm" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showPagination ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
            <Skeleton className="h-5 w-28 rounded-sm" />
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-5 w-14 rounded-sm" />
              <Skeleton className="h-7 w-14 rounded-sm" />
              <Skeleton className="h-5 w-16 rounded-sm" />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Skeleton className="h-7 min-w-24 w-24 rounded-sm" />
            <Skeleton className="size-7 shrink-0 rounded-sm" />
            <Skeleton className="size-7 shrink-0 rounded-sm" />
          </div>
        </div>
      ) : null}
    </div>
  )
}
