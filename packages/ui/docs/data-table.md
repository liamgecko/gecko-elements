# Data table

Import: `@gecko/ui/components/data-table`  
Status: Stable for client-side data  
Source: `src/components/data-table/`  
Human documentation: `apps/docs/src/pages/data-table/index.tsx`

## Purpose

Data table presents a product list whose rows need to be scanned, sorted, searched, filtered, selected, expanded or acted on. It combines Gecko's Table and form controls with TanStack Table state and row models.

Use Data table for product collections such as events, forms and broadcasts. Use Table for static tabular content that does not need data-management behaviour. Use a form or description layout for a small set of fields belonging to one record.

## Canonical application usage

Use the high-level `DataTable` interface. It owns the standard layout, state, injected utility columns, empty state and optional pagination.

```tsx
import type { ColumnDef } from "@tanstack/react-table";

import {
  DataTable,
  DataTableColumnHeader,
  DataTableMultiLineCell,
} from "@gecko/ui/components/data-table";

type Event = {
  id: string;
  name: string;
  startsAt: string;
  timezone: string;
};

const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Event name" />
    ),
  },
  {
    accessorKey: "startsAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start date" />
    ),
    cell: ({ row }) => (
      <DataTableMultiLineCell
        primary={formatDate(row.original.startsAt)}
        secondary={row.original.timezone}
      />
    ),
  },
];

<DataTable
  aria-label="Events"
  columns={columns}
  data={events}
  sorting
  pagination
  initialState={{
    sorting: [{ id: "startsAt", desc: false }],
  }}
/>;
```

Define columns outside the render path or memoise them. Use the row's domain identifier with `getRowId` whenever selection is enabled.

## Internal architecture

```text
DataTable
├── DataTableToolbar
│   ├── DataTableSearch
│   ├── DataTableFilters
│   ├── DataTableSelectActions
│   └── DataTableColumnToggle
├── DataTableContent
│   ├── DataTableColumnHeader
│   └── DataTableMultiLineCell
└── DataTablePagination
```

This diagram describes library internals, not application composition. Application code configures `DataTable` through props. `DataTableProvider` and the individual layout parts are an advanced escape hatch for a product layout that the standard component cannot express.

## Feature decisions

| Need                            | Configuration                         | Rule                                            |
| ------------------------------- | ------------------------------------- | ----------------------------------------------- |
| Read a short product list       | Base `DataTable`                      | Pagination is not applied                       |
| Order rows                      | `sorting` and `DataTableColumnHeader` | Enable only meaningful columns                  |
| Search visible data             | `toolbar.search`                      | Supply a domain-specific placeholder            |
| Narrow categorical data         | `toolbar.filters`                     | Match category and column ids                   |
| Change visible columns          | `toolbar.columnToggle`                | Keep essential columns non-hideable             |
| Act on one row                  | `rowActions` and `onRowAction`        | Keep destructive actions last                   |
| Act on several rows             | `selectActions` and `onSelectAction`  | Selection and its toolbar control are automatic |
| Reveal subordinate detail       | `expandable.renderDetail`             | Use for related detail, not primary row content |
| Split a longer client-side list | `pagination`                          | Uses the approved 10, 25 and 50 row sizes       |

Add only the behaviour the task requires. Do not enable the full toolbar by default.

## Columns

Columns use TanStack `ColumnDef<TData>`. `accessorKey` or `id` identifies the column for sorting, filtering and visibility.

Use `DataTableColumnHeader` for approved header layout and sort controls:

```tsx
{
  accessorKey: "name",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Event name" />
  ),
}
```

The global `sorting` prop permits sorting; a column may opt out with `enableSorting: false`. Always declare the table's initial ordering in `initialState.sorting`. This keeps the active column icon and `aria-sort` aligned with the order shown on first render, including when the supplied data is already ordered. The header exposes the active direction and the next sorting action accessibly.

Use `helpText` only when a concise column title cannot explain unfamiliar data. Do not repeat the title or place essential instructions exclusively in a tooltip.

Use `DataTableMultiLineCell` for one primary value and one supporting value. It owns the line spacing and secondary typography. Use cell renderers for domain formatting and existing Gecko components such as Badge; application code does not restyle table chrome.

`DataTableColumnMeta.label` supplies the human-readable label used by the column toggle. `headerClassName` and `cellClassName` remain available for compatibility and exceptional alignment. Prefer existing cell components and request a library treatment before adding presentation classes.

## Search and filters

Search is enabled by providing `toolbar.search`:

```tsx
<DataTable
  aria-label="Events"
  columns={columns}
  data={events}
  toolbar={{ search: { placeholder: "Search events" } }}
/>
```

Filtering requires both toolbar categories and matching column configuration. Category `id` must equal the column `id` or string `accessorKey`, and the column must use `DataTableMultiSelectFilter`.

```tsx
const categories = [
  {
    id: "status",
    label: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "paused", label: "Paused" },
    ],
  },
];

const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "status",
    filterFn: DataTableMultiSelectFilter,
  },
];

<DataTable
  aria-label="Events"
  columns={columns}
  data={events}
  toolbar={{ filters: { categories } }}
/>;
```

The approved filter operators are `is`, `is not` and `is any of`. Adding another operator requires explicit consent.

## Row actions

Use shared actions when each row has the same menu. The callback is required so the component cannot render a knowingly inert menu.

```tsx
const rowActions = [
  { id: "duplicate", label: "Duplicate" },
  {
    id: "delete",
    label: "Delete",
    variant: "destructive",
    separatorBefore: true,
  },
];

<DataTable
  aria-label="Events"
  columns={columns}
  data={events}
  rowActions={rowActions}
  onRowAction={(actionId, { original }) => {
    runEventAction(actionId, original.id);
  }}
/>;
```

Use `getRowActions` when availability differs by row. `rowActions={true}` with `actionsKey` remains supported for compatibility but is not the canonical interface for new implementations.

The approved action variants are `default` and `destructive`. Agents must obtain consent before adding another action variant, icon treatment or menu behaviour.

## Selected-row actions

Supplying `selectActions` automatically adds the selection column and selected-actions control. Do not also set `rowSelection` or a toolbar flag.

```tsx
<DataTable
  aria-label="Events"
  columns={columns}
  data={events}
  getRowId={(event) => event.id}
  selectActions={selectedActions}
  onSelectAction={(actionId, { selectedRows }) => {
    runBulkAction(
      actionId,
      selectedRows.map((row) => row.original.id),
    );
  }}
/>
```

The header checkbox selects the current page. TanStack uses row indexes by default, so `getRowId` is required in canonical selection usage to keep selection attached to the correct records when data changes.

Use `rowSelection` alone only when an advanced composition consumes selection state itself. The high-level component does not expose a separate selection callback.

## Pagination and data ownership

Pagination is opt-in. Without the `pagination` prop, Data table renders every filtered row. With it, Data table owns client-side pagination and displays the approved page-size and page-navigation controls.

Pagination controls remain inline within their leading and trailing groups. Its Select triggers use compact content-appropriate widths rather than the full-width form-field treatment.

This implementation expects the complete client-side dataset in `data`. It does not currently provide controlled server-side sorting, filtering or pagination. When a product list must fetch pages or query results remotely, request a reviewed library extension rather than combining remote fetching with these client-side controls.

Do not pass a page-size value outside the approved 10, 25 and 50 options. Unsupported initial sizes fall back to 10.

## Expandable rows

Use `expandable.renderDetail` when subordinate information belongs to one row but should remain hidden until requested. The library injects the expansion column, button semantics, expanded state, animation and detail panel.

```tsx
<DataTable
  aria-label="Events and sessions"
  columns={columns}
  data={events}
  expandable={{
    renderDetail: ({ original }) => (
      <Table nested aria-label={`Sessions for ${original.name}`}>
        {/* session rows */}
      </Table>
    ),
  }}
/>
```

Use a nested Table when the detail is tabular. Give the nested table its own accessible name. Do not repeat primary row content in the detail panel.

## Empty states

Data table owns its empty presentation:

- no data displays `No items yet`;
- a search or filter with no matches displays `No results found` and the relevant clear action.

Application code supplies data and filter configuration; it does not replace or restyle the empty state.

## Accessibility

- Supply a concise `aria-label` that names the collection, such as `Events` or `Applicants`.
- Keep column titles short and unique.
- Sort state is exposed with `aria-sort`; the sort button names its next action.
- Selection controls expose their checked and indeterminate states. The header control explicitly selects the current page.
- Use `getRowId` with selection so state follows stable domain records.
- Row action and expansion triggers are buttons with accessible names.
- Do not make the entire row clickable when it contains links, buttons, menus or selection controls.
- Do not communicate status using colour or an icon alone.
- Preserve horizontal scrolling at narrow widths rather than collapsing semantic table structure.

## Approved public interface

### Canonical parts

| Part                         | Meaning                                               |
| ---------------------------- | ----------------------------------------------------- |
| `DataTable`                  | Standard application interface and composition owner  |
| `DataTableColumnHeader`      | Column title, optional help and sorting control       |
| `DataTableMultiLineCell`     | Primary and supporting cell text                      |
| `DataTableMultiSelectFilter` | Approved categorical column filter                    |
| `DataTableRowAction`         | Shared shape for row and bulk actions                 |
| `DataTableColumnMeta`        | Column-toggle label and compatibility layout metadata |

### Advanced composition

`DataTableProvider`, `DataTableRoot`, `DataTableToolbar`, `DataTableToolbarSearchRow`, `DataTableToolbarGroup`, `DataTableSearch`, `DataTableFilters`, `DataTableSelectActions`, `DataTableColumnToggle`, `DataTableContent`, `DataTablePagination` and `useDataTableContext` are advanced parts.

Use them only when a reviewed product layout cannot be represented by `DataTable`. Keep them under one `DataTableProvider`. When manually composing without `DataTablePagination`, pass `paginated={false}` to both `DataTableProvider` and `DataTableContent`; their compatibility defaults assume pagination. This keeps the rendered rows and the header selection control in the same scope.

`createSelectionColumn`, `createExpandColumn`, `createActionsColumn`, `getDataTableColumnToggleLabel` and `DATA_TABLE_PAGE_SIZE_OPTIONS` are implementation helpers exported for compatibility. Do not use them in new application code without explicit review.

### DataTable props

| Prop               | Type                                    | Default     | Rule                                                                                              |
| ------------------ | --------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `columns`          | `ColumnDef<TData>[]`                    | required    | Stable or memoised definitions                                                                    |
| `data`             | `TData[]`                               | required    | Complete client-side dataset                                                                      |
| `aria-label`       | `string`                                | —           | Required in canonical usage                                                                       |
| `sorting`          | `boolean`                               | `false`     | Enable only when useful                                                                           |
| `rowSelection`     | `boolean`                               | `false`     | Advanced selection without built-in actions                                                       |
| `getRowId`         | `(row, index) => string`                | row index   | Use a domain id with selection                                                                    |
| `initialState`     | `InitialTableState`                     | —           | Initial sorting, filtering, visibility, selection or page; declare any displayed default ordering |
| `rowActions`       | `false \| true \| DataTableRowAction[]` | `false`     | Prefer a shared action array                                                                      |
| `getRowActions`    | `(row) => DataTableRowAction[]`         | —           | Per-row action availability                                                                       |
| `actionsKey`       | `keyof TData`                           | `"actions"` | Compatibility use with `rowActions={true}`                                                        |
| `onRowAction`      | `(id, context) => void`                 | —           | Required when row actions are supplied                                                            |
| `selectActions`    | `DataTableRowAction[]`                  | —           | Automatically enables selection and its toolbar control                                           |
| `onSelectAction`   | `(id, context) => void`                 | —           | Required with `selectActions`                                                                     |
| `expandable`       | `DataTableExpandableConfig<TData>`      | —           | Renders subordinate row detail                                                                    |
| `toolbar`          | `false \| DataTableToolbarConfig`       | —           | Search, filters and column toggle only                                                            |
| `pagination`       | `boolean \| DataTablePaginationProps`   | `false`     | Client-side pagination                                                                            |
| `globalFilter`     | `boolean`                               | `true`      | Advanced override; toolbar search normally owns this                                              |
| `className`        | `string`                                | —           | Parent layout integration only                                                                    |
| `contentClassName` | `string`                                | —           | Compatibility escape hatch; do not restyle table chrome                                           |

## Styling contract

The library owns the table border, header treatment, row spacing, hover and selected states, utility columns, toolbar layout, search sizing, filter integration, pagination controls, empty state, responsive scrolling, action triggers and focus states.

Application code owns column definitions, domain formatting and placement within the surrounding page. Use existing Gecko components inside cells. Request a library change when a legitimate table treatment is missing.

Agents must obtain explicit consent before adding or changing public props, action variants, filter operators, page sizes, selection behaviour, table chrome, toolbar layout, empty-state treatment or remote-data behaviour.

## Relationship to Shadcn and TanStack Table

Shadcn treats Data Table as a guide because table requirements vary by application. Gecko intentionally provides a reusable opinionated component for its recurring product-list pattern.

TanStack Table continues to own column definitions, state and row models. Gecko owns the approved presentation, feature configuration and common interactions. The current implementation uses TanStack Table v8; do not copy v9 feature-registration examples into this component.
