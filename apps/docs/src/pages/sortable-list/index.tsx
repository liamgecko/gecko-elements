import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

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
import { Code } from "@gecko/ui/components/code";
import { Button } from "@gecko/ui/components/button";
import {
  type SortableNestedSection,
  SortableList,
} from "@gecko/ui/components/sortable-list";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@gecko/ui/components/dropdown-menu";

const initialItems = ["Alpha", "Bravo", "Charlie", "Delta"];

const initialRowActionItems = ["North", "East", "South", "West"];

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
];

function RowActions({
  label,
  onDelete,
}: {
  label: string;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={`Open actions for ${label}`}
          />
        }
      >
        <MoreHorizontal aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem variant="destructive" onClick={onDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SortableListPage() {
  const [items, setItems] = useState(initialItems);
  const [rowActionItems, setRowActionItems] = useState(initialRowActionItems);
  const [sections, setSections] = useState(initialSections);

  const importSnippet = `import { SortableList } from "@gecko/ui/components/sortable-list"`;

  const basicSnippet = `<SortableList
  items={items}
  onItemsChange={setItems}
/>`;

  const rowActionsSnippet = `<SortableList
  items={items}
  onItemsChange={setItems}
  renderRowActions={({ id }) => <ItemActions itemId={id} />}
/>`;

  const nestedSnippet = `<SortableList
  onSectionsChange={setSections}
  sections={sections}
  variant="nested"
/>`;

  return (
    <div>
      <HeaderSection
        id="overview"
        title="Sortable list"
        description="Sortable list lets people change the order of a list using a drag handle. It supports a single sequence or grouped items."
      />

      <MainSection
        id="usage"
        title="Usage"
        description={
          <>
            Use Sortable list when reordering elements is essential. The grip is
            the handle; the rest of the row is the content.
            <br />
            <br />
            Avoid using it to add files from the desktop — use{" "}
            <DocsPageLink to="/components/drop-zone">
              Drop zone
            </DocsPageLink> or{" "}
            <DocsPageLink to="/components/attachment">Attachment</DocsPageLink>{" "}
            instead.
          </>
        }
      >
        <ChildSection
          id="usage-import"
          title="Import"
          description="Import SortableList to add a reorderable list."
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
            A flat list using <Code>items</Code> and <Code>onItemsChange</Code>.
            Use this when the list is a single sequence.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <SortableList items={items} onItemsChange={setItems} />
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
        id="row-actions"
        title="Row actions"
        description={
          <>
            Use <Code>renderRowActions</Code> to place product-owned controls at
            the end of each row. Use this when a row can be acted on as well as
            reordered.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <SortableList
              items={rowActionItems}
              onItemsChange={setRowActionItems}
              renderRowActions={({ id }) => (
                <RowActions
                  label={id}
                  onDelete={() => {
                    setRowActionItems((current) =>
                      current.filter((item) => item !== id),
                    );
                  }}
                />
              )}
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
        id="nested-example"
        title="Nested lists"
        description={
          <>
            Grouped lists use <Code>sections</Code> and{" "}
            <Code>onSectionsChange</Code>. Sections and their child items can be
            reordered, and child items can move between sections. Set{" "}
            <Code>allowCrossSectionMove=false</Code> when items must remain in
            their original section.
          </>
        }
      >
        <ComponentExample>
          <div className="space-y-6">
            <SortableList
              onSectionsChange={setSections}
              sections={sections}
              variant="nested"
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
        id="do-dont"
        title="Do and don’t"
        description="Choose the list shape and keep every sortable id stable."
      >
        <DocsDoDont
          doItems={[
            <>Use the default flat variant for one reorderable sequence.</>,
            <>
              Update <Code>items</Code> through <Code>onItemsChange</Code>.
            </>,
            <>
              Use <Code>variant=&quot;nested&quot;</Code> for grouped items.
            </>,
            <>
              Give every nested item a stable id that is unique across sections.
            </>,
          ]}
          dontItems={[
            <>Don’t use Sortable list for dropping files.</>,
            <>Don’t mutate the current item or section arrays in place.</>,
            <>
              Don’t pass flat <Code>items</Code> to the nested variant.
            </>,
            <>
              Keep product actions inside <Code>renderRowActions</Code>.
            </>,
          ]}
        />
      </MainSection>

      <MainSection
        id="api"
        title="API"
        description="Behaviour props on Sortable list."
      >
        <DocsApiTable
          rows={[
            {
              name: "variant",
              type: '"flat" | "nested"',
              defaultValue: '"flat"',
              description: "Chooses a single sequence or grouped list.",
            },
            {
              name: "items",
              type: "string[]",
              description: "Ordered ids for the flat variant.",
            },
            {
              name: "onItemsChange",
              type: "(items: string[]) => void",
              description: "Receives the reordered flat items.",
            },
            {
              name: "sections",
              type: "SortableNestedSection[]",
              description: "Ordered groups and items for the nested variant.",
            },
            {
              name: "onSectionsChange",
              type: "(sections: SortableNestedSection[]) => void",
              description: "Receives reordered nested sections and items.",
            },
            {
              name: "getLabel",
              type: "(id: string, index: number) => React.ReactNode",
              defaultValue: "Item id",
              description: "Renders the label for a flat item id.",
            },
            {
              name: "getItemLabel",
              type: "(id: string, index: number) => string",
              defaultValue: "Item id",
              description: "Supplies the accessible name for a flat item.",
            },
            {
              name: "allowCrossSectionMove",
              type: "boolean",
              defaultValue: "true",
              description:
                "Allows nested child items to move between sections.",
            },
            {
              name: "renderRowActions",
              type: "(context) => React.ReactNode",
              description:
                "Renders product-owned controls at the end of a row.",
            },
          ]}
        />
        <ChildSection
          id="api-reference"
          title="API reference"
          description={
            <>
              See the{" "}
              <DocsExternalLink href="https://dndkit.com/react/quickstart/">
                DnD Kit React documentation
              </DocsExternalLink>{" "}
              for the underlying drag-and-drop API.
            </>
          }
        />
      </MainSection>

      <MainSection
        id="related"
        title="Related"
        description="Use a different component when people are adding files or reading structured rows."
      >
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <DocsPageLink to="/components/drop-zone">Drop zone</DocsPageLink> —
            when people are adding files rather than reordering items.
          </li>
          <li>
            <DocsPageLink to="/components/data-table">Data table</DocsPageLink>{" "}
            — for structured rows with columns and table controls.
          </li>
        </ul>
      </MainSection>
    </div>
  );
}
