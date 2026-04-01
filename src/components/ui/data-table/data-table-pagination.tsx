"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

import { useDataTableContext } from "./data-table-context"

const DEFAULT_PAGE_SIZES = [10, 25, 50] as const

export type DataTablePaginationProps = {
  className?: string
  /** @default [10, 20, 30, 40, 50] */
  pageSizeOptions?: readonly number[]
}

export function DataTablePagination({
  className,
  pageSizeOptions = DEFAULT_PAGE_SIZES,
}: DataTablePaginationProps) {
  const { table } = useDataTableContext<unknown>()
  const filteredRows = table.getFilteredRowModel().rows.length
  const pageCount = Math.max(1, table.getPageCount())
  const { pageIndex, pageSize } = table.getState().pagination
  const currentPage = pageIndex + 1

  const pageItems = Array.from({ length: pageCount }, (_, i) => i + 1)

  return (
    <div
      data-slot="data-table-pagination"
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="text-foreground flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
        <p className="text-pretty">
          Found{" "}
          <span className="font-medium">{filteredRows}</span>{" "}
          results.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <span>Showing:</span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => table.setPageSize(Number(v))}
          >
            <SelectTrigger size="sm" className="w-14">
              <SelectValue />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectGroup>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <span>per page.</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <Select
          value={String(currentPage)}
          onValueChange={(v) => table.setPageIndex(Number(v) - 1)}
        >
          <SelectTrigger size="sm" className="min-w-24">
            <SelectValue>
              {(value) => {
                const page =
                  value != null && value !== ""
                    ? Number(value)
                    : currentPage
                return `Page ${page} of ${pageCount}`
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {pageItems.map((p) => (
                <SelectItem key={p} value={String(p)}>
                  Page {p} of {pageCount}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Pagination className="mx-0 w-auto justify-end">
          <PaginationContent>
            <PaginationItem>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                aria-label="Go to previous page"
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              >
                <ChevronLeftIcon className="size-4 rtl:rotate-180" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                type="button"
                variant="outline"
                size="icon-sm"
                aria-label="Go to next page"
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                <ChevronRightIcon className="size-4 rtl:rotate-180" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
