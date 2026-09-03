# Sortable list

Import: `@gecko/ui/components/sortable-list`  
Status: Stable  
Source: `src/components/sortable-list.tsx`  
Human documentation: `apps/docs/src/pages/sortable-list/index.tsx`

## Purpose

Sortable list lets people change the order of a list with a dedicated drag handle. It supports a single sequence and grouped items whose sections can also be reordered.

Use Sortable list when order has product meaning. Use Attachment or Drop zone when people are adding files. Use Data table when rows need columns, sorting, filtering or pagination rather than manual ordering.

## Canonical application usage

Use the controlled flat interface for one sequence. Each item is represented by a stable unique id, and the product stores the order received by `onItemsChange`.

```tsx
import { SortableList } from "@gecko/ui/components/sortable-list";

const [itemIds, setItemIds] = useState(["welcome", "details", "confirmation"]);

<SortableList
  items={itemIds}
  onItemsChange={setItemIds}
  getLabel={(id) => stepsById[id].name}
  getItemLabel={(id) => stepsById[id].name}
/>;
```

`getLabel` renders row content. `getItemLabel` supplies the human-readable name for the drag handle when ids are not suitable names. Keep both values aligned.

## Nested lists

Use `variant="nested"` for ordered sections containing ordered child items. Child items can move within and between sections by default.

```tsx
import {
  type SortableNestedSection,
  SortableList,
} from "@gecko/ui/components/sortable-list";

const [sections, setSections] = useState<SortableNestedSection[]>([
  {
    id: "before",
    title: "Before the event",
    items: [{ id: "invite", label: "Send invitation" }],
  },
  {
    id: "after",
    title: "After the event",
    items: [{ id: "follow-up", label: "Send follow-up" }],
  },
]);

<SortableList
  variant="nested"
  sections={sections}
  onSectionsChange={setSections}
/>;
```

Set `allowCrossSectionMove={false}` when a child may be reordered only inside its current section. Section order remains sortable.

Every section id must be unique. Every child item id must be stable and unique across all sections so the same item retains its drag identity when it moves.

## Row actions

Sorting owns the drag interaction; the product owns other row behaviour. Use `renderRowActions` to place existing controls at the end of a row.

```tsx
<SortableList
  items={itemIds}
  onItemsChange={setItemIds}
  renderRowActions={({ id }) => <ItemActions itemId={id} />}
/>
```

For a nested list, the callback context identifies either a section or an item. Render controls that perform real product actions. An absent callback renders no action area.

## State ownership

Sortable list is controlled. The product owns the current arrays and persists the order if required. The component calculates a new immutable order and calls the matching change callback after a completed drag.

Canceled drags restore the pre-drag order. `onItemsChange` and `onSectionsChange` must update their state; treating either callback as a notification without applying its value leaves the rendered order unchanged.

## Accessibility

- The grip is a native Button and is the only drag handle.
- DnD Kit supplies pointer and keyboard sensors, screen-reader instructions, live announcements and focus restoration.
- Focus the handle, press Space or Enter to pick up an item, use the arrow keys to move it, then press Space or Enter to drop it. Escape cancels the drag.
- Flat lists use `getItemLabel` for the handle’s accessible name. Supply it whenever an id is opaque, abbreviated or otherwise unsuitable as a user-facing name.
- Nested section titles and item labels provide their handle names automatically.
- Keep product controls inside `renderRowActions`; interactive descendants outside the drag handle do not start a drag.

## Interface

### Shared properties

| Property           | Type                           | Default  | Meaning                                                 |
| ------------------ | ------------------------------ | -------- | ------------------------------------------------------- |
| `variant`          | `"flat" \| "nested"`           | `"flat"` | Selects a single sequence or grouped list               |
| `renderRowActions` | `(context) => React.ReactNode` | —        | Renders product-owned controls at the row end           |
| `className`        | `string`                       | —        | Integrates the outer wrapper with an exceptional layout |

### Flat list properties

| Property        | Type                             | Default  | Meaning                           |
| --------------- | -------------------------------- | -------- | --------------------------------- |
| `items`         | `string[]`                       | Required | Stable ids in their current order |
| `onItemsChange` | `(items: string[]) => void`      | Required | Receives the next order           |
| `getLabel`      | `(id, index) => React.ReactNode` | Item id  | Renders row content               |
| `getItemLabel`  | `(id, index) => string`          | Item id  | Names the drag handle             |

### Nested list properties

| Property                | Type                                          | Default  | Meaning                                         |
| ----------------------- | --------------------------------------------- | -------- | ----------------------------------------------- |
| `sections`              | `SortableNestedSection[]`                     | Required | Sections and child items in their current order |
| `onSectionsChange`      | `(sections: SortableNestedSection[]) => void` | Required | Receives reordered sections and child items     |
| `allowCrossSectionMove` | `boolean`                                     | `true`   | Allows child items to move between sections     |

`SortableNestedRowContext` distinguishes section and item action rows. Narrow on `context.kind` before reading `itemId`.

## Styling contract

The library owns row layout, spacing, borders, backgrounds, handles and dragging feedback. Application code supplies labels and controls without restyling sortable chrome.

Use `className` only to position the complete list in its surrounding layout. Request a library change when the established row treatment cannot represent a legitimate product need.

Agents must obtain explicit user consent before adding variants, movement rules, row treatments or library-owned product actions.

## Relationship to DnD Kit

Gecko composes DnD Kit’s `DragDropProvider` and `useSortable` APIs. DnD Kit owns sensors, collision detection, optimistic movement, keyboard interaction and announcements. Gecko owns the controlled flat and nested data interfaces, approved presentation, action-rendering seam and cross-section movement rule.
