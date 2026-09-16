import { useEffect, useState } from "react";
import {
  DataTable,
  DataTableColumnHeader,
  DataTableMultiLineCell,
  type DataTableQueryState,
} from "@geckolabs/elements/components/data-table";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@geckolabs/elements/components/card";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@geckolabs/elements/components/empty";
import { Skeleton } from "@geckolabs/elements/components/skeleton";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@geckolabs/elements/components/alert";
import { Button } from "@geckolabs/elements/components/button";
import { HugeiconsIcon } from "@geckolabs/elements/lib/icon";
import AlertCircleIcon from "@hugeicons/core-free-icons/AlertCircleIcon";
export type UsageRow = { id: string; name: string; description: string };
export type UsageResult = { rows: UsageRow[]; total: number };
const columns: ColumnDef<UsageRow>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <DataTableMultiLineCell
        primary={row.original.name}
        secondary={row.original.description}
      />
    ),
    meta: {
      skeleton: (
        <DataTableMultiLineCell
          primary={<Skeleton className="h-[1lh] w-40" />}
          secondary={<Skeleton className="h-[1lh] w-56" />}
        />
      ),
    },
  },
];

export function RemoteTableRecipe({
  fetchRows,
  initial,
}: {
  fetchRows: (
    query: DataTableQueryState,
    signal: AbortSignal,
  ) => Promise<UsageResult>;
  initial?: UsageResult;
}) {
  const [query, setQuery] = useState<DataTableQueryState>({
    globalFilter: "",
    columnFilters: [],
    sorting: [{ id: "name", desc: false }],
    pagination: { pageIndex: 0, pageSize: 15 },
  });
  const [result, setResult] = useState(initial);
  const [pending, setPending] = useState(true);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setPending(true);
    setFailed(false);
    fetchRows(query, controller.signal)
      .then((next) => {
        if (controller.signal.aborted) return;
        const last = Math.max(
          0,
          Math.ceil(next.total / query.pagination.pageSize) - 1,
        );
        if (query.pagination.pageIndex > last) {
          setQuery((previous) => ({
            ...previous,
            pagination: { ...previous.pagination, pageIndex: last },
          }));
        } else setResult(next);
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setPending(false);
      });
    return () => controller.abort();
  }, [query, fetchRows, attempt]);
  return (
    <Card size="sm" data-testid="usage-card">
      <CardHeader>
        <CardTitle>Usage</CardTitle>
      </CardHeader>
      <CardContent>
        {failed && (
          <Alert>
            <AlertTitle>Usage could not be loaded.</AlertTitle>
            <AlertDescription>
              <Button
                variant="outline"
                onClick={() => setAttempt((value) => value + 1)}
              >
                Retry usage
              </Button>
            </AlertDescription>
          </Alert>
        )}
        {!result ? (
          <div aria-busy={pending} style={{ minHeight: 192 }}>
            {pending && (
              <>
                <span role="status" className="sr-only">
                  Loading usage…
                </span>
                <Skeleton
                  className="h-4 w-48 motion-reduce:animate-none"
                  aria-hidden="true"
                />
              </>
            )}
          </div>
        ) : result.total === 0 &&
          !query.globalFilter.trim() &&
          query.columnFilters.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <HugeiconsIcon icon={AlertCircleIcon} aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>No usage yet</EmptyTitle>
              <EmptyDescription>
                This record is not used by any workflows.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <DataTable
            aria-label="Usage"
            columns={columns}
            data={result.rows}
            getRowId={(row) => row.id}
            sorting
            pagination
            updating={pending || failed}
            remote={{
              state: query,
              onStateChange: setQuery,
              rowCount: result.total,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
