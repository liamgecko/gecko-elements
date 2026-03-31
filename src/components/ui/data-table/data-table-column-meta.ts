/**
 * Optional `meta` on `ColumnDef` for DataTable UI (column toggle, etc.).
 * @example
 * { accessorKey: "startsAt", meta: { label: "Start date" }, header: ... }
 */
export type DataTableColumnMeta = {
  /** Label in the column visibility menu; falls back to a formatted column id. */
  label?: string
}

function formatColumnIdFallback(id: string): string {
  const spaced = id
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
  return spaced.replace(/\b\w/g, (c) => c.toUpperCase())
}

export function getDataTableColumnToggleLabel(
  columnId: string,
  meta: unknown
): string {
  const m = meta as DataTableColumnMeta | undefined
  if (typeof m?.label === "string" && m.label.trim()) {
    return m.label.trim()
  }
  return formatColumnIdFallback(columnId)
}
