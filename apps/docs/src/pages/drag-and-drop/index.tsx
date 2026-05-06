import { useState } from "react"

import { ComponentExample } from "@/components/layout/component-example"
import { PageSection } from "@/components/layout/page-section"
import { Code } from "@gecko/ui/components/code"
import { type SortableNestedSection, SortableList } from "@gecko/ui/components/drag-and-drop"

const initialItems = ["Alpha", "Bravo", "Charlie", "Delta"]

const initialRowActionItems = ["North", "East", "South", "West"]

const initialSections: SortableNestedSection[] = [
  {
    id: "design",
    title: "Design",
    items: [
      { id: "d1", label: "UI audit" },
      { id: "d2", label: "Icon set" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering",
    items: [
      { id: "e1", label: "API contract" },
      { id: "e2", label: "Load tests" },
    ],
  },
]

export function DragAndDropPage() {
  const [items, setItems] = useState(initialItems)
  const [rowActionItems, setRowActionItems] = useState(initialRowActionItems)
  const [sections, setSections] = useState(initialSections)

  return (
    <div className="space-y-12">
        <PageSection id="overview" label="Overview">
          <h1 className="text-2xl font-bold text-foreground">Drag and drop</h1>
          <p className="text-pretty text-sm text-muted-foreground">
            Sortable lists using{" "}
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="https://dndkit.com/react/quickstart"
              rel="noreferrer"
              target="_blank"
            >
              @dnd-kit/react
            </a>
            , wrapped by{" "}
            <Code>
              SortableList
            </Code>
            .
            Use the grip to reorder; order updates when the drag ends.
          </p>
        </PageSection>

        <PageSection id="basic-example" label="Basic example">
          <h2 className="text-lg font-semibold">Basic example</h2>
          <p className="mb-8 text-pretty text-sm text-muted-foreground">
            Flat list: controlled{" "}
            <Code>items</Code> and{" "}
            <Code>onItemsChange</Code>{" "}
            (default{" "}
            <Code>
              {`variant="flat"`}
            </Code>
            ).
          </p>
          <ComponentExample>
            <SortableList
              getLabel={(id) => id}
              items={items}
              onItemsChange={setItems}
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="row-actions" label="Row actions">
          <h2 className="text-lg font-semibold">Row actions</h2>
          <p className="mb-8 text-pretty text-sm text-muted-foreground">
            Enable <Code>rowActions</Code>{" "}
            to show the same kebab menu pattern as data tables, aligned to the right of the label. Optionally wire{" "}
            <Code>onRowAction</Code> for selection handling.
          </p>
          <ComponentExample>
            <SortableList
              getLabel={(id) => id}
              items={rowActionItems}
              onItemsChange={setRowActionItems}
              rowActions
            />
          </ComponentExample>
        </PageSection>

        <PageSection id="nested-example" label="Nested lists">
          <h2 className="text-lg font-semibold">Nested lists</h2>
          <p className="mb-8 text-pretty text-sm text-muted-foreground">
            Set{" "}
            <Code>
              {`variant="nested"`}
            </Code>{" "}
            with <Code>sections</Code> and{" "}
            <Code>onSectionsChange</Code>.
            <Code>rowActions</Code> adds kebab menus on
            section headers and item rows; optionally pass{" "}
            <Code>onRowAction</Code>. Section order follows
            the array; item ids must be unique across sections.
            Dragging is cancelled
            restores state from a snapshot (see{" "}
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="https://dndkit.com/react/guides/multiple-sortable-lists"
              rel="noreferrer"
              target="_blank"
            >
              multiple sortable lists
            </a>
            ).
          </p>
          <ComponentExample>
            <SortableList
              onSectionsChange={setSections}
              rowActions
              sections={sections}
              variant="nested"
            />
          </ComponentExample>
        </PageSection>
    </div>
  )
}
