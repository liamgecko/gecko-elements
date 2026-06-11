import type { ColumnDef, FilterFn } from "@tanstack/react-table"
import { Lock, LockOpen } from "lucide-react"

import { Avatar, AvatarFallback } from "@gecko/ui/components/avatar"
import { Badge } from "@gecko/ui/components/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"
import type { DataTableColumnMeta } from "@gecko/ui/components/data-table/data-table"
import { DataTableColumnHeader } from "@gecko/ui/components/data-table/data-table-column-header"
import { DataTableMultiSelectFilter } from "@gecko/ui/components/data-table/data-table-columns"
import { DataTableMultiLineCell } from "@gecko/ui/components/data-table/data-table-multi-line-cell"

import type { Form, FormLockStatus, FormStatus } from "./forms-data"

function ordinal(n: number) {
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`
  const mod10 = n % 10
  if (mod10 === 1) return `${n}st`
  if (mod10 === 2) return `${n}nd`
  if (mod10 === 3) return `${n}rd`
  return `${n}th`
}

function formatCreatedAt(iso: string) {
  const d = new Date(iso)
  const day = ordinal(d.getDate())
  const month = d.toLocaleString(undefined, { month: "short" })
  const year = d.getFullYear()
  const time = d
    .toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\s/g, "")
  return `${day} ${month} ${year} @ ${time}`
}

function lockStatusLabel(status: FormLockStatus) {
  if (status === "locked-view-only") return "Locked (view only)"
  if (status === "locked-can-edit") return "Locked (can edit)"
  return "Unlocked"
}

function FormLockStatusCell({ form }: { form: Form }) {
  const { lockStatus, lockedBy } = form

  if (lockStatus === "unlocked") {
    return null
  }

  const lockedByName = lockedBy ?? "another user"

  if (lockStatus === "locked-view-only") {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            <span className="inline-flex text-muted-foreground">
              <Lock className="size-4" aria-label="Form locked" />
            </span>
          }
        />
        <TooltipContent side="top" className="max-w-xs text-center">
          This form has been locked by {lockedByName}, you do not have permission
          to edit.
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span className="inline-flex text-muted-foreground">
            <LockOpen className="size-4" aria-label="Form locked with edit access" />
          </span>
        }
      />
      <TooltipContent side="top" className="max-w-xs text-center">
        This form has been locked by {lockedByName}, you have permission to edit.
      </TooltipContent>
    </Tooltip>
  )
}

function statusLabel(status: FormStatus) {
  if (status === "published") return "Published"
  if (status === "draft") return "Draft"
  return "Unpublished"
}

function statusVariant(status: FormStatus) {
  if (status === "published") return "success" as const
  if (status === "draft") return "warning" as const
  return "secondary" as const
}

const formStatusFilter: FilterFn<Form> = (row, columnId, filterValue) => {
  const selected = filterValue as { operator?: string; values?: string[] } | undefined
  const values = selected?.values ?? []
  if (values.length === 0) return true

  const { status, archived } = row.original
  const matches = values.some((value) => {
    if (value === "archived") return archived
    if (value === "published") return status === "published" && !archived
    if (value === "unpublished") {
      return (status === "draft" || status === "unpublished") && !archived
    }
    return false
  })

  return selected?.operator === "is not" ? !matches : matches
}

export const formColumns: ColumnDef<Form>[] = [
  {
    accessorKey: "lockStatus",
    id: "lockStatus",
    meta: {
      label: "Lock status",
      headerClassName: "w-10",
      cellClassName: "w-10",
    } satisfies DataTableColumnMeta,
    header: () => <span className="sr-only">Lock status</span>,
    cell: ({ row }) => <FormLockStatusCell form={row.original} />,
    filterFn: DataTableMultiSelectFilter,
    sortingFn: (rowA, rowB, columnId) =>
      lockStatusLabel(rowA.getValue(columnId) as FormLockStatus).localeCompare(
        lockStatusLabel(rowB.getValue(columnId) as FormLockStatus)
      ),
  },
  {
    accessorKey: "name",
    id: "name",
    meta: { label: "Form name" } satisfies DataTableColumnMeta,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Form name" />
    ),
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "status",
    id: "status",
    meta: { label: "Form status" } satisfies DataTableColumnMeta,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Form status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge variant={statusVariant(status)} size="xs" rounded>
          {statusLabel(status)}
        </Badge>
      )
    },
    filterFn: formStatusFilter,
    sortingFn: (rowA, rowB, columnId) =>
      statusLabel(rowA.getValue(columnId) as FormStatus).localeCompare(
        statusLabel(rowB.getValue(columnId) as FormStatus)
      ),
  },
  {
    id: "createdBy",
    accessorFn: (row) => row.createdBy.name,
    meta: { label: "Created by" } satisfies DataTableColumnMeta,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created by" />
    ),
    sortingFn: (rowA, rowB) =>
      rowA.original.createdBy.name.localeCompare(rowB.original.createdBy.name),
    cell: ({ row }) => {
      const { createdBy } = row.original
      return (
        <div className="flex min-w-0 items-center gap-3">
          <Avatar size="md">
            <AvatarFallback>{createdBy.initials}</AvatarFallback>
          </Avatar>
          <DataTableMultiLineCell
            primary={createdBy.name}
            secondary={formatCreatedAt(createdBy.createdAt)}
          />
        </div>
      )
    },
  },
  {
    accessorKey: "responseCount",
    id: "responseCount",
    meta: { label: "Responses" } satisfies DataTableColumnMeta,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Responses" />
    ),
    cell: ({ row }) => <span>{row.original.responseCount}</span>,
  },
  {
    accessorKey: "group",
    id: "group",
    meta: { label: "Group" } satisfies DataTableColumnMeta,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group" />
    ),
    cell: ({ row }) => <span>{row.original.group}</span>,
    filterFn: DataTableMultiSelectFilter,
  },
]
