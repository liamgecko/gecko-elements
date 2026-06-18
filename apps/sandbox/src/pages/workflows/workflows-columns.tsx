import type { ColumnDef, FilterFn } from "@tanstack/react-table"
import { Lock, LockOpen } from "lucide-react"

import { Avatar, AvatarFallback } from "@gecko/ui/components/avatar"
import { Switch } from "@gecko/ui/components/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"
import type { DataTableColumnMeta } from "@gecko/ui/components/data-table/data-table"
import { DataTableColumnHeader } from "@gecko/ui/components/data-table/data-table-column-header"
import {
  DataTableMultiSelectFilter,
  type DataTableMultiSelectFilterValue,
} from "@gecko/ui/components/data-table/data-table-columns"
import { DataTableMultiLineCell } from "@gecko/ui/components/data-table/data-table-multi-line-cell"

import type { Workflow, WorkflowLockStatus } from "./workflows-data"

function ordinal(n: number) {
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`
  const mod10 = n % 10
  if (mod10 === 1) return `${n}st`
  if (mod10 === 2) return `${n}nd`
  if (mod10 === 3) return `${n}rd`
  return `${n}th`
}

export function formatWorkflowDateTime(iso: string) {
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

function lockStatusLabel(status: WorkflowLockStatus) {
  if (status === "locked-view-only") return "Locked (view only)"
  if (status === "locked-can-edit") return "Locked (can edit)"
  return "Unlocked"
}

function WorkflowLockStatusCell({ workflow }: { workflow: Workflow }) {
  const { lockStatus, lockedBy } = workflow

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
              <Lock className="size-4" aria-label="Workflow locked" />
            </span>
          }
        />
        <TooltipContent side="top" className="max-w-xs text-center">
          This workflow has been locked by {lockedByName}, you do not have
          permission to edit.
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <span className="inline-flex text-muted-foreground">
            <LockOpen
              className="size-4"
              aria-label="Workflow locked with edit access"
            />
          </span>
        }
      />
      <TooltipContent side="top" className="max-w-xs text-center">
        This workflow has been locked by {lockedByName}, you have permission to
        edit.
      </TooltipContent>
    </Tooltip>
  )
}

export const workflowLabelsFilter: FilterFn<Workflow> = (
  row,
  columnId,
  filterValue,
) => {
  if (filterValue == null) return true

  const labelIds = row.getValue(columnId) as string[]
  if (!Array.isArray(labelIds)) return true

  const resolveSelected = (): string[] => {
    if (Array.isArray(filterValue)) return filterValue as string[]
    const fv = filterValue as DataTableMultiSelectFilterValue
    return fv.values ?? []
  }

  const selected = resolveSelected()
  if (!selected.length) return true

  const op =
    !Array.isArray(filterValue) && filterValue != null
      ? ((filterValue as DataTableMultiSelectFilterValue).operator ?? "is")
      : "is"

  const matches = selected.some((value) => labelIds.includes(value))

  if (op === "is not") return !matches
  return matches
}

type CreateWorkflowColumnsOptions = {
  onEnabledChange: (workflowId: string, enabled: boolean) => void
}

export function createWorkflowColumns({
  onEnabledChange,
}: CreateWorkflowColumnsOptions): ColumnDef<Workflow>[] {
  return [
    {
      accessorKey: "lockStatus",
      id: "lockStatus",
      meta: {
        label: "Lock",
        headerClassName: "w-10",
        cellClassName: "w-10",
      } satisfies DataTableColumnMeta,
      header: () => <span className="sr-only">Lock</span>,
      cell: ({ row }) => <WorkflowLockStatusCell workflow={row.original} />,
      filterFn: DataTableMultiSelectFilter,
      sortingFn: (rowA, rowB, columnId) =>
        lockStatusLabel(rowA.getValue(columnId) as WorkflowLockStatus).localeCompare(
          lockStatusLabel(rowB.getValue(columnId) as WorkflowLockStatus),
        ),
    },
    {
      accessorKey: "name",
      id: "name",
      meta: { label: "Name" } satisfies DataTableColumnMeta,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => <span>{row.original.name}</span>,
    },
    {
      accessorKey: "enabled",
      id: "enabled",
      meta: { label: "Status" } satisfies DataTableColumnMeta,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const workflow = row.original
        const switchId = `workflow-status-${workflow.id}`

        return (
          <Switch
            id={switchId}
            checked={workflow.enabled}
            onCheckedChange={(checked) => {
              onEnabledChange(workflow.id, checked)
            }}
            aria-label={`${workflow.enabled ? "Disable" : "Enable"} ${workflow.name}`}
          />
        )
      },
      sortingFn: (rowA, rowB) =>
        Number(rowB.original.enabled) - Number(rowA.original.enabled),
    },
    {
      accessorKey: "lastRun",
      id: "lastRun",
      meta: { label: "Last run" } satisfies DataTableColumnMeta,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Last run" />
      ),
      cell: ({ row }) => (
        <span className="whitespace-nowrap">
          {row.original.lastRun
            ? formatWorkflowDateTime(row.original.lastRun)
            : "Never"}
        </span>
      ),
      sortingFn: (rowA, rowB) => {
        const a = rowA.original.lastRun
        const b = rowB.original.lastRun
        if (!a && !b) return 0
        if (!a) return 1
        if (!b) return -1
        return new Date(a).getTime() - new Date(b).getTime()
      },
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
              secondary={formatWorkflowDateTime(createdBy.createdAt)}
            />
          </div>
        )
      },
    },
    {
      accessorKey: "createdByUserId",
      id: "createdByUserId",
      enableHiding: false,
      meta: { label: "Users" } satisfies DataTableColumnMeta,
      header: () => null,
      cell: () => null,
      filterFn: DataTableMultiSelectFilter,
    },
    {
      accessorKey: "labelIds",
      id: "labels",
      enableHiding: false,
      meta: { label: "Labels" } satisfies DataTableColumnMeta,
      header: () => null,
      cell: () => null,
      filterFn: workflowLabelsFilter,
    },
  ]
}
