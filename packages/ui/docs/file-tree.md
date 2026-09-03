# File tree

Import: `@gecko/ui/components/file-tree`  
Status: Stable  
Source: `src/components/file-tree.tsx`  
Human documentation: `apps/docs/src/pages/file-tree/index.tsx`

## Purpose

File tree presents a known hierarchy of folders and files as a nested disclosure list. Folders with children expand and collapse; files and empty folders are static leaves.

Use File tree when people need to scan nested structure, such as a website map prepared for AI scraping. It is not currently used in Gecko product UI. Do not use it for file selection, uploading, reordering or a flat list.

## Canonical usage

Model each node as either a folder or a file. Only folders accept children. Every id is stable and unique across the complete hierarchy.

```tsx
import { FileTree } from "@gecko/ui/components/file-tree";
import type { FileTreeNode } from "@gecko/ui/components/file-tree";

const nodes: FileTreeNode[] = [
  {
    id: "components",
    label: "components",
    type: "folder",
    children: [
      {
        id: "ui",
        label: "ui",
        type: "folder",
        children: [
          { id: "button", label: "button.tsx", type: "file" },
          { id: "dialog", label: "dialog.tsx", type: "file" },
        ],
      },
    ],
  },
  { id: "readme", label: "README.md", type: "file" },
];

<FileTree
  nodes={nodes}
  defaultExpandedIds={["components", "ui"]}
  aria-label="Project files"
/>;
```

Use `aria-label` when the surrounding content does not already give the list an accessible name.

## Expansion

`defaultExpandedIds` sets the initial uncontrolled state. It accepts folder ids at any depth. Changing the array after mount does not control the open folders.

File tree does not expose controlled expansion. If product requirements need expansion state to be observed or changed programmatically, extend the Gecko component and its contract rather than composing Collapsible in application code.

Folders without children are static. They do not render a disclosure button because there is nothing to reveal.

## Semantics and keyboard behaviour

File tree renders native nested `ul` and `li` elements. A folder with children contains a disclosure button implemented with Gecko Collapsible.

- Tab moves between expandable folder buttons and then continues to the next interactive control on the page.
- Enter or Space toggles the focused folder.
- Files and empty folders are not interactive or included in the tab order.
- Folder and file icons are decorative.
- The component deliberately does not use `role="tree"`, tree-item roles, selection state or arrow-key navigation.

ARIA tree semantics would promise a composite tree widget with managed focus, selection and arrow-key behaviour. Do not add isolated tree roles or application-level keyboard handlers. A future requirement for tree selection or navigation needs a library-level interaction redesign.

## Interface

### FileTree

| Property             | Type                      | Default  | Meaning                                                    |
| -------------------- | ------------------------- | -------- | ---------------------------------------------------------- |
| `nodes`              | `readonly FileTreeNode[]` | Required | Complete folder and file hierarchy                         |
| `defaultExpandedIds` | `readonly string[]`       | `[]`     | Folder ids that start expanded on first render             |
| `className`          | `string`                  | none     | Positions the outer list within an exceptional page layout |

FileTree accepts native `ul` properties except `children`. The node hierarchy is supplied only through `nodes`.

### FileTreeNode

| Property   | Type                      | Applies to      | Meaning                                    |
| ---------- | ------------------------- | --------------- | ------------------------------------------ |
| `id`       | `string`                  | Folder and file | Stable unique identity                     |
| `label`    | `string`                  | Folder and file | Visible item name                          |
| `type`     | `"folder" \| "file"`      | Folder and file | Determines disclosure or leaf presentation |
| `children` | `readonly FileTreeNode[]` | Folder only     | Nested items                               |

The discriminated node type prevents file nodes from accepting children.

## Styling contract

The library owns indentation, branch lines, icons, row spacing, hover treatment, disclosure motion and focus-visible presentation. Indentation increases by one fixed step for every nested level.

Use `className` only to position or size the complete File tree in its parent. Do not style individual rows, replace disclosure icons or recreate the hierarchy from lower-level components.

## Agent rules

- Start from the canonical `FileTree` interface and pass data through `nodes`.
- Use File tree only for a confirmed nested hierarchy; use an ordinary list for flat content.
- Give every node a stable unique id and concise label.
- Put children only on folder nodes.
- Treat `defaultExpandedIds` as initial state and include only folder ids.
- Preserve the native nested-list and disclosure-button semantics.
- Do not add tree roles, selection state, arrow-key navigation or file actions in application code.
- Do not import or compose the internal Collapsible dependency for a File tree.
- Request a component-level extension before adding product behaviour or a new interaction model.

## Ownership

File tree is a Gecko-owned component. It uses Gecko Collapsible internally, whose disclosure behaviour comes from the Shadcn and Base UI Collapsible APIs. That dependency is an implementation detail; application code imports FileTree from Gecko.

## Related components

- **File field** — native file selection in a form.
- **Attachment** — upload progress, retry, completion and removal.
- **Drop zone** — a large drag-and-drop file selection surface.
- **Sortable list** — manual reordering when item order has product meaning.
