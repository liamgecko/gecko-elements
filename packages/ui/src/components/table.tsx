"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { Button } from "@gecko/ui/components/button"
import { cn } from "@gecko/ui/lib/utils"

const TableHoverContext = React.createContext(false)

type TableExpandableRowContextValue = {
  open: boolean
  toggle: () => void
  ariaControls: string
}

const TableExpandableRowContext =
  React.createContext<TableExpandableRowContextValue | null>(null)

type TableProps = React.ComponentProps<"table"> & {
  hoverable?: boolean
  /**
   * Renders only the `<table>` (no outer scroll wrapper). Use for tables nested
   * inside a cell, e.g. expandable row details.
   */
  nested?: boolean
  /**
   * When `nested` is true, optional heading shown above the table inside the
   * same bordered panel (e.g. “Chapters”).
   */
  title?: React.ReactNode
  /**
   * When `nested` is true, optional supporting text under `title`.
   */
  description?: React.ReactNode
}

function Table({
  className,
  hoverable = false,
  nested = false,
  title,
  description,
  ...props
}: TableProps) {
  const hasNestedIntro =
    nested && (title != null || description != null)

  const table = (
    <table
      data-slot="table"
      data-nested={nested ? "" : undefined}
      className={cn(
        "w-full caption-bottom text-sm bg-background",
        nested && !hasNestedIntro && "rounded-md border border-border",
        nested && hasNestedIntro && "rounded-none border-0",
        className
      )}
      {...props}
    />
  )

  if (nested) {
    if (hasNestedIntro) {
      return (
        <TableHoverContext.Provider value={hoverable}>
          <div
            data-slot="table-nested-panel"
            className="overflow-hidden rounded-md border border-border bg-background"
          >
            <div className="border-b border-border px-4 py-3">
              {title != null ? (
                <p className="text-sm font-semibold text-foreground">{title}</p>
              ) : null}
              {description != null ? (
                <p className="text-xs text-muted-foreground">{description}</p>
              ) : null}
            </div>
            {table}
          </div>
        </TableHoverContext.Provider>
      )
    }
    return (
      <TableHoverContext.Provider value={hoverable}>{table}</TableHoverContext.Provider>
    )
  }

  return (
    <TableHoverContext.Provider value={hoverable}>
      <div
        data-slot="table-container"
        className="relative min-w-0 w-full overflow-x-auto rounded-md"
      >
        {table}
      </div>
    </TableHoverContext.Provider>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b bg-muted", className)}
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
      className={cn("bg-muted border-t font-medium", className)}
      {...props}
    />
  )
}

type TableRowProps = React.ComponentProps<"tr">

function TableRow({ className, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      className={cn("data-[state=selected]:bg-muted/50 border-b data-[state=open]:border-b-0", className)}
      {...props}
    />
  )
}

type TableDetailRowProps = React.ComponentProps<"tr"> & {
  /** Must match the parent table’s column count. */
  colSpan: number
  open: boolean
  children: React.ReactNode
}

function TableDetailRow({
  colSpan,
  open,
  children,
  className,
  ...props
}: TableDetailRowProps) {
  return (
    <tr
      data-slot="table-detail-row"
      className={cn("table-detail-row hover:bg-transparent last:[&_div.nested-wrapper]:border-b-0", className)}
      {...props}
    >
      <td
        colSpan={colSpan}
        className="p-0 align-middle [&:has([role=checkbox])]:pe-0"
      >
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-200 ease-out",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="min-h-0 overflow-hidden" inert={open ? undefined : true}>
            <div className="nested-wrapper bg-muted/50 border-b border-t border-border p-6">{children}</div>
          </div>
        </div>
      </td>
    </tr>
  )
}

type TableExpandableRowProps = Omit<TableRowProps, "children"> & {
  /**
   * Must match the parent table’s column count when using `detailLayout="panel"`
   * (single detail cell with nested content).
   */
  colSpan: number
  children: React.ReactNode
  /**
   * `panel` (default): one animated detail row with a full-width cell — use for
   * nested tables or custom layouts that do not share the parent columns.
   * `sibling-rows`: `detail` must be one or more `TableRow` nodes; they render
   * as real `<tr>` siblings so columns stay aligned with the parent table.
   */
  detailLayout?: "panel" | "sibling-rows"
  /** Shown when expanded. For `sibling-rows`, pass a fragment of `TableRow`s. */
  detail: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * Parent row + detail rows. Place {@link TableExpandableRowTrigger} in the row
 * (typically the first cell) to toggle expansion; the row itself is not
 * clickable.
 */
function TableExpandableRow({
  colSpan,
  children,
  detail,
  detailLayout = "panel",
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  className,
  ...rowProps
}: TableExpandableRowProps) {
  const detailId = React.useId()
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = openProp ?? uncontrolledOpen

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openProp === undefined) setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [openProp, onOpenChange]
  )

  const toggle = React.useCallback(() => {
    setOpen(!open)
  }, [open, setOpen])

  const siblingRows = React.useMemo(() => {
    if (detailLayout !== "sibling-rows" || !open) return null
    const list = React.Children.toArray(detail)
    return list.map((child, index) => {
      if (!React.isValidElement(child)) return child
      const rowId = `${detailId}-${index}`
      const props = child.props as { className?: string; id?: string }
      return React.cloneElement(child, {
        id: props.id ?? rowId,
        "data-slot": "table-nested-row",
        className: cn(
          "bg-muted/25 animate-in fade-in-0 slide-in-from-top-1 duration-200",
          props.className
        ),
      } as React.HTMLAttributes<HTMLTableRowElement>)
    })
  }, [detail, detailId, detailLayout, open])

  const ariaControls =
    detailLayout === "sibling-rows"
      ? React.Children.toArray(detail)
          .map((_, index) => `${detailId}-${index}`)
          .join(" ")
      : detailId

  const contextValue = React.useMemo(
    () => ({ open, toggle, ariaControls }),
    [open, toggle, ariaControls]
  )

  return (
    <>
      <TableExpandableRowContext.Provider value={contextValue}>
        <TableRow
          {...rowProps}
          data-slot="table-expandable-row"
          data-state={open ? "open" : "closed"}
          className={cn("table-expandable-row group/expand", className)}
        >
          {children}
        </TableRow>
      </TableExpandableRowContext.Provider>
      {detailLayout === "sibling-rows" ? (
        siblingRows
      ) : (
        <TableDetailRow id={detailId} colSpan={colSpan} open={open}>
          {detail}
        </TableDetailRow>
      )}
    </>
  )
}

type TableExpandableRowTriggerProps = Omit<
  React.ComponentProps<typeof Button>,
  "type"
>

/**
 * Button that toggles its parent {@link TableExpandableRow}. Defaults to a
 * chevron icon; pass `children` to customize.
 */
function TableExpandableRowTrigger({
  className,
  children,
  onClick,
  ...props
}: TableExpandableRowTriggerProps) {
  const ctx = React.useContext(TableExpandableRowContext)
  if (!ctx) {
    throw new Error(
      "TableExpandableRowTrigger must be used inside TableExpandableRow."
    )
  }
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-expanded={ctx.open}
      aria-controls={ctx.ariaControls}
      aria-label={ctx.open ? "Collapse row" : "Expand row"}
      className={cn("shrink-0", className)}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) ctx.toggle()
      }}
      {...props}
    >
      {children ?? (
        <ChevronDown
          className={cn(
            "text-muted-foreground size-4 transition-transform",
            ctx.open && "rotate-180"
          )}
          aria-hidden
        />
      )}
    </Button>
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
  TableDetailRow,
  TableExpandableRow,
  TableExpandableRowTrigger,
  TableCell,
  TableCaption,
}
