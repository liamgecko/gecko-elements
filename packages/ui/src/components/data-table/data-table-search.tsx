"use client"

import * as React from "react"

import { Search } from "@gecko/ui/components/search"
import { cn } from "@gecko/ui/lib/utils"

import { useDataTableContext } from "./data-table-context"

export type DataTableSearchProps = Omit<
  React.ComponentProps<typeof Search>,
  "value" | "onChange" | "size" | "showClear"
> & {
  placeholder?: string
}

export function DataTableSearch({
  className,
  placeholder = "Search…",
  ...props
}: DataTableSearchProps) {
  const { table } = useDataTableContext<unknown>()
  const value = String(table.getState().globalFilter ?? "")

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
  )
}
