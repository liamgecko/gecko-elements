"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const TableHoverContext = React.createContext(false)

type TableProps = React.ComponentProps<"table"> & {
  hoverable?: boolean
}

function Table({ className, hoverable = false, ...props }: TableProps) {
  return (
    <TableHoverContext.Provider value={hoverable}>
      <div data-slot="table-container" className="relative w-full overflow-x-auto">
        <table
          data-slot="table"
          className={cn("w-full caption-bottom text-sm", className)}
          {...props}
        />
      </div>
    </TableHoverContext.Provider>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b bg-muted/50", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  const hoverable = React.useContext(TableHoverContext)
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "[&>tr:last-child]:border-b-0",
        hoverable && "[&>tr]:transition-colors [&>tr:hover]:bg-muted/50",
        className
      )}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("bg-muted/50 border-t font-medium", className)}
      {...props}
    />
  )
}

type TableRowProps = React.ComponentProps<"tr">

function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      className={cn("data-[state=selected]:bg-muted/40 border-b", className)}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn("text-foreground h-10 px-3 text-start align-middle text-xs font-semibold whitespace-nowrap [&:has([role=checkbox])]:pe-0", className)}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn("px-3 py-2.5 align-middle whitespace-nowrap [&:has([role=checkbox])]:pe-0", className)}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
