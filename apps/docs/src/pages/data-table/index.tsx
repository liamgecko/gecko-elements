import { RowLinksExample } from "./row-links-example";
import { StableColumnsExample } from "./layout-examples";
import { ComponentExample } from "@/components/layout/component-example";
import { DocsApiTable } from "@/components/layout/docs-api-table";
import { DocsDoDont } from "@/components/layout/docs-do-dont";
import { DocsExternalLink } from "@/components/layout/docs-external-link";
import { DocsPageLink } from "@/components/layout/docs-page-link";
import {
  ChildSection,
  HeaderSection,
  MainSection,
} from "@/components/layout/docs-section";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";

import {
  DataTable,
  DataTableColumnHeader,
  DataTableMultiLineCell,
  DataTableMultiSelectFilter,
  type DataTableColumnMeta,
} from "@geckolabs/elements/components/data-table";
import { Badge } from "@geckolabs/elements/components/badge";
import { Code } from "@/components/layout/docs-code";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@geckolabs/elements/components/table";

import {
  demoEvents,
  demoSessionsForEvent,
  eventFilterCategories,
  demoSelectedActions,
  demoRowActions,
  type DemoEvent,
} from "./data-table-example-data";

function ordinal(n: number) {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  const mod10 = n % 10;
  if (mod10 === 1) return `${n}st`;
  if (mod10 === 2) return `${n}nd`;
  if (mod10 === 3) return `${n}rd`;
  return `${n}th`;
}

function formatEventStart(startsAtIso: string) {
  const d = new Date(startsAtIso);
  const day = ordinal(d.getDate());
  const month = d.toLocaleString(undefined, { month: "long" });
  const year = d.getFullYear();
  const time = d
    .toLocaleString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/\s/g, "")
    .toLowerCase();
  return `${day} ${month}, ${year} at ${time}`;
}

function integrationLabel(v: DemoEvent["integration"]) {
  if (v === "dynamics") return "Dynamics";
  if (v === "salesforce") return "Salesforce";
  return "—";
}

export function DataTablePage() {
  const handleRowAction = React.useCallback(() => undefined, []);
  const handleSelectAction = React.useCallback(() => undefined, []);
  const [buttonActionResult, setButtonActionResult] = React.useState("");
  const [floatingActionResult, setFloatingActionResult] = React.useState("");

  const baseColumns = React.useMemo<ColumnDef<DemoEvent>[]>(
    () => [
      {
        accessorKey: "eventName",
        id: "eventName",
        minSize: 240,
        meta: { label: "Event name" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Event name" />
        ),
      },
      {
        accessorKey: "startsAt",
        id: "startsAt",
        size: 260,
        meta: { label: "Start date" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Start date" />
        ),
        cell: ({ row }) => (
          <span className="whitespace-nowrap">
            {formatEventStart(row.original.startsAt)}
          </span>
        ),
      },
      {
        accessorKey: "timezone",
        id: "timezone",
        size: 220,
        meta: { label: "Timezone" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Timezone" />
        ),
      },
      {
        accessorKey: "attendees",
        id: "attendees",
        size: 112,
        meta: { label: "Attendees" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Attendees" />
        ),
        cell: ({ row }) => <span>{row.original.attendees}</span>,
      },
      {
        accessorKey: "waitlisted",
        id: "waitlisted",
        size: 112,
        meta: { label: "Waitlisted" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Waitlisted" />
        ),
        cell: ({ row }) => <span>{row.original.waitlisted}</span>,
      },
      {
        accessorKey: "integration",
        id: "integration",
        size: 144,
        meta: { label: "Syncs with" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Syncs with" />
        ),
        cell: ({ row }) => (
          <span className="whitespace-nowrap">
            {integrationLabel(row.original.integration)}
          </span>
        ),
        filterFn: DataTableMultiSelectFilter,
      },
      {
        accessorKey: "syncStatus",
        id: "syncStatus",
        size: 164,
        meta: {
          label: "Sync status",
          cellLayout: "content",
        } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Sync status" />
        ),
        cell: ({ row }) => {
          const v = row.original.syncStatus;
          const variant =
            v === "synced"
              ? "success"
              : v === "failed"
                ? "destructive"
                : v === "syncing"
                  ? "info"
                  : "secondary";
          const label =
            v === "synced"
              ? "Synced"
              : v === "failed"
                ? "Failed"
                : v === "syncing"
                  ? "Syncing"
                  : "No integration";

          return (
            <Badge
              variant={variant}
              className="whitespace-nowrap"
              size="xs"
              rounded
            >
              {label}
            </Badge>
          );
        },
        filterFn: DataTableMultiSelectFilter,
      },
      // Filter-only: stay out of the grid and column-toggle menu (TanStack: enableHiding: false).
      {
        accessorKey: "chronology",
        id: "chronology",
        enableHiding: false,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Chronology" />
        ),
        filterFn: DataTableMultiSelectFilter,
      },
      {
        accessorKey: "category",
        id: "category",
        enableHiding: false,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
        filterFn: DataTableMultiSelectFilter,
      },
    ],
    [],
  );

  const multiLineColumns = React.useMemo<ColumnDef<DemoEvent>[]>(
    () => [
      {
        accessorKey: "eventName",
        id: "eventName",
        minSize: 240,
        meta: { label: "Event name" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Event name" />
        ),
      },
      {
        accessorKey: "startsAt",
        id: "startsAt",
        size: 260,
        meta: {
          label: "Start date",
          cellLayout: "content",
        } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Start date" />
        ),
        cell: ({ row }) => (
          <DataTableMultiLineCell
            primary={
              <span className="whitespace-nowrap">
                {formatEventStart(row.original.startsAt)}
              </span>
            }
            secondary={row.original.timezone}
          />
        ),
      },
      {
        accessorKey: "attendees",
        id: "attendees",
        size: 112,
        meta: { label: "Attendees" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Attendees" />
        ),
        cell: ({ row }) => <span>{row.original.attendees}</span>,
      },
      {
        accessorKey: "waitlisted",
        id: "waitlisted",
        size: 112,
        meta: { label: "Waitlisted" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Waitlisted" />
        ),
        cell: ({ row }) => <span>{row.original.waitlisted}</span>,
      },
      {
        accessorKey: "integration",
        id: "integration",
        size: 144,
        meta: { label: "Syncs with" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Syncs with" />
        ),
        cell: ({ row }) => (
          <span className="whitespace-nowrap">
            {integrationLabel(row.original.integration)}
          </span>
        ),
      },
      {
        accessorKey: "syncStatus",
        id: "syncStatus",
        size: 164,
        meta: {
          label: "Sync status",
          cellLayout: "content",
        } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Sync status" />
        ),
        cell: ({ row }) => {
          const v = row.original.syncStatus;
          const variant =
            v === "synced"
              ? "success"
              : v === "failed"
                ? "destructive"
                : v === "syncing"
                  ? "info"
                  : "secondary";
          const label =
            v === "synced"
              ? "Synced"
              : v === "failed"
                ? "Failed"
                : v === "syncing"
                  ? "Syncing"
                  : "No integration";

          return (
            <Badge
              variant={variant}
              className="whitespace-nowrap"
              size="xs"
              rounded
            >
              {label}
            </Badge>
          );
        },
      },
    ],
    [],
  );

  const headerHelpColumns = React.useMemo<ColumnDef<DemoEvent>[]>(
    () => [
      {
        accessorKey: "eventName",
        id: "eventName",
        minSize: 240,
        meta: { label: "Event name" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Event name"
            helpText="The human-friendly name used in communications and reporting."
          />
        ),
      },
      {
        accessorKey: "startsAt",
        id: "startsAt",
        size: 260,
        meta: { label: "Start date" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Start date"
            helpText="Displayed in the user’s locale. The timezone column indicates the source timezone."
          />
        ),
        cell: ({ row }) => (
          <span className="whitespace-nowrap">
            {formatEventStart(row.original.startsAt)}
          </span>
        ),
      },
      {
        accessorKey: "timezone",
        id: "timezone",
        size: 220,
        meta: { label: "Timezone" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Timezone" />
        ),
      },
      {
        accessorKey: "attendees",
        id: "attendees",
        size: 112,
        meta: { label: "Attendees" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Attendees" />
        ),
        cell: ({ row }) => <span>{row.original.attendees}</span>,
      },
      {
        accessorKey: "waitlisted",
        id: "waitlisted",
        size: 112,
        meta: { label: "Waitlisted" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Waitlisted" />
        ),
        cell: ({ row }) => <span>{row.original.waitlisted}</span>,
      },
      {
        accessorKey: "integration",
        id: "integration",
        size: 144,
        meta: { label: "Syncs with" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Syncs with" />
        ),
        cell: ({ row }) => (
          <span className="whitespace-nowrap">
            {integrationLabel(row.original.integration)}
          </span>
        ),
      },
      {
        accessorKey: "syncStatus",
        id: "syncStatus",
        size: 164,
        meta: {
          label: "Sync status",
          cellLayout: "content",
        } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Sync status"
            helpText="Shows the current state of CRM sync for this event."
          />
        ),
        cell: ({ row }) => {
          const v = row.original.syncStatus;
          const variant =
            v === "synced"
              ? "success"
              : v === "failed"
                ? "destructive"
                : v === "syncing"
                  ? "info"
                  : "secondary";
          const label =
            v === "synced"
              ? "Synced"
              : v === "failed"
                ? "Failed"
                : v === "syncing"
                  ? "Syncing"
                  : "No integration";

          return (
            <Badge
              variant={variant}
              className="whitespace-nowrap"
              size="xs"
              rounded
            >
              {label}
            </Badge>
          );
        },
        filterFn: DataTableMultiSelectFilter,
      },
    ],
    [],
  );

  const nestedRowsColumns = React.useMemo<ColumnDef<DemoEvent>[]>(
    () => [
      {
        accessorKey: "eventName",
        id: "eventName",
        minSize: 240,
        meta: { label: "Event name" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Event name" />
        ),
      },
      {
        accessorKey: "startsAt",
        id: "startsAt",
        size: 260,
        meta: { label: "Start date" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Start date" />
        ),
        cell: ({ row }) => (
          <span className="whitespace-nowrap">
            {formatEventStart(row.original.startsAt)}
          </span>
        ),
      },
      {
        accessorKey: "attendees",
        id: "attendees",
        size: 112,
        meta: { label: "Attendees" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Attendees" />
        ),
        cell: ({ row }) => <span>{row.original.attendees}</span>,
      },
      {
        accessorKey: "waitlisted",
        id: "waitlisted",
        size: 112,
        meta: { label: "Waitlisted" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Waitlisted" />
        ),
        cell: ({ row }) => <span>{row.original.waitlisted}</span>,
      },
    ],
    [],
  );

  const importSnippet = `import {
  DataTable,
  DataTableColumnHeader,
  DataTableMultiLineCell,
} from "@geckolabs/elements/components/data-table"`;

  const basicSnippet = `<DataTable
  aria-label="Events"
  columns={columns}
  data={data}
/>`;

  const sortingSnippet = `<DataTable
  aria-label="Events"
  columns={columns}
  data={data}
  sorting
  initialState={{
    sorting: [{ id: "startsAt", desc: false }],
  }}
/>`;

  const helpTextSnippet = `<DataTableColumnHeader
  column={column}
  title="Event name"
  helpText="The human-friendly name used in communications and reporting."
/>`;

  const paginationSnippet = `<DataTable
  aria-label="Events"
  columns={columns}
  data={data}
  pagination
/>`;

  const massActionsSnippet = `<DataTable
  aria-label="Events"
  columns={columns}
  data={data}
  getRowId={(event) => event.id}
  selectActions={selectActions}
  onSelectAction={handleSelectAction}
  toolbar={{
    columnToggle: true,
  }}
/>`;

  const floatingActionsSnippet = `<DataTable
  aria-label="Events"
  columns={columns}
  data={events}
  getRowId={(event) => event.id}
  pagination
  selectActions={[
    { id: "export", label: "Export" },
    { id: "archive", label: "Archive" },
    { id: "delete", label: "Delete", variant: "destructive" },
  ]}
  selectActionsDisplay="floating"
  selectActionsLabels={{
    selectedCount: (count) =>
      count === 1 ? "1 event selected" : count + " events selected",
    selectAll: "Select all",
    clearSelection: "Deselect all events",
    label: "Event selection actions",
  }}
  onSelectAction={(actionId, { selectedRows }) => {
    handleEventAction(actionId, selectedRows.map((row) => row.original.id));
  }}
/>`;

  const rowActionsSnippet = `<DataTable
  aria-label="Events"
  columns={columns}
  data={data}
  rowActions={rowActions}
  onRowAction={handleRowAction}
/>`;

  const searchSnippet = `<DataTable
  aria-label="Events"
  columns={columns}
  data={data}
  toolbar={{
    search: { placeholder: "Search events" },
  }}
/>`;

  const filtersSnippet = `<DataTable
  aria-label="Events"
  columns={columns}
  data={data}
  toolbar={{
    filters: {
      categories: filterCategories,
    },
  }}
/>`;

  const columnToggleSnippet = `<DataTable
  aria-label="Events"
  columns={columns}
  data={data}
  toolbar={{
    columnToggle: true,
  }}
/>`;

  const multiLineSnippet = `<DataTableMultiLineCell
  primary={primary}
  secondary={secondary}
/>`;

  const nestedSnippet = `<DataTable
  aria-label="Events"
  columns={columns}
  data={data}
  rowActions={rowActions}
  onRowAction={handleRowAction}
  expandable={{
    renderDetail: ({ original }) => (
      <Table nested title="Sessions">
        {detail}
      </Table>
    ),
  }}
/>`;

  const fullSnippet = `<DataTable
  aria-label="Events"
  columns={columns}
  data={data}
  sorting
  pagination
  rowActions={rowActions}
  onRowAction={handleRowAction}
  selectActions={selectActions}
  onSelectAction={handleSelectAction}
  toolbar={{
    search: { placeholder: "Search events" },
    filters: {
      categories: filterCategories,
      triggerLabel: "Filter",
    },
    columnToggle: true,
  }}
  initialState={{
    sorting: [{ id: "startsAt", desc: false }],
  }}
/>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Data table"
        description="The Data table shows a list of rows people can scan, sort, and act on. Search, filters, pagination, and row actions sit around a grid of columns."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Data table as the default for product lists — events, forms,
            broadcasts, and similar listings — where people need to find,
            filter, sort, or act on rows.
            <br />
            <br />
            Avoid using it for a handful of fields that belong in a form, or for
            simple non-interactive tabular markup. If the grid is only
            presentation (for example reporting inside a Metric card), use{" "}
            <DocsPageLink to="/components/table">Table</DocsPageLink> instead.
            Pair filtering with{" "}
            <DocsPageLink to="/components/filters">Filters</DocsPageLink> via
            the Data table toolbar.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import DataTable for the grid. Import DataTableColumnHeader and DataTableMultiLineCell when a column needs a sortable header or stacked cell text."
        >
          <ComponentExample>
            <Code
              variant="block"
              language="tsx"
              code={importSnippet}
              showCopyButton
              copyLabel="Copy import"
            />
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="basic-example"
        title="Basic example"
        description={
          <>
            A grid using <Code>columns</Code> and <Code>data</Code>. Use this
            when the list only needs to be read, without search or pagination.
          </>
        }
      >
        <ComponentExample className="overflow-x-auto">
          <div className="space-y-6">
            <DataTable
              aria-label="Events"
              columns={baseColumns}
              data={demoEvents}
              initialState={{
                columnVisibility: {
                  chronology: false,
                  category: false,
                },
              }}
            />
            <Code
              variant="block"
              language="tsx"
              code={basicSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="table-headers"
        title="Table headers"
        description={
          <>
            Column titles using <Code>DataTableColumnHeader</Code>. Use this
            when a column can be sorted, or needs a short explanation.
          </>
        }
      >
        <ChildSection
          id="sorting"
          title="Sorting"
          description={
            <>
              Turns sorting on with the <Code>sorting</Code> prop. Use this when
              people need to order the list by a column. Declare the initial
              order so its column shows the active direction immediately.
            </>
          }
        >
          <ComponentExample className="overflow-x-auto">
            <div className="space-y-6">
              <DataTable
                aria-label="Events"
                columns={baseColumns}
                data={demoEvents}
                sorting
                initialState={{
                  sorting: [{ id: "startsAt", desc: false }],
                  columnVisibility: {
                    chronology: false,
                    category: false,
                  },
                }}
              />
              <Code
                variant="block"
                language="tsx"
                code={sortingSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="help-text"
          title="Help text"
          description={
            <>
              Adds a help icon using <Code>helpText</Code> on{" "}
              <Code>DataTableColumnHeader</Code>. Use this when the column name
              is not enough on its own.
            </>
          }
        >
          <ComponentExample className="overflow-x-auto">
            <div className="space-y-6">
              <DataTable
                aria-label="Events"
                columns={headerHelpColumns}
                data={demoEvents}
                initialState={{
                  columnVisibility: {
                    chronology: false,
                    category: false,
                  },
                }}
              />
              <Code
                variant="block"
                language="tsx"
                code={helpTextSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="column-layout"
        title="Column sizing"
        description="Column widths stay stable when results change. Compact columns have fixed widths; text columns share the remaining space. Columns retain readable minimum widths and the table scrolls when they no longer fit. Long text truncates with an ellipsis; hover or focus a truncated value to read it. Created by demonstrates two intentional lines. Preview the skeleton rows to compare their height with the loaded cells."
      >
        <ComponentExample>
          <StableColumnsExample />
        </ComponentExample>
        <Code
          variant="block"
          language="tsx"
          showCopyButton
          copyLabel="Copy column sizing example"
          code={`const columns = [
  { accessorKey: "name", header: "Name", minSize: 240, meta: { grow: 2 } },
  { accessorKey: "type", header: "Type", size: 136 },
  { accessorKey: "subject", header: "Subject", minSize: 280, meta: { grow: 3 } },
  {
    id: "createdBy", header: "Created by", size: 200,
    meta: {
      cellLayout: "content",
      skeleton: <DataTableMultiLineCell
        primary={<Skeleton className="h-[1lh] w-full" />}
        secondary={<Skeleton className="h-[1lh] w-3/4" />}
      />,
    },
    cell: ({ row }) => <DataTableMultiLineCell primary={row.original.creatorName} secondary={formatCreatedDate(row.original.createdAt)} />,
  },
];
<DataTable columns={columns} data={templates} aria-label="Templates" />`}
        />
        <p className="text-sm text-muted-foreground">
          Widths and minimums are CSS pixels. Without a size, columns flex with
          a default minimum of 200px. Set <Code>meta.grow</Code> to change their
          share of the extra space, or <Code>maxSize</Code> to cap it. Long text
          truncates with an ellipsis; hover or focus it to read the full value.
        </p>
      </MainSection>

      <MainSection
        id="pagination"
        title="Pagination"
        description={
          <>
            Splits the list into pages using the <Code>pagination</Code> prop.
            Use this when there are too many rows to show at once. The default
            is 15 rows, with 25 and 50 also available.
          </>
        }
      >
        <ComponentExample className="overflow-x-auto">
          <div className="space-y-6">
            <DataTable
              aria-label="Events"
              columns={baseColumns}
              data={demoEvents}
              pagination
              initialState={{
                columnVisibility: {
                  chronology: false,
                  category: false,
                },
              }}
            />
            <Code
              variant="block"
              language="tsx"
              code={paginationSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="mass-actions"
        title="Mass actions"
        description={
          <>
            Adds row selection and bulk actions with <Code>selectActions</Code>.
            Use this when people need to act on several rows at once.
          </>
        }
      >
        <ChildSection
          id="mass-actions-button"
          title="Button trigger"
          description="The default menu keeps mass actions in the table toolbar. Select rows to show the trigger."
        >
          <ComponentExample className="overflow-x-auto">
            <div className="space-y-6">
              <DataTable
                aria-label="Events"
                columns={baseColumns}
                data={demoEvents}
                getRowId={(event) => event.id}
                selectActions={demoSelectedActions}
                onSelectAction={(id, { selectedRows }) =>
                  setButtonActionResult(
                    `${id} requested for ${selectedRows.length} events.`,
                  )
                }
                toolbar={{
                  columnToggle: true,
                }}
                initialState={{
                  columnVisibility: {
                    chronology: false,
                    category: false,
                  },
                }}
              />
              <p role="status" className="text-muted-foreground text-sm">
                {buttonActionResult}
              </p>
              <Code
                variant="block"
                language="tsx"
                code={massActionsSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="mass-actions-floating"
          title="Floating action bar"
          description="Select rows to reveal a floating bar with the selection count, select all and direct actions. It fades and scales subtly in and out, respecting reduced motion. Actions automatically move into a More actions menu when the container narrows. The bar stays within this table and uses the opposite appearance: dark in light mode, light in dark mode. The open menu trigger keeps its hover colour. These demo actions report the request without changing data."
        >
          <ComponentExample>
            <div className="space-y-6">
              <DataTable
                aria-label="Events with floating actions"
                columns={baseColumns}
                data={demoEvents}
                getRowId={(event) => event.id}
                pagination
                toolbar={{ search: { placeholder: "Search events" } }}
                selectActions={[
                  { id: "export", label: "Export" },
                  { id: "archive", label: "Archive" },
                  { id: "delete", label: "Delete", variant: "destructive" },
                ]}
                selectActionsDisplay="floating"
                selectActionsLabels={{
                  selectedCount: (count) =>
                    count === 1
                      ? "1 event selected"
                      : `${count} events selected`,
                  clearSelection: "Deselect all events",
                  label: "Event selection actions",
                }}
                onSelectAction={(id, { selectedRows }) =>
                  setFloatingActionResult(
                    `${id} requested for ${selectedRows.length} events.`,
                  )
                }
                initialState={{
                  rowSelection: {
                    "evt-001": true,
                    "evt-002": true,
                    "evt-003": true,
                    "evt-004": true,
                  },
                  columnVisibility: { chronology: false, category: false },
                }}
              />
              <p role="status" className="text-muted-foreground text-sm">
                {floatingActionResult}
              </p>
              <Code
                variant="block"
                language="tsx"
                code={floatingActionsSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="row-links"
        title="Row links"
        description="Click anywhere in a linked data cell, including its padding, to open the component documentation. Right-click opens the native browser link menu. Selection and action menus stay independent. Tab reaches one primary navigation link per row; long text remains available on hover or focus."
      >
        <ComponentExample>
          <div className="space-y-6">
            <RowLinksExample />
            <Code
              variant="block"
              language="tsx"
              code={`<DataTable
  columns={columns}
  data={rows}
  rowLink={{
    getHref: (row) => row.href,
    columnIds: ["name", "description"],
    primaryColumnId: "name",
  }}
/>`}
              showCopyButton
              copyLabel="Copy row links example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="row-actions"
        title="Row actions"
        description={
          <>
            Adds a per-row menu using <Code>rowActions</Code>. Use this for
            actions that apply to one row.
          </>
        }
      >
        <ComponentExample className="overflow-x-auto">
          <div className="space-y-6">
            <DataTable
              aria-label="Events"
              columns={baseColumns}
              data={demoEvents}
              rowActions={demoRowActions}
              onRowAction={handleRowAction}
              initialState={{
                columnVisibility: {
                  chronology: false,
                  category: false,
                },
              }}
            />
            <Code
              variant="block"
              language="tsx"
              code={rowActionsSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="table-toolbar"
        title="Table toolbar"
        description={
          <>
            Adds search, filters, and column visibility using the{" "}
            <Code>toolbar</Code> prop. Use the pieces the list actually needs.
          </>
        }
      >
        <ChildSection
          id="search"
          title="Search"
          description={
            <>
              The Search control uses <Code>toolbar.search</Code>. Use this when
              people need to find a row by typing.
            </>
          }
        >
          <ComponentExample className="overflow-x-auto">
            <div className="space-y-6">
              <DataTable
                aria-label="Events"
                columns={baseColumns}
                data={demoEvents}
                toolbar={{
                  search: { placeholder: "Search events" },
                }}
                initialState={{
                  columnVisibility: {
                    chronology: false,
                    category: false,
                  },
                }}
              />
              <Code
                variant="block"
                language="tsx"
                code={searchSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="filters"
          title="Filters"
          description={
            <>
              Filter controls using <Code>toolbar.filters</Code>. Use this when
              the list can be narrowed by category.
            </>
          }
        >
          <ComponentExample className="overflow-x-auto">
            <div className="space-y-6">
              <DataTable
                aria-label="Events"
                columns={baseColumns}
                data={demoEvents}
                toolbar={{
                  filters: {
                    categories: eventFilterCategories,
                  },
                }}
                initialState={{
                  columnVisibility: {
                    chronology: false,
                    category: false,
                  },
                }}
              />
              <Code
                variant="block"
                language="tsx"
                code={filtersSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
        <ChildSection
          id="column-toggle"
          title="Column toggle"
          description={
            <>
              Shows or hides columns using <Code>toolbar.columnToggle</Code>.
              Use this when people need to choose which columns stay in view.
            </>
          }
        >
          <ComponentExample className="overflow-x-auto">
            <div className="space-y-6">
              <DataTable
                aria-label="Events"
                columns={baseColumns}
                data={demoEvents}
                toolbar={{
                  columnToggle: true,
                }}
                initialState={{
                  columnVisibility: {
                    chronology: false,
                    category: false,
                  },
                }}
              />
              <Code
                variant="block"
                language="tsx"
                code={columnToggleSnippet}
                showCopyButton
                copyLabel="Copy example"
              />
            </div>
          </ComponentExample>
        </ChildSection>
      </MainSection>

      <MainSection
        id="multi-line-cells"
        title="Multi-line cells"
        description={
          <>
            Stacks two lines in a cell using <Code>DataTableMultiLineCell</Code>{" "}
            with <Code>primary</Code> and <Code>secondary</Code>. Use this when
            a column needs a subtitle.
          </>
        }
      >
        <ComponentExample className="overflow-x-auto">
          <div className="space-y-6">
            <DataTable
              aria-label="Events"
              columns={multiLineColumns}
              data={demoEvents}
              initialState={{
                columnVisibility: {
                  chronology: false,
                  category: false,
                },
              }}
            />
            <Code
              variant="block"
              language="tsx"
              code={multiLineSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="nested-rows"
        title="Nested rows"
        description={
          <>
            Expands a row using <Code>expandable</Code> with{" "}
            <Code>renderDetail</Code>. Use this when a row has nested content.
          </>
        }
      >
        <ComponentExample className="overflow-x-auto">
          <div className="space-y-6">
            <DataTable
              aria-label="Events and sessions"
              columns={nestedRowsColumns}
              data={demoEvents.slice(0, 5)}
              rowActions={demoRowActions}
              onRowAction={handleRowAction}
              expandable={{
                renderDetail: ({ original }) => (
                  <Table
                    nested
                    hoverable
                    title="Sessions"
                    description={`Session times for ${original.eventName}`}
                    aria-label={`Sessions for ${original.eventName}`}
                  >
                    <TableHeader>
                      <TableRow>
                        <TableHead>Session time</TableHead>
                        <TableHead>Session date</TableHead>
                        <TableHead>Attendees</TableHead>
                        <TableHead>Waitlisted</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {demoSessionsForEvent(original.id).map((s) => (
                        <TableRow key={s.id}>
                          <TableCell>{s.sessionTime}</TableCell>
                          <TableCell>{s.sessionDate}</TableCell>
                          <TableCell>{s.attendees}</TableCell>
                          <TableCell>{s.waitlisted}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ),
              }}
            />
            <Code
              variant="block"
              language="tsx"
              code={nestedSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="full-example"
        title="Full example"
        description={
          <>
            Combines <Code>sorting</Code>, <Code>pagination</Code>,{" "}
            <Code>rowActions</Code>, <Code>selectActions</Code>, and{" "}
            <Code>toolbar</Code>. Use this when the list needs the full set of
            tools.
          </>
        }
      >
        <ComponentExample className="overflow-x-auto">
          <div className="space-y-6">
            <DataTable
              aria-label="Events"
              columns={multiLineColumns}
              data={demoEvents}
              sorting
              pagination
              rowActions={demoRowActions}
              onRowAction={handleRowAction}
              selectActions={demoSelectedActions}
              onSelectAction={handleSelectAction}
              toolbar={{
                search: { placeholder: "Search events" },
                filters: {
                  categories: eventFilterCategories,
                  triggerLabel: "Filter",
                },
                columnToggle: true,
              }}
              initialState={{
                sorting: [{ id: "startsAt", desc: false }],
                columnVisibility: {
                  chronology: false,
                  category: false,
                },
              }}
            />
            <Code
              variant="block"
              language="tsx"
              code={fullSnippet}
              showCopyButton
              copyLabel="Copy example"
            />
          </div>
        </ComponentExample>
      </MainSection>

      <MainSection
        id="do-dont"
        title="Do and don’t"
        description="Add table behaviour only when it helps people inspect or act on the rows."
      >
        <DocsDoDont
          doItems={[
            <>
              Use clear column headers and enable <Code>sorting</Code> only for
              columns people need to order.
            </>,
            <>
              Use <Code>pagination</Code> when the complete data set is
              difficult to scan at once.
            </>,
            <>
              Provide clear <Code>selectActions</Code>; Data table adds the row
              selection controls automatically.
            </>,
            <>
              Use <Code>expandable</Code> for related detail that belongs to a
              row.
            </>,
          ]}
          dontItems={[
            <>
              Don’t use a Data table for simple presentational markup. Use{" "}
              <DocsPageLink to="/components/table">Table</DocsPageLink>.
            </>,
            <>
              Don’t enable search, filters, actions, and pagination when the
              rows do not need them.
            </>,
            <>
              No data renders only Empty. No search/filter matches keeps Empty inside the table with query controls. Use{" "}
              <DocsPageLink to="/components/empty">Empty</DocsPageLink>.
            </>,
            <>Don’t put essential row meaning only in colour or an icon.</>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on DataTable."
      >
        <DocsApiTable
          rows={[
            {
              name: "columns",
              type: "ColumnDef<TData>[]",
              description: "Defines the table columns and cells.",
            },
            {
              name: "data",
              type: "TData[]",
              description: "Supplies the rows.",
            },
            {
              name: "aria-label",
              type: "string",
              description: "Provides a concise accessible name for the table.",
            },
            {
              name: "sorting",
              type: "boolean",
              defaultValue: "false",
              description: "Enables sortable column headers.",
            },
            {
              name: "rowSelection",
              type: "boolean",
              defaultValue: "false",
              description:
                "Adds selection controls when selection is needed without built-in actions.",
            },
            {
              name: "rowActions",
              type: "boolean | DataTableRowAction[]",
              defaultValue: "false",
              description: "Adds an action menu to each row.",
            },
            {
              name: "onRowAction",
              type: "(actionId, context) => void",
              description: "Required when row actions are supplied.",
            },
            {
              name: "selectActions",
              type: "DataTableRowAction[]",
              description:
                "Defines bulk actions and automatically enables row selection.",
            },
            {
              name: "selectActionsDisplay",
              type: '"button" | "floating"',
              defaultValue: '"button"',
              description:
                "Chooses the toolbar menu or a floating selection bar.",
            },
            {
              name: "selectActionsLabels",
              type: "DataTableSelectionBarLabels",
              description:
                "Translates the floating bar group, count, select-all, deselect and overflow controls.",
            },
            {
              name: "onSelectAction",
              type: "(actionId, context) => void",
              description: "Required when selected-row actions are supplied.",
            },
            {
              name: "rowLink",
              type: "DataTableRowLinkConfig<TData>",
              description:
                "Native full-cell navigation: getHref supplies the destination, columnIds opts in non-interactive cells and primaryColumnId chooses the keyboard link.",
            },
            {
              name: "getRowId",
              type: "(row, index) => string",
              description:
                "Returns a stable row identifier. Use this whenever rows can be selected.",
            },
            {
              name: "expandable",
              type: "DataTableExpandableConfig<TData>",
              description: "Adds expandable row detail.",
            },
            {
              name: "toolbar",
              type: "false | DataTableToolbarConfig",
              description:
                "Configures search, filters, column visibility, and selected-row actions.",
            },
            {
              name: "pagination",
              type: "boolean | DataTablePaginationProps",
              defaultValue: "false",
              description: "Adds page controls below the table.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://tanstack.com/table/latest/docs">
                TanStack Table documentation
              </DocsExternalLink>{" "}
              and the{" "}
              <DocsExternalLink href="https://ui.shadcn.com/docs/components/base/data-table">
                Shadcn Data Table documentation
              </DocsExternalLink>{" "}
              for the underlying API and source composition.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use supporting components when the content or navigation is simpler."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/table">Table</DocsPageLink> — when
            rows only need semantic table markup.
          </li>
          <li>
            <DocsPageLink to="/components/pagination">Pagination</DocsPageLink>{" "}
            — when paging content outside a DataTable.
          </li>
          <li>
            <DocsPageLink to="/components/empty">Empty</DocsPageLink> — when
            there are no rows to show.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
