# Table

Import: `@gecko/ui/components/table`  
Status: Stable  
Source: `src/components/table.tsx`  
Human documentation: `apps/docs/src/pages/table/index.tsx`

## Purpose

Table presents simple, non-interactive tabular data in semantic rows and columns. Use it for small reporting and detail tables that do not require sorting, filtering, pagination or row actions.

Use Data table for product lists and interactive datasets. Data table also owns expandable application rows; application code does not assemble TableExpandableRow directly.

Table follows Shadcn’s native table composition. It does not wrap a Base UI primitive.

## Composition

```text
Table
├── TableCaption
├── TableHeader
│   └── TableRow
│       └── TableHead
├── TableBody
│   ├── TableRow
│   │   └── TableCell
│   └── TableExpandableRow
│       ├── TableCell
│       │   └── TableExpandableRowTrigger
│       └── TableDetailRow | TableRow
└── TableFooter
    └── TableRow
        └── TableCell
```

The compact tree lists each distinct part once. TableExpandableRow and TableDetailRow are infrastructure used by Data table.

## Canonical table

Give every table a visible caption or an accessible name. Use short column headings and align numeric values to the logical end.

```tsx
<Table>
  <TableCaption>Recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="text-end">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell className="text-end tabular-nums">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

Use `aria-label` when a visible caption would repeat an adjacent heading without adding useful context.

## Footer

Use TableFooter for totals, counts and other aggregate values. Mark the aggregate label as a row header.

```tsx
<TableFooter>
  <TableRow>
    <TableHead scope="row" colSpan={2}>
      Total
    </TableHead>
    <TableCell className="text-end tabular-nums">$250.00</TableCell>
  </TableRow>
</TableFooter>
```

## Hover highlighting

Set `hoverable` when row highlighting helps people track values across a dense table.

```tsx
<Table hoverable aria-label="Invoice totals">
  {/* table content */}
</Table>
```

Hover highlighting is a scanning aid. It does not make rows interactive. Do not attach click handlers to an entire row; use Data table when rows need actions or selection.

## Nested tables

Use a nested Table for subordinate tabular data inside a Data table detail panel.

```tsx
<Table nested title="Sessions" description="Session times for this event.">
  {/* session rows */}
</Table>
```

The title and description are connected to the nested table automatically. A caller-supplied `aria-labelledby` or `aria-describedby` value is preserved and combined with the generated relationship.

Do not use `nested` as a general compact or bordered variant. It exists for table detail content.

## Expandable-row infrastructure

Data table composes TableExpandableRow and TableExpandableRowTrigger through its `expandable` configuration. These primitives remain documented for library maintenance and extension; application code uses Data table instead.

The panel layout reveals one full-width detail cell. Use it for nested tables or content that does not share the parent columns.

```tsx
<TableExpandableRow
  colSpan={3}
  detail={
    <Table nested title="Line items">
      {/* line items */}
    </Table>
  }
>
  {/* parent cells, including TableExpandableRowTrigger */}
</TableExpandableRow>
```

The sibling-row layout reveals real TableRow elements aligned to the parent columns.

```tsx
<TableExpandableRow
  colSpan={3}
  detailLayout="sibling-rows"
  detail={
    <>
      <TableRow>{/* aligned child cells */}</TableRow>
      <TableRow>{/* aligned child cells */}</TableRow>
    </>
  }
>
  {/* parent cells */}
</TableExpandableRow>
```

Use `open` with `onOpenChange` for controlled expansion. Use `defaultOpen` only for an initial uncontrolled state. The disclosure button owns `aria-expanded` and `aria-controls`; set `label` to add row context while preserving the generated Expand and Collapse state.

## Responsive behaviour

The default Table wrapper owns horizontal overflow. Keep the table structure intact at narrow widths rather than converting rows into unrelated cards.

TableHead and TableCell keep their contents on one line. Keep headings concise and allow the wrapper to scroll when the complete column set cannot fit.

Nested Table omits the ordinary scroll wrapper and renders the approved bordered detail panel.

## Interface

### Table

| Property           | Type              | Default | Meaning                                                      |
| ------------------ | ----------------- | ------- | ------------------------------------------------------------ |
| `hoverable`        | `boolean`         | `false` | Highlights body rows to aid scanning                         |
| `nested`           | `boolean`         | `false` | Uses the approved nested detail presentation                 |
| `title`            | `React.ReactNode` | none    | Visible and accessible name for a nested table               |
| `description`      | `React.ReactNode` | none    | Supporting context automatically connected to a nested table |
| `aria-label`       | `string`          | none    | Accessible table name when no visible caption is appropriate |
| `aria-labelledby`  | `string`          | none    | Additional accessible-name relationships                     |
| `aria-describedby` | `string`          | none    | Additional supporting-text relationships                     |

Table accepts native `table` properties. TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell and TableCaption accept the native properties for their corresponding elements.

### TableExpandableRow

| Property       | Type                        | Default      | Meaning                                                |
| -------------- | --------------------------- | ------------ | ------------------------------------------------------ |
| `colSpan`      | `number`                    | none         | Number of parent columns occupied by the detail panel  |
| `detailLayout` | `"panel" \| "sibling-rows"` | `"panel"`    | Selects a full-width panel or aligned child rows       |
| `detail`       | `React.ReactNode`           | none         | Subordinate content revealed by the disclosure trigger |
| `defaultOpen`  | `boolean`                   | `false`      | Initial uncontrolled expanded state                    |
| `open`         | `boolean`                   | uncontrolled | Controlled expanded state                              |
| `onOpenChange` | `(open: boolean) => void`   | none         | Reports expanded state changes                         |

TableExpandableRow also accepts native `tr` properties.

### TableExpandableRowTrigger

| Property   | Type              | Default              | Meaning                                                     |
| ---------- | ----------------- | -------------------- | ----------------------------------------------------------- |
| `label`    | `string`          | `"row"`              | Adds row context to the generated expand and collapse label |
| `children` | `React.ReactNode` | Chevron              | Replaces the default disclosure icon                        |
| `onClick`  | click handler     | internal toggle only | Runs caller behaviour before the internal toggle            |

TableExpandableRowTrigger accepts Gecko Button properties except `type`, which is always `button`.

## Accessibility

- Give every Table a caption, `aria-label` or `aria-labelledby`.
- Use TableHead for column headers and set `scope="row"` on row-summary headers.
- Keep numeric columns end-aligned and use tabular figures for changing or comparable values.
- Preserve the native table, row, header-cell and data-cell elements.
- Let the default wrapper own horizontal scrolling at narrow widths.
- Keep whole rows non-interactive; place links and buttons inside cells.
- Give each expandable-row trigger contextual text through `label`.
- Expansion content remains inert while collapsed.
- Disclosure and row transitions respect reduced-motion preferences.

## Agent rules

1. Import Table parts from `@gecko/ui/components/table`.
2. Use Table only for simple tabular data without sorting, filters, pagination or row actions.
3. Use Data table for product lists and interactive datasets.
4. Give every table a caption or accessible name.
5. Use semantic TableHead and TableCell elements; do not recreate a table with generic layout elements.
6. Align numeric columns with `text-end tabular-nums`.
7. Treat `hoverable` as a scanning aid, never as row interaction.
8. Use nested Table only for tabular detail inside an expandable Data table row.
9. Use Data table’s `expandable` configuration rather than composing expandable primitives in application code.
10. Preserve horizontal overflow, reduced-motion handling and Gecko’s approved table presentation.
11. Do not import Shadcn source or add a Base UI Table dependency.

## API reference

- [Shadcn Table documentation](https://ui.shadcn.com/docs/components/base/table)

## Related

- **Data table** — product data with sorting, filtering, pagination, actions, selection or expandable rows.
- **Metric card** — reporting surface that can contain a simple Table.
