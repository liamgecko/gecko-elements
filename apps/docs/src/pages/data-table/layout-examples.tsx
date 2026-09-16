import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@geckolabs/elements/components/button";
import { Skeleton } from "@geckolabs/elements/components/skeleton";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableMultiLineCell,
} from "@geckolabs/elements/components/data-table";

type RecordRow = {
  id: string;
  name: string;
  subject: string;
  type: string;
  owner: string;
  category: string;
  created: string;
  updated: string;
  replies: number;
};
const records: RecordRow[] = Array.from({ length: 32 }, (_, i) => ({
  id: String(i + 1),
  name:
    i === 16
      ? "Postgraduate international applicant information and next steps"
      : `Template ${String(i + 1).padStart(2, "0")}`,
  subject:
    i % 3 === 0
      ? "Everything you need to know before your upcoming visit to campus"
      : "Your next steps",
  type: i % 2 === 0 ? "Email" : "SMS",
  owner: ["Alex Morgan", "Jordan Lee", "Sam Taylor"][i % 3],
  category: i % 2 === 0 ? "Admissions" : "Events",
  created: "14 September 2026",
  updated: "15 September 2026",
  replies: 40 + i,
}));
const header =
  (title: string): ColumnDef<RecordRow>["header"] =>
  ({ column }) => <DataTableColumnHeader column={column} title={title} />;
const stableColumns: ColumnDef<RecordRow>[] = [
  {
    accessorKey: "name",
    header: header("Name"),
    minSize: 240,
    meta: { grow: 2 },
    enableHiding: false,
  },
  { accessorKey: "type", header: header("Type"), size: 136 },
  {
    accessorKey: "subject",
    header: header("Subject"),
    minSize: 280,
    meta: { grow: 3 },
  },
  {
    accessorKey: "owner",
    header: header("Created by"),
    size: 200,
    meta: {
      label: "Created by",
      cellLayout: "content",
      skeleton: (
        <DataTableMultiLineCell
          primary={<Skeleton className="h-[1lh] w-full" />}
          secondary={<Skeleton className="h-[1lh] w-3/4" />}
        />
      ),
    },
    cell: ({ row }) => (
      <DataTableMultiLineCell
        primary={row.original.owner}
        secondary={row.original.created}
      />
    ),
  },
];
export function StableColumnsExample() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="space-y-4">
      <Button variant="outline" onClick={() => setLoading((value) => !value)}>
        {loading ? "Show loaded rows" : "Preview skeleton rows"}
      </Button>
      <DataTable
        aria-label="Templates with stable column widths"
        columns={stableColumns}
        data={records}
        getRowId={(row) => row.id}
        pagination
        sorting
        loading={loading}
        initialState={{ sorting: [{ id: "name", desc: false }] }}
        toolbar={{
          search: { placeholder: "Search templates" },
          columnToggle: true,
        }}
      />
    </div>
  );
}
