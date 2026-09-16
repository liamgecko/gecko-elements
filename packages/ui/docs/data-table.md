# Data table

Import: `@geckolabs/elements/components/data-table`  
Status: Stable for client-side and controlled server data\
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
} from "@geckolabs/elements/components/data-table";

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
| Split a longer client-side list | `pagination`                          | Uses the approved 15, 25 and 50 row sizes       |

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

`DataTableColumnMeta.grow` controls flexible sizing as described below. `DataTableColumnMeta.label` supplies the human-readable label used by the column toggle. `headerClassName` and `cellClassName` remain available for compatibility and exceptional alignment. Prefer existing cell components and request a library treatment before adding presentation classes.

## Stable column sizing

Data table uses fixed table layout and a shared column-width plan. Row contents never determine widths. Filtering, search, sorting, pagination, initial skeletons and empty/error states preserve the current plan. Container resizing, changed column definitions and column visibility deliberately recalculate it.

Use TanStack's `size`, `minSize`, `maxSize` and `DataTableColumnMeta.grow` on leaf column definitions:

| Configuration                                | Behaviour                                                           |
| -------------------------------------------- | ------------------------------------------------------------------- |
| No `size`                                    | Flexible column, minimum 200 CSS px, equal share of remaining space |
| `size: 136`                                  | Fixed 136 CSS px width by default                                   |
| `minSize: 180`                               | Minimum width for a flexible column                                 |
| `meta: { grow: 2 }`                          | Receives twice the extra space of a flexible column with weight 1   |
| `maxSize: 400`                               | Caps growth; remaining space goes to other flexible columns         |
| `size` plus an explicit positive `meta.grow` | Flexible; its minimum, maximum and weight control the allocation    |

Sizes must be positive, `maxSize` must be at least `minSize`, and growth weights must be finite and non-negative. `size` on a fixed column is clamped to any explicitly supplied minimum and maximum. A `grow` value of zero makes a column fixed; without a size its default width is 200px.

```tsx
const columns: ColumnDef<Template>[] = [
  { accessorKey: "name", header: "Name", minSize: 180, meta: { grow: 2 } },
  { accessorKey: "type", header: "Type", size: 136 },
  {
    accessorKey: "subject",
    header: "Subject",
    minSize: 220,
    meta: { grow: 3 },
  },
];
```

The 2:3 weighting applies to **extra space after minimum widths**, not the columns' total widths. Selection and expansion controls are fixed at 40px; row actions are 48px. Use `size: 40` for a product lock-icon column. Header/cell width classes are not the sizing API.

Leave at least one meaningful text column flexible to fill an ordinary table's container. When all columns are fixed or reach their maximums, unused space remains outside the table instead of stretching fixed columns. Do not add a blanket minimum table width or enable scrolling based on column count. The sum of actual column minimums determines when horizontal scrolling is necessary. Choose minimums for the content and translations, then verify the smallest supported desktop panel.

Plain values and inline text/link renderers use a bounded single line with an ellipsis. Truncated text retains its full DOM value and reveals a tooltip on hover or keyboard focus; non-truncated text adds no tab stop. This prevents long values, URLs and non-wrapping date spans from painting over adjacent columns. Header text follows the same rule while sort/help controls keep their space.

Choose readable widths for each content type rather than relying on the generic 200px minimum: for example, a 240px minimum for names, 260px for a long formatted date, 220px for timezones, and 112px for counts. These are examples, not content-measurement rules. The table scrolls when these widths do not fit; never force it to compress them.

Set `meta: { cellLayout: "content" }` for controls, badges or deliberately multiline renderers. This preserves their own layout and focus rings; give the column enough width for the complete control. Built-in selection, expansion and row-action columns configure this automatically. Do not use the content mode as an escape hatch for unbounded text. Compose `DataTableTextCell` for text inside custom rich cells and `DataTableMultiLineCell` for two lines. Each multiline value truncates independently and remains available through hover/focus.

```tsx
{
  id: "createdBy",
  size: 200,
  meta: { label: "Created by", cellLayout: "content" },
  header: "Created by",
  cell: ({ row }) => (
    <DataTableMultiLineCell
      primary={row.original.creatorName}
      secondary={formatCreatedDate(row.original.createdAt)}
    />
  ),
}
```

Import `DataTableTextCell` and `DataTableMultiLineCell` from the DataTable entry point. Text-cell `className` is for layout integration; retain its bounded width, ellipsis and focus treatment. Do not clip whole table cells or apply word-breaking rules to force a fit.

Migration: earlier Data table versions did not apply TanStack `size` values to the rendered table. Those values now take effect. Review existing `size` declarations and replace compatibility width classes with column definitions.

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

## Row links

Use `rowLink` for native navigation from full data cells. Supply `getHref(original)`, an explicit `columnIds` list and `primaryColumnId`:

```tsx
<DataTable
  aria-label="Templates"
  columns={columns}
  data={templates}
  rowLink={{
    getHref: (template) => `/templates/${template.id}`,
    columnIds: ["name", "type", "subject", "updated_at"],
    primaryColumnId: "name",
  }}
/>
```

Each opted-in cell uses a real anchor. The link hit area includes all cell padding and the full row height. Native right-click, copy-link, middle-click and modifier-click behaviour is preserved. There is no row click handler or link wrapped around a table row. Plain text remains selectable, with one combined tooltip for clipped linked content, including multiline cells.

Only list columns whose renderers contain non-interactive content. Remove existing anchor wrappers from those renderers: DataTable owns the anchor. Leave columns containing buttons, other links, inputs, editable fields or focusable controls out of `columnIds`. Selection, expansion and action utility columns are always excluded. A lock tooltip/control should also be excluded. Use `DataTableMultiLineCell`/`DataTableTextCell` to bound rich text within linked cells.

`primaryColumnId` supplies the single navigation Tab stop per row. Equivalent links in other cells have `tabIndex=-1` and reference the primary link as their accessible description; their visible cell values remain their names. If the primary column is hidden, the first visible linked column becomes the keyboard link. Keep the meaningful name column visible where possible. Return `null` or `undefined` from `getHref` for rows without a destination, such as deleted records; skeleton/error rows never have links. The library owns cell-wide focus rings and linked-row hover treatment.

Import `DataTableRowLinkConfig<TData>` from the DataTable entry point when declaring shared configuration. Row links also work with advanced provider composition and expandable rows; navigation and expansion remain separate controls.

## Row actions

Visible row actions use Dropdown menu. Right-click on a `rowLink` anchor uses the native browser link menu, not the Context menu component. Do not intercept `contextmenu` or wrap the table or linked cells in ContextMenuTrigger; DataTable does not expose a custom row context-menu integration.

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

## Mass actions

### Button trigger

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

### Floating action bar

Set `selectActionsDisplay="floating"` to replace the toolbar trigger with a
floating selection bar. The default remains `"button"` for existing consumers.

```tsx
<DataTable
  aria-label="Templates"
  columns={columns}
  data={templates}
  getRowId={(template) => template.id}
  pagination
  selectActionsDisplay="floating"
  selectActionsLabels={{
    selectedCount: (count) =>
      count === 1 ? "1 template selected" : `${count} templates selected`,
    selectAll: "Select all",
    moreActions: "More actions",
    clearSelection: "Deselect all templates",
    label: "Template selection actions",
  }}
  selectActions={[
    { id: "export", label: "Export" },
    { id: "archive", label: "Archive" },
    { id: "delete", label: "Delete", variant: "destructive" },
  ]}
  onSelectAction={handleTemplateAction}
/>
```

The bar fades and scales between 97% and 100% over 150ms while loaded rows are selected (instant, without scaling, with reduced motion). Exiting controls immediately become inert and hidden from assistive technology. The overflow trigger uses the bar's hover colours while its menu is open. Its order is deselect icon,
selection count, ghost Select all button, separator, ghost action buttons, then
a separator and destructive actions. Destructive actions are grouped last;
ordinary actions retain their supplied order and optional separators. Action
callbacks receive the same `selectedRows` as the button-menu presentation.
Actions accept an optional decorative `icon: ReactNode`, rendered before the label in row menus, both bulk presentations and the overflow menu. Use the approved Gecko icon renderer with `aria-hidden="true"`; keep `label` as plain translated text. Icons are included in overflow width measurements.
The bar measures its table container and moves trailing actions into a “More actions” menu when they no longer fit. Destructive actions remain inline where space permits, otherwise appear last in the menu. Actions return inline as space becomes available. The measurement copies are inert and hidden from assistive technology; focused actions move focus to the overflow trigger when they move into the menu. Translate its accessible label with `selectActionsLabels.moreActions`.

The product owns confirmation, mutations, errors and clearing selection after
an action; selecting an action does not silently clear the selection.

Select all adds every selectable row matching the current search/filters across
all client-side pages. It is disabled when all matches are selected. Existing
selected rows hidden by filters remain selected and are included in the count
and action callback. Deselect clears the entire selection, including hidden rows,
and returns focus to the table’s header checkbox. No rows outside the supplied
client-side dataset are fetched or selected.

The bar is sticky at the bottom of its table’s scrollport and bounded by the table
root, rather than fixed over unrelated page content. It occupies space at the end
of the table so the final rows and pagination remain reachable, and moves excess actions into its overflow menu
in smaller desktop panels. Its selection-bar surface, foreground, hover and border
tokens provide a dark bar in light mode and a light bar in dark mode. Ghost actions
and separators follow the bar's surface; destructive actions retain a solid red
treatment with contrasting text. Do not restyle its surface or buttons.

`selectActionsLabels` supports `selectedCount(count)`, `selectAll`, `clearSelection`, `moreActions`
and `label` (accessible group name). Defaults are “N item/items selected”, “Select
all”, “Deselect all items”, “More actions” and “Selection actions”. Pass translated labels rather
than constructing English plurals in application code. The count is announced by
a persistent polite status region; showing the bar does not move keyboard focus.

The header checkbox selects the current page. TanStack uses row indexes by default, so `getRowId` is required in canonical selection usage to keep selection attached to the correct records when data changes.

Use `rowSelection` alone only when an advanced composition consumes selection state itself. Use `selection={{ state, onChange }}` when the product needs controlled selection.

## Pagination and data ownership

Pagination is opt-in. Without the `pagination` prop, Data table renders every filtered row. With it, Data table owns client-side pagination and displays the approved page-size and page-navigation controls.

Pagination controls remain inline within their leading and trailing groups. Its Select triggers use compact content-appropriate widths rather than the full-width form-field treatment.

The results summary uses compact supporting text and gives the result count stronger emphasis.

The default is client-side: provide the complete dataset in `data`. For a server-backed list, provide `remote={{ state, onStateChange, rowCount }}` and just the current page in `data`. Search, filters, sorting and pagination then emit query changes without reprocessing that page locally. `rowCount` is the total number of matching server records. Page indexes are zero-based; the default page size is 15.

```tsx
const [query, setQuery] = React.useState<DataTableQueryState>({
  globalFilter: "",
  sorting: [{ id: "name", desc: false }],
  columnFilters: [],
  pagination: { pageIndex: 0, pageSize: 15 },
});
const [selection, setSelection] = React.useState<RowSelectionState>({});

<DataTable
  aria-label="Templates"
  columns={columns}
  data={response.rows}
  getRowId={(row) => String(row.id)}
  sorting
  pagination
  remote={{
    state: query,
    onStateChange: (updater) => {
      setQuery(updater);
      setSelection({});
    },
    rowCount: response.total,
  }}
  selection={{ state: selection, onChange: setSelection }}
  loading={isInitialLoading}
  updating={isUpdating}
  error={errorMessage}
  onRetry={refetch}
  toolbar={{ search: { placeholder: "Search templates" } }}
/>;
```

Import `DataTableQueryState` from the Data table entry point and `RowSelectionState` from TanStack Table. The application owns fetching, debouncing, ignoring obsolete responses, URL synchronization and clamping the page after deletion. Query updates reset the page index to zero when search, filters or sorting change. Page-size updates use TanStack's page calculation; applications may choose to return to page one.

Remote selection contains only supplied rows. Both the header and floating bar Select all act on the loaded page; they never select unseen server records. Use “Select all” for the button label and clear controlled selection when changing queries/pages or after mutations. Client-side selection keeps its existing across-page behaviour.

`loading` replaces body rows with cell skeletons, retaining headers, toolbar, column visibility and pagination. `error` replaces the body with an alert and optional Retry action. Selection is disabled and the floating bar is hidden during loading/errors; no stale row actions are rendered. For silent search/filter updates, retain the previous rows and set `updating` until the current response arrives. This keeps rows visible without skeletons or loading announcements while disabling selection and row actions and hiding both mass-action presentations. Reserve `loading` for initial loads or explicit skeleton transitions.

Loading cells reuse `meta.cellClassName`. Text skeletons reserve one line of text; built-in action and expand skeletons reserve their 28px controls. The action cell retains that minimum height even when a row has no permitted actions. When rows already exist, loading preserves the displayed row count; before the first response it reserves the configured page size.

For custom or multiline cells, set `meta.skeleton` to decorative content matching the loaded cell's dimensions. The table hides these placeholders from assistive technology. Reuse the same multiline structure so typography determines both heights:

```tsx
meta: {
  cellLayout: "content",
  skeleton: <DataTableMultiLineCell
    primary={<Skeleton className="h-[1lh] w-full" />}
    secondary={<Skeleton className="h-[1lh] w-3/4" />}
  />,
}
```

Import Skeleton from `@geckolabs/elements/components/skeleton`. A table cannot infer the height of arbitrary custom content before it arrives; its skeleton must reserve that space explicitly.

Use `labels` for loading, retry, empty-state, pagination and row-selection/action text. Count and page labels accept formatters. Use `toolbar.columnToggle.triggerLabel`, `toolbar.filters.labels`, `selectActionsLabels` and `DataTableColumnHeader.sortLabels` for the corresponding controls. Existing English defaults remain unchanged.

Do not pass a page-size value outside the approved 15, 25 and 50 options. Unsupported initial sizes fall back to 15.

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

Distinguish an empty collection from a query with no matches:

- **No data, no active search/filter:** show only Empty, without table headers, toolbar or pagination. High-level DataTable does this automatically once loading has finished. An application may render its own domain-specific Empty instead of mounting DataTable.
- **No search/filter matches:** keep the table and query controls, with Empty inside the table body and the relevant clear action. Clearing the query must remain possible.
- **Unknown data:** use the application loading pattern; do not claim the collection is empty before the request completes.

For remote data, supply the active query through `remote.state` and its matching result count. Zero filtered results do not establish that the underlying collection is empty. Advanced provider compositions must apply the same no-data boundary around their toolbar, content and pagination. Use Empty's documented composition without restyling it.

## Accessibility

- Supply a concise `aria-label` that names the collection, such as `Events` or `Applicants`.
- Keep column titles short and unique.
- Sort state is exposed with `aria-sort`; the sort button names its next action.
- Selection controls expose their checked and indeterminate states. The header control explicitly selects the current page.
- Use `getRowId` with selection so state follows stable domain records.
- Row action and expansion triggers are buttons with accessible names.
- Use `rowLink` for non-interactive data cells; keep links to other destinations, buttons, menus and selection controls independent.
- Do not communicate status using colour or an icon alone.
- Preserve horizontal scrolling at narrow widths rather than collapsing semantic table structure.

## Approved public interface

### Canonical parts

| Part                         | Meaning                                                              |
| ---------------------------- | -------------------------------------------------------------------- |
| `DataTable`                  | Standard application interface and composition owner                 |
| `DataTableColumnHeader`      | Column title, optional help and sorting control                      |
| `DataTableMultiLineCell`     | Primary and supporting cell text                                     |
| `DataTableMultiSelectFilter` | Approved categorical column filter                                   |
| `DataTableRowAction`         | Shared shape for row and bulk actions                                |
| `DataTableColumnMeta`        | Column-toggle label, growth weight and compatibility layout metadata |

### Advanced composition

`DataTableProvider`, `DataTableRoot`, `DataTableToolbar`, `DataTableToolbarSearchRow`, `DataTableToolbarGroup`, `DataTableSearch`, `DataTableFilters`, `DataTableSelectActions`, `DataTableColumnToggle`, `DataTableContent`, `DataTablePagination` and `useDataTableContext` are advanced parts.

Use them only when a reviewed product layout cannot be represented by `DataTable`. Keep them under one `DataTableProvider`. When manually composing without `DataTablePagination`, pass `paginated={false}` to both `DataTableProvider` and `DataTableContent`; their compatibility defaults assume pagination. This keeps the rendered rows and the header selection control in the same scope.

`createSelectionColumn`, `createExpandColumn`, `createActionsColumn`, `getDataTableColumnToggleLabel` and `DATA_TABLE_PAGE_SIZE_OPTIONS` are implementation helpers exported for compatibility. Do not use them in new application code without explicit review.

### DataTable props

| Prop                   | Type                                    | Default          | Rule                                                                                              |
| ---------------------- | --------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------- |
| `columns`              | `ColumnDef<TData>[]`                    | required         | Stable or memoised definitions                                                                    |
| `data`                 | `TData[]`                               | required         | Complete client dataset or current remote page                                                    |
| `aria-label`           | `string`                                | —                | Required in canonical usage                                                                       |
| `sorting`              | `boolean`                               | `false`          | Enable only when useful                                                                           |
| `rowSelection`         | `boolean`                               | `false`          | Advanced selection without built-in actions                                                       |
| `rowLink` | `DataTableRowLinkConfig<TData>` | — | Native full-cell links; explicitly opt in non-interactive columns |
| `getRowId`             | `(row, index) => string`                | row index        | Use a domain id with selection                                                                    |
| `initialState`         | `InitialTableState`                     | —                | Initial sorting, filtering, visibility, selection or page; declare any displayed default ordering |
| `rowActions`           | `false \| true \| DataTableRowAction[]` | `false`          | Prefer a shared action array                                                                      |
| `getRowActions`        | `(row) => DataTableRowAction[]`         | —                | Per-row action availability                                                                       |
| `actionsKey`           | `keyof TData`                           | `"actions"`      | Compatibility use with `rowActions={true}`                                                        |
| `onRowAction`          | `(id, context) => void`                 | —                | Required when row actions are supplied                                                            |
| `selectActions`        | `DataTableRowAction[]`                  | —                | Automatically enables selection and its toolbar control                                           |
| `selectActionsDisplay` | `"button" \| "floating"`                | `"button"`       | Selects the toolbar menu or floating action bar                                                   |
| `selectActionsLabels`  | `DataTableSelectionBarLabels`           | English defaults | Floating bar labels and translated count formatter                                                |
| `onSelectAction`       | `(id, context) => void`                 | —                | Required with `selectActions`                                                                     |
| `expandable`           | `DataTableExpandableConfig<TData>`      | —                | Renders subordinate row detail                                                                    |
| `toolbar`              | `false \| DataTableToolbarConfig`       | —                | Search, filters and column toggle only                                                            |
| `pagination`           | `boolean \| DataTablePaginationProps`   | `false`          | Client-side pagination                                                                            |
| `globalFilter`         | `boolean`                               | `true`           | Advanced override; toolbar search normally owns this                                              |
| `className`            | `string`                                | —                | Parent layout integration only                                                                    |
| `contentClassName`     | `string`                                | —                | Compatibility escape hatch; do not restyle table chrome                                           |

`DataTableSelectionBar` is exported for advanced composition under the same
`DataTableProvider` and `DataTableRoot` as its table. It accepts `labels` using
`DataTableSelectionBarLabels`. Compose either it or `DataTableSelectActions`, not
both. Standard application usage should use `selectActionsDisplay` on DataTable.

## Remote interface additions

| Property    | Type                                                                    | Meaning                                                                        |
| ----------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `remote`    | `DataTableRemoteConfig`                                                 | Controlled query, updater and matching server row count                        |
| `selection` | `{ state: RowSelectionState; onChange: OnChangeFn<RowSelectionState> }` | Product-owned selection                                                        |
| `updating`  | `boolean`                                                               | Keep existing rows visible without a loader; disable selection and row actions |
| `loading`   | `boolean`                                                               | Skeleton body, no actionable stale rows                                        |
| `error`     | `string`                                                                | Failed request message in the body                                             |
| `onRetry`   | `() => void`                                                            | Retry the failed request                                                       |
| `labels`    | `DataTableLabels`                                                       | Translated body, pagination and row-control labels                             |

## Styling contract

The library owns the table border, header treatment, row spacing, hover and selected states, utility columns, toolbar layout, search sizing, filter integration, pagination controls, empty state, responsive scrolling, action triggers and focus states.

Application code owns column definitions, domain formatting and placement within the surrounding page. Use existing Gecko components inside cells. Request a library change when a legitimate table treatment is missing.

Agents must obtain explicit consent before adding or changing public props, action variants, filter operators, page sizes, selection behaviour, table chrome, toolbar layout, empty-state treatment or remote-data behaviour.

## Relationship to Shadcn and TanStack Table

Shadcn treats Data Table as a guide because table requirements vary by application. Gecko intentionally provides a reusable opinionated component for its recurring product-list pattern.

TanStack Table continues to own column definitions, state and row models. Gecko owns the approved presentation, feature configuration and common interactions. The current implementation uses TanStack Table v8; do not copy v9 feature-registration examples into this component.

## Application integration

Use the [tested application patterns](application-patterns.md) for data ownership, loading, asynchronous operations and navigation. Preserve source behaviour with the [migration checklist](migration-checklist.md). Common action glyphs come from the [action icon map](action-icons.md).
