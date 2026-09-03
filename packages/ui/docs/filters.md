# Filters

Import: `@gecko/ui/components/filters`  
Status: Stable  
Source: `src/components/filters.tsx`  
Human documentation: `apps/docs/src/pages/filters/index.tsx`

## Purpose

The Filters family narrows or orders an existing dataset. `Filter` provides categorical multi-select, `Sort` chooses one ordering, and `DateRangeFilter` limits results by date.

Use `Filter` in new code. `Filters` remains available only as a compatibility alias.

Pair Filter with Data table for a product list. Use it independently when a dashboard or reporting interface owns another dataset or query. The product applies emitted values to local data, URL state, or a remote request; this module owns only the filtering controls and their presentation.

Inbox and conversation filters are a separate product pattern.

## Choose the control

| Need                                 | Control           | State model                                     |
| ------------------------------------ | ----------------- | ----------------------------------------------- |
| Select values across categories      | `Filter`          | Controlled or uncontrolled selections/operators |
| Choose one ordering                  | `Sort`            | Controlled value                                |
| Choose a relative or custom interval | `DateRangeFilter` | Controlled range                                |

Use Select or Combobox for a single form-field value. Filters act on a collection rather than submitting one field value.

## Categorical filtering

Every category and option has a stable value. Category ids are the keys returned through `onChange`.

```tsx
import { useState } from "react";

import { Filter, type FilterOperator } from "@gecko/ui/components/filters";

const categories = [
  {
    id: "status",
    label: "Status",
    searchable: false,
    options: [
      { value: "active", label: "Active" },
      { value: "paused", label: "Paused" },
    ],
  },
  {
    id: "owner",
    label: "Owner",
    options: owners.map((owner) => ({
      value: owner.id,
      label: owner.name,
    })),
    searchPlaceholder: "Search owners",
  },
];

const [values, setValues] = useState<Record<string, string[]>>({});
const [operators, setOperators] = useState<Record<string, FilterOperator>>({});

<Filter
  categories={categories}
  values={values}
  operators={operators}
  onChange={(nextValues, nextOperators) => {
    setValues(nextValues);
    setOperators(nextOperators);
    updateReport({ values: nextValues, operators: nextOperators });
  }}
/>;
```

Controlled state is canonical when the product needs reset controls, URL synchronisation, saved views, or remote queries. Omit `values` and `operators` and use `defaultValues` and `defaultOperators` only for genuinely uncontrolled filtering. Application usage still supplies `onChange` so the visible selection affects the dataset.

### Operators

The approved operators are:

- `is` for one selected value;
- `is not` for excluding selected values;
- `is any of` for two or more included values.

Selecting a second included value changes `is` to `is any of`. Returning to one value changes `is any of` back to `is`. An explicit `is not` remains negated as values are added or removed.

Each active category renders one segmented filter chip. The library owns its category label, operator menu, value menu, summary, and removal control. Two or more values use the fixed summary `n selected`; application code does not provide pluralisation or chip markup.

### Search

Category menus are searchable by default. Set `searchable: false` for a short option list where every choice is immediately visible. Use `searchPlaceholder` when the generated `Search {category}` prompt is not natural or specific enough.

A category without options is disabled. A Filter without categories has a disabled trigger.

## Data table composition

Use the high-level Data table interface for product lists. Category ids must equal the relevant column id or string `accessorKey`, and that column uses `DataTableMultiSelectFilter`.

```tsx
<DataTable
  aria-label="Events"
  columns={columns}
  data={events}
  toolbar={{ filters: { categories } }}
/>
```

`DataTableFilters` adapts the Filter values and operators to TanStack Table. Application code does not render that adapter beside the high-level DataTable.

## Sort

Sort is controlled and requires one current value and a change handler. It reports the selected ordering but does not reorder the dataset itself.

```tsx
<Sort
  options={[
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
  ]}
  value={sortOrder}
  onValueChange={(nextOrder) => {
    setSortOrder(nextOrder);
    updateReport({ sort: nextOrder });
  }}
/>
```

A Sort without options has a disabled trigger.

## Date range

DateRangeFilter is controlled. It provides the approved relative presets and a custom two-month range calendar. The trigger shows the chosen preset while its emitted range remains current; otherwise it shows the formatted range.

```tsx
<DateRangeFilter value={dateRange} onChange={setDateRange} />
```

The default choices are Past 24 hours, Past 7 days, Past 4 weeks, Past 3 months, and Custom. Custom reports only a complete range. Clear date filter reports `undefined`. Each relative preset receives a fresh `now` when selected.

Supply `presets` only when product requirements define a different approved set:

```tsx
const presets = [
  {
    id: "today",
    label: "Today",
    getRange: (now: Date) => ({
      from: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      to: now,
    }),
  },
];

<DateRangeFilter presets={presets} value={dateRange} onChange={setDateRange} />;
```

Keep date calculations in the local timezone. The product converts the emitted range to the format required by its data source.

## Trigger choices

The default trigger displays the library-owned icon and a visible label. `trigger="icon"` is for constrained toolbars; `triggerLabel` then provides its accessible name. The condensed Filter hides active chips and displays the number of selected values on its trigger.

Custom trigger icons are exceptional. Pass a Lucide component or one of the existing curated aliases; an unsupported string falls back to the standard Filter icon. Prefer the defaults so application code does not make local styling decisions.

## Accessibility

- Filter category and value menus use checkbox items for multiple selection.
- Operator and Sort menus use radio items for a single current choice.
- Triggers and active-chip controls are Gecko Buttons with standard focus-visible styling.
- Icon-only triggers use `triggerLabel` as their accessible name.
- Operator and value controls announce their category and current state.
- The selected-value counter is included in the condensed trigger’s accessible name.
- DateRangeFilter uses a Popover because its calendar is an interactive grid, not a menu.
- The product announces changes to the resulting dataset. Use a stable polite status region for changing result counts when the surrounding collection does not already provide one.

## Interface

### Filter

| Property           | Type                             | Default     | Meaning                                        |
| ------------------ | -------------------------------- | ----------- | ---------------------------------------------- |
| `categories`       | `readonly FilterCategory[]`      | Required    | Available categories and options               |
| `values`           | `Record<string, string[]>`       | none        | Controlled selections by category id           |
| `operators`        | `Record<string, FilterOperator>` | none        | Controlled operators by category id            |
| `onChange`         | `(values, operators) => void`    | none        | Reports every selection or operator change     |
| `defaultValues`    | `Record<string, string[]>`       | `{}`        | Initial uncontrolled selections                |
| `defaultOperators` | `Record<string, FilterOperator>` | `{}`        | Initial uncontrolled operators                 |
| `variant`          | `"default" \| "condensed"`       | `"default"` | Active chips or trigger counter                |
| `trigger`          | `"default" \| "icon"`            | `"default"` | Visible label or icon-only trigger             |
| `triggerLabel`     | `string`                         | `"Filter"`  | Visible label and icon-trigger accessible name |
| `triggerIcon`      | `string \| LucideIcon`           | standard    | Exceptional trigger icon override              |

### FilterCategory and FilterOption

| Property            | Type                      | Default   | Meaning                                   |
| ------------------- | ------------------------- | --------- | ----------------------------------------- |
| `id`                | `string`                  | Required  | Stable state key                          |
| `label`             | `string`                  | Required  | Visible category name                     |
| `options`           | `readonly FilterOption[]` | Required  | Values available in the category          |
| `searchable`        | `boolean`                 | `true`    | Enables menu search                       |
| `searchPlaceholder` | `string`                  | generated | Search prompt for this category           |
| `option.value`      | `string`                  | Required  | Stable value emitted through Filter state |
| `option.label`      | `string`                  | Required  | Visible option name                       |

### Sort

| Property        | Type                      | Default     | Meaning                            |
| --------------- | ------------------------- | ----------- | ---------------------------------- |
| `options`       | `readonly SortOption[]`   | Required    | Available orderings                |
| `value`         | `string`                  | Required    | Current controlled ordering        |
| `onValueChange` | `(value: string) => void` | Required    | Reports the next ordering          |
| `trigger`       | `"default" \| "icon"`     | `"default"` | Visible label or icon-only trigger |
| `triggerLabel`  | `string`                  | `"Sort"`    | Visible or accessible name         |
| `triggerIcon`   | `string \| LucideIcon`    | standard    | Exceptional icon override          |

### DateRangeFilter

| Property        | Type                                      | Default            | Meaning                                           |
| --------------- | ----------------------------------------- | ------------------ | ------------------------------------------------- |
| `value`         | `DateRange \| undefined`                  | `undefined`        | Current controlled range                          |
| `onChange`      | `(range: DateRange \| undefined) => void` | none               | Reports presets, complete custom ranges and clear |
| `presets`       | `readonly DateRangeFilterPreset[]`        | approved presets   | Replaces the relative choices                     |
| `triggerLabel`  | `string`                                  | `"Filter by date"` | Label shown without a range                       |
| `customLabel`   | `string`                                  | `"Custom"`         | Label that reveals the custom calendar            |
| `closeOnSelect` | `boolean`                                 | `true`             | Closes after a complete selection                 |

Filter, Sort, and DateRangeFilter accept native `div` properties for outer layout integration.

## Styling contract

The library owns trigger sizes, icons, menus, search, active chips, operators, selected-value summaries, counters, removal controls, focus states, date presets, calendar placement and responsive layout.

Use `className` only to position the complete control in its parent. Application code supplies category data and state without styling the filtering chrome. Request a library change when a legitimate filtering treatment is missing.

## Agent rules

- Choose Filter, Sort, or DateRangeFilter from the task’s data operation.
- Pair Filter with Data table for product lists; use controlled Filter directly for dashboards and reports.
- Apply emitted state to the product dataset or query.
- Use stable unique category ids and option values.
- Use controlled state when the product resets, persists, shares, or remotely applies filters.
- Keep category search for longer lists and disable it for short lists.
- Preserve the approved operators and their meanings.
- Use the default labelled trigger unless space genuinely requires the icon or condensed treatment.
- Use DateRangeFilter for date-based collection filtering and Date picker or Date field for form input.
- Keep Inbox and conversation filtering on its separate product pattern.
- Import the Gecko interface; do not recreate Filters from Dropdown menu, Popover, or Calendar parts.
- Obtain explicit consent before adding operators, chip treatments, preset sets, trigger variants, or product-owned query behaviour.

## Ownership

Filters is Gecko-owned. It composes Gecko Dropdown menu, Button, Counter, Separator, Popover, and Calendar. Dropdown behaviour derives from the Shadcn and Base UI Menu interfaces; the custom date range uses React DayPicker through Gecko Calendar. These dependencies are implementation details.

## Related components

- **Data table** — standard product-list composition.
- **Select** — short fixed single-choice form fields.
- **Combobox** — searchable single-choice form fields.
- **Date picker** — a date form field with a calendar.
- **Search** — free-text collection filtering.
