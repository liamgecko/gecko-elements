"use client"

import * as React from "react"
import type { ColumnFiltersState } from "@tanstack/react-table"

import {
  Filter,
  type FilterCategory,
  type FilterOperator,
  type FilterProps,
} from "@gecko/ui/components/filters"
import { cn } from "@gecko/ui/lib/utils"

import { useDataTableContext } from "./data-table-context"
import type { DataTableMultiSelectFilterValue } from "./data-table-columns"

function mapToColumnFilters(
  values: Record<string, string[]>,
  operators: Record<string, FilterOperator>
): ColumnFiltersState {
  return Object.entries(values)
    .filter(([, vals]) => (vals?.length ?? 0) > 0)
    .map(([id, vals]) => {
      const operator: FilterOperator =
        operators[id] ?? (vals.length >= 2 ? "is any of" : "is")
      const value: DataTableMultiSelectFilterValue = {
        operator,
        values: vals,
      }
      return { id, value }
    })
}

export type DataTableFiltersProps = Omit<FilterProps, "categories" | "onChange"> & {
  categories: FilterCategory[]
}

/**
 * Bridges the Filter UI to TanStack column filters. Use category `id` equal to
 * the column `id` (or `accessorKey` as string). Set `filterFn: DataTableMultiSelectFilter`
 * on those columns in `ColumnDef`.
 *
 * Supports operators `is`, `is not`, and `is any of` via `DataTableMultiSelectFilter`.
 */
export function DataTableFilters({
  categories,
  className,
  ...props
}: DataTableFiltersProps) {
  const { table, filterUiResetKey } = useDataTableContext<unknown>()
  const handleChange = React.useCallback(
    (values: Record<string, string[]>, operators: Record<string, FilterOperator>) => {
      table.setColumnFilters(mapToColumnFilters(values, operators))
    },
    [table]
  )

  return (
    <Filter
      key={filterUiResetKey}
      categories={categories}
      className={cn(className)}
      onChange={handleChange}
      {...props}
    />
  )
}
