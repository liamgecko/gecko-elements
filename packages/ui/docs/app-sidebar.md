# App sidebar

Import: `@gecko/ui/components/app-sidebar`  
Status: Stable  
Source: `src/components/app-sidebar.tsx`  
Human documentation: `apps/docs/src/pages/structure/app-sidebar/index.tsx`

## Purpose

App Sidebar is Gecko’s one app-wide product navigation below App Header. It is the fixed product-facing composition built from Sidebar and owns the favourites group, grouped primary navigation, icon-collapsible rail, scrolling content and footer trigger.

Use it for destinations such as Home, Conversations, Calls and Settings. Do not use it for conversation rows, page actions, page titles or temporary panels.

## Canonical usage

```tsx
<SidebarProvider>
  <AppSidebar>
    <AppSidebarFavourites
      items={favourites}
      activePath={pathname}
      onSelect={navigate}
      onRename={renameFavourite}
      onDelete={removeFavourite}
    />
    <AppSidebarNav
      items={navigation}
      activePath={pathname}
      onSelect={navigate}
    />
  </AppSidebar>
  <SidebarInset>{children}</SidebarInset>
</SidebarProvider>
```

The application owns routing and data changes. App Sidebar owns structure, active presentation, collapse behaviour and the scrollable rail.

## Composition

```text
AppSidebar
├── AppSidebarFavourites
└── AppSidebarNav
```

Always render `AppSidebarFavourites` before `AppSidebarNav`. When the current favourite list is empty, the component emits no group until favourites are available. The footer and collapse trigger are owned by `AppSidebar`.

## Destinations

Every favourite and navigation leaf has a real `href`. The required `onSelect` handler connects navigation to the application router without removing the link destination.

Navigation entries with children are grouped beneath their parent by default. Their disclosure panel animates when it opens and closes. Opening a closed group also selects its first child. Toggling an open group closes it without changing the active destination.

## Favourites

Favourites always appear before the main navigation. The application supplies the current favourite destinations and handles rename and remove actions.

Removing a favourite is an immediate quick action. Do not add a confirmation dialog or undo flow unless the product requirement changes.

Rename uses a labelled field in a small dialog. The product callback owns persistence and any validation result.

## Interfaces

### AppSidebar

| Property    | Type                                    | Default | Meaning                                         |
| ----------- | --------------------------------------- | ------- | ----------------------------------------------- |
| `children`  | `[AppSidebarFavourites, AppSidebarNav]` | none    | Favourites followed by primary navigation       |
| `className` | `string`                                | none    | Positions the rail within the application shell |

### AppSidebarFavourites

| Property     | Type                                    | Default | Meaning                               |
| ------------ | --------------------------------------- | ------- | ------------------------------------- |
| `items`      | `AppSidebarFavouriteItem[]`             | none    | Pinned destinations                   |
| `activePath` | `string`                                | none    | Current route for active presentation |
| `onSelect`   | `(path: string) => void`                | none    | Handles navigation                    |
| `onRename`   | `(path: string, label: string) => void` | none    | Handles rename                        |
| `onDelete`   | `(path: string) => void`                | none    | Handles immediate favourite removal   |

Each favourite item has a `path` and `label`.

### AppSidebarNav

| Property     | Type                     | Default | Meaning                                |
| ------------ | ------------------------ | ------- | -------------------------------------- |
| `items`      | `AppSidebarNavItem[]`    | none    | Leaf destinations and grouped children |
| `activePath` | `string`                 | none    | Current route for active presentation  |
| `onSelect`   | `(href: string) => void` | none    | Handles navigation                     |

A leaf item has `id`, `label`, `icon` and `href`. A group has `id`, `label`, `icon`, a non-empty `items` tuple and may set `defaultOpen`. Every child has `label` and `href`. The `id` is the stable React key and disclosure-state key; never derive it from mutable display copy.

## Accessibility

- Destinations retain native link semantics and keyboard focus.
- Nested group controls expose their expanded state and identify the panel they control.
- Active destinations use the Sidebar active treatment.
- The rename field has a persistent visible label.
- Favourite action buttons retain accessible names in expanded and collapsed layouts.
- The footer trigger remains available alongside the keyboard shortcut.

## Styling contract

App Sidebar owns its width, height below App Header, border, icon-collapsed state, Scroll area and footer. Scrollbars remain hidden until hover or focus within.

Preserve the Sidebar footer divider and default menu sizing. Do not apply feature-specific visual overrides to App Sidebar.

## Agent rules

1. Use the complete App Sidebar composition rather than composing Sidebar primitives in product code.
2. Supply real paths for every favourite and navigation destination.
3. Wire `onSelect` to the product router without removing native link semantics.
4. Always render Favourites before the primary navigation.
5. Give every navigation entry a stable `id`.
6. Give every leaf an `href` and every group at least one child item.
7. Group child destinations beneath their parent and keep the animated disclosure and first-child selection behaviour unchanged.
8. Treat favourite removal as an immediate quick action.
9. Keep rename inside its labelled dialog field.
10. Preserve App Sidebar’s Scroll area, scrollbar behaviour, footer and collapse trigger.
11. Put conversation lists in Chat head and page actions in Page Header.
12. Request a shared component change instead of restyling App Sidebar locally.

## Related

- **Sidebar** — low-level foundation and state provider.
- **App Header** — application chrome above the rail.
- **Page Header** — page title and actions inside SidebarInset.
- **Chat head** — conversation list item.
