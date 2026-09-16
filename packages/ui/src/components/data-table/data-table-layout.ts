"use client";

import * as React from "react";
import type { ColumnDef, Table } from "@tanstack/react-table";
import type { DataTableColumnMeta } from "./data-table-column-meta";

/** Resolve defaults before TanStack merges its own column defaults. */
export function prepareLayoutColumns<T>(
  columns: ColumnDef<T>[],
): ColumnDef<T>[] {
  return columns.map((column) => {
    const meta = column.meta as DataTableColumnMeta | undefined;
    const grow = Math.max(0, meta?.grow ?? (column.size == null ? 1 : 0));
    const size = column.size ?? 200;
    return {
      ...column,
      size,
      minSize: column.minSize ?? (grow ? 200 : size),
      maxSize: column.maxSize ?? (grow ? Number.MAX_SAFE_INTEGER : size),
      meta: { ...meta, grow },
      ...("columns" in column && column.columns
        ? { columns: prepareLayoutColumns(column.columns) }
        : {}),
    };
  });
}

type WidthDefinition = {
  id: string;
  size: number;
  minSize: number;
  maxSize: number;
  grow: number;
};

/** Widths depend only on column definitions and container space, never row data. */
export function resolveColumnWidths(
  columns: WidthDefinition[],
  available: number,
) {
  const widths = new Map(
    columns.map((column) => [
      column.id,
      column.grow > 0
        ? column.minSize
        : Math.max(column.minSize, Math.min(column.size, column.maxSize)),
    ]),
  );
  let remaining = Math.max(
    0,
    available - [...widths.values()].reduce((sum, width) => sum + width, 0),
  );
  let flexible = columns.filter(
    (column) => column.grow > 0 && widths.get(column.id)! < column.maxSize,
  );
  while (remaining > 0.01 && flexible.length) {
    const weight = flexible.reduce((sum, column) => sum + column.grow, 0);
    let allocated = 0;
    for (const column of flexible) {
      const width = widths.get(column.id)!;
      const extra = Math.min(
        (remaining * column.grow) / weight,
        Math.max(0, column.maxSize - width),
      );
      widths.set(column.id, width + extra);
      allocated += extra;
    }
    remaining -= allocated;
    flexible = flexible.filter(
      (column) => widths.get(column.id)! < column.maxSize - 0.01,
    );
    if (allocated < 0.01) break;
  }
  return widths;
}

export function useDataTableLayout<T>(table: Table<T>) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [available, setAvailable] = React.useState(0);
  React.useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const measure = () => setAvailable(container.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  const columns = table.getVisibleLeafColumns();
  const widths = resolveColumnWidths(
    columns.map((column) => ({
      id: column.id,
      size: column.columnDef.size ?? 200,
      minSize: column.columnDef.minSize ?? 200,
      maxSize: column.columnDef.maxSize ?? Number.MAX_SAFE_INTEGER,
      grow:
        (column.columnDef.meta as DataTableColumnMeta | undefined)?.grow ?? 1,
    })),
    available,
  );
  const total = [...widths.values()].reduce((sum, width) => sum + width, 0);
  return {
    containerRef,
    columns,
    widths,
    total,
    overflow: available > 0 && total > available + 1,
  };
}
