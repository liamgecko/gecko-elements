"use client"

import * as React from "react"

import { SearchField } from "@/components/ui/search-field"
import { cn } from "@/lib/utils"

import { useDataTableContext } from "./data-table-context"

export type DataTableSearchProps = Omit<
  React.ComponentProps<typeof SearchField>,
  "value" | "onChange"
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
    <SearchField
      className={cn("w-full !max-w-[200px]", className)}
      placeholder={placeholder}
      size="sm"
      value={value}
      onChange={(e) => table.setGlobalFilter(e.target.value)}
      showClear
      {...props}
    />
  )
}
