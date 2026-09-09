"use client";
import { withRef } from "@geckolabs/elements/lib/with-ref";

import * as React from "react";

import { Search } from "@geckolabs/elements/components/search";
import { cn } from "@geckolabs/elements/lib/utils";

import { useDataTableContext } from "./data-table-context";

export type DataTableSearchProps = Omit<
  React.ComponentProps<typeof Search>,
  "value" | "onChange" | "size" | "showClear"
> & {
  placeholder?: string;
};

export const DataTableSearch = /* @__PURE__ */ withRef(
  function DataTableSearch({
    className,
    placeholder = "Search…",
    ...props
  }: DataTableSearchProps) {
    const { table } = useDataTableContext<unknown>();
    const value = String(table.getState().globalFilter ?? "");

    return (
      <Search
        className={cn("w-full !max-w-[200px]", className)}
        placeholder={placeholder}
        size="sm"
        value={value}
        onValueChange={(nextValue) => table.setGlobalFilter(nextValue)}
        showClear
        {...props}
      />
    );
  },
);
