"use client";

/* eslint-disable react-refresh/only-export-components -- TanStack Table column helpers are intentionally exported from this module. */

import type { ColumnDef, FilterFn } from "@tanstack/react-table";

import { Checkbox } from "@geckolabs/elements/components/checkbox";
import { Skeleton } from "@geckolabs/elements/components/skeleton";
import { TableExpandableRowTrigger } from "@geckolabs/elements/components/table";

import type { DataTableLabels } from "./data-table";

import type { DataTableColumnMeta } from "./data-table-column-meta";
import { DataTableRowActionsMenu } from "./data-table-row-actions";

/** Value shape when using `DataTableFilters` (operators + selected option values). */
export type DataTableMultiSelectFilterValue = {
  operator: "is" | "is not" | "is any of";
  values: string[];
};

/** Use with `DataTableFilters`: category ids must match column ids. */
export const DataTableMultiSelectFilter: FilterFn<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches arbitrary row shapes from consumer tables
  any
> = (row, columnId, filterValue) => {
  if (filterValue == null) return true;

  // Legacy: plain string[] (inclusion only)
  if (Array.isArray(filterValue)) {
    const selected = filterValue as string[];
    if (!selected.length) return true;
    const v = row.getValue(columnId);
    return selected.includes(String(v));
  }

  const fv = filterValue as DataTableMultiSelectFilterValue;
  const selected = fv.values ?? [];
  if (!selected.length) return true;

  const op = fv.operator ?? "is";
  const v = row.getValue(columnId);
  const inList = selected.includes(String(v));

  if (op === "is not") return !inList;
  return inList;
};

export function createExpandColumn<TData>(): ColumnDef<TData> {
  return {
    id: "expand",
    meta: {
      cellLayout: "content",
      headerClassName: "w-10",
      cellClassName: "w-10",
      skeleton: <Skeleton className="size-7 motion-reduce:animate-none" />,
    } satisfies DataTableColumnMeta,
    header: () => <span className="sr-only">Expand</span>,
    cell: () => <TableExpandableRowTrigger />,
    enableSorting: false,
    enableHiding: false,
    size: 40,
    minSize: 40,
  };
}

export function createSelectionColumn<TData>(
  paginated = true,
  labels?: DataTableLabels,
): ColumnDef<TData> {
  return {
    id: "select",
    meta: {
      cellLayout: "content",
      headerClassName: "w-10",
      cellClassName: "w-10",
    } satisfies DataTableColumnMeta,
    header: ({ table }) => {
      const visibleRows = (
        paginated ? table.getPaginationRowModel() : table.getFilteredRowModel()
      ).flatRows.filter((row) => row.getCanSelect());
      const allVisibleRowsSelected =
        visibleRows.length > 0 &&
        visibleRows.every((row) => row.getIsSelected());
      const someVisibleRowsSelected = visibleRows.some((row) =>
        row.getIsSelected(),
      );

      return (
        <Checkbox
          checked={allVisibleRowsSelected}
          indeterminate={someVisibleRowsSelected && !allVisibleRowsSelected}
          onCheckedChange={(value) => {
            table.setRowSelection((current) => {
              const next = { ...current };
              visibleRows.forEach((row) => {
                if (value) {
                  next[row.id] = true;
                } else {
                  delete next[row.id];
                }
              });
              return next;
            });
          }}
          aria-label={labels?.selectAllRows ?? "Select all visible rows"}
          disabled={visibleRows.length === 0}
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={
          labels?.selectRow?.(row.index + 1) ?? `Select row ${row.index + 1}`
        }
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
    minSize: 40,
  };
}

export function createActionsColumn<TData>(
  labels?: DataTableLabels,
): ColumnDef<TData> {
  return {
    id: "actions",
    meta: {
      cellLayout: "content",
      skeleton: (
        <Skeleton className="ms-auto size-7 motion-reduce:animate-none" />
      ),
    } satisfies DataTableColumnMeta,
    size: 48,
    minSize: 48,
    header: () => (
      <span className="sr-only">{labels?.actions ?? "Actions"}</span>
    ),
    cell: ({ row, table }) => (
      <div
        data-slot="data-table-actions-cell"
        className="flex min-h-7 justify-end"
      >
        <DataTableRowActionsMenu
          row={row}
          table={table}
          triggerLabel={labels?.rowActions?.(row.index + 1)}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  };
}
