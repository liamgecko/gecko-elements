"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type InitialTableState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { SearchX } from "lucide-react"

import { cn } from "@gecko/ui/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableExpandableRow,
  TableRow,
} from "@gecko/ui/components/table"
import { Button } from "@gecko/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@gecko/ui/components/empty"

import type { DataTableColumnMeta } from "./data-table-column-meta"

function dataTableColumnMeta(
  meta: unknown
): DataTableColumnMeta | undefined {
  return meta as DataTableColumnMeta | undefined
}
import type { DataTableColumnToggleProps } from "./data-table-column-toggle"
import {
  DataTableContext,
  useDataTableContext,
  type DataTableExpandableConfig,
} from "./data-table-context"
import {
  createActionsColumn,
  createExpandColumn,
  createSelectionColumn,
  DataTableMultiSelectFilter,
} from "./data-table-columns"
import type { DataTableFiltersProps } from "./data-table-filters"
import type { DataTablePaginationProps } from "./data-table-pagination"
import type { DataTableSearchProps } from "./data-table-search"
import { DataTableColumnToggle } from "./data-table-column-toggle"
import { DataTableFilters } from "./data-table-filters"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableSearch } from "./data-table-search"
import { DataTableSelectActions } from "./data-table-select-actions"
import {
  DataTableToolbar,
  DataTableToolbarGroup,
  DataTableToolbarSearchRow,
} from "./data-table-toolbar"

export type { DataTableColumnMeta }
export type { DataTableExpandableConfig } from "./data-table-context"

export type DataTableRowAction = {
  id: string
  label: string
  /** Renders a separator above this item (e.g. after the first group). */
  separatorBefore?: boolean
  /** @default "default" */
  variant?: "default" | "destructive"
}

export type DataTableRowActionContext<TData> = {
  row: import("@tanstack/react-table").Row<TData>
  original: TData
}

export type DataTableSelectActionContext<TData> = {
  selectedRows: import("@tanstack/react-table").Row<TData>[]
}

export type DataTableProviderProps<TData> = {
  columns: ColumnDef<TData>[]
  data: TData[]
  children: React.ReactNode
  /** @default false */
  sorting?: boolean
  rowSelection?: boolean
  globalFilter?: boolean
  getRowId?: (originalRow: TData, index: number) => string
  initialState?: InitialTableState
  /** @default 10 */
  pageSize?: number
  /**
   * Per-row ⋯ menu: pass a shared `DataTableRowAction[]`, or `true` with `getRowActions` /
   * each row’s `actionsKey`. Omit or `false` to disable.
   */
  rowActions?: boolean | DataTableRowAction[]
  onRowAction?: (
    actionId: string,
    context: DataTableRowActionContext<TData>
  ) => void
  /** When `rowActions` is `true`, read actions from this key on each row. @default "actions" */
  actionsKey?: keyof TData
  /** Per-row actions; enables the column when provided (unless `rowActions: false`). */
  getRowActions?: (original: TData) => DataTableRowAction[]
  /**
   * Bulk “actions on selected” menu: same shape as row actions. Omit or use `[]` to disable.
   * Pair with `onSelectAction`.
   */
  selectActions?: DataTableRowAction[]
  onSelectAction?: (
    actionId: string,
    context: DataTableSelectActionContext<TData>
  ) => void
  /**
   * When set, prepends an expand column and renders each body row with
   * `TableExpandableRow`; use `renderDetail` for nested content (e.g. a nested `Table`).
   */
  expandable?: DataTableExpandableConfig<TData>
}

export type DataTableToolbarConfig = {
  search?: false | DataTableSearchProps
  filters?: false | DataTableFiltersProps
  columnToggle?: boolean | DataTableColumnToggleProps
  /** When true, renders `DataTableSelectActions` (still only shows when rows are selected). */
  selectActions?: boolean
}

export type DataTableProps<TData> = Omit<DataTableProviderProps<TData>, "children"> & {
  className?: string
  contentClassName?: string
  toolbar?: false | DataTableToolbarConfig
  pagination?: boolean | DataTablePaginationProps
}

function DataTableProvider<TData>({
  columns,
  data,
  children,
  sorting: enableSorting = false,
  rowSelection: enableRowSelection = false,
  globalFilter: enableGlobalFilter = true,
  rowActions: enableActions,
  onRowAction,
  getRowActions,
  actionsKey,
  selectActions: enableSelectActionsProp,
  onSelectAction,
  getRowId,
  initialState,
  pageSize = 10,
  expandable,
}: DataTableProviderProps<TData>) {
  const selectActions = enableSelectActionsProp ?? []

  const sharedRowActions = Array.isArray(enableActions)
    ? enableActions
    : undefined
  const rowActionsFromRowsOnly = enableActions === true

  const showRowActionsColumn =
    enableActions !== false &&
    (Boolean(getRowActions) ||
      (sharedRowActions?.length ?? 0) > 0 ||
      rowActionsFromRowsOnly)

  const getRowActionsResolved = React.useCallback(
    (original: TData) => {
      if (getRowActions) return getRowActions(original)
      if (sharedRowActions?.length) return sharedRowActions
      if (!rowActionsFromRowsOnly) return []
      const key = (actionsKey ?? "actions") as keyof TData
      const v = original[key]
      return Array.isArray(v) ? (v as DataTableRowAction[]) : []
    },
    [actionsKey, getRowActions, rowActionsFromRowsOnly, sharedRowActions]
  )

  const mergedColumns = React.useMemo(() => {
    let cols = [...columns]
    if (enableRowSelection) {
      cols = [createSelectionColumn<TData>(), ...cols]
    }
    if (expandable) {
      cols = [createExpandColumn<TData>(), ...cols]
    }
    if (showRowActionsColumn) {
      cols = [...cols, createActionsColumn<TData>()]
    }
    return cols
  }, [columns, enableRowSelection, expandable, showRowActionsColumn])

  const [sorting, setSorting] = React.useState<SortingState>(
    () => initialState?.sorting ?? []
  )
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    () => initialState?.columnFilters ?? []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(() => initialState?.columnVisibility ?? {})
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    () => initialState?.rowSelection ?? {}
  )
  const [globalFilter, setGlobalFilter] = React.useState(
    () => initialState?.globalFilter ?? ""
  )
  const [pagination, setPagination] = React.useState<PaginationState>(() => ({
    pageIndex: initialState?.pagination?.pageIndex ?? 0,
    pageSize: initialState?.pagination?.pageSize ?? pageSize,
  }))

  const [filterUiResetKey, setFilterUiResetKey] = React.useState(0)
  const resetFilterUi = React.useCallback(() => {
    setFilterUiResetKey((k) => k + 1)
  }, [])

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table useReactTable is not React Compiler–memoizable
  const table = useReactTable({
    data,
    columns: mergedColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    ...(enableSorting ? { getSortedRowModel: getSortedRowModel() } : {}),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting,
    enableRowSelection,
    getRowId,
    filterFns: {
      dataTableMultiSelect: DataTableMultiSelectFilter,
    },
    globalFilterFn: "includesString",
    enableGlobalFilter,
    ...(showRowActionsColumn
      ? {
          meta: {
            getRowActions: getRowActionsResolved,
            onRowAction,
          },
        }
      : {}),
  })

  return (
    <DataTableContext.Provider
      value={{
        table: table as import("@tanstack/react-table").Table<unknown>,
        expandable: expandable as DataTableExpandableConfig<unknown> | undefined,
        selectActions,
        onSelectAction: onSelectAction as
          | ((
              actionId: string,
              context: DataTableSelectActionContext<unknown>
            ) => void)
          | undefined,
        filterUiResetKey,
        resetFilterUi,
      }}
    >
      {children}
    </DataTableContext.Provider>
  )
}

function DataTableRoot({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="data-table-root"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

function DataTableContent<TData>({ className }: { className?: string }) {
  const { table, expandable, resetFilterUi } = useDataTableContext<TData>()

  const visibleLeafCount = table.getVisibleLeafColumns().length
  const state = table.getState()
  const searchTerm = String(state.globalFilter ?? "").trim()
  const hasSearch = searchTerm.length > 0
  const hasFilters = (state.columnFilters?.length ?? 0) > 0
  const description = hasSearch
    ? `There are no items that match '${searchTerm}'. Please try another search term.`
    : hasFilters
      ? "There are no results that match your criteria."
      : "There are no results to display."

  return (
    <div
      data-slot="data-table-content"
      className={cn("data-table rounded-md border border-border", className)}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const cells = row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    dataTableColumnMeta(cell.column.columnDef.meta)?.cellClassName
                  )}
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))

              if (expandable) {
                return (
                  <TableExpandableRow
                    key={row.id}
                    colSpan={visibleLeafCount}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    detail={expandable.renderDetail({
                      row,
                      original: row.original,
                    })}
                  >
                    {cells}
                  </TableExpandableRow>
                )
              }

              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {cells}
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={visibleLeafCount}
                data-slot="data-table-empty"
                className="p-0"
              >
                <div className="p-4">
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <SearchX />
                      </EmptyMedia>
                    </EmptyHeader>
                    <EmptyContent>
                      <div className="grid gap-1">
                        <EmptyTitle>No results found</EmptyTitle>
                        <EmptyDescription>{description}</EmptyDescription>
                      </div>
                      {hasFilters ? (
                        <div className="flex items-center justify-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              table.resetColumnFilters()
                              resetFilterUi()
                            }}
                          >
                            Clear filters
                          </Button>
                        </div>
                      ) : null}
                    </EmptyContent>
                  </Empty>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export function DataTable<TData>({
  className,
  contentClassName,
  toolbar,
  pagination,
  ...providerProps
}: DataTableProps<TData>) {
  const showToolbar = toolbar !== false && toolbar != null
  const toolbarConfig: DataTableToolbarConfig | undefined =
    showToolbar ? toolbar : undefined

  const showPagination = Boolean(pagination)
  const paginationProps =
    typeof pagination === "object" ? pagination : undefined

  const showSearch = toolbarConfig?.search !== false && toolbarConfig?.search != null
  const searchProps = showSearch && toolbarConfig ? toolbarConfig.search : undefined

  const showFilters =
    toolbarConfig?.filters !== false && toolbarConfig?.filters != null
  const filtersProps = showFilters && toolbarConfig ? toolbarConfig.filters : undefined

  const showSelectActions = toolbarConfig?.selectActions === true

  const showColumnToggle = Boolean(toolbarConfig?.columnToggle)
  const columnToggleProps =
    toolbarConfig && typeof toolbarConfig.columnToggle === "object"
      ? toolbarConfig.columnToggle
      : undefined

  const resolvedGlobalFilter =
    providerProps.globalFilter ?? (showSearch ? true : undefined)

  return (
    <DataTableProvider
      {...providerProps}
      globalFilter={resolvedGlobalFilter ?? true}
    >
      <DataTableRoot className={className}>
        {showToolbar ? (
          <DataTableToolbar>
            <DataTableToolbarSearchRow>
              {showSearch ? <DataTableSearch {...(searchProps as DataTableSearchProps)} /> : null}
              {showFilters ? (
                <DataTableFilters {...(filtersProps as DataTableFiltersProps)} />
              ) : null}
            </DataTableToolbarSearchRow>
            <DataTableToolbarGroup>
              {showSelectActions ? <DataTableSelectActions /> : null}
              {showColumnToggle ? (
                <DataTableColumnToggle {...(columnToggleProps as DataTableColumnToggleProps)} />
              ) : null}
            </DataTableToolbarGroup>
          </DataTableToolbar>
        ) : null}
        <DataTableContent className={contentClassName} />
        {showPagination ? (
          <DataTablePagination {...(paginationProps as DataTablePaginationProps)} />
        ) : null}
      </DataTableRoot>
    </DataTableProvider>
  )
}

export { DataTableProvider, DataTableContent }
