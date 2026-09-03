"use client"

import * as React from "react"
import type { Table } from "@tanstack/react-table"

import type { DataTableRowAction, DataTableSelectActionContext } from "./data-table"

/** Optional expandable detail row for `DataTable` (see `expandable` on `DataTableProvider`). */
export type DataTableExpandableConfig<TData> = {
  renderDetail: (context: {
    row: import("@tanstack/react-table").Row<TData>
    original: TData
  }) => React.ReactNode
}

export type DataTableContextValue = {
  table: Table<unknown>
  /** When set, body rows render as expandable with `TableExpandableRow`. */
  expandable?: DataTableExpandableConfig<unknown>
  /** Bulk toolbar actions from `DataTableProvider` `selectActions`. */
  selectActions: DataTableRowAction[]
  onSelectAction?: (actionId: string, context: DataTableSelectActionContext<unknown>) => void
  /**
   * Incrementing this remounts `DataTableFilters` so its UI matches TanStack after
   * e.g. `table.resetColumnFilters()` from outside the Filter component.
   */
  filterUiResetKey: number
  /** Remount the filter toolbar UI (clears chips / internal state). */
  resetFilterUi: () => void
}

export const DataTableContext = React.createContext<DataTableContextValue | null>(null)

export function useDataTableContext<TData>() {
  const ctx = React.useContext(DataTableContext)
  if (!ctx) {
    throw new Error("Data table subcomponents must be used within DataTableProvider.")
  }
  return {
    table: ctx.table as Table<TData>,
    expandable: ctx.expandable as DataTableExpandableConfig<TData> | undefined,
    selectActions: ctx.selectActions as DataTableRowAction[],
    onSelectAction: ctx.onSelectAction as
      | ((actionId: string, context: DataTableSelectActionContext<TData>) => void)
      | undefined,
    filterUiResetKey: ctx.filterUiResetKey,
    resetFilterUi: ctx.resetFilterUi,
  }
}
