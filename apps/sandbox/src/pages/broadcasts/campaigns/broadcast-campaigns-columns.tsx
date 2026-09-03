import type { ColumnDef } from "@tanstack/react-table";

import { Avatar } from "@gecko/ui/components/avatar";
import { Badge } from "@gecko/ui/components/badge";
import type { DataTableColumnMeta } from "@gecko/ui/components/data-table/data-table";
import { DataTableColumnHeader } from "@gecko/ui/components/data-table/data-table-column-header";
import { DataTableMultiSelectFilter } from "@gecko/ui/components/data-table/data-table-columns";
import { DataTableMultiLineCell } from "@gecko/ui/components/data-table/data-table-multi-line-cell";

import type {
  BroadcastCampaign,
  BroadcastStatus,
} from "./broadcast-campaigns-data";

function ordinal(n: number) {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  const mod10 = n % 10;
  if (mod10 === 1) return `${n}st`;
  if (mod10 === 2) return `${n}nd`;
  if (mod10 === 3) return `${n}rd`;
  return `${n}th`;
}

function formatBroadcastDateTime(iso: string) {
  const d = new Date(iso);
  const day = ordinal(d.getDate());
  const month = d.toLocaleString(undefined, { month: "short" });
  const year = d.getFullYear();
  const time = d
    .toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\s/g, "");
  return `${day} ${month} ${year} at ${time}`;
}

function formatCreatedAt(iso: string) {
  const d = new Date(iso);
  const day = ordinal(d.getDate());
  const month = d.toLocaleString(undefined, { month: "short" });
  const year = d.getFullYear();
  const time = d
    .toLocaleString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\s/g, "");
  return `${day} ${month} ${year} @ ${time}`;
}

function statusLabel(status: BroadcastStatus) {
  if (status === "active") return "Active";
  if (status === "completed") return "Completed";
  if (status === "paused") return "Paused";
  return "Failed";
}

function statusVariant(status: BroadcastStatus) {
  if (status === "active") return "info" as const;
  if (status === "completed") return "success" as const;
  if (status === "paused") return "warning" as const;
  return "destructive" as const;
}

export const broadcastCampaignColumns: ColumnDef<BroadcastCampaign>[] = [
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
    accessorKey: "status",
    id: "status",
    meta: { label: "Status" } satisfies DataTableColumnMeta,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={statusVariant(status)} size="xs" rounded>
          {statusLabel(status)}
        </Badge>
      );
    },
    filterFn: DataTableMultiSelectFilter,
    sortingFn: (rowA, rowB, columnId) =>
      statusLabel(rowA.getValue(columnId) as BroadcastStatus).localeCompare(
        statusLabel(rowB.getValue(columnId) as BroadcastStatus),
      ),
  },
  {
    accessorKey: "startDate",
    id: "startDate",
    meta: { label: "Start date" } satisfies DataTableColumnMeta,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start date" />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatBroadcastDateTime(row.original.startDate)}
      </span>
    ),
  },
  {
    accessorKey: "endDate",
    id: "endDate",
    meta: { label: "End date" } satisfies DataTableColumnMeta,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End date" />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatBroadcastDateTime(row.original.endDate)}
      </span>
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
      const { createdBy } = row.original;
      return (
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={createdBy.name} size="md" />
          <DataTableMultiLineCell
            primary={createdBy.name}
            secondary={formatCreatedAt(createdBy.createdAt)}
          />
        </div>
      );
    },
  },
];
