"use client";

import { DataTableCellLink } from "./data-table-cell-link";
import { DataTableTextCell } from "./data-table-text-cell";

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
  type OnChangeFn,
  type Updater,
} from "@tanstack/react-table";
import SearchX from "@hugeicons/core-free-icons/SearchXIcon";
import RefreshIcon from "@hugeicons/core-free-icons/RefreshIcon";
import XIcon from "@hugeicons/core-free-icons/XIcon";
import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";

import { cn } from "@geckolabs/elements/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableExpandableRow,
  TableRow,
} from "@geckolabs/elements/components/table";
import { Skeleton } from "@geckolabs/elements/components/skeleton";
import { Button } from "@geckolabs/elements/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@geckolabs/elements/components/empty";

import { prepareLayoutColumns, useDataTableLayout } from "./data-table-layout";
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
  DataTableSelectionBar,
  type DataTableSelectionBarLabels,
} from "./data-table-selection-bar";
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
  /** Optional decorative icon shared by row, bulk and overflow actions. */
  icon?: React.ReactNode;
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

/** Atomic server query; pages use zero-based indexes. */
export type DataTableQueryState = {
  globalFilter: string;
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
};
export type DataTableRemoteConfig = {
  state: DataTableQueryState;
  onStateChange: OnChangeFn<DataTableQueryState>;
  /** Total matching records on the server, not the current page length. */
  rowCount: number;
};
export type DataTableLabels = {
  results?: (count: number) => string;
  showing?: string;
  perPage?: string;
  page?: (page: number, pages: number) => string;
  previousPage?: string;
  nextPage?: string;
  rowsPerPage?: string;
  selectPage?: string;
  selectAllRows?: string;
  selectRow?: (index: number) => string;
  rowActions?: (index: number) => string;
  actions?: string;
  loading?: string;
  retry?: string;
  noResults?: string;
  noItems?: string;
  emptyDescription?: string;
  noResultsDescription?: string;
  clearSearch?: string;
  clearFilters?: string;
  clearSearchAndFilters?: string;
};

export type DataTableRowLinkConfig<TData> = {
  /** Native navigation destination. Return null/undefined for rows without a destination. */
  getHref: (original: TData) => string | null | undefined;
  /** Explicit opt-in: only non-interactive data cells belong here. */
  columnIds: readonly string[];
  /** Main keyboard link; falls back to the first visible linked cell if hidden. */
  primaryColumnId: string;
};

type DataTableBaseProviderProps<TData> = {
  rowLink?: DataTableRowLinkConfig<TData>;
  columns: ColumnDef<TData>[];
  data: TData[];
  /** The app owns requests and supplies one server page. */
  remote?: DataTableRemoteConfig;
  selection?: {
    state: RowSelectionState;
    onChange: OnChangeFn<RowSelectionState>;
  };
  loading?: boolean;
  /** Keep rows visible while a remote query refreshes; block stale row actions. */
  updating?: boolean;
  error?: string;
  onRetry?: () => void;
  labels?: DataTableLabels;
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
  /** Presentation of selected-row actions. @default "button" */
  selectActionsDisplay?: "button" | "floating";
  /** Translated labels for the floating selection bar. */
  selectActionsLabels?: DataTableSelectionBarLabels;
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
  rowLink,
  initialState,
  expandable,
  paginated = true,
  remote,
  selection,
  loading = false,
  updating = false,
  error,
  onRetry,
  labels,
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
      cols = [createSelectionColumn<TData>(paginated, labels), ...cols];
    }
    if (expandable) {
      cols = [createExpandColumn<TData>(), ...cols];
    }
    if (showRowActionsColumn) {
      cols = [...cols, createActionsColumn<TData>(labels)];
    }
    return prepareLayoutColumns(cols);
  }, [
    columns,
    labels,
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

  const changeQuery = <K extends keyof DataTableQueryState>(
    key: K,
    updater: Updater<DataTableQueryState[K]>,
  ) => {
    remote?.onStateChange((current) => {
      const value =
        typeof updater === "function" ? updater(current[key]) : updater;
      return {
        ...current,
        [key]: value,
        ...(key !== "pagination"
          ? { pagination: { ...current.pagination, pageIndex: 0 } }
          : {}),
      };
    });
  };

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table useReactTable is not React Compiler–memoizable
  const table = useReactTable({
    data,
    columns: mergedColumns,
    state: {
      sorting: remote?.state.sorting ?? sorting,
      columnFilters: remote?.state.columnFilters ?? columnFilters,
      columnVisibility,
      rowSelection: selection?.state ?? rowSelection,
      globalFilter: remote?.state.globalFilter ?? globalFilter,
      pagination: remote?.state.pagination ?? pagination,
    },
    onSortingChange: remote
      ? (updater) => changeQuery("sorting", updater)
      : setSorting,
    onColumnFiltersChange: remote
      ? (updater) => changeQuery("columnFilters", updater)
      : setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: selection?.onChange ?? setRowSelection,
    onGlobalFilterChange: remote
      ? (updater) => changeQuery("globalFilter", updater)
      : setGlobalFilter,
    onPaginationChange: remote
      ? (updater) => changeQuery("pagination", updater)
      : setPagination,
    manualPagination: Boolean(remote),
    manualSorting: Boolean(remote),
    manualFiltering: Boolean(remote),
    ...(remote ? { rowCount: remote.rowCount, autoResetPageIndex: false } : {}),
    getCoreRowModel: getCoreRowModel(),
    ...(enableSorting ? { getSortedRowModel: getSortedRowModel() } : {}),
    getFilteredRowModel: getFilteredRowModel(),
    ...(paginated ? { getPaginationRowModel: getPaginationRowModel() } : {}),
    enableSorting,
    enableRowSelection: enableRowSelection && !loading && !updating && !error,
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
        rowLink: rowLink as DataTableRowLinkConfig<unknown> | undefined,
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
        loading,
        updating,
        error,
        onRetry,
        labels,
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
  const {
    table,
    expandable,
    rowLink,
    resetFilterUi,
    loading,
    error,
    onRetry,
    labels,
  } = useDataTableContext<TData>();

  const linkId = React.useId();
  const layout = useDataTableLayout(table);
  const visibleLeafCount = layout.columns.length;
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

  // Also contain the loading status when used without DataTableRoot.
  return (
    <div
      data-slot="data-table-content"
      className={cn(
        "data-table relative rounded-md border border-border",
        className,
      )}
    >
      <Table
        aria-label={ariaLabel}
        aria-busy={loading}
        className="table-fixed"
        style={{ width: layout.total || "100%" }}
        containerProps={{
          ref: layout.containerRef,
          tabIndex: layout.overflow ? 0 : undefined,
          role: layout.overflow ? "region" : undefined,
          "aria-label": layout.overflow ? ariaLabel : undefined,
          className:
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
        }}
      >
        <colgroup>
          {layout.columns.map((column) => (
            <col
              key={column.id}
              data-column-id={column.id}
              style={{ width: layout.widths.get(column.id) }}
            />
          ))}
        </colgroup>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  data-column-id={header.column.id}
                  aria-sort={
                    header.column.getIsSorted() === "asc"
                      ? "ascending"
                      : header.column.getIsSorted() === "desc"
                        ? "descending"
                        : undefined
                  }
                  className={cn(
                    "whitespace-nowrap",
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
          {loading ? (
            Array.from(
              { length: rows.length || state.pagination.pageSize },
              (_, index) => (
                <TableRow key={index} aria-hidden="true">
                  {layout.columns.map((column) => (
                    <TableCell
                      key={column.id}
                      data-column-id={column.id}
                      className={
                        dataTableColumnMeta(column.columnDef.meta)
                          ?.cellClassName
                      }
                    >
                      {dataTableColumnMeta(column.columnDef.meta)?.skeleton ?? (
                        <Skeleton className="h-[1lh] w-full motion-reduce:animate-none" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ),
            )
          ) : error ? (
            <TableRow>
              <TableCell colSpan={visibleLeafCount}>
                <div
                  role="alert"
                  className="grid justify-items-center gap-3 p-4"
                >
                  <p>{error}</p>
                  {onRetry && (
                    <Button variant="outline" onClick={onRetry}>
                      <HugeiconsIcon icon={RefreshIcon} aria-hidden="true" />
                      {labels?.retry ?? "Retry"}
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ) : rows.length ? (
            rows.map((row) => {
              const visibleCells = row.getVisibleCells();
              const href = rowLink?.getHref(row.original);
              const linkedCells = href
                ? visibleCells.filter(
                    (cell) =>
                      rowLink?.columnIds.includes(cell.column.id) &&
                      !["select", "expand", "actions"].includes(cell.column.id),
                  )
                : [];
              const primary =
                linkedCells.find(
                  (cell) => cell.column.id === rowLink?.primaryColumnId,
                ) ?? linkedCells[0];
              const cellLinkId = (id: string) =>
                `${linkId}-${encodeURIComponent(id)}`;
              const cells = visibleCells.map((cell) => {
                const content =
                  dataTableColumnMeta(cell.column.columnDef.meta)
                    ?.cellLayout === "content" ? (
                    <div className="min-w-0 max-w-full">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </div>
                  ) : (
                    <DataTableTextCell>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </DataTableTextCell>
                  );
                const linked = href && primary && linkedCells.includes(cell);
                return (
                  <TableCell
                    key={cell.id}
                    data-column-id={cell.column.id}
                    className={cn(
                      "whitespace-nowrap",
                      dataTableColumnMeta(cell.column.columnDef.meta)
                        ?.cellClassName,
                      linked && "relative isolate",
                    )}
                  >
                    {linked ? (
                      <DataTableCellLink
                        href={href}
                        id={cellLinkId(cell.id)}
                        primaryId={cellLinkId(primary.id)}
                      >
                        {content}
                      </DataTableCellLink>
                    ) : (
                      content
                    )}
                  </TableCell>
                );
              });

              if (expandable) {
                return (
                  <TableExpandableRow
                    key={row.id}
                    className={
                      linkedCells.length
                        ? "hover:bg-muted/50 has-[[data-slot=data-table-cell-link]:focus-visible]:bg-muted/50"
                        : undefined
                    }
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
                  className={
                    linkedCells.length
                      ? "hover:bg-muted/50 has-[[data-slot=data-table-cell-link]:focus-visible]:bg-muted/50"
                      : undefined
                  }
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
                            ? (labels?.noResults ?? "No results found")
                            : (labels?.noItems ?? "No items yet")}
                        </EmptyTitle>
                        <EmptyDescription>
                          {(hasSearch || hasFilters
                            ? labels?.noResultsDescription
                            : labels?.emptyDescription) ?? description}
                        </EmptyDescription>
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
                            <HugeiconsIcon icon={XIcon} aria-hidden="true" />
                            {hasSearch && hasFilters
                              ? (labels?.clearSearchAndFilters ??
                                "Clear search and filters")
                              : hasSearch
                                ? (labels?.clearSearch ?? "Clear search")
                                : (labels?.clearFilters ?? "Clear filters")}
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
      <span role="status" className="sr-only">
        {loading ? (labels?.loading ?? "Loading rows…") : ""}
      </span>
    </div>
  );
}

function DataTableEmptyBoundary({ children }: { children: React.ReactNode }) {
  const { table, loading, error, labels } = useDataTableContext();
  const state = table.getState();
  const hasQuery =
    Boolean(String(state.globalFilter ?? "").trim()) ||
    state.columnFilters.length > 0;
  const noData = table.options.data.length === 0 && table.getRowCount() === 0;
  if (!loading && !error && !hasQuery && noData) {
    return (
      <Empty data-slot="data-table-no-data">
        <EmptyHeader>
          <EmptyTitle>{labels?.noItems ?? "No items yet"}</EmptyTitle>
          <EmptyDescription>
            {labels?.emptyDescription ?? "There are no items to display."}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }
  return children;
}

export function DataTable<TData>({
  className,
  contentClassName,
  "aria-label": ariaLabel,
  toolbar,
  pagination,
  selectActionsDisplay = "button",
  selectActionsLabels,
  ...providerProps
}: DataTableProps<TData>) {
  const hasSelectActions = (providerProps.selectActions?.length ?? 0) > 0;
  const showSelectActionsButton =
    hasSelectActions && selectActionsDisplay === "button";
  const showToolbar =
    (toolbar !== false && toolbar != null) || showSelectActionsButton;
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
      <DataTableEmptyBoundary>
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
                {showSelectActionsButton ? <DataTableSelectActions /> : null}
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
          {hasSelectActions && selectActionsDisplay === "floating" ? (
            <DataTableSelectionBar labels={selectActionsLabels} />
          ) : null}
        </DataTableRoot>
      </DataTableEmptyBoundary>
    </DataTableProvider>
  );
}

export { DataTableProvider, DataTableContent };
