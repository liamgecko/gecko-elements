# Empty

Import: `@gecko/ui/components/empty`  
Status: Stable  
Source: `src/components/empty.tsx`  
Human documentation: `apps/docs/src/pages/empty/index.tsx`

## Purpose

Empty explains why a page, section, list or table has no content and, when possible, gives someone a clear next step.

Use Empty after loading has completed and the resulting collection contains nothing. Use Spinner while content is still loading. Use Alert when existing content is accompanied by an important status, warning or error.

## Canonical composition

```text
Empty
├── EmptyHeader
│   ├── EmptyMedia
│   ├── EmptyTitle
│   └── EmptyDescription
└── EmptyContent
```

Keep `EmptyMedia` inside `EmptyHeader`. `EmptyContent` is a sibling of the header and contains actions or another purposeful way forward.

```tsx
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <FolderIcon aria-hidden="true" />
    </EmptyMedia>
    <EmptyTitle>No projects yet</EmptyTitle>
    <EmptyDescription>
      Projects keep related work and files together.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Create project</Button>
  </EmptyContent>
</Empty>
```

Always include `EmptyTitle` and `EmptyDescription`. Add media only when it improves recognition. Add content only when the state has a useful next step.

## Empty-state types

### Initial empty state

State what has not been created, explain its purpose and offer the primary creation action.

```tsx
<Empty>
  <EmptyHeader>
    <EmptyTitle>No workflows yet</EmptyTitle>
    <EmptyDescription>
      Workflows automate repeated tasks for your team.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Create workflow</Button>
  </EmptyContent>
</Empty>
```

### No matching results

Name the cause and provide one action that removes it. Search and filter state remains owned by the product.

```tsx
<Empty>
  <EmptyHeader>
    <EmptyTitle>No results found</EmptyTitle>
    <EmptyDescription>
      No projects match the current search and filters.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button variant="outline" onClick={clearSearchAndFilters}>
      Clear search and filters
    </Button>
  </EmptyContent>
</Empty>
```

### Read-only empty state

Omit `EmptyContent` when no action is available. The description should still explain what will appear and, where useful, what causes it to appear.

## Actions

Prefer one primary action. Two actions are acceptable only when they are distinct routes forward, such as “Import project” and “Create project”. Keep the secondary Outline action first in DOM order and the primary action last.

Actions belong to application code. Empty provides their placement but does not create, run or configure product operations.

Do not add an action that cannot resolve or advance the empty state. Do not use competing actions that produce the same outcome.

## Media

Omit `variant` when `EmptyMedia` contains an Avatar, Avatar group, image or another component that owns its presentation. Set `variant="icon"` for the library-owned framed icon treatment.

Icons accompanying a visible title and description are decorative. Set `aria-hidden="true"` on the icon. Do not use media as the only explanation of the empty state.

## Accessibility

- Empty is passive content and does not add a role, live region or focus behaviour.
- `EmptyTitle` is a visual title and does not replace the surrounding page or section heading.
- Keep the page’s semantic heading available when the empty state replaces its ordinary content.
- Use native Button or link components for actions and give each a visible, specific label.
- Do not announce every Empty automatically. When an asynchronous search or filter operation changes existing content to an empty state and that update needs announcement, the product supplies an appropriate status message outside Empty.
- Decorative icons use `aria-hidden="true"`.

## Interface

### Parts

| Part               | Underlying element | Meaning                                                |
| ------------------ | ------------------ | ------------------------------------------------------ |
| `Empty`            | `div`              | Centres and groups the complete empty state            |
| `EmptyHeader`      | `div`              | Groups optional media, title and description           |
| `EmptyMedia`       | `div`              | Holds optional media or the approved framed icon       |
| `EmptyTitle`       | `div`              | Visible empty-state title                              |
| `EmptyDescription` | `p`                | Supporting explanation                                 |
| `EmptyContent`     | `div`              | Holds optional actions or another purposeful next step |

Every part accepts the native properties of its underlying element.

### EmptyMedia

| Property  | Type                  | Default     | Meaning                                  |
| --------- | --------------------- | ----------- | ---------------------------------------- |
| `variant` | `"default" \| "icon"` | `"default"` | Chooses unframed media or the icon frame |

## Styling contract

The library owns alignment, spacing, text measure, media frame, border, radius, typography and action placement.

Use `className` only to place the complete Empty within its parent layout. Do not override internal spacing, media chrome, typography or alignment in application code. Request a library change when a legitimate treatment is missing.

## Agent rules

- Use the canonical composition and keep `EmptyMedia` inside `EmptyHeader`.
- Always include a visible title and description.
- Add an icon only when it improves recognition and mark it decorative.
- Prefer one clear next action; use two only when the outcomes are genuinely distinct.
- Keep loading, errors and empty results as separate states.
- Keep search, filter, creation and import behaviour in application code.
- Do not invent variants, media treatments, layouts or workflow-specific props.
- Use the trusted docs application only for visual examples; prototype projects are not component guidance.

## Relationship to Shadcn

Gecko retains Shadcn’s compound Empty composition and `EmptyMedia` variants while applying Gecko’s approved spacing, typography, border and icon treatment. Empty has no Base UI primitive or separate behavioural dependency.

## Related components

- **Data table** — owns its integrated empty and no-results states.
- **Spinner** — content is still loading.
- **Alert** — important status, warning or error content.
- **Button** — product-owned next action.
