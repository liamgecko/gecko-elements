"use client";

import * as React from "react";
import type { Table } from "@tanstack/react-table";

import type {
  DataTableLabels,
  DataTableRowLinkConfig,
  DataTableRowAction,
  DataTableSelectActionContext,
} from "./data-table";

// Linked cells own one focus stop and one tooltip for all their text lines.
export const DataTableCellLinkContext = React.createContext(false);

/** Optional expandable detail row for `DataTable` (see `expandable` on `DataTableProvider`). */
export type DataTableExpandableConfig<TData> = {
  renderDetail: (context: {
    row: import("@tanstack/react-table").Row<TData>;
    original: TData;
  }) => React.ReactNode;
};

export type DataTableContextValue = {
  table: Table<unknown>;
  rowLink?: DataTableRowLinkConfig<unknown>;
  loading?: boolean;
  updating?: boolean;
  error?: string;
  onRetry?: () => void;
  labels?: DataTableLabels;
  /** When set, body rows render as expandable with `TableExpandableRow`. */
  expandable?: DataTableExpandableConfig<unknown>;
  /** Bulk toolbar actions from `DataTableProvider` `selectActions`. */
  selectActions: DataTableRowAction[];
  onSelectAction?: (
    actionId: string,
    context: DataTableSelectActionContext<unknown>,
  ) => void;
  /**
   * Incrementing this remounts `DataTableFilters` so its UI matches TanStack after
   * e.g. `table.resetColumnFilters()` from outside the Filter component.
   */
  filterUiResetKey: number;
  /** Remount the filter toolbar UI (clears chips / internal state). */
  resetFilterUi: () => void;
};

export const DataTableContext =
  React.createContext<DataTableContextValue | null>(null);

export function useDataTableContext<TData>() {
  const ctx = React.useContext(DataTableContext);
  if (!ctx) {
    throw new Error(
      "Data table subcomponents must be used within DataTableProvider.",
    );
  }
  return {
    table: ctx.table as Table<TData>,
    rowLink: ctx.rowLink as DataTableRowLinkConfig<TData> | undefined,
    expandable: ctx.expandable as DataTableExpandableConfig<TData> | undefined,
    selectActions: ctx.selectActions as DataTableRowAction[],
    onSelectAction: ctx.onSelectAction as
      | ((
          actionId: string,
          context: DataTableSelectActionContext<TData>,
        ) => void)
      | undefined,
    loading: ctx.loading,
    updating: ctx.updating,
    error: ctx.error,
    onRetry: ctx.onRetry,
    labels: ctx.labels,
    filterUiResetKey: ctx.filterUiResetKey,
    resetFilterUi: ctx.resetFilterUi,
  };
}
