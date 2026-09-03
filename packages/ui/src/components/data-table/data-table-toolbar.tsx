"use client"

import * as React from "react"

import { cn } from "@gecko/ui/lib/utils"

export type DataTableRootProps = React.ComponentProps<"div">

/** Vertical stack for toolbar, table body, and pagination. */
export function DataTableRoot({ className, ...props }: DataTableRootProps) {
  return (
    <div data-slot="data-table-root" className={cn("flex flex-col gap-4", className)} {...props} />
  )
}

export type DataTableToolbarProps = React.ComponentProps<"div">

/** Search on one side, slot filters + column toggle on the other (responsive). */
export function DataTableToolbar({ className, ...props }: DataTableToolbarProps) {
  return (
    <div
      data-slot="data-table-toolbar"
      className={cn(
        "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
        className
      )}
      {...props}
    />
  )
}

export type DataTableToolbarSearchRowProps = React.ComponentProps<"div">

/** Search and adjacent toolbar controls (e.g. filters) in one row; wraps on narrow viewports. */
export function DataTableToolbarSearchRow({ className, ...props }: DataTableToolbarSearchRowProps) {
  return (
    <div
      data-slot="data-table-toolbar-search-row"
      className={cn("flex w-full min-w-0 flex-wrap items-center gap-2", className)}
      {...props}
    />
  )
}

export type DataTableToolbarGroupProps = React.ComponentProps<"div">

/** Groups trailing toolbar controls (e.g. bulk actions, column toggle) in one row. */
export function DataTableToolbarGroup({ className, ...props }: DataTableToolbarGroupProps) {
  return (
    <div
      data-slot="data-table-toolbar-group"
      className={cn("flex flex-none flex-nowrap items-center justify-end gap-2", className)}
      {...props}
    />
  )
}
