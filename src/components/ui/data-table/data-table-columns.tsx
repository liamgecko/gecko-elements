"use client"

/* eslint-disable react-refresh/only-export-components -- TanStack Table column helpers are intentionally exported from this module. */

import type { ColumnDef, FilterFn } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"

import { DataTableRowActionsMenu } from "./data-table-row-actions"

/** Value shape when using `DataTableFilters` (operators + selected option values). */
export type DataTableMultiSelectFilterValue = {
  operator: "is" | "is not" | "is any of"
  values: string[]
}

/** Use with `DataTableFilters`: category ids must match column ids. */
export const DataTableMultiSelectFilter: FilterFn<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches arbitrary row shapes from consumer tables
  any
> = (row, columnId, filterValue) => {
  if (filterValue == null) return true

  // Legacy: plain string[] (inclusion only)
  if (Array.isArray(filterValue)) {
    const selected = filterValue as string[]
    if (!selected.length) return true
    const v = row.getValue(columnId)
    return selected.includes(String(v))
  }

  const fv = filterValue as DataTableMultiSelectFilterValue
  const selected = fv.values ?? []
  if (!selected.length) return true

  const op = fv.operator ?? "is"
  const v = row.getValue(columnId)
  const inList = selected.includes(String(v))

  if (op === "is not") return !inList
  return inList
}

export function createSelectionColumn<TData>(): ColumnDef<TData> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() &&
          !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }
}

export function createActionsColumn<TData>(): ColumnDef<TData> {
  return {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row, table }) => (
      <div data-slot="data-table-actions-cell" className="flex justify-end">
        <DataTableRowActionsMenu row={row} table={table} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  }
}
