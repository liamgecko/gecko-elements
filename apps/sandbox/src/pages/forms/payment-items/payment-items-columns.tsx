import type { ColumnDef } from "@tanstack/react-table"
import { Lock, LockOpen } from "lucide-react"

import { Avatar, AvatarFallback } from "@gecko/ui/components/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@gecko/ui/components/tooltip"
import type { DataTableColumnMeta } from "@gecko/ui/components/data-table/data-table"
import { DataTableColumnHeader } from "@gecko/ui/components/data-table/data-table-column-header"
import { DataTableMultiSelectFilter } from "@gecko/ui/components/data-table/data-table-columns"
import { DataTableMultiLineCell } from "@gecko/ui/components/data-table/data-table-multi-line-cell"

import type {
  PaymentItem,
  PaymentItemLockStatus,
  PaymentProvider,
} from "./payment-items-data"

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

const currencySymbols: Record<PaymentItem["currency"], string> = {
  GBP: "£",
  EUR: "€",
  USD: "$",
}

function formatAmount(amount: number, currency: PaymentItem["currency"]) {
  return `${currencySymbols[currency]}${amount.toLocaleString()}`
}

function lockStatusLabel(status: PaymentItemLockStatus) {
  if (status === "locked-view-only") return "Locked (view only)"
  if (status === "locked-can-edit") return "Locked (can edit)"
  return "Unlocked"
}

function PaymentItemLockStatusCell({ item }: { item: PaymentItem }) {
  const { lockStatus, lockedBy } = item

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
              <Lock className="size-4" aria-label="Chargeable item locked" />
            </span>
          }
        />
        <TooltipContent side="top" className="max-w-xs text-center">
          This chargeable item has been locked by {lockedByName}, you do not have
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
              aria-label="Chargeable item locked with edit access"
            />
          </span>
        }
      />
      <TooltipContent side="top" className="max-w-xs text-center">
        This chargeable item has been locked by {lockedByName}, you have permission
        to edit.
      </TooltipContent>
    </Tooltip>
  )
}

export const paymentItemColumns: ColumnDef<PaymentItem>[] = [
  {
    accessorKey: "lockStatus",
    id: "lockStatus",
    meta: {
      label: "Lock status",
      headerClassName: "w-10",
      cellClassName: "w-10",
    } satisfies DataTableColumnMeta,
    header: () => <span className="sr-only">Lock status</span>,
    cell: ({ row }) => <PaymentItemLockStatusCell item={row.original} />,
    filterFn: DataTableMultiSelectFilter,
    sortingFn: (rowA, rowB, columnId) =>
      lockStatusLabel(rowA.getValue(columnId) as PaymentItemLockStatus).localeCompare(
        lockStatusLabel(rowB.getValue(columnId) as PaymentItemLockStatus)
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
    accessorKey: "amount",
    id: "amount",
    meta: { label: "Amount" } satisfies DataTableColumnMeta,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <span>{formatAmount(row.original.amount, row.original.currency)}</span>
    ),
  },
  {
    accessorKey: "currency",
    id: "currency",
    meta: { label: "Currency" } satisfies DataTableColumnMeta,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Currency" />
    ),
    cell: ({ row }) => <span>{row.original.currency}</span>,
    filterFn: DataTableMultiSelectFilter,
  },
  {
    accessorKey: "provider",
    id: "provider",
    meta: { label: "Provider" } satisfies DataTableColumnMeta,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider" />
    ),
    cell: ({ row }) => <span>{row.original.provider}</span>,
    filterFn: DataTableMultiSelectFilter,
    sortingFn: (rowA, rowB, columnId) =>
      String(rowA.getValue(columnId) as PaymentProvider).localeCompare(
        String(rowB.getValue(columnId) as PaymentProvider)
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
    filterFn: DataTableMultiSelectFilter,
  },
]
