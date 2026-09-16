import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import {
  DataTable,
  DataTableMultiLineCell,
} from "@geckolabs/elements/components/data-table";

const rows = [
  {
    id: "table",
    name: "Table",
    description: "Semantic tables for presenting static information",
    detail: "Structure",
    href: "/components/table",
  },
  {
    id: "input",
    name: "Input field",
    description:
      "Text inputs with labels, descriptions and validation messages",
    detail: "Forms",
    href: "/components/input",
  },
  {
    id: "tooltip",
    name: "Tooltip",
    description: "Supporting text when you hover or focus a control",
    detail: "Feedback",
    href: "/components/tooltip",
  },
];
const columns: ColumnDef<(typeof rows)[number]>[] = [
  {
    accessorKey: "name",
    header: "Component",
    minSize: 220,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "Description",
    minSize: 240,
    meta: { grow: 2, cellLayout: "content" },
    cell: ({ row }) => (
      <DataTableMultiLineCell
        primary={row.original.description}
        secondary={row.original.detail}
      />
    ),
  },
];
export function RowLinksExample() {
  const [result, setResult] = React.useState("");
  return (
    <div className="space-y-4">
      <DataTable
        aria-label="Components with linked rows"
        columns={columns}
        data={rows}
        getRowId={(row) => row.id}
        rowSelection
        rowLink={{
          getHref: (row) => row.href,
          columnIds: ["name", "description"],
          primaryColumnId: "name",
        }}
        rowActions={[{ id: "inspect", label: "Inspect component" }]}
        onRowAction={(_, { original }) =>
          setResult(`Selected action for ${original.name}`)
        }
      />
      <p role="status" className="text-sm text-muted-foreground">
        {result}
      </p>
    </div>
  );
}
