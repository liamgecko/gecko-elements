import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"

import {
  DataTable,
  type DataTableColumnMeta,
} from "@gecko/ui/components/data-table/data-table"
import { DataTableColumnHeader } from "@gecko/ui/components/data-table/data-table-column-header"
import { DataTableMultiSelectFilter } from "@gecko/ui/components/data-table/data-table-columns"
import { DataTableMultiLineCell } from "@gecko/ui/components/data-table/data-table-multi-line-cell"
import { Badge } from "@gecko/ui/components/badge"
import { Code } from "@gecko/ui/components/code"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@gecko/ui/components/table"

import {
  demoEvents,
  demoSessionsForEvent,
  eventFilterCategories,
  demoSelectedActions,
  demoRowActions,
  type DemoEvent,
} from "./data-table-example-data"

function ordinal(n: number) {
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`
  const mod10 = n % 10
  if (mod10 === 1) return `${n}st`
  if (mod10 === 2) return `${n}nd`
  if (mod10 === 3) return `${n}rd`
  return `${n}th`
}

function formatEventStart(startsAtIso: string) {
  const d = new Date(startsAtIso)
  const day = ordinal(d.getDate())
  const month = d.toLocaleString(undefined, { month: "long" })
  const year = d.getFullYear()
  const time = d
    .toLocaleString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/\s/g, "")
    .toLowerCase()
  return `${day} ${month}, ${year} at ${time}`
}

function integrationLabel(v: DemoEvent["integration"]) {
  if (v === "dynamics") return "Dynamics"
  if (v === "salesforce") return "Salesforce"
  return "—"
}

export function DataTablePage() {
  const baseColumns = React.useMemo<ColumnDef<DemoEvent>[]>(
    () => [
      {
        accessorKey: "eventName",
        id: "eventName",
        meta: { label: "Event name" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Event name" />
        ),
      },
      {
        accessorKey: "startsAt",
        id: "startsAt",
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
        meta: { label: "Timezone" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Timezone" />
        ),
      },
      {
        accessorKey: "attendees",
        id: "attendees",
        meta: { label: "Attendees" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Attendees" />
        ),
        cell: ({ row }) => <span>{row.original.attendees}</span>,
      },
      {
        accessorKey: "waitlisted",
        id: "waitlisted",
        meta: { label: "Waitlisted" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Waitlisted" />
        ),
        cell: ({ row }) => <span>{row.original.waitlisted}</span>,
      },
      {
        accessorKey: "integration",
        id: "integration",
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
        meta: { label: "Sync status" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Sync status" />
        ),
        cell: ({ row }) => {
          const v = row.original.syncStatus
          const variant =
            v === "synced"
              ? "success"
              : v === "failed"
                ? "destructive"
                : v === "syncing"
                  ? "info"
                  : "secondary"
          const label =
            v === "synced"
              ? "Synced"
              : v === "failed"
                ? "Failed"
                : v === "syncing"
                  ? "Syncing"
                  : "No integration"

          return (
            <Badge variant={variant} className="whitespace-nowrap" size="xs" rounded>
              {label}
            </Badge>
          )
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
    []
  )

  const multiLineColumns = React.useMemo<ColumnDef<DemoEvent>[]>(
    () => [
      {
        accessorKey: "eventName",
        id: "eventName",
        meta: { label: "Event name" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Event name" />
        ),
      },
      {
        accessorKey: "startsAt",
        id: "startsAt",
        meta: { label: "Start date" } satisfies DataTableColumnMeta,
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
        meta: { label: "Attendees" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Attendees" />
        ),
        cell: ({ row }) => <span>{row.original.attendees}</span>,
      },
      {
        accessorKey: "waitlisted",
        id: "waitlisted",
        meta: { label: "Waitlisted" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Waitlisted" />
        ),
        cell: ({ row }) => <span>{row.original.waitlisted}</span>,
      },
      {
        accessorKey: "integration",
        id: "integration",
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
        meta: { label: "Sync status" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Sync status" />
        ),
        cell: ({ row }) => {
          const v = row.original.syncStatus
          const variant =
            v === "synced"
              ? "success"
              : v === "failed"
                ? "destructive"
                : v === "syncing"
                  ? "info"
                  : "secondary"
          const label =
            v === "synced"
              ? "Synced"
              : v === "failed"
                ? "Failed"
                : v === "syncing"
                  ? "Syncing"
                  : "No integration"

          return (
            <Badge variant={variant} className="whitespace-nowrap" size="xs" rounded>
              {label}
            </Badge>
          )
        },
      },
    ],
    []
  )

  const headerHelpColumns = React.useMemo<ColumnDef<DemoEvent>[]>(
    () => [
      {
        accessorKey: "eventName",
        id: "eventName",
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
        meta: { label: "Timezone" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Timezone" />
        ),
      },
      {
        accessorKey: "attendees",
        id: "attendees",
        meta: { label: "Attendees" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Attendees" />
        ),
        cell: ({ row }) => <span>{row.original.attendees}</span>,
      },
      {
        accessorKey: "waitlisted",
        id: "waitlisted",
        meta: { label: "Waitlisted" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Waitlisted" />
        ),
        cell: ({ row }) => <span>{row.original.waitlisted}</span>,
      },
      {
        accessorKey: "integration",
        id: "integration",
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
        meta: { label: "Sync status" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Sync status"
            helpText="Shows the current state of CRM sync for this event."
          />
        ),
        cell: ({ row }) => {
          const v = row.original.syncStatus
          const variant =
            v === "synced"
              ? "success"
              : v === "failed"
                ? "destructive"
                : v === "syncing"
                  ? "info"
                  : "secondary"
          const label =
            v === "synced"
              ? "Synced"
              : v === "failed"
                ? "Failed"
                : v === "syncing"
                  ? "Syncing"
                  : "No integration"

          return (
            <Badge variant={variant} className="whitespace-nowrap" size="xs" rounded>
              {label}
            </Badge>
          )
        },
        filterFn: DataTableMultiSelectFilter,
      },
    ],
    []
  )

  const nestedRowsColumns = React.useMemo<ColumnDef<DemoEvent>[]>(
    () => [
      {
        accessorKey: "eventName",
        id: "eventName",
        meta: { label: "Event name" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Event name" />
        ),
      },
      {
        accessorKey: "startsAt",
        id: "startsAt",
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
        meta: { label: "Attendees" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Attendees" />
        ),
        cell: ({ row }) => <span>{row.original.attendees}</span>,
      },
      {
        accessorKey: "waitlisted",
        id: "waitlisted",
        meta: { label: "Waitlisted" } satisfies DataTableColumnMeta,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Waitlisted" />
        ),
        cell: ({ row }) => <span>{row.original.waitlisted}</span>,
      },
    ],
    []
  )

  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Data table</h1>
          <p className="text-sm text-muted-foreground text-pretty">
            A composed data grid built with TanStack Table and Gecko Elements:
            search, filters, sortable headers, row selection, bulk actions on
            selection (
            <Code>selectActions</Code>
            ), column visibility, pagination, and per-row actions (
            <Code>rowActions</Code>
            ). Primitives live under{" "}
            <Code>src/components/ui/data-table/</Code>.
            .
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            <Code>DataTable</Code> owns table state; pass toolbar/pagination
            configuration via props.
            For custom composition, use the primitives under{" "}
            <Code>src/components/ui/data-table/</Code>
            . Use{" "}
            <Code>DataTableColumnHeader</Code>{" "}
            in column definitions for sortable headers.
          </p>

          <ComponentExample className="overflow-x-auto">
            <DataTable
              columns={baseColumns}
              data={demoEvents}
              initialState={{
                columnVisibility: {
                  chronology: false,
                  category: false,
                },
              }}
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="table-headers" label="Table headers">
          <h2 className="text-lg font-semibold">Table headers</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Use <Code>DataTableColumnHeader</Code> to render consistent header
            affordances like sorting and optional help text.
          </p>

          <h3 id="sorting" className="text-base font-semibold">
            Sorting
          </h3>
          <p className="mb-6 text-sm text-muted-foreground text-pretty">
            Enable sorting via the <Code>sorting</Code> prop. Sortable headers are
            rendered with <Code>DataTableColumnHeader</Code>.
          </p>
          <ComponentExample className="mb-8 overflow-x-auto">
            <DataTable
              columns={baseColumns}
              data={demoEvents}
              sorting
              initialState={{
                columnVisibility: {
                  chronology: false,
                  category: false,
                },
              }}
            />
          </ComponentExample>

          <h3 id="help-text" className="text-base font-semibold">
            Help text
          </h3>
          <p className="mb-6 text-sm text-muted-foreground text-pretty">
            Add <Code>helpText</Code> to show a question-mark icon with a tooltip,
            positioned to the right of the header label.
          </p>
          <ComponentExample className="overflow-x-auto">
            <DataTable
              columns={headerHelpColumns}
              data={demoEvents}
              initialState={{
                columnVisibility: {
                  chronology: false,
                  category: false,
                },
              }}
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="pagination" label="Pagination">
          <h2 className="text-lg font-semibold">Pagination</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Enable pagination via the{" "}
            <Code>pagination</Code>{" "}
            prop.
          </p>

          <ComponentExample className="overflow-x-auto">
            <DataTable
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
          </ComponentExample>
        </PageSection>

        <PageSection id="mass-actions" label="Mass actions">
          <h2 className="text-lg font-semibold">Mass actions</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Enable row selection via <Code>rowSelection</Code> and provide bulk
            actions via <Code>selectActions</Code>. The “Actions on selected”
            button only appears when rows are selected.
          </p>

          <ComponentExample className="overflow-x-auto">
            <DataTable
              columns={baseColumns}
              data={demoEvents}
              rowSelection
              selectActions={demoSelectedActions}
              toolbar={{
                selectActions: true,
                columnToggle: true,
              }}
              initialState={{
                columnVisibility: {
                  chronology: false,
                  category: false,
                },
              }}
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="row-actions" label="Row actions">
          <h2 className="text-lg font-semibold">Row actions</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Enable the per-row ⋯ menu via <Code>rowActions</Code>.
          </p>

          <ComponentExample className="overflow-x-auto">
            <DataTable
              columns={baseColumns}
              data={demoEvents}
              rowActions={demoRowActions}
              initialState={{
                columnVisibility: {
                  chronology: false,
                  category: false,
                },
              }}
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="table-toolbar" label="Table toolbar">
          <h2 className="text-lg font-semibold">Table toolbar</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Enable toolbar features (search, filters, column toggle) via the{" "}
            <Code>toolbar</Code>{" "}
            prop.
          </p>

          <h3 id="search" className="text-base font-semibold">
            Search
          </h3>
          <p className="mb-6 text-sm text-muted-foreground text-pretty">
            Render only a search input via{" "}
            <Code>toolbar.search</Code>
            . Global filtering is enabled automatically when search is present.
          </p>
          <ComponentExample className="mb-6 overflow-x-auto">
            <DataTable
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
          </ComponentExample>

          <h3 id="filters" className="text-base font-semibold">
            Filters
          </h3>
          <p className="mb-6 text-sm text-muted-foreground text-pretty">
            Render only filters via{" "}
            <Code>toolbar.filters</Code>
            .
          </p>
          <ComponentExample className="mb-6 overflow-x-auto">
            <DataTable
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
          </ComponentExample>

          <h3 id="column-toggle" className="text-base font-semibold">
            Column toggle
          </h3>
          <p className="mb-6 text-sm text-muted-foreground text-pretty">
            Enable column visibility controls via{" "}
            <Code>toolbar.columnToggle</Code>
            .
          </p>
          <ComponentExample className="overflow-x-auto">
            <DataTable
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
          </ComponentExample>
        </PageSection>

        <PageSection id="multi-line-cells" label="Multi-line cells">
          <h2 className="text-lg font-semibold">Multi-line cells</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Use stacked “primary + secondary” text inside a cell for supporting
            information (timezones, dates, subtitles, etc.). This example combines
            Start date (primary) with Timezone (secondary) in a single column.
          </p>

          <ComponentExample className="overflow-x-auto">
            <DataTable
              columns={multiLineColumns}
              data={demoEvents}
              initialState={{
                columnVisibility: {
                  chronology: false,
                  category: false,
                },
              }}
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="nested-rows" label="Nested rows">
          <h2 className="text-lg font-semibold">Nested rows</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Pass <Code>expandable</Code> with <Code>renderDetail</Code> to show a
            chevron column and render each row as{" "}
            <Code>TableExpandableRow</Code>. Put a nested{" "}
            <Code>Table nested</Code> in the detail (optionally with{" "}
            <Code>title</Code> / <Code>description</Code>) the same way as on the{" "}
            <a
              className="text-primary underline underline-offset-2"
              href="/components/table#nested-rows"
            >
              Table
            </a>{" "}
            page.
          </p>

          <ComponentExample className="overflow-x-auto">
            <DataTable
              columns={nestedRowsColumns}
              data={demoEvents.slice(0, 5)}
              rowActions={demoRowActions}
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
          </ComponentExample>
        </PageSection>

        <PageSection id="full-example" label="Full example">
          <h2 className="text-lg font-semibold">Full example</h2>
          <p className="mb-8 text-sm text-muted-foreground text-pretty">
            Sorting, pagination, search, filters, column toggle, row selection with
            bulk actions, and per-row actions — all enabled together.
          </p>

          <ComponentExample className="overflow-x-auto">
            <DataTable
              columns={multiLineColumns}
              data={demoEvents}
              sorting
              pagination
              rowSelection
              rowActions={demoRowActions}
              selectActions={demoSelectedActions}
              toolbar={{
                search: { placeholder: "Search events" },
                filters: {
                  categories: eventFilterCategories,
                  triggerLabel: "Filter",
                },
                columnToggle: true,
                selectActions: true,
              }}
              initialState={{
                columnVisibility: {
                  chronology: false,
                  category: false,
                },
              }}
            />
          </ComponentExample>
        </PageSection>
    </div>
  )
}
