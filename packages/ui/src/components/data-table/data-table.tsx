"use client";

import * as React from "react";
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
} from "@tanstack/react-table";
import SearchX from "@hugeicons/core-free-icons/SearchXIcon";
import { HugeiconsIcon } from "@gecko/ui/lib/icon";

import { cn } from "@gecko/ui/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableExpandableRow,
  TableRow,
} from "@gecko/ui/components/table";
import { Button } from "@gecko/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@gecko/ui/components/empty";

import type { DataTableColumnMeta } from "./data-table-column-meta";

function dataTableColumnMeta(meta: unknown): DataTableColumnMeta | undefined {
  return meta as DataTableColumnMeta | undefined;
}
import type { DataTableColumnToggleProps } from "./data-table-column-toggle";
import {
  DataTableContext,
  useDataTableContext,
  type DataTableExpandableConfig,
} from "./data-table-context";
import {
  createActionsColumn,
  createExpandColumn,
  createSelectionColumn,
  DataTableMultiSelectFilter,
} from "./data-table-columns";
import type { DataTableFiltersProps } from "./data-table-filters";
import type { DataTablePaginationProps } from "./data-table-pagination";
import { DATA_TABLE_PAGE_SIZE_OPTIONS } from "./data-table-pagination";
import type { DataTableSearchProps } from "./data-table-search";
import { DataTableColumnToggle } from "./data-table-column-toggle";
import { DataTableFilters } from "./data-table-filters";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableSearch } from "./data-table-search";
import { DataTableSelectActions } from "./data-table-select-actions";
import {
  DataTableRoot,
  DataTableToolbar,
  DataTableToolbarGroup,
  DataTableToolbarSearchRow,
} from "./data-table-toolbar";

export type { DataTableColumnMeta };
export type { DataTableExpandableConfig } from "./data-table-context";

export type DataTableRowAction = {
  id: string;
  label: string;
  /** Renders a separator above this item (e.g. after the first group). */
  separatorBefore?: boolean;
  /** @default "default" */
  variant?: "default" | "destructive";
};

export type DataTableRowActionContext<TData> = {
  row: import("@tanstack/react-table").Row<TData>;
  original: TData;
};

export type DataTableSelectActionContext<TData> = {
  selectedRows: import("@tanstack/react-table").Row<TData>[];
};

type DataTableBaseProviderProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  /** Whether the provider should apply its pagination row model. @default true */
  paginated?: boolean;
  /** @default false */
  sorting?: boolean;
  rowSelection?: boolean;
  globalFilter?: boolean;
  getRowId?: (originalRow: TData, index: number) => string;
  initialState?: InitialTableState;
  /**
   * When set, prepends an expand column and renders each body row with
   * `TableExpandableRow`; use `renderDetail` for nested content (e.g. a nested `Table`).
   */
  expandable?: DataTableExpandableConfig<TData>;
};

type DataTableRowActionsConfig<TData> =
  | {
      rowActions?: false;
      getRowActions?: undefined;
      actionsKey?: undefined;
      onRowAction?: undefined;
    }
  | {
      /** Shared actions shown for every row. */
      rowActions: DataTableRowAction[];
      getRowActions?: undefined;
      actionsKey?: undefined;
      onRowAction: (
        actionId: string,
        context: DataTableRowActionContext<TData>,
      ) => void;
    }
  | {
      /** Resolve actions from each row using `actionsKey`. @default "actions" */
      rowActions: true;
      getRowActions?: undefined;
      actionsKey?: keyof TData;
      onRowAction: (
        actionId: string,
        context: DataTableRowActionContext<TData>,
      ) => void;
    }
  | {
      rowActions?: true;
      /** Resolve the actions available for each row. */
      getRowActions: (original: TData) => DataTableRowAction[];
      actionsKey?: undefined;
      onRowAction: (
        actionId: string,
        context: DataTableRowActionContext<TData>,
      ) => void;
    };

type DataTableSelectActionsConfig<TData> =
  | {
      selectActions?: undefined;
      onSelectAction?: undefined;
    }
  | {
      /** Bulk actions shown when one or more rows are selected. */
      selectActions: DataTableRowAction[];
      onSelectAction: (
        actionId: string,
        context: DataTableSelectActionContext<TData>,
      ) => void;
    };

type DataTableProviderConfig<TData> = DataTableBaseProviderProps<TData> &
  DataTableRowActionsConfig<TData> &
  DataTableSelectActionsConfig<TData>;

type DistributiveOmit<T, K extends PropertyKey> = T extends unknown
  ? Omit<T, K>
  : never;

export type DataTableProviderProps<TData> = DataTableProviderConfig<TData> & {
  children: React.ReactNode;
};

export type DataTableToolbarConfig = {
  search?: false | DataTableSearchProps;
  filters?: false | DataTableFiltersProps;
  columnToggle?: boolean | DataTableColumnToggleProps;
};

export type DataTableProps<TData> = DistributiveOmit<
  DataTableProviderConfig<TData>,
  "paginated"
> & {
  className?: string;
  contentClassName?: string;
  /** Concise accessible name for the table, such as "Events". */
  "aria-label"?: string;
  toolbar?: false | DataTableToolbarConfig;
  pagination?: boolean | DataTablePaginationProps;
};

const EMPTY_SELECT_ACTIONS: DataTableRowAction[] = [];

const DEFAULT_PAGE_SIZE = DATA_TABLE_PAGE_SIZE_OPTIONS[0];

function resolveInitialPageSize(
  initialState: InitialTableState | undefined,
): number {
  const requested = initialState?.pagination?.pageSize;
  if (
    requested != null &&
    (DATA_TABLE_PAGE_SIZE_OPTIONS as readonly number[]).includes(requested)
  ) {
    return requested;
  }
  return DEFAULT_PAGE_SIZE;
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
  expandable,
  paginated = true,
}: DataTableProviderProps<TData>) {
  const selectActions = enableSelectActionsProp ?? EMPTY_SELECT_ACTIONS;

  const sharedRowActions = Array.isArray(enableActions)
    ? enableActions
    : undefined;
  const rowActionsFromRowsOnly = enableActions === true;

  const showRowActionsColumn =
    enableActions !== false &&
    (Boolean(getRowActions) ||
      (sharedRowActions?.length ?? 0) > 0 ||
      rowActionsFromRowsOnly);

  const getRowActionsResolved = React.useCallback(
    (original: TData) => {
      if (getRowActions) return getRowActions(original);
      if (sharedRowActions?.length) return sharedRowActions;
      if (!rowActionsFromRowsOnly) return [];
      const key = (actionsKey ?? "actions") as keyof TData;
      const v = original[key];
      return Array.isArray(v) ? (v as DataTableRowAction[]) : [];
    },
    [actionsKey, getRowActions, rowActionsFromRowsOnly, sharedRowActions],
  );

  const mergedColumns = React.useMemo(() => {
    let cols = [...columns];
    if (enableRowSelection) {
      cols = [createSelectionColumn<TData>(paginated), ...cols];
    }
    if (expandable) {
      cols = [createExpandColumn<TData>(), ...cols];
    }
    if (showRowActionsColumn) {
      cols = [...cols, createActionsColumn<TData>()];
    }
    return cols;
  }, [
    columns,
    enableRowSelection,
    expandable,
    paginated,
    showRowActionsColumn,
  ]);

  const [sorting, setSorting] = React.useState<SortingState>(
    () => initialState?.sorting ?? [],
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    () => initialState?.columnFilters ?? [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(() => initialState?.columnVisibility ?? {});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    () => initialState?.rowSelection ?? {},
  );
  const [globalFilter, setGlobalFilter] = React.useState(
    () => initialState?.globalFilter ?? "",
  );
  const [pagination, setPagination] = React.useState<PaginationState>(() => ({
    pageIndex: initialState?.pagination?.pageIndex ?? 0,
    pageSize: resolveInitialPageSize(initialState),
  }));

  const [filterUiResetKey, setFilterUiResetKey] = React.useState(0);
  const resetFilterUi = React.useCallback(() => {
    setFilterUiResetKey((k) => k + 1);
  }, []);

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
    ...(paginated ? { getPaginationRowModel: getPaginationRowModel() } : {}),
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
  });

  return (
    <DataTableContext.Provider
      value={{
        table: table as import("@tanstack/react-table").Table<unknown>,
        expandable: expandable as
          | DataTableExpandableConfig<unknown>
          | undefined,
        selectActions,
        onSelectAction: onSelectAction as
          | ((
              actionId: string,
              context: DataTableSelectActionContext<unknown>,
            ) => void)
          | undefined,
        filterUiResetKey,
        resetFilterUi,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}

export type DataTableContentProps = {
  className?: string;
  paginated?: boolean;
  "aria-label"?: string;
};

function DataTableContent<TData>({
  className,
  paginated = true,
  "aria-label": ariaLabel,
}: DataTableContentProps) {
  const { table, expandable, resetFilterUi } = useDataTableContext<TData>();

  const visibleLeafCount = table.getVisibleLeafColumns().length;
  const state = table.getState();
  const searchTerm = String(state.globalFilter ?? "").trim();
  const hasSearch = searchTerm.length > 0;
  const hasFilters = (state.columnFilters?.length ?? 0) > 0;
  const rows = paginated
    ? table.getRowModel().rows
    : table.getPrePaginationRowModel().rows;
  const description = hasSearch
    ? `There are no items that match '${searchTerm}'. Please try another search term.`
    : hasFilters
      ? "There are no results that match your criteria."
      : "There are no items to display.";

  return (
    <div
      data-slot="data-table-content"
      className={cn("data-table rounded-md border border-border", className)}
    >
      <Table aria-label={ariaLabel}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  aria-sort={
                    header.column.getIsSorted() === "asc"
                      ? "ascending"
                      : header.column.getIsSorted() === "desc"
                        ? "descending"
                        : undefined
                  }
                  className={cn(
                    dataTableColumnMeta(header.column.columnDef.meta)
                      ?.headerClassName,
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.length ? (
            rows.map((row) => {
              const cells = row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    dataTableColumnMeta(cell.column.columnDef.meta)
                      ?.cellClassName,
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ));

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
                );
              }

              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {cells}
                </TableRow>
              );
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
                    {hasSearch || hasFilters ? (
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <HugeiconsIcon icon={SearchX} />
                        </EmptyMedia>
                      </EmptyHeader>
                    ) : null}
                    <EmptyContent>
                      <div className="grid gap-1">
                        <EmptyTitle>
                          {hasSearch || hasFilters
                            ? "No results found"
                            : "No items yet"}
                        </EmptyTitle>
                        <EmptyDescription>{description}</EmptyDescription>
                      </div>
                      {hasSearch || hasFilters ? (
                        <div className="flex items-center justify-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (hasSearch) {
                                table.setGlobalFilter("");
                              }
                              if (hasFilters) {
                                table.resetColumnFilters();
                                resetFilterUi();
                              }
                            }}
                          >
                            {hasSearch && hasFilters
                              ? "Clear search and filters"
                              : hasSearch
                                ? "Clear search"
                                : "Clear filters"}
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
  );
}

export function DataTable<TData>({
  className,
  contentClassName,
  "aria-label": ariaLabel,
  toolbar,
  pagination,
  ...providerProps
}: DataTableProps<TData>) {
  const hasSelectActions = (providerProps.selectActions?.length ?? 0) > 0;
  const showToolbar =
    (toolbar !== false && toolbar != null) || hasSelectActions;
  const toolbarConfig: DataTableToolbarConfig | undefined =
    toolbar && typeof toolbar === "object" ? toolbar : undefined;

  const showPagination = Boolean(pagination);
  const paginationProps =
    typeof pagination === "object" ? pagination : undefined;

  const showSearch =
    toolbarConfig?.search !== false && toolbarConfig?.search != null;
  const searchProps =
    showSearch && toolbarConfig ? toolbarConfig.search : undefined;

  const showFilters =
    toolbarConfig?.filters !== false && toolbarConfig?.filters != null;
  const filtersProps =
    showFilters && toolbarConfig ? toolbarConfig.filters : undefined;

  const showColumnToggle = Boolean(toolbarConfig?.columnToggle);
  const columnToggleProps =
    toolbarConfig && typeof toolbarConfig.columnToggle === "object"
      ? toolbarConfig.columnToggle
      : undefined;

  const resolvedGlobalFilter =
    providerProps.globalFilter ?? (showSearch ? true : undefined);

  return (
    <DataTableProvider
      {...providerProps}
      paginated={showPagination}
      rowSelection={hasSelectActions ? true : providerProps.rowSelection}
      globalFilter={resolvedGlobalFilter ?? true}
    >
      <DataTableRoot className={className}>
        {showToolbar ? (
          <DataTableToolbar>
            <DataTableToolbarSearchRow>
              {showSearch ? (
                <DataTableSearch {...(searchProps as DataTableSearchProps)} />
              ) : null}
              {showFilters ? (
                <DataTableFilters
                  {...(filtersProps as DataTableFiltersProps)}
                />
              ) : null}
            </DataTableToolbarSearchRow>
            <DataTableToolbarGroup>
              {hasSelectActions ? <DataTableSelectActions /> : null}
              {showColumnToggle ? (
                <DataTableColumnToggle
                  {...(columnToggleProps as DataTableColumnToggleProps)}
                />
              ) : null}
            </DataTableToolbarGroup>
          </DataTableToolbar>
        ) : null}
        <DataTableContent
          className={contentClassName}
          paginated={showPagination}
          aria-label={ariaLabel}
        />
        {showPagination ? (
          <DataTablePagination
            {...(paginationProps as DataTablePaginationProps)}
          />
        ) : null}
      </DataTableRoot>
    </DataTableProvider>
  );
}

export { DataTableProvider, DataTableContent };
