# App sidebar

Import: `@geckolabs/elements/components/app-sidebar`  
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

### Product shell

Standard product pages keep [App Header](app-header.md) above App Sidebar and place [Page Header](header.md) followed by [Page Container](container.md) in SidebarInset.

Inbox keeps App Header and App Sidebar but replaces Page Header and Page Container with its own conversation workspace. Its header contains conversation views, search and filters; below it, three columns contain [Chat head](chat-head.md) on the left, conversation controls with [Message scroller](message-scroller.md) and [Reply box](reply-box.md) in the centre, and contact details in [Accordion](accordion.md) with [Activity feed](activity-feed.md) on the right. The product owns the view names, conversation actions and contact data.

## Destinations

Every favourite and navigation leaf has a real `href`. The required `onSelect` handler connects navigation to the application router without removing the link destination.

Navigation entries with children are grouped beneath their parent by default. Their disclosure panel animates when it opens and closes. By default, opening a closed group also selects its first child. Set `navigateOnGroupOpen={false}` to expand only; navigation then waits until a child link is selected. Use this for the Admin sidebar, where destinations can leave the current app. Toggling an open group closes it without changing the active destination.

When the rail is collapsed, favourites and navigation groups open side flyouts on hover or trigger activation. Their links and favourite actions remain available; Escape closes the flyout. Expanding the rail restores each navigation group's disclosure state.

## Favourites

Favourites always appear before the main navigation. The application supplies the current favourite destinations and handles rename and remove actions.

The action is labelled “Remove from favourites”. It removes the saved shortcut, not the destination itself. Removing a favourite is an immediate quick action. Do not add a confirmation dialog or undo flow unless the product requirement changes.

Rename is optional: omit `onRename` when the saved favourites service does not support renaming. The action is then hidden. When supplied, rename uses a labelled field in a small dialog. The product callback owns persistence and any validation result.

## Translations

Applications translate navigation item labels before passing `items`. Keep item IDs
and hrefs stable across languages. Saved favourite names are user content.

Pass `collapseLabel` and `expandLabel` to AppSidebar for the footer button's
accessible name and tooltip. Pass `labels` to AppSidebarFavourites for its own text:

```tsx
<AppSidebarFavourites
  items={favourites}
  activePath={pathname}
  onSelect={navigate}
  onDelete={removeFavourite}
  labels={{
    heading: t("favourites.heading"),
    remove: t("favourites.remove"),
    actions: (name) => t("favourites.actions", { name }),
  }}
/>
```

The optional `labels` object supports `heading`, `remove`, `rename`, `renameTitle`,
`name`, `namePlaceholder`, `cancel` (strings), and `actions` (`(name: string) => string`).
Defaults preserve the English copy. `heading` also labels the collapsed favourites
button and tooltip; `actions` names each favourite's menu. Translate the rename
labels when providing `onRename`. The application owns locale state; no translation
runtime is required by Elements. Pass Page Header's existing `tooltipAddLabel` and
`tooltipRemoveLabel` in `favouriteAction` for its translated star action.

## Interfaces

### AppSidebar

| Property    | Type                                    | Default | Meaning                                         |
| ----------- | --------------------------------------- | ------- | ----------------------------------------------- |
| `children`  | `[AppSidebarFavourites, AppSidebarNav]` | none    | Favourites followed by primary navigation       |
| `collapseLabel` | `string` | `"Collapse sidebar"` | Footer action name and tooltip while expanded |
| `expandLabel` | `string` | `"Expand sidebar"` | Footer action name and tooltip while collapsed |
| `className` | `string`                                | none    | Positions the rail within the application shell |

### AppSidebarFavourites

| Property     | Type                                    | Default | Meaning                               |
| ------------ | --------------------------------------- | ------- | ------------------------------------- |
| `labels` | `Partial<AppSidebarFavouritesLabels>` | English defaults | Translates headings, actions and rename copy |
| `items`      | `AppSidebarFavouriteItem[]`             | none    | Pinned destinations                   |
| `activePath` | `string`                                | none    | Current route for active presentation |
| `onSelect`   | `(path: string) => void`                | none    | Handles navigation                    |
| `onRename`   | `(path: string, label: string) => void` | none    | Optional; omitting it hides Rename    |
| `onDelete`   | `(path: string) => void`                | none    | Handles immediate favourite removal   |

Each favourite item has a `path` and `label`.

### AppSidebarNav

| Property              | Type                     | Default | Meaning                                                               |
| --------------------- | ------------------------ | ------- | --------------------------------------------------------------------- |
| `navigateOnGroupOpen` | `boolean`                | `true`  | Navigates to the first child when opening a group; false expands only |
| `items`               | `AppSidebarNavItem[]`    | none    | Leaf destinations and grouped children                                |
| `activePath`          | `string`                 | none    | Current route for active presentation                                 |
| `onSelect`            | `(href: string) => void` | none    | Handles navigation                                                    |

A leaf item has `id`, `label`, `icon` and `href`. A group has `id`, `label`, `icon`, a non-empty `items` tuple and may set `defaultOpen`. Every child has `label` and `href`. The `id` is the stable React key and disclosure-state key; never derive it from mutable display copy.

Set `unread` on a navigation group when it contains unread activity. The group shows a notification dot beside its icon in both expanded and collapsed modes, and adds screen-reader text to the trigger. Supply `unreadLabel` for the product's translated description, such as “Unread messages”. Opening the group does not clear the indicator; the application owns the unread state.

## Accessibility

- Destinations retain native link semantics and keyboard focus.
- Nested group controls expose their expanded state and identify the panel they control.
- Collapsed flyouts open by pointer or keyboard, retain native destination links, and dismiss with Escape.
- Active destinations use the Sidebar active treatment.
- Unread group activity is conveyed by screen-reader text as well as the notification dot.
- The rename field has a persistent visible label.
- Favourite action buttons retain accessible names in expanded and collapsed layouts.
- The footer trigger remains available alongside the keyboard shortcut.

## Styling contract

App Sidebar owns its width, height below App Header, border, icon-collapsed state, Scroll area and footer. Scrollbars remain hidden until hover or focus within.

Navigation labels remain on one line and truncate as the sidebar narrows; the complete group label remains available through its tooltip.

Preserve the Sidebar footer divider and default menu sizing. Do not apply feature-specific visual overrides to App Sidebar.

## Agent rules

1. Use the complete App Sidebar composition rather than composing Sidebar primitives in product code.
2. Supply real paths for every favourite and navigation destination.
3. Wire `onSelect` to the product router without removing native link semantics.
4. Always render Favourites before the primary navigation.
5. Give every navigation entry a stable `id`.
6. Give every leaf an `href` and every group at least one child item.
7. Group child destinations beneath their parent and preserve animated disclosure. First-child navigation is the default; use `navigateOnGroupOpen={false}` for expand-only navigation in Admin.
8. Treat favourite removal as an immediate quick action.
9. Keep rename inside its labelled dialog field.
10. Preserve App Sidebar’s Scroll area, scrollbar behaviour, footer and collapse trigger.
11. Put conversation lists in Chat head and page actions in Page Header.
12. Request a shared component change instead of restyling App Sidebar locally.

## Related

- **Sidebar** — low-level foundation and state provider.
- **App Header** — application chrome above the rail.
- **Page Header** — page title and actions inside SidebarInset.
- **Chat head** — complete Inbox conversation list.
