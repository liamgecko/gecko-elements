import type { ColumnDef } from "@tanstack/react-table";

import { Avatar } from "@gecko/ui/components/avatar";
import type { DataTableColumnMeta } from "@gecko/ui/components/data-table/data-table";
import { DataTableColumnHeader } from "@gecko/ui/components/data-table/data-table-column-header";
import { DataTableMultiLineCell } from "@gecko/ui/components/data-table/data-table-multi-line-cell";

import type { WorkflowTemplate } from "./workflows-data";
import { formatWorkflowDateTime } from "./workflows-columns";

export function createWorkflowTemplateColumns(): ColumnDef<WorkflowTemplate>[] {
  return [
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
      id: "createdBy",
      accessorFn: (row) => row.createdBy.name,
      meta: { label: "Created by" } satisfies DataTableColumnMeta,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created by" />
      ),
      sortingFn: (rowA, rowB) =>
        rowA.original.createdBy.name.localeCompare(
          rowB.original.createdBy.name,
        ),
      cell: ({ row }) => {
        const { createdBy } = row.original;
        return (
          <div className="flex min-w-0 items-center gap-3">
            <Avatar name={createdBy.name} size="md" />
            <DataTableMultiLineCell
              primary={createdBy.name}
              secondary={formatWorkflowDateTime(createdBy.createdAt)}
            />
          </div>
        );
      },
    },
  ];
}
