"use client";

import * as React from "react";
import type { ColumnFiltersState } from "@tanstack/react-table";

import {
  Filter,
  type FilterCategory,
  type FilterOperator,
  type FilterProps,
} from "@gecko/ui/components/filters";
import { cn } from "@gecko/ui/lib/utils";

import { useDataTableContext } from "./data-table-context";
import type { DataTableMultiSelectFilterValue } from "./data-table-columns";

function mapToColumnFilters(
  values: Record<string, string[]>,
  operators: Record<string, FilterOperator>,
): ColumnFiltersState {
  return Object.entries(values)
    .filter(([, vals]) => (vals?.length ?? 0) > 0)
    .map(([id, vals]) => {
      const operator: FilterOperator =
        operators[id] ?? (vals.length >= 2 ? "is any of" : "is");
      const value: DataTableMultiSelectFilterValue = {
        operator,
        values: vals,
      };
      return { id, value };
    });
}

function mapFromColumnFilters(columnFilters: ColumnFiltersState): {
  values: Record<string, string[]>;
  operators: Record<string, FilterOperator>;
} {
  const values: Record<string, string[]> = {};
  const operators: Record<string, FilterOperator> = {};

  for (const filter of columnFilters) {
    const raw = filter.value;
    if (Array.isArray(raw)) {
      if (raw.length > 0) {
        values[filter.id] = raw;
        operators[filter.id] = raw.length >= 2 ? "is any of" : "is";
      }
      continue;
    }
    if (raw && typeof raw === "object" && "values" in raw) {
      const typed = raw as DataTableMultiSelectFilterValue;
      if ((typed.values?.length ?? 0) > 0) {
        values[filter.id] = typed.values;
        operators[filter.id] = typed.operator;
      }
    }
  }

  return { values, operators };
}

export type DataTableFiltersProps = Omit<
  FilterProps,
  | "categories"
  | "onChange"
  | "values"
  | "operators"
  | "defaultValues"
  | "defaultOperators"
> & {
  categories: readonly FilterCategory[];
};

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
  const { table, filterUiResetKey } = useDataTableContext<unknown>();
  const handleChange = React.useCallback(
    (
      values: Record<string, string[]>,
      operators: Record<string, FilterOperator>,
    ) => {
      table.setColumnFilters(mapToColumnFilters(values, operators));
    },
    [table],
  );

  const columnFilters = table.getState().columnFilters;
  const { values: defaultValues, operators: defaultOperators } =
    React.useMemo(() => {
      void filterUiResetKey;
      return mapFromColumnFilters(columnFilters);
    }, [columnFilters, filterUiResetKey]);

  return (
    <Filter
      key={filterUiResetKey}
      categories={categories}
      className={cn(className)}
      defaultValues={defaultValues}
      defaultOperators={defaultOperators}
      onChange={handleChange}
      {...props}
    />
  );
}
